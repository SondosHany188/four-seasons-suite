import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Guest {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "checked-in" | "pending" | "checked-out";
}

const mockGuests: Guest[] = [
  { id: "1", name: "Alexander Montgomery", room: "Suite 801", checkIn: "Dec 20", checkOut: "Dec 25", status: "checked-in" },
  { id: "2", name: "Victoria Sterling", room: "Suite 1201", checkIn: "Dec 21", checkOut: "Dec 28", status: "checked-in" },
  { id: "3", name: "James Rothwell", room: "Room 405", checkIn: "Dec 23", checkOut: "Dec 26", status: "pending" },
  { id: "4", name: "Sophia Beaumont", room: "Suite 905", checkIn: "Dec 23", checkOut: "Dec 30", status: "pending" },
  { id: "5", name: "Edward Kensington", room: "Room 302", checkIn: "Dec 18", checkOut: "Dec 22", status: "checked-out" },
];

export function GuestTable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <div className="hairline mb-6" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="label-luxury text-foreground">Recent Guests</h3>
        <button className="ghost-luxury px-4 py-2 rounded-sm text-xs label-luxury hover:text-gold">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 pb-4 border-b border-border/30">
        <span className="label-luxury text-muted-foreground text-[10px]">Guest Name</span>
        <span className="label-luxury text-muted-foreground text-[10px]">Room</span>
        <span className="label-luxury text-muted-foreground text-[10px]">Check-in</span>
        <span className="label-luxury text-muted-foreground text-[10px]">Check-out</span>
        <span className="label-luxury text-muted-foreground text-[10px]">Status</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-border/20">
        {mockGuests.map((guest, index) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className="grid grid-cols-5 gap-4 py-5 hover:bg-accent/30 transition-colors cursor-pointer"
          >
            <span className="font-serif text-sm text-foreground">{guest.name}</span>
            <span className="font-serif text-sm text-muted-foreground">{guest.room}</span>
            <span className="font-serif text-sm text-muted-foreground">{guest.checkIn}</span>
            <span className="font-serif text-sm text-muted-foreground">{guest.checkOut}</span>
            <span
              className={cn(
                "label-luxury text-[10px] flex items-center gap-2",
                guest.status === "checked-in" && "text-gold",
                guest.status === "pending" && "text-muted-foreground",
                guest.status === "checked-out" && "text-muted-foreground/50"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  guest.status === "checked-in" && "bg-gold animate-glow",
                  guest.status === "pending" && "bg-amber-400",
                  guest.status === "checked-out" && "bg-muted-foreground/30"
                )}
              />
              {guest.status.replace("-", " ")}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
