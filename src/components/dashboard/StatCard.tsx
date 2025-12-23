import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ label, value, change, trend, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-8"
    >
      {/* Hairline border */}
      <div className="absolute top-0 left-0 right-0 hairline" />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="label-luxury text-muted-foreground mb-3">{label}</p>
          <p className="font-serif text-4xl text-foreground tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-2 text-xs font-sans",
                trend === "up" && "text-emerald-600",
                trend === "down" && "text-red-500",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <Icon className="w-6 h-6 text-muted-foreground/50" strokeWidth={1} />
      </div>
    </motion.div>
  );
}
