import { motion } from "framer-motion";
import { BedDouble, Wifi, Wind, Tv, Coffee, Bath } from "lucide-react";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  status: "available" | "occupied" | "maintenance" | "reserved";
  price: string;
  amenities: string[];
}

const mockRooms: Room[] = [
  { id: "1", number: "Suite 801", type: "Deluxe Suite", floor: 8, status: "occupied", price: "$600", amenities: ["wifi", "ac", "tv", "minibar", "bath"] },
  { id: "2", number: "Suite 1201", type: "Presidential Suite", floor: 12, status: "occupied", price: "$1,500", amenities: ["wifi", "ac", "tv", "minibar", "bath"] },
  { id: "3", number: "Room 405", type: "Executive Room", floor: 4, status: "reserved", price: "$350", amenities: ["wifi", "ac", "tv", "minibar"] },
  { id: "4", number: "Suite 905", type: "Nile View Suite", floor: 9, status: "available", price: "$750", amenities: ["wifi", "ac", "tv", "minibar", "bath"] },
  { id: "5", number: "Room 302", type: "Deluxe Room", floor: 3, status: "maintenance", price: "$300", amenities: ["wifi", "ac", "tv"] },
  { id: "6", number: "Suite 1105", type: "Executive Suite", floor: 11, status: "available", price: "$550", amenities: ["wifi", "ac", "tv", "minibar", "bath"] },
  { id: "7", number: "Room 207", type: "Standard Room", floor: 2, status: "available", price: "$200", amenities: ["wifi", "ac", "tv"] },
  { id: "8", number: "Suite 1401", type: "Royal Suite", floor: 14, status: "reserved", price: "$2,500", amenities: ["wifi", "ac", "tv", "minibar", "bath"] },
];

const statusColors = {
  available: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
  occupied: "bg-gold/20 text-gold border-gold/30",
  maintenance: "bg-red-500/20 text-red-500 border-red-500/30",
  reserved: "bg-blue-500/20 text-blue-500 border-blue-500/30",
};

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" strokeWidth={1} />,
  ac: <Wind className="w-4 h-4" strokeWidth={1} />,
  tv: <Tv className="w-4 h-4" strokeWidth={1} />,
  minibar: <Coffee className="w-4 h-4" strokeWidth={1} />,
  bath: <Bath className="w-4 h-4" strokeWidth={1} />,
};

const RoomsPage = () => {
  const roomStats = {
    available: mockRooms.filter(r => r.status === "available").length,
    occupied: mockRooms.filter(r => r.status === "occupied").length,
    maintenance: mockRooms.filter(r => r.status === "maintenance").length,
    reserved: mockRooms.filter(r => r.status === "reserved").length,
  };

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">Property Overview</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Room Status
        </h1>
      </motion.header>

      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-4 mb-12"
      >
        {[
          { label: "Available", value: roomStats.available, color: "text-emerald-600" },
          { label: "Occupied", value: roomStats.occupied, color: "text-gold" },
          { label: "Reserved", value: roomStats.reserved, color: "text-blue-500" },
          { label: "Maintenance", value: roomStats.maintenance, color: "text-red-500" },
        ].map((stat, index) => (
          <div key={stat.label} className="p-6 relative">
            {index > 0 && <div className="absolute left-0 top-4 bottom-4 w-px bg-border/30" />}
            <p className="label-luxury text-muted-foreground text-[10px] mb-2">{stat.label}</p>
            <p className={cn("font-serif text-4xl", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="hairline mb-8" />

      {/* Room Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {mockRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            className={cn(
              "p-6 rounded-sm border transition-all duration-200 cursor-pointer group",
              "hover:shadow-lg",
              room.status === "available" && "border-emerald-500/20 hover:border-emerald-500/50",
              room.status === "occupied" && "border-gold/20 hover:border-gold/50",
              room.status === "reserved" && "border-blue-500/20 hover:border-blue-500/50",
              room.status === "maintenance" && "border-red-500/20 hover:border-red-500/50 opacity-60"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl text-foreground">{room.number}</h3>
                <p className="text-sm text-muted-foreground font-sans">{room.type}</p>
              </div>
              <BedDouble className="w-6 h-6 text-muted-foreground/50 group-hover:text-gold transition-colors" strokeWidth={1} />
            </div>

            {/* Status Badge */}
            <span className={cn(
              "inline-flex label-luxury text-[10px] px-3 py-1 rounded-sm border",
              statusColors[room.status]
            )}>
              {room.status}
            </span>

            {/* Details */}
            <div className="mt-6 pt-4 border-t border-border/20">
              <div className="flex items-center justify-between mb-4">
                <span className="label-luxury text-muted-foreground text-[10px]">Floor {room.floor}</span>
                <span className="font-serif text-lg text-foreground">{room.price}<span className="text-sm text-muted-foreground">/night</span></span>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-3 text-muted-foreground">
                {room.amenities.map((amenity) => (
                  <span key={amenity} title={amenity} className="hover:text-gold transition-colors">
                    {amenityIcons[amenity]}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RoomsPage;
