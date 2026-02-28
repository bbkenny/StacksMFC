"use client";

import Link from "next/link";
import { useStacks } from "@/lib/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/utils/stx";

export function Navbar() {
  const { isConnected, connect, disconnect, address, network } = useStacks();

  return (
    <nav className="h-16 border-b border-white/5 bg-[#0B0B0C]/80 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black text-xl italic">
          S
        </div>
        <span className="text-xl font-bold italic tracking-tighter text-white">
          Stacks<span className="text-primary italic">MFC</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-6">
        {isConnected && (
          <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="/balances" className="hover:text-primary transition-colors">Balances</Link>
            <Link href="/radar" className="hover:text-primary transition-colors">DeFi Radar</Link>
            <Link href="/convert" className="hover:text-primary transition-colors">Converter</Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-tighter text-primary leading-none">
                  {network}
                </span>
                <span className="text-[11px] font-medium text-slate-300">
                  {address ? abbreviateAddress(address) : ""}
                </span>
              </div>
              <button 
                onClick={disconnect}
                className="text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all text-white"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connect}
              className="text-[10px] font-black uppercase tracking-widest bg-primary text-black px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(242,169,0,0.2)]"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
