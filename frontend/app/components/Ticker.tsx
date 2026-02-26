"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Ticker() {
  const [prices, setPrices] = useState({ btc: "95,432.10", stx: "1.85", sbtc: "95,430.00" });

  // In a real implementation we would fetch these from an API
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight price movements
      setPrices((prev) => ({
        btc: (parseFloat(prev.btc.replace(",", "")) * (1 + (Math.random() - 0.5) * 0.001)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        stx: (parseFloat(prev.stx) * (1 + (Math.random() - 0.5) * 0.005)).toFixed(2),
        sbtc: (parseFloat(prev.sbtc.replace(",", "")) * (1 + (Math.random() - 0.5) * 0.001)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0B0B0C] border-b border-white/5 overflow-hidden py-2 z-50 flex items-center">
      <div className="flex whitespace-nowrap overflow-hidden w-full relative">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex space-x-12 font-mono text-[11px] font-medium tracking-wider"
        >
          {/* Double the content for seamless loop */}
          {[1, 2].map((group) => (
            <div key={group} className="flex space-x-12 items-center">
              <span className="text-slate-400">
                BTC/USD <span className="text-amber-400">${prices.btc}</span>
              </span>
              <span className="text-slate-400">
                STX/USD <span className="text-primary">${prices.stx}</span>
              </span>
              <span className="text-slate-400">
                sBTC/USD <span className="text-amber-400">${prices.sbtc}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">
                BTC/USD <span className="text-amber-400">${prices.btc}</span>
              </span>
              <span className="text-slate-400">
                STX/USD <span className="text-primary">${prices.stx}</span>
              </span>
              <span className="text-slate-400">
                sBTC/USD <span className="text-amber-400">${prices.sbtc}</span>
              </span>
              <span className="text-slate-500">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
