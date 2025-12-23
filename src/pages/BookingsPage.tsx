import { useState } from "react";
import { BookingForm, BookingData } from "@/components/booking/BookingForm";
import { BookingDashboard } from "@/components/booking/BookingDashboard";
import { BookingList } from "@/components/booking/BookingList";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, ListOrdered } from "lucide-react";

const initialBookings: BookingData[] = [
  {
    id: "BKG-ABC123",
    guestName: "Michael Chen",
    phone: "+20 (100) 234-5678",
    roomNumber: "1201",
    bookingType: "airport",
    vehicleClass: "luxury-sedan",
    guestCategory: "vvip",
    pickupLocation: "Four Seasons Cairo - Main Lobby",
    dropoffLocation: "Cairo International - Terminal 3",
    flightNumber: "MS804",
    date: "2025-12-23",
    time: "14:30",
    passengers: 2,
    childSeat: false,
    serviceType: "vip",
    status: "confirmed",
    createdAt: new Date(),
  },
  {
    id: "BKG-DEF456",
    guestName: "Sarah Williams",
    phone: "+20 (100) 345-6789",
    roomNumber: "805",
    bookingType: "hourly",
    vehicleClass: "luxury-suv",
    guestCategory: "vip",
    pickupLocation: "Four Seasons Cairo - Valet Entrance",
    duration: "4",
    date: "2025-12-23",
    time: "09:00",
    passengers: 4,
    childSeat: true,
    serviceType: "premium",
    status: "dispatched",
    createdAt: new Date(),
  },
  {
    id: "BKG-GHI789",
    guestName: "James Thompson",
    phone: "+20 (100) 456-7890",
    roomNumber: "302",
    bookingType: "city",
    vehicleClass: "sedan",
    guestCategory: "regular",
    pickupLocation: "Four Seasons Cairo - Side Exit",
    dropoffLocation: "Giza Pyramids",
    date: "2025-12-24",
    time: "08:00",
    passengers: 1,
    childSeat: false,
    notes: "Guest prefers quiet driver",
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: "BKG-JKL012",
    guestName: "Corporate Group",
    phone: "+20 (100) 567-8901",
    bookingType: "multi-stop",
    vehicleClass: "coaster",
    guestCategory: "vip",
    pickupLocation: "Four Seasons Cairo - Conference Center",
    stops: ["Egyptian Museum", "Khan el-Khalili", "Citadel of Saladin"],
    date: "2025-12-26",
    time: "07:00",
    passengers: 15,
    childSeat: false,
    serviceType: "corporate",
    status: "confirmed",
    createdAt: new Date(),
  },
];

const BookingsPage = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "new-booking" | "all-trips">("dashboard");
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings);

  const handleBookingComplete = (booking: BookingData) => {
    setBookings((prev) => [booking, ...prev]);
    setTimeout(() => setActiveView("dashboard"), 500);
  };

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between border-b border-border/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Transportation</h1>
          <p className="label-luxury text-muted-foreground mt-1">Limousine & Chauffeur Services</p>
        </div>
        <nav className="flex items-center gap-2">
          <Button
            variant={activeView === "dashboard" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("dashboard")}
            className={`gap-2 ${activeView === "dashboard" ? "bg-gold hover:bg-gold-dark text-white" : "ghost-luxury"}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="label-luxury text-xs">Dashboard</span>
          </Button>
          <Button
            variant={activeView === "new-booking" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("new-booking")}
            className={`gap-2 ${activeView === "new-booking" ? "bg-gold hover:bg-gold-dark text-white" : "ghost-luxury"}`}
          >
            <Plus className="h-4 w-4" />
            <span className="label-luxury text-xs">New Booking</span>
          </Button>
          <Button
            variant={activeView === "all-trips" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("all-trips")}
            className={`gap-2 ${activeView === "all-trips" ? "bg-gold hover:bg-gold-dark text-white" : "ghost-luxury"}`}
          >
            <ListOrdered className="h-4 w-4" />
            <span className="label-luxury text-xs">All Rides</span>
          </Button>
        </nav>
      </div>

      {/* Content */}
      {activeView === "new-booking" ? (
        <div className="flex justify-center">
          <BookingForm onBookingComplete={handleBookingComplete} />
        </div>
      ) : activeView === "all-trips" ? (
        <BookingList bookings={bookings} />
      ) : (
        <BookingDashboard bookings={bookings} />
      )}
    </div>
  );
};

export default BookingsPage;
