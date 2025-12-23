import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, BedDouble, DollarSign, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 61000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 85000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 91000 },
  { month: "Dec", revenue: 128000 },
];

const occupancyData = [
  { day: "Mon", rate: 78 },
  { day: "Tue", rate: 82 },
  { day: "Wed", rate: 85 },
  { day: "Thu", rate: 88 },
  { day: "Fri", rate: 95 },
  { day: "Sat", rate: 98 },
  { day: "Sun", rate: 92 },
];

const AnalyticsPage = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">Access Restricted</h2>
          <p className="text-muted-foreground font-sans">Analytics are only available to Super Admins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">Performance Insights</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Analytics
        </h1>
      </motion.header>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-4 mb-12"
      >
        {[
          { label: "Total Revenue", value: "$821K", change: "+23%", trend: "up", icon: DollarSign },
          { label: "Occupancy Rate", value: "87%", change: "+5%", trend: "up", icon: BedDouble },
          { label: "Total Guests", value: "2,847", change: "+12%", trend: "up", icon: Users },
          { label: "Avg Rating", value: "4.9", change: "+0.2", trend: "up", icon: Star },
        ].map((stat, index) => (
          <div key={stat.label} className="p-8 relative">
            {index > 0 && <div className="absolute left-0 top-6 bottom-6 w-px bg-border/30" />}
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-muted-foreground/50" strokeWidth={1} />
              <div className={cn(
                "flex items-center gap-1 text-xs font-sans",
                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
              )}>
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="label-luxury text-muted-foreground text-[10px] mb-2">{stat.label}</p>
            <p className="font-serif text-4xl text-foreground">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="hairline mb-6" />
          <h3 className="label-luxury text-foreground mb-8">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 88%)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10, fontFamily: 'Montserrat' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10, fontFamily: 'Montserrat' }}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#C5A059" 
                  strokeWidth={2}
                  fill="url(#goldGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="hairline mb-6" />
          <h3 className="label-luxury text-foreground mb-8">Weekly Occupancy</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 88%)" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10, fontFamily: 'Montserrat' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10, fontFamily: 'Montserrat' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Bar 
                  dataKey="rate" 
                  fill="#C5A059" 
                  radius={[2, 2, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Performing Rooms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <div className="hairline mb-6" />
        <h3 className="label-luxury text-foreground mb-8">Top Performing Suites</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: "Presidential Suite", bookings: 24, revenue: "$36,000", rate: "98%" },
            { name: "Royal Suite", bookings: 18, revenue: "$45,000", rate: "95%" },
            { name: "Nile View Suite", bookings: 32, revenue: "$24,000", rate: "92%" },
          ].map((room, index) => (
            <div
              key={room.name}
              className="p-6 border border-border/30 rounded-sm hover:border-gold/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-serif text-gold text-sm">
                  {index + 1}
                </span>
                <h4 className="font-serif text-lg text-foreground">{room.name}</h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="label-luxury text-muted-foreground text-[10px] mb-1">Bookings</p>
                  <p className="font-serif text-xl text-foreground">{room.bookings}</p>
                </div>
                <div>
                  <p className="label-luxury text-muted-foreground text-[10px] mb-1">Revenue</p>
                  <p className="font-serif text-xl text-foreground">{room.revenue}</p>
                </div>
                <div>
                  <p className="label-luxury text-muted-foreground text-[10px] mb-1">Occ. Rate</p>
                  <p className="font-serif text-xl text-gold">{room.rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
