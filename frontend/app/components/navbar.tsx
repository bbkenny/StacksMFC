"use client";

import Link from "next/link";
import { useStacks } from "@/lib/hooks/use-stacks";

export function Navbar() {
  const { isConnected, connect, disconnect } = useStacks();

  return (
    <nav className="h-16 border-b border-white/10 bg-[#0B0E14] flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold italic tracking-tighter">
        Stacks<span className="text-primary italic">MFC</span>
      </Link>

        <div className="hidden md:flex items-center gap-8">
      <Link href="/marketplace" className="text-sm text-slate-300 hover:text-primary transition-colors">
        Marketplace
      </Link>
      <Link href="/create" className="text-sm text-slate-300 hover:text-primary transition-colors">
        Create
      </Link>
      <Link href="/profile" className="text-sm text-slate-300 hover:text-primary transition-colors">
        Profile
      </Link>
    </div>
  </div>
      
      <div className="flex items-center gap-4">
        {isConnected ? (
          <button 
            onClick={disconnect}
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            Disconnect
          </button>
        ) : (
          <button 
            onClick={connect}
            className="text-xs font-black uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded-full hover:bg-primary/10 transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
