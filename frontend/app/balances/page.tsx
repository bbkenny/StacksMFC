"use client";

import { useStacks } from "@/lib/hooks/use-stacks";
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw,
  Wallet,
  Coins,
  Bitcoin
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BalancesPage() {
  const { address, isConnected, isReady, network } = useStacks();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stxBalance, setStxBalance] = useState("0");

  useEffect(() => {
    if (isConnected && address) {
      fetchBalance();
    }
  }, [isConnected, address, network]);

  const fetchBalance = async () => {
    setIsRefreshing(true);
    try {
      // Use Hiro API for STX balance
      const apiUrl = network === "mainnet" 
        ? "https://api.hiro.so" 
        : "https://api.testnet.hiro.so";
      
      const response = await fetch(`${apiUrl}/extended/v1/address/${address}/balances`);
      const data = await response.json();
      
      const balance = data.stx.balance;
      setStxBalance((parseInt(balance) / 1_000_000).toLocaleString());
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 800);
    }
  };

  if (!isReady) return null;

  if (!isConnected) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-[#0B0B0C]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">Access Denied</h1>
          <p className="text-slate-400 max-w-xs mx-auto">Please connect your terminal to view your asset portfolio.</p>
        </div>
      </div>
    );
  }

  const assets = [
    {
      name: "Stacks",
      symbol: "STX",
      balance: stxBalance,
      value: (parseFloat(stxBalance.replace(/,/g, '')) * 1.85).toLocaleString(), // Mock price
      change: "+4.2%",
      icon: Coins,
      color: "text-primary",
      address: address
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      balance: "0.00000000",
      value: "0.00",
      change: "-0.5%",
      icon: Bitcoin,
      color: "text-[#F7931A]",
      address: "Taproot / Native SegWit"
    },
    {
      name: "sBTC",
      symbol: "sBTC",
      balance: "0.00",
      value: "0.00",
      change: "0.0%",
      icon: Wallet,
      color: "text-blue-400",
      address: "Stacks L2 Asset"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B0B0C] text-[#EDEDED] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              <BarChart3 className="w-3 h-3" /> Terminal Portfolio
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
              Asset <span className="text-primary">Inventory</span>
            </h1>
          </div>
          
          <button 
            onClick={fetchBalance}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? "Syncing..." : "Refresh Data"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121212] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`${asset.color} p-4 bg-white/5 rounded-2xl`}>
                  <asset.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Price (Mock)</span>
                  <span className="text-xs font-bold text-emerald-400">{asset.change}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Balance</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{asset.balance}</span>
                  <span className="text-lg font-bold text-slate-500 italic">{asset.symbol}</span>
                </div>
                <span className="text-sm font-medium text-slate-400">≈ ${asset.value} USD</span>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-[9px] font-mono text-slate-600 truncate max-w-[150px]">
                  {asset.address}
                </div>
                <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#121212] border border-white/5 p-8 rounded-[32px] space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">Recent Activity</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-700">
                <RefreshCw className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">No recent transactions found on {network}</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 p-8 rounded-[32px] space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b border-primary/10 pb-4">Optimization Intel</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-primary mt-1"><Zap className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Yield Opportunity</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Staking your STX could earn up to 7.2% APY in Bitcoin rewards. Visit the DeFi Radar to learn more.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-blue-400 mt-1"><Shield className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Security Status</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Your terminal is currently in Read-Only mode. All transactions require manual approval via your wallet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldAlert(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m12 8 0 4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 12 2.13 11 12h9L12 24.57 13 14H4Z" />
    </svg>
  );
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
