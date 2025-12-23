import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick: () => void;
  delay?: number;
}

export function RoleCard({ title, subtitle, icon: Icon, onClick, delay = 0 }: RoleCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={cn(
        "group relative w-full max-w-sm",
        "glass-dark rounded-sm p-10",
        "border border-white/10 hover:border-gold/60",
        "transition-all duration-500 ease-out",
        "cursor-pointer text-left",
        "hover:shadow-[0_8px_40px_rgba(197,160,89,0.15)]"
      )}
    >
      {/* Subtle gold glow on hover */}
      <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-8">
          <Icon className="w-8 h-8 text-white/70 group-hover:text-gold transition-colors duration-300" strokeWidth={1} />
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="font-sans text-sm text-white/50 font-light tracking-wide">
          {subtitle}
        </p>
        
        {/* Bottom accent line */}
        <div className="mt-8 h-[0.5px] bg-white/20 group-hover:bg-gold/50 transition-colors duration-500" />
      </div>
    </motion.button>
  );
}
