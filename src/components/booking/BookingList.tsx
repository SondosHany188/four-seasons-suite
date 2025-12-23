import { BookingData } from "./BookingForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CalendarDays, CheckCircle2, AlertCircle, Car } from "lucide-react";
import { useState } from "react";
import { BookingDetails } from "./BookingDetails";
import { DriverChat } from "./DriverChat";
import { StatCard } from "./BookingDashboard";
import { Card } from "@/components/ui/card";

interface BookingListProps {
  bookings: BookingData[];
}

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  dispatched: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-muted text-muted-foreground border-border",
} as const;

export function BookingList({ bookings }: BookingListProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    inProgress: bookings.filter((b) => ["dispatched", "in-progress"].includes(b.status)).length,
    finished: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-up">
        <StatCard
          title="Total Bookings"
          value={stats.total}
          icon={CalendarDays}
          delay={0}
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          icon={CheckCircle2}
          variant="success"
          delay={50}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={AlertCircle}
          variant="warning"
          delay={100}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Car}
          delay={150}
        />
        <StatCard
          title="Finished"
          value={stats.finished}
          icon={CheckCircle2}
          variant="success"
          delay={200}
        />
      </div>

      <Card className="border-border/50 overflow-hidden animate-fade-up bg-card" style={{ animationDelay: "200ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border/30">
              <tr>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Reference</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Guest</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Date & Time</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Trip</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Vehicle</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground">Status</th>
                <th className="px-6 py-4 label-luxury text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground font-serif">
                    No rides found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gold/5 transition-colors cursor-pointer group"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-4">
                      <span className="font-serif font-bold text-gold">{booking.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-serif text-foreground">{booking.guestName}</span>
                        <span className="label-luxury text-[10px] text-muted-foreground">{booking.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-serif">{booking.date}</span>
                        <span className="label-luxury text-[10px] text-muted-foreground">{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-[200px]">
                        <span className="truncate font-serif text-xs" title={booking.pickupLocation}>
                          {booking.pickupLocation}
                        </span>
                        <span className="label-luxury text-[10px] text-muted-foreground truncate" title={booking.dropoffLocation}>
                          → {booking.dropoffLocation || "Hourly/Multi-stop"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-serif capitalize">{booking.vehicleClass}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${statusColors[booking.status]} border text-[10px]`}>
                        {booking.status === "in-progress"
                          ? "In Progress"
                          : booking.status === "completed"
                            ? "Finished"
                            : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <DriverChat bookingId={booking.id} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gold/10 hover:text-gold"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <BookingDetails
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </Card>
    </div>
  );
}
