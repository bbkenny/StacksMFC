"use client";

import { useStacks } from "@/lib/hooks/use-stacks";
import { 
  Radar, 
  ArrowUpRight, 
  ExternalLink,
  Info,
  LineChart,
  Activity,
  Globe,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RadarPage() {
  const { isConnected, isReady } = useStacks();

  if (!isReady) return null;

  const protocols = [
    {
      name: "Zest Protocol",
      type: "Lending",
      asset: "BTC / sBTC",
      apy: "6.8%",
      status: "Active",
      url: "https://www.zestprotocol.com/",
      id: "zest"
    },
    {
      name: "ALEX",
      type: "DEX / Lending",
      asset: "STX / BTC",
      apy: "8.2%",
      status: "Active",
      url: "https://alexlab.co/",
      id: "alex"
    },
    {
      name: "Velar",
      type: "DEX",
      asset: "STX Pairs",
      apy: "12.5%",
      status: "Active",
      url: "https://www.velar.co/",
      id: "velar"
    },
    {
      name: "Hermetica",
      type: "Vaults",
      asset: "BTC Yield",
      apy: "9.1%",
      status: "Active",
      url: "https://hermetica.fi/",
      id: "hermetica"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B0B0C] text-[#EDEDED] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
            <Activity className="w-3 h-3" /> System Surveillance
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            DeFi <span className="text-blue-400">Radar</span>
          </h1>
          <p className="text-slate-400 max-w-xl font-medium text-sm leading-relaxed">
            Real-time monitoring of the Stacks Bitcoin DeFi ecosystem. Track yields, bridge health, and protocol status.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#121212] border border-white/5 rounded-[32px] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Yield Opportunities</h3>
                <div className="flex gap-4">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Systems Nominal
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-white/5">
                {protocols.map((protocol) => (
                  <div key={protocol.id} className="p-8 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{protocol.name}</h4>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{protocol.type} • {protocol.asset}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-right">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Target APY</span>
                        <span className="text-2xl font-black text-emerald-400 italic">{protocol.apy}</span>
                      </div>
                      <Link 
                        href={protocol.url} 
                        target="_blank"
                        className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#121212] border border-white/5 p-8 rounded-[32px] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <LineChart className="w-24 h-24" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">sBTC Bridge Status</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">Network State</span>
                  <span className="text-[10px] font-black px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full uppercase tracking-tighter border border-emerald-400/20">Active</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Deposit Cap</span>
                    <span>42.5 / 100 BTC</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[42.5%] rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                    <Lock className="w-3 h-3 text-blue-400" /> Security Threshold
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">The sBTC bridge utilizes a decentralized threshold signature scheme. Current signer health: 100%.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-400/5 border border-blue-400/10 p-8 rounded-[32px] space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 border-b border-blue-400/10 pb-4">Surveillance Intel</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-blue-400 mt-1"><Info className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-tight">Ecosystem Growth</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">TVL across Stacks DeFi has increased by 14% this week. sBTC adoption is driving liquidity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-emerald-400 mt-1"><Activity className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-tight">Fastest Bridge</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Current average BTC to sBTC mint time: ~22 minutes (2 Stacks blocks).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
