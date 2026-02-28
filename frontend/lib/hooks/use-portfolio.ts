import { useState, useEffect, useCallback } from "react";
import { useStacks } from "./use-stacks";
import { STACKS_NETWORK_CONFIG, SC_CONTRACTS } from "../constants/contracts";
import { fetchCallReadOnlyFunction, cvToJSON, uintCV } from "@stacks/transactions";
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

export type PortfolioAsset = {
  symbol: string;
  name: string;
  balance: number;
  balanceFormatted: string;
  priceUsd: number;
  valueUsd: number;
  isNative: boolean;
};

export function usePortfolio() {
  const { address, network } = useStacks();
  
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [totalValueUsd, setTotalValueUsd] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!address) {
      setAssets([]);
      setTotalValueUsd(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isTestnet = network === "testnet";
      const apiUrl = isTestnet ? STACKS_NETWORK_CONFIG.testnetApiUrl : STACKS_NETWORK_CONFIG.coreApiUrl;
      const stacksNodeNetwork = isTestnet ? STACKS_TESTNET : STACKS_MAINNET;

      // 1. Fetch STX Balance from Hiro API
      const balanceRes = await fetch(`${apiUrl}/extended/v1/address/${address}/balances`);
      if (!balanceRes.ok) throw new Error("Failed to fetch address balances");
      const balanceData = await balanceRes.json();
      
      const stxMicroBalance = parseInt(balanceData.stx?.balance || "0", 10);
      const stxBalance = stxMicroBalance / 1_000_000;

      // 2. Fetch Prices from CoinGecko
      // We map blockstack -> STX. Let's fetch it:
      const cgRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd`);
      let stxPriceUsd = 0;
      if (cgRes.ok) {
        const cgData = await cgRes.json();
        stxPriceUsd = cgData.blockstack?.usd || 0;
      }

      const stxAsset: PortfolioAsset = {
        symbol: "STX",
        name: "Stacks",
        balance: stxBalance,
        balanceFormatted: stxBalance.toLocaleString(undefined, { maximumFractionDigits: 6 }),
        priceUsd: stxPriceUsd,
        valueUsd: stxBalance * stxPriceUsd,
        isNative: true,
      };

      const fetchedAssets: PortfolioAsset[] = [stxAsset];

      // 3. Token Registry Synchronization (SIP-010)
      try {
        const [contractAddress, contractName] = SC_CONTRACTS.TOKEN_REGISTRY.split(".");
        
        // Fetch tokens via `get-token-list-paged` mapping 
        // We will make a sample call using start-id 0 (this relies on your backend returning some tokens)
        const resultCV = await fetchCallReadOnlyFunction({
          contractAddress,
          contractName,
          functionName: "get-token-list-paged",
          functionArgs: [uintCV(0)],
          network: stacksNodeNetwork,
          senderAddress: address || contractAddress,
        });

        // Parse resultCV (should be a list of optional tuples).
        const parsedResult = cvToJSON(resultCV);
        
        // Let's iterate through standard fungible balances fetched from Hiro API directly 
        // to map against registry details safely since read-only loop balances might require explicit token lookups.
        const fungibleTokens = balanceData.fungible_tokens || {};
        
        for (const [tokenKey, tokenData] of Object.entries<any>(fungibleTokens)) {
          // Identify token contract from key e.g "SP3...token::token-name"
          const contractId = tokenKey.split("::")[0];
          
          if (contractId) {
            // Placeholder metadata interpretation if the API already has it or we default
            const microBal = parseInt(tokenData.balance || "0", 10);
            const decimals = 6; // Standard
            const bal = microBal / (10 ** decimals);
            
            fetchedAssets.push({
              symbol: tokenKey.split("::")[1] || "TOKEN",
              name: tokenKey.split("::")[1] || "SIP-010 Token",
              balance: bal,
              balanceFormatted: bal.toLocaleString(undefined, { maximumFractionDigits: decimals }),
              priceUsd: 0, // Mocking price to 0 internally without deep backend oracle
              valueUsd: 0,
              isNative: false,
            });
          }
        }
      } catch (e) {
        console.warn("Token registry mapping failed / Not deployed yet:", e);
      }

      setAssets(fetchedAssets);
      const totalUsd = fetchedAssets.reduce((acc, curr) => acc + curr.valueUsd, 0);
      setTotalValueUsd(totalUsd);

    } catch (err: any) {
      setError(err.message || "Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  }, [address, network]);

  useEffect(() => {
    fetchPortfolio();
    
    // Set up a basic polling interval every 30 seconds
    const interval = setInterval(fetchPortfolio, 30000);
    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  return { assets, totalValueUsd, isLoading, error, refetch: fetchPortfolio };
}
