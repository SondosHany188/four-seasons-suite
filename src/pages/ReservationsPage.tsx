import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  guestName: string;
  roomType: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: "confirmed" | "pending" | "cancelled";
  total: string;
}

const mockReservations: Reservation[] = [
  { id: "RSV-001", guestName: "Marcus Chen", roomType: "Deluxe Suite", room: "Suite 701", checkIn: "Dec 24, 2024", checkOut: "Dec 28, 2024", nights: 4, status: "confirmed", total: "$2,400" },
  { id: "RSV-002", guestName: "Isabella Romano", roomType: "Presidential Suite", room: "Suite 1501", checkIn: "Dec 24, 2024", checkOut: "Jan 02, 2025", nights: 9, status: "pending", total: "$13,500" },
  { id: "RSV-003", guestName: "Oliver Hayes", roomType: "Executive Room", room: "Room 412", checkIn: "Dec 25, 2024", checkOut: "Dec 27, 2024", nights: 2, status: "confirmed", total: "$800" },
  { id: "RSV-004", guestName: "Emma Fitzgerald", roomType: "Nile View Suite", room: "Suite 901", checkIn: "Dec 26, 2024", checkOut: "Dec 31, 2024", nights: 5, status: "confirmed", total: "$3,750" },
  { id: "RSV-005", guestName: "William Ashford", roomType: "Deluxe Room", room: "Room 305", checkIn: "Dec 27, 2024", checkOut: "Dec 30, 2024", nights: 3, status: "cancelled", total: "$900" },
];

const ReservationsPage = () => {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">Booking Management</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Reservations
        </h1>
      </motion.header>

      {/* Calendar Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center hover:border-gold/50 transition-colors">
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="font-serif text-xl">December 2024</span>
            </div>
            <button className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center hover:border-gold/50 transition-colors">
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-sm transition-all duration-200 label-luxury text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          New Reservation
        </button>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-4 mb-8"
      >
        {[
          { label: "Confirmed", value: "42", color: "text-gold" },
          { label: "Pending", value: "8", color: "text-amber-500" },
          { label: "Cancelled", value: "3", color: "text-muted-foreground" },
          { label: "Revenue", value: "$128K", color: "text-foreground" },
        ].map((stat, index) => (
          <div key={stat.label} className="p-6">
            {index > 0 && <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />}
            <p className="label-luxury text-muted-foreground text-[10px] mb-2">{stat.label}</p>
            <p className={cn("font-serif text-3xl", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="hairline mb-6" />

        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 pb-4 border-b border-border/30">
          <span className="label-luxury text-muted-foreground text-[10px]">Reservation ID</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Guest</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Room</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Check-in</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Check-out</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Nights</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Status</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Total</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border/20">
          {mockReservations.map((reservation, index) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className={cn(
                "grid grid-cols-8 gap-4 py-5 transition-colors cursor-pointer items-center",
                reservation.status === "cancelled" ? "opacity-50" : "hover:bg-accent/30"
              )}
            >
              <span className="font-sans text-xs text-muted-foreground">{reservation.id}</span>
              <span className="font-serif text-sm text-foreground">{reservation.guestName}</span>
              <div>
                <span className="font-serif text-sm text-foreground block">{reservation.room}</span>
                <span className="text-xs text-muted-foreground">{reservation.roomType}</span>
              </div>
              <span className="font-serif text-sm text-muted-foreground">{reservation.checkIn}</span>
              <span className="font-serif text-sm text-muted-foreground">{reservation.checkOut}</span>
              <span className="font-serif text-sm text-muted-foreground">{reservation.nights}</span>
              <span
                className={cn(
                  "label-luxury text-[10px] px-3 py-1 rounded-sm w-fit",
                  reservation.status === "confirmed" && "bg-gold/20 text-gold",
                  reservation.status === "pending" && "bg-amber-500/20 text-amber-600",
                  reservation.status === "cancelled" && "bg-muted text-muted-foreground"
                )}
              >
                {reservation.status}
              </span>
              <span className="font-serif text-sm text-foreground">{reservation.total}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReservationsPage;
