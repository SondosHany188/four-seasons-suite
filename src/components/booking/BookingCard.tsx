import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingData } from "./BookingForm";
import { DriverChat } from "./DriverChat";
import { BookingDetails } from "./BookingDetails";
import { Plane, Clock, MapPin, Car, Phone, Calendar, User, Eye, Route, Navigation, Baby, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCardProps {
  booking: BookingData;
  animationDelay?: number;
}

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  dispatched: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-muted text-muted-foreground border-border",
} as const;

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  dispatched: "Dispatched",
  "in-progress": "In Progress",
  completed: "Finished",
};

const bookingTypeIcons = {
  airport: Plane,
  hourly: Clock,
  city: MapPin,
  "point-to-point": Route,
  "multi-stop": Navigation,
};

const bookingTypeLabels = {
  airport: "Airport Transfer",
  hourly: "Hourly Chauffeur",
  city: "City-to-City",
  "point-to-point": "Point-to-Point",
  "multi-stop": "Multi-Stop",
};

const vehicleLabels: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  van: "Van",
  "luxury-sedan": "Luxury Sedan",
  "luxury-suv": "Luxury SUV",
  "luxury-van": "Luxury Van",
  coaster: "Coaster",
  coach: "Coach",
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "vvip": return "bg-gold text-white";
    case "vip": return "bg-gold/20 text-gold border border-gold/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export function BookingCard({ booking, animationDelay = 0 }: BookingCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const TypeIcon = bookingTypeIcons[booking.bookingType];

  return (
    <>
      <Card
        className="border-border/50 hover:border-gold/30 transition-all duration-300 cursor-pointer animate-fade-up bg-card"
        style={{ animationDelay: `${animationDelay}ms` }}
        onClick={() => setShowDetails(true)}
      >
        <CardHeader className="pb-3 border-b border-border/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-gold/10">
                <TypeIcon className="h-4 w-4 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <CardTitle className="text-base font-serif text-foreground">{booking.id}</CardTitle>
                <p className="text-[10px] label-luxury text-muted-foreground">
                  {bookingTypeLabels[booking.bookingType]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <Badge className={`${statusColors[booking.status]} border text-[10px]`}>
                {statusLabels[booking.status]}
              </Badge>
              <DriverChat bookingId={booking.id} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {/* Guest Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="font-serif text-foreground">{booking.guestName}</span>
              <Badge className={`${getCategoryBadgeClass(booking.guestCategory)} text-[10px]`}>
                {booking.guestCategory.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="font-serif text-xs">{booking.phone}</span>
            </div>
          </div>

          {/* Room & Passengers */}
          <div className="flex items-center gap-4 text-sm">
            {booking.roomNumber && (
              <span className="label-luxury text-muted-foreground">Room: {booking.roomNumber}</span>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" strokeWidth={1.5} />
              <span className="font-serif">{booking.passengers} pax</span>
            </div>
            {booking.childSeat && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Baby className="h-4 w-4" strokeWidth={1.5} />
                <span className="label-luxury text-[10px]">Child seat</span>
              </div>
            )}
          </div>

          {/* Vehicle */}
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="font-serif">{vehicleLabels[booking.vehicleClass] || booking.vehicleClass}</span>
            {booking.serviceType && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="label-luxury text-muted-foreground text-[10px]">{booking.serviceType}</span>
              </>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
              <span className="text-muted-foreground font-serif text-xs">{booking.pickupLocation}</span>
            </div>
            {booking.stops && booking.stops.length > 0 && (
              booking.stops.slice(0, 1).map((stop, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
                  <span className="text-muted-foreground font-serif text-xs">{stop}</span>
                </div>
              ))
            )}
            {booking.dropoffLocation && (
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                <span className="text-muted-foreground font-serif text-xs">{booking.dropoffLocation}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="text-xs text-muted-foreground bg-muted/50 rounded-sm p-2 line-clamp-1 font-serif italic">
              {booking.notes}
            </div>
          )}

          {/* Date & Time */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              <span className="font-serif">{booking.date}</span>
              <span>•</span>
              <span className="font-serif">{booking.time}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 hover:text-gold hover:bg-gold/5"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="label-luxury text-[10px]">View</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <BookingDetails
        booking={booking}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
