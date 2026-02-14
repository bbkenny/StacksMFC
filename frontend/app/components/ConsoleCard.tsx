"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ConsoleCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: React.ReactNode;
  neonColor?: "orange" | "blue" | "green" | "purple";
}

const neonStyles = {
  orange: "shadow-orange-500/20 hover:shadow-orange-500/30",
  blue: "shadow-blue-500/20 hover:shadow-blue-500/30",
  green: "shadow-green-500/20 hover:shadow-green-500/30",
  purple: "shadow-purple-500/20 hover:shadow-purple-500/30",
};

export function ConsoleCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className = "",
  children,
  neonColor = "orange",
}: ConsoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#121212]/80 backdrop-blur-xl p-6 transition-all duration-300 shadow-lg ${neonStyles[neonColor]} ${className}`}
    >
      {/* Glassmorphism gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Neon glow border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {title}
            </p>
            <h3 className="text-3xl font-black text-white tracking-tight">
              {value}
            </h3>
            {subtitle && (
              <p className="text-sm text-slate-400 font-medium">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {trend && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
              trend.isPositive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Subtle scan line effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_200%] animate-scan pointer-events-none" />
    </motion.div>
  );
}

interface ConsoleGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ConsoleGrid({ children, className = "" }: ConsoleGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}