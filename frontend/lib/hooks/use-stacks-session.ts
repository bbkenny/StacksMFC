"use client";

import { useState, useEffect, useCallback } from "react";
import {
  callReadOnlyFunction,
  cvToValue,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

const network = new StacksMainnet();

export interface StacksSession {
  isSignedIn: boolean;
  userSession: any;
  userData: any;
  address: string | null;
}

export interface AssetBalance {
  symbol: string;
  name: string;
  balance: string;
  usdValue: number;
  contract?: string;
}

export function useStacksSession(): StacksSession {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = () => {
      try {
        const storedSession = localStorage.getItem("stacks-session");
        if (storedSession) {
          const session = JSON.parse(storedSession);
          setUserSession(session);
          setUserData(session.userData);
          setAddress(session.userData?.profile?.stxAddress?.mainnet || null);
          setIsSignedIn(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
    window.addEventListener("storage", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
    };
  }, []);

  return { isSignedIn, userSession, userData, address };
}

export function useStxBalance(address: string | null) {
  const [balance, setBalance] = useState<string>("0");
  const [usdValue, setUsdValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setBalance("0");
      setUsdValue(0);
      return;
    }

    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.hiro.so/extended/v1/address/${address}/stx`
        );
        const data = await response.json();
        const balanceValue = data.balance || "0";
        setBalance(balanceValue);

        const priceResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd"
        );
        const priceData = await priceResponse.json();
        const stxPrice = priceData.blockstack?.usd || 0;
        const stxBalance = parseInt(balanceValue) / 1_000_000;
        setUsdValue(stxBalance * stxPrice);
      } catch (error) {
        console.error("Error fetching STX balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address]);

  return { balance, usdValue, isLoading };
}

export function useTokenBalance(
  address: string | null,
  tokenContract: string
) {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address || !tokenContract) {
      setBalance("0");
      return;
    }

    setIsLoading(true);
    try {
      const [contractAddress, contractName] = tokenContract.split(".");
      const result = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: "get-balance",
        functionArgs: [address],
        senderAddress: address,
        network,
      });
      const value = cvToValue(result);
      setBalance(value.value || "0");
    } catch (error) {
      console.error("Error fetching token balance:", error);
    } finally {
      setIsLoading(false);
    }
  }, [address, tokenContract]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, isLoading, refetch: fetchBalance };
}

export function usePortfolioValue(address: string | null) {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [assets, setAssets] = useState<AssetBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { balance: stxBalance, usdValue: stxUsdValue } = useStxBalance(address);

  useEffect(() => {
    if (!address) {
      setTotalValue(0);
      setAssets([]);
      return;
    }

    const calculatePortfolio = async () => {
      setIsLoading(true);
      try {
        const assetList: AssetBalance[] = [];

        const stxAmount = parseInt(stxBalance) / 1_000_000;
        assetList.push({
          symbol: "STX",
          name: "Stacks",
          balance: stxBalance,
          usdValue: stxUsdValue,
        });

        let total = stxUsdValue;

        setAssets(assetList);
        setTotalValue(total);
      } catch (error) {
        console.error("Error calculating portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    calculatePortfolio();
  }, [address, stxBalance, stxUsdValue]);

  return { totalValue, assets, isLoading };
}

export function useAuthWatcher() {
  const { isSignedIn, address, userData } = useStacksSession();
  const [sessionAge, setSessionAge] = useState<number>(0);

  useEffect(() => {
    if (!isSignedIn) {
      setSessionAge(0);
      return;
    }

    const interval = setInterval(() => {
      setSessionAge((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSignedIn]);

  return {
    isSignedIn,
    address,
    userData,
    sessionAge,
    isAuthenticated: isSignedIn && !!address,
  };
}