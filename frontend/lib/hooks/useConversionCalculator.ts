"use client";

import { useState, useCallback, useEffect } from "react";

type AssetType = "btc" | "stx" | "usd" | "sbtc";

interface ConversionRates {
  btc: { usd: number; stx: number };
  stx: { usd: number; btc: number };
  sbtc: { usd: number; stx: number; btc: number };
  usd: { btc: number; stx: number; sbtc: number };
}

const defaultRates: ConversionRates = {
  btc: { usd: 45000, stx: 1500000 },
  stx: { usd: 0.03, btc: 0.00000066 },
  sbtc: { usd: 45000, stx: 1500000, btc: 1 },
  usd: { btc: 0.000022, stx: 33.33, sbtc: 0.000022 },
};

export function useConversionCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [fromAsset, setFromAsset] = useState<AssetType>("btc");
  const [toAsset, setToAsset] = useState<AssetType>("usd");
  const [rates, setRates] = useState<ConversionRates>(defaultRates);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,blockstack&vs_currencies=usd"
        );
        const data = await response.json();

        if (data.bitcoin?.usd && data.blockstack?.usd) {
          const btcPrice = data.bitcoin.usd;
          const stxPrice = data.blockstack.usd;

          setRates({
            btc: { usd: btcPrice, stx: btcPrice / stxPrice },
            stx: { usd: stxPrice, btc: stxPrice / btcPrice },
            sbtc: { usd: btcPrice, stx: btcPrice / stxPrice, btc: 1 },
            usd: { btc: 1 / btcPrice, stx: 1 / stxPrice, sbtc: 1 / btcPrice },
          });
        }
      } catch (error) {
        console.error("Failed to fetch rates, using defaults:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const calculateConversion = useCallback(
    (value: string, from: AssetType, to: AssetType): string => {
      if (!value || isNaN(Number(value))) return "0";

      const numValue = parseFloat(value);

      if (from === to) return value;

      let rate: number;

      if (from === "usd") {
        rate = rates.usd[to] || 1;
      } else if (to === "usd") {
        rate = rates[from].usd;
      } else {
        const toUsd = rates[from].usd;
        const fromUsdToTarget = rates.usd[to];
        rate = toUsd * fromUsdToTarget;
      }

      const result = numValue * rate;

      if (result < 0.000001 && result > 0) {
        return result.toExponential(4);
      }

      if (to === "btc" || to === "sbtc") {
        return result.toFixed(8);
      }

      return result.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    },
    [rates]
  );

  const convertedAmount = calculateConversion(amount, fromAsset, toAsset);

  const swapAssets = useCallback(() => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setAmount(convertedAmount.replace(/,/g, ""));
  }, [fromAsset, toAsset, convertedAmount]);

  const reset = useCallback(() => {
    setAmount("");
    setFromAsset("btc");
    setToAsset("usd");
  }, []);

  const getRate = useCallback(
    (from: AssetType, to: AssetType): string => {
      if (from === to) return "1";

      const rate = calculateConversion("1", from, to);
      return rate;
    },
    [calculateConversion]
  );

  return {
    amount,
    setAmount,
    fromAsset,
    setFromAsset,
    toAsset,
    setToAsset,
    convertedAmount,
    rates,
    isLoading,
    swapAssets,
    reset,
    getRate,
    calculateConversion,
  };
}

export function formatAssetAmount(amount: string, asset: AssetType): string {
  const num = parseFloat(amount.replace(/,/g, ""));

  if (isNaN(num)) return "0";

  switch (asset) {
    case "btc":
    case "sbtc":
      return `${num.toFixed(8)} ${asset.toUpperCase()}`;
    case "stx":
      return `${num.toLocaleString()} STX`;
    case "usd":
      return `$${num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    default:
      return amount;
  }
}

export function getAssetLabel(asset: AssetType): string {
  const labels: Record<AssetType, string> = {
    btc: "Bitcoin (BTC)",
    stx: "Stacks (STX)",
    usd: "US Dollar (USD)",
    sbtc: "sBTC (Wrapped Bitcoin)",
  };
  return labels[asset];
}

export function getAssetIcon(asset: AssetType): string {
  const icons: Record<AssetType, string> = {
    btc: "₿",
    stx: "⧫",
    usd: "$",
    sbtc: "₿",
  };
  return icons[asset];
}