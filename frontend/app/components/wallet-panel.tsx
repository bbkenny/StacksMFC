"use client";

import { useStacks } from "@/lib/hooks/use-stacks";
import { Wallet2 } from "lucide-react";

export function WalletPanel() {
  const { connect } = useStacks();

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
          <Wallet2 className="w-6 h-6" />
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
          Connect <br />
          <span className="text-primary">Terminal</span>
        </h2>
        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[280px]">
          Securely authorize your session using any Stacks-compatible wallet to begin monitoring.
        </p>
      </div>
      
      <button 
        onClick={connect}
        className="group bg-primary text-black font-black uppercase tracking-[0.2em] py-5 px-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(242,169,0,0.15)] flex items-center justify-center gap-3"
      >
        Authorize Console
      </button>

      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Supported Wallets</span>
        <div className="flex gap-4 opacity-40 grayscale">
          <span className="text-[10px] font-bold">HIRO</span>
          <span className="text-[10px] font-bold">XVERSE</span>
          <span className="text-[10px] font-bold">LEATHER</span>
        </div>
      </div>
    </div>
  );
}
