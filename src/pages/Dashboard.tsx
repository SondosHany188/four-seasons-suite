import { motion } from "framer-motion";
import { Users, BedDouble, CalendarCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { GuestTable } from "@/components/dashboard/GuestTable";
import { ReservationCard } from "@/components/dashboard/ReservationCard";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">{currentDate}</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Good Evening
        </h1>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Guests"
          value="127"
          change="+12% from last week"
          trend="up"
          icon={Users}
          delay={0.1}
        />
        <StatCard
          label="Rooms Occupied"
          value="84%"
          change="+5% from yesterday"
          trend="up"
          icon={BedDouble}
          delay={0.15}
        />
        <StatCard
          label="Today's Check-ins"
          value="18"
          change="4 pending arrival"
          trend="neutral"
          icon={CalendarCheck}
          delay={0.2}
        />
        <StatCard
          label="Revenue"
          value="$42.8K"
          change="+23% this month"
          trend="up"
          icon={TrendingUp}
          delay={0.25}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mt-8">
        {/* Guest Table - Wider */}
        <div className="lg:col-span-3">
          <GuestTable />
        </div>

        {/* Reservations - Sidebar */}
        <div className="lg:col-span-2">
          <ReservationCard />
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 pt-8"
      >
        <div className="hairline mb-8" />
        <div className="flex flex-wrap gap-4">
          <button className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-sm transition-all duration-200 label-luxury text-xs">
            New Check-in
          </button>
          <button className="ghost-luxury px-8 py-3 rounded-sm label-luxury text-xs hover:border-gold hover:text-gold">
            Add Reservation
          </button>
          <button className="ghost-luxury px-8 py-3 rounded-sm label-luxury text-xs hover:border-gold hover:text-gold">
            Room Status
          </button>
          <button className="ghost-luxury px-8 py-3 rounded-sm label-luxury text-xs hover:border-gold hover:text-gold">
            Generate Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
