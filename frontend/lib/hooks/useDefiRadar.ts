"use client";

import { useState, useEffect, useCallback } from "react";

interface LendingProtocol {
  name: string;
  apy: number;
  tvl: number;
  chain: "stacks" | "bitcoin";
  status: "active" | "paused" | "maintenance";
}

interface BridgeStatus {
  name: string;
  status: "active" | "maintenance" | "offline";
  mintingLimit: number;
  currentMinted: number;
  lastUpdated: string;
}

interface SwapRate {
  pair: string;
  rate: number;
  volume24h: number;
  priceChange24h: number;
}

interface WalletTransaction {
  txId: string;
  type: "sent" | "received" | "swap" | "stake";
  amount: string;
  asset: string;
  timestamp: number;
  status: "confirmed" | "pending" | "failed";
}

const mockLendingProtocols: LendingProtocol[] = [
  { name: "Zest", apy: 5.2, tvl: 1200000, chain: "stacks", status: "active" },
  { name: "Alex", apy: 4.8, tvl: 2500000, chain: "stacks", status: "active" },
  { name: "Arkadiko", apy: 6.1, tvl: 800000, chain: "stacks", status: "active" },
];

const mockBridgeStatus: BridgeStatus = {
  name: "sBTC Bridge",
  status: "active",
  mintingLimit: 100,
  currentMinted: 45,
  lastUpdated: new Date().toISOString(),
};

const mockSwapRates: SwapRate[] = [
  { pair: "STX/BTC", rate: 0.00000066, volume24h: 15000, priceChange24h: 2.5 },
  { pair: "STX/USDA", rate: 0.03, volume24h: 25000, priceChange24h: -1.2 },
  { pair: "sBTC/BTC", rate: 1.0, volume24h: 5000, priceChange24h: 0.01 },
];

export function useDefiRadar(address?: string) {
  const [lendingProtocols, setLendingProtocols] = useState<LendingProtocol[]>([]);
  const [bridgeStatus, setBridgeStatus] = useState<BridgeStatus | null>(null);
  const [swapRates, setSwapRates] = useState<SwapRate[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLendingProtocols(mockLendingProtocols);
      setBridgeStatus(mockBridgeStatus);
      setSwapRates(mockSwapRates);

      if (address) {
        const mockTxs: WalletTransaction[] = [
          {
            txId: "0x1234...abcd",
            type: "received",
            amount: "100",
            asset: "STX",
            timestamp: Date.now() - 3600000,
            status: "confirmed",
          },
          {
            txId: "0x5678...efgh",
            type: "swap",
            amount: "50",
            asset: "STX",
            timestamp: Date.now() - 7200000,
            status: "confirmed",
          },
          {
            txId: "0x9abc...ijkl",
            type: "sent",
            amount: "25",
            asset: "STX",
            timestamp: Date.now() - 86400000,
            status: "confirmed",
          },
        ];
        setTransactions(mockTxs);
      }

      setBridgeStatus((prev) => ({
        ...mockBridgeStatus,
        lastUpdated: new Date().toISOString(),
      }));
    } catch (err) {
      setError("Failed to fetch DeFi data");
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getBestApy = useCallback((): LendingProtocol | null => {
    return lendingProtocols.reduce(
      (best, protocol) =>
        protocol.apy > (best?.apy || 0) && protocol.status === "active"
          ? protocol
          : best,
      null as LendingProtocol | null
    );
  }, [lendingProtocols]);

  const getBridgeCapacity = useCallback((): number => {
    if (!bridgeStatus) return 0;
    return (
      ((bridgeStatus.mintingLimit - bridgeStatus.currentMinted) /
        bridgeStatus.mintingLimit) *
      100
    );
  }, [bridgeStatus]);

  const getTopSwapPair = useCallback((): SwapRate | null => {
    return swapRates.reduce(
      (top, pair) => (pair.volume24h > (top?.volume24h || 0) ? pair : top),
      null as SwapRate | null
    );
  }, [swapRates]);

  return {
    lendingProtocols,
    bridgeStatus,
    swapRates,
    transactions,
    isLoading,
    error,
    refetch: fetchData,
    getBestApy,
    getBridgeCapacity,
    getTopSwapPair,
  };
}

export function formatApy(apy: number): string {
  return `${apy.toFixed(2)}% APY`;
}

export function formatTvl(tvl: number): string {
  if (tvl >= 1000000) {
    return `$${(tvl / 1000000).toFixed(2)}M`;
  }
  return `$${(tvl / 1000).toFixed(2)}K`;
}

export function getStatusColor(
  status: "active" | "paused" | "maintenance" | "offline"
): string {
  const colors = {
    active: "text-green-400",
    paused: "text-yellow-400",
    maintenance: "text-orange-400",
    offline: "text-red-400",
  };
  return colors[status];
}

export function getStatusBgColor(
  status: "active" | "paused" | "maintenance" | "offline"
): string {
  const colors = {
    active: "bg-green-500/10",
    paused: "bg-yellow-500/10",
    maintenance: "bg-orange-500/10",
    offline: "bg-red-500/10",
  };
  return colors[status];
}