import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  guestName: string;
  roomType: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

const mockReservations: Reservation[] = [
  { id: "1", guestName: "Marcus Chen", roomType: "Deluxe Suite", date: "Dec 24", time: "14:00", status: "confirmed" },
  { id: "2", guestName: "Isabella Romano", roomType: "Presidential Suite", date: "Dec 24", time: "15:30", status: "pending" },
  { id: "3", guestName: "Oliver Hayes", roomType: "Executive Room", date: "Dec 25", time: "12:00", status: "confirmed" },
];

export function ReservationCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8"
    >
      <div className="hairline mb-6" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="label-luxury text-foreground">Upcoming Arrivals</h3>
        <button className="ghost-luxury px-4 py-2 rounded-sm text-xs label-luxury hover:text-gold">
          View Calendar
        </button>
      </div>

      <div className="space-y-4">
        {mockReservations.map((reservation, index) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className={cn(
              "p-6 rounded-sm border transition-all duration-200 cursor-pointer",
              reservation.status === "confirmed"
                ? "border-gold/30 hover:border-gold/60 bg-gold/5"
                : "border-border/30 hover:border-border/60"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-serif text-lg text-foreground mb-1">{reservation.guestName}</p>
                <p className="text-sm text-muted-foreground font-sans">{reservation.roomType}</p>
              </div>
              <span
                className={cn(
                  "label-luxury text-[10px] px-3 py-1 rounded-sm",
                  reservation.status === "confirmed" && "bg-gold/20 text-gold",
                  reservation.status === "pending" && "bg-muted text-muted-foreground"
                )}
              >
                {reservation.status}
              </span>
            </div>
            
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" strokeWidth={1} />
                <span className="font-serif text-sm">{reservation.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" strokeWidth={1} />
                <span className="font-serif text-sm">{reservation.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
