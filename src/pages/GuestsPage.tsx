import { motion } from "framer-motion";
import { Search, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  nationality: string;
  checkIn: string;
  checkOut: string;
  status: "checked-in" | "pending" | "checked-out";
  vip: boolean;
}

const mockGuests: Guest[] = [
  { id: "1", name: "Alexander Montgomery", email: "a.montgomery@email.com", phone: "+1 555 123 4567", room: "Suite 801", nationality: "United States", checkIn: "Dec 20, 2024", checkOut: "Dec 25, 2024", status: "checked-in", vip: true },
  { id: "2", name: "Victoria Sterling", email: "v.sterling@email.com", phone: "+44 20 7123 4567", room: "Suite 1201", nationality: "United Kingdom", checkIn: "Dec 21, 2024", checkOut: "Dec 28, 2024", status: "checked-in", vip: true },
  { id: "3", name: "James Rothwell", email: "j.rothwell@email.com", phone: "+1 555 987 6543", room: "Room 405", nationality: "Canada", checkIn: "Dec 23, 2024", checkOut: "Dec 26, 2024", status: "pending", vip: false },
  { id: "4", name: "Sophia Beaumont", email: "s.beaumont@email.com", phone: "+33 1 23 45 67 89", room: "Suite 905", nationality: "France", checkIn: "Dec 23, 2024", checkOut: "Dec 30, 2024", status: "pending", vip: true },
  { id: "5", name: "Edward Kensington", email: "e.kensington@email.com", phone: "+49 30 12345678", room: "Room 302", nationality: "Germany", checkIn: "Dec 18, 2024", checkOut: "Dec 22, 2024", status: "checked-out", vip: false },
  { id: "6", name: "Olivia Chen", email: "o.chen@email.com", phone: "+86 21 1234 5678", room: "Suite 1105", nationality: "China", checkIn: "Dec 22, 2024", checkOut: "Dec 29, 2024", status: "checked-in", vip: false },
];

const GuestsPage = () => {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">Guest Management</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Guests
        </h1>
      </motion.header>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8"
      >
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search guests..."
              className="w-64 pl-11 pr-4 py-3 bg-transparent border border-border/50 rounded-sm font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          
          {/* Filter */}
          <button className="ghost-luxury px-4 py-3 rounded-sm flex items-center gap-2 label-luxury text-xs">
            <Filter className="w-4 h-4" strokeWidth={1.5} />
            Filter
          </button>
        </div>

        <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-sm transition-all duration-200 label-luxury text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Add Guest
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="hairline mb-6" />

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 pb-4 border-b border-border/30">
          <span className="label-luxury text-muted-foreground text-[10px]">Guest Name</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Room</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Nationality</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Check-in</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Check-out</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Status</span>
          <span className="label-luxury text-muted-foreground text-[10px]">Actions</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border/20">
          {mockGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="grid grid-cols-7 gap-4 py-5 hover:bg-accent/30 transition-colors cursor-pointer items-center"
            >
              <div className="flex items-center gap-3">
                {guest.vip && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow" title="VIP Guest" />
                )}
                <span className="font-serif text-sm text-foreground">{guest.name}</span>
              </div>
              <span className="font-serif text-sm text-muted-foreground">{guest.room}</span>
              <span className="font-serif text-sm text-muted-foreground">{guest.nationality}</span>
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
                    guest.status === "checked-in" && "bg-gold",
                    guest.status === "pending" && "bg-amber-400",
                    guest.status === "checked-out" && "bg-muted-foreground/30"
                  )}
                />
                {guest.status.replace("-", " ")}
              </span>
              <div className="flex items-center gap-2">
                <button className="ghost-luxury px-3 py-1.5 rounded-sm label-luxury text-[10px] hover:border-gold hover:text-gold">
                  View
                </button>
                <button className="ghost-luxury px-3 py-1.5 rounded-sm label-luxury text-[10px] hover:border-gold hover:text-gold">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center justify-between mt-8 pt-8"
      >
        <div className="hairline absolute left-0 right-0" />
        <p className="text-sm text-muted-foreground font-sans">
          Showing <span className="text-foreground">1-6</span> of <span className="text-foreground">248</span> guests
        </p>
        <div className="flex items-center gap-2">
          <button className="ghost-luxury px-4 py-2 rounded-sm label-luxury text-[10px]">
            Previous
          </button>
          <button className="bg-gold/10 border border-gold/30 px-4 py-2 rounded-sm label-luxury text-[10px] text-gold">
            1
          </button>
          <button className="ghost-luxury px-4 py-2 rounded-sm label-luxury text-[10px]">
            2
          </button>
          <button className="ghost-luxury px-4 py-2 rounded-sm label-luxury text-[10px]">
            3
          </button>
          <button className="ghost-luxury px-4 py-2 rounded-sm label-luxury text-[10px]">
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestsPage;
