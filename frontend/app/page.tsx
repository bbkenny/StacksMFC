"use client";

import { WalletPanel } from "./components/wallet-panel";
import { useStacks } from "@/lib/hooks/use-stacks";
import Link from "next/link";
import { 
  BarChart3, 
  Calculator, 
  Radar, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Zap,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { isConnected, isReady } = useStacks();

  const features = [
    {
      title: "Balance Viewer",
      desc: "Real-time BTC, STX, and sBTC tracking with live USD valuations and metadata.",
      href: "/balances",
      icon: BarChart3,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      id: "balance-card"
    },
    {
      title: "DeFi Radar",
      desc: "Live monitoring of lending APYs, swap rates, and sBTC bridge status on Stacks.",
      href: "/radar",
      icon: Radar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      id: "radar-card"
    },
    {
      title: "Asset Converter",
      desc: "Precise financial calculator for instant conversions across the ecosystem.",
      href: "/convert",
      icon: Calculator,
      color: "text-green-500",
      bg: "bg-green-500/10",
      id: "convert-card"
    }
  ];

  if (!isReady) return null;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0B0B0C] text-[#EDEDED] relative overflow-hidden flex flex-col">
      {/* Terminal Grid Effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />
      
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 md:py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <header className="flex flex-col gap-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 w-fit bg-primary/5 backdrop-blur-xl"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Bitcoin Finance Radar
              </span>
            </motion.div>
            
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]"
              >
                Simple. Fast. <br />
                <span className="text-primary italic">Hackable.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-medium"
              >
                The minimal finance console for the Bitcoin ecosystem. Monitor your Stacks portfolio and DeFi yields with zero complexity.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <Zap className="w-3 h-3" /> Built on Stacks
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <Shield className="w-3 h-3" /> Non-Custodial
                </div>
              </motion.div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#121212] border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                <WalletPanel />
              </motion.div>
            ) : (
              <motion.div 
                key="status"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid gap-4"
              >
                <div className="bg-primary/10 border border-primary/20 p-8 rounded-[32px] backdrop-blur-xl">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                    Terminal Active
                  </h2>
                  <p className="text-sm text-slate-400 font-medium mb-6">
                    Console synchronized with Stacks network. Ready to monitor your assets.
                  </p>
                  <Link 
                    href="/balances"
                    className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all"
                  >
                    Enter Console <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Link 
                href={feat.href}
                className="group p-8 rounded-[32px] bg-[#121212] border border-white/5 hover:border-primary/50 transition-all block relative overflow-hidden"
              >
                <div className={`${feat.bg} ${feat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                  {feat.title} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {feat.desc}
                </p>
                
                {/* Subtle terminal lines */}
                <div className="absolute top-0 right-0 h-full w-[1px] bg-white/5 group-hover:bg-primary/20 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
        <div>&copy; 2026 STACKS MINI FINANCE CONSOLE</div>
        <div className="flex gap-8">
          <Link href="https://github.com/bbkenny/StacksMFC" className="hover:text-primary transition-colors">GITHUB</Link>
          <Link href="#" className="hover:text-primary transition-colors">DOCUMENTATION</Link>
        </div>
      </footer>
    </main>
  );
}
