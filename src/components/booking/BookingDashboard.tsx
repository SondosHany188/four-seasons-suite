import { Card, CardContent } from "@/components/ui/card";
import { BookingCard } from "./BookingCard";
import { BookingData } from "./BookingForm";
import { CalendarDays, Clock, CheckCircle2, AlertCircle, Car, LucideIcon } from "lucide-react";

interface BookingDashboardProps {
  bookings: BookingData[];
}

export function BookingDashboard({ bookings }: BookingDashboardProps) {
  const today = new Date().toISOString().split('T')[0];

  const stats = {
    today: bookings.filter((b) => b.date === today).length,
    pending: bookings.filter((b) => b.status === "pending").length,
    active: bookings.filter((b) => ["confirmed", "dispatched", "in-progress"].includes(b.status)).length,
    complimentary: 5,
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Bookings"
          value={stats.today}
          icon={CalendarDays}
          delay={0}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={AlertCircle}
          variant="warning"
          delay={50}
        />
        <StatCard
          title="Active Trips"
          value={stats.active}
          icon={Car}
          variant="success"
          delay={100}
        />
        <StatCard
          title="Complimentary Left"
          value={stats.complimentary}
          icon={CheckCircle2}
          delay={150}
        />
      </div>

      {/* Bookings List */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <h2 className="font-serif text-xl text-foreground">Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <Card className="border-border/50 p-12 text-center">
            <p className="text-muted-foreground font-serif">No bookings yet. Create your first booking to get started.</p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking, index) => (
              <BookingCard key={booking.id} booking={booking} animationDelay={index * 100} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning";
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, variant = "default", delay = 0 }: StatCardProps) {
  const variantStyles = {
    default: "text-foreground",
    success: "text-emerald-600",
    warning: "text-amber-600",
  };

  const iconBgStyles = {
    default: "bg-muted",
    success: "bg-emerald-50",
    warning: "bg-amber-50",
  };

  return (
    <Card
      className="border-border/50 animate-fade-up bg-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="label-luxury text-muted-foreground">{title}</p>
            <p className={`font-serif text-4xl mt-2 ${variantStyles[variant]}`}>{value}</p>
          </div>
          <div className={`p-3 rounded-sm ${iconBgStyles[variant]}`}>
            <Icon className={`h-5 w-5 ${variantStyles[variant]}`} strokeWidth={1.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
