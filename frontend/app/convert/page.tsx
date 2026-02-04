"use client";

import { useStacks } from "@/lib/hooks/use-stacks";
import { 
  Calculator, 
  ArrowLeftRight, 
  TrendingUp,
  AlertCircle,
  Copy,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ConvertPage() {
  const { isReady } = useStacks();
  const [fromAmount, setFromAmount] = useState<string>("1");
  const [toAmount, setToAmount] = useState<string>("1.85");
  const [fromAsset, setFromAsset] = useState<string>("STX");
  const [toAsset, setToAsset] = useState<string>("USD");

  const prices: Record<string, number> = {
    STX: 1.85,
    BTC: 96000,
    sBTC: 96000,
    USD: 1
  };

  const handleConvert = (val: string, direction: "from" | "to") => {
    if (direction === "from") {
      setFromAmount(val);
      const numeric = parseFloat(val);
      if (!isNaN(numeric)) {
        const result = (numeric * prices[fromAsset]) / prices[toAsset];
        setToAmount(result.toLocaleString(undefined, { maximumFractionDigits: 6 }));
      } else {
        setToAmount("0");
      }
    } else {
      setToAmount(val);
      const numeric = parseFloat(val);
      if (!isNaN(numeric)) {
        const result = (numeric * prices[toAsset]) / prices[fromAsset];
        setFromAmount(result.toLocaleString(undefined, { maximumFractionDigits: 6 }));
      } else {
        setFromAmount("0");
      }
    }
  };

  useEffect(() => {
    handleConvert(fromAmount, "from");
  }, [fromAsset, toAsset]);

  if (!isReady) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B0B0C] text-[#EDEDED] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
            <Calculator className="w-3 h-3" /> Computation Engine
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Asset <span className="text-green-400">Converter</span>
          </h1>
          <p className="text-slate-400 max-w-xl font-medium text-sm leading-relaxed">
            High-precision financial calculator for Bitcoin and Stacks ecosystem assets.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#121212] border border-white/5 p-10 rounded-[40px] shadow-2xl space-y-10 relative overflow-hidden"
          >
            {/* From Asset */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Input Asset</label>
              <div className="flex items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/5 focus-within:border-green-400/50 transition-colors">
                <input 
                  type="number" 
                  value={fromAmount}
                  onChange={(e) => handleConvert(e.target.value, "from")}
                  className="bg-transparent border-none outline-none flex-1 text-3xl font-black px-6 py-4 text-white placeholder:text-slate-700"
                  placeholder="0.00"
                />
                <div className="relative group">
                  <select 
                    value={fromAsset}
                    onChange={(e) => setFromAsset(e.target.value)}
                    className="appearance-none bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 outline-none pr-12 cursor-pointer group-hover:border-green-400/50 transition-all"
                  >
                    <option value="STX">STX</option>
                    <option value="BTC">BTC</option>
                    <option value="sBTC">sBTC</option>
                    <option value="USD">USD</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Switch Divider */}
            <div className="flex items-center justify-center -my-4 relative z-10">
              <button 
                onClick={() => {
                  const tempAsset = fromAsset;
                  setFromAsset(toAsset);
                  setToAsset(tempAsset);
                }}
                className="w-14 h-14 bg-green-400 text-black rounded-full flex items-center justify-center hover:scale-110 active:rotate-180 transition-all shadow-[0_0_30px_rgba(74,222,128,0.3)]"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            {/* To Asset */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Resulting Asset</label>
              <div className="flex items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/5 focus-within:border-green-400/50 transition-colors">
                <input 
                  type="text" 
                  value={toAmount}
                  readOnly
                  className="bg-transparent border-none outline-none flex-1 text-3xl font-black px-6 py-4 text-white cursor-default"
                  placeholder="0.00"
                />
                <div className="relative group">
                  <select 
                    value={toAsset}
                    onChange={(e) => setToAsset(e.target.value)}
                    className="appearance-none bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 outline-none pr-12 cursor-pointer group-hover:border-green-400/50 transition-all"
                  >
                    <option value="USD">USD</option>
                    <option value="STX">STX</option>
                    <option value="BTC">BTC</option>
                    <option value="sBTC">sBTC</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-slate-500">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Rate: 1 {fromAsset} = { (prices[fromAsset] / prices[toAsset]).toLocaleString(undefined, { maximumFractionDigits: 6 }) } {toAsset}
                </span>
              </div>
              
              <button 
                onClick={() => navigator.clipboard.writeText(toAmount)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-green-400 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy Result
              </button>
            </div>
          </motion.div>

          <div className="mt-8 flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="text-amber-400 mt-1"><AlertCircle className="w-5 h-5" /></div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Pricing Notice</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">These conversion rates are for informational purposes only. Actual market rates may vary based on liquidity and exchange spreads.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
