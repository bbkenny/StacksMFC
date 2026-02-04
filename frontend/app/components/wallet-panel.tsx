"use client";

import { useStacks } from "@/lib/hooks/use-stacks";

export function WalletPanel() {
  const { connect } = useStacks();

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
          Connect your wallet
        </h2>
        <p className="text-slate-400 font-medium">
          Access the console and manage your Bitcoin assets.
        </p>
      </div>
      
      <button 
        onClick={connect}
        className="bg-primary text-black font-black uppercase tracking-[0.2em] py-6 px-10 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(242,169,0,0.3)]"
      >
        Authorize via Stacks
      </button>
    </div>
  );
}
