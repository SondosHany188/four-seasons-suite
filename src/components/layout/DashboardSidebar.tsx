import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import nileSunset from "@/assets/nile-sunset.jpg";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, adminOnly: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "staff";

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative h-screen bg-card border-r border-border/50 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Nile Watermark */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none">
        <img
          src={nileSunset}
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
          style={{ filter: "blur(1px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative p-6 border-b border-border/30">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-serif text-white text-lg">ES</span>
              </div>
              <div>
                <h2 className="font-serif text-lg text-foreground">Executive Suite</h2>
                <p className="label-luxury text-muted-foreground text-[10px]">
                  Hotel Management
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-serif text-white text-lg">ES</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-1/2 -translate-y-1/2 z-10",
            "w-6 h-6 rounded-full bg-card border border-border shadow-sm",
            "flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:border-gold/50",
            "transition-all duration-200"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 py-6 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200",
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive && "text-gold"
                    )}
                    strokeWidth={1.5}
                  />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="label-luxury text-xs whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-gold animate-glow"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - User Role */}
      <div className="relative p-4 border-t border-border/30">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          {/* Role Indicator with Gold Glow for Admin */}
          <div
            className={cn(
              "w-9 h-9 rounded-sm flex items-center justify-center",
              userRole === "admin"
                ? "bg-gold/20 gold-glow"
                : "bg-muted"
            )}
          >
            {userRole === "admin" ? (
              <span className="font-serif text-gold text-sm">A</span>
            ) : (
              <span className="font-serif text-muted-foreground text-sm">S</span>
            )}
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <p className="font-serif text-sm text-foreground">
                  {userRole === "admin" ? "Super Admin" : "Receptionist"}
                </p>
                <p className="label-luxury text-[10px] text-muted-foreground">
                  {userRole === "admin" ? "Full Access" : "Limited Access"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Logout */}
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-3 mt-4 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors",
            collapsed && "justify-center px-0"
          )}
          onClick={() => localStorage.removeItem("userRole")}
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          {!collapsed && (
            <span className="label-luxury text-xs">Sign Out</span>
          )}
        </NavLink>
      </div>
    </motion.aside>
  );
}
