import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookingData } from "./BookingForm";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, User, Phone, Car, Users, Baby, Plane, Navigation, CreditCard, Banknote, LucideIcon } from "lucide-react";

interface BookingDetailsProps {
  booking: BookingData | null;
  isOpen: boolean;
  onClose: () => void;
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

export function BookingDetails({ booking, isOpen, onClose }: BookingDetailsProps) {
  if (!booking) return null;

  const getPaymentInfo = () => {
    switch (booking.paymentMethod) {
      case "online":
        return { icon: CreditCard, label: "Online (Visa)" };
      case "hotel-billing":
        return { icon: Navigation, label: "Hotel Billing" };
      default:
        return { icon: Banknote, label: "Cash" };
    }
  };

  const paymentInfo = getPaymentInfo();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-border/50 bg-card">
        <DialogHeader className="border-b border-border/30 pb-4">
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="font-serif text-2xl text-foreground">{booking.id}</DialogTitle>
            <Badge className={`${statusColors[booking.status]} border`}>
              {statusLabels[booking.status]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem
                icon={User}
                label="Guest Name"
                value={booking.guestName}
                subValue={booking.guestCategory.toUpperCase()}
              />
              <DetailItem icon={Phone} label="Phone" value={booking.phone} />
              {booking.roomNumber && (
                <DetailItem icon={MapPin} label="Room Number" value={booking.roomNumber} />
              )}
            </div>
            <div className="space-y-4">
              <DetailItem icon={Calendar} label="Date" value={booking.date} />
              <DetailItem icon={Clock} label="Time" value={booking.time} />
              <DetailItem icon={Users} label="Passengers" value={`${booking.passengers} pax`} />
            </div>
          </div>

          <div className="border-t border-border/30 pt-4">
            <h3 className="label-luxury text-muted-foreground mb-4">Trip Details</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="w-0.5 h-10 bg-border" />
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="label-luxury text-muted-foreground text-[10px]">Pickup</p>
                    <p className="font-serif text-foreground">{booking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="label-luxury text-muted-foreground text-[10px]">Drop-off</p>
                    <p className="font-serif text-foreground">{booking.dropoffLocation || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {booking.stops && booking.stops.length > 0 && (
                <div className="ml-7 py-2 border-l-2 border-dashed border-border pl-4 space-y-2">
                  <p className="label-luxury text-muted-foreground text-[10px]">Intermediate Stops</p>
                  {booking.stops.map((stop, i) => (
                    <p key={i} className="text-sm font-serif">{stop}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-border/30 pt-4">
            <div className="space-y-4">
              <DetailItem icon={Car} label="Vehicle Type" value={booking.vehicleClass.toUpperCase()} />
              {booking.serviceType && (
                <DetailItem icon={Plane} label="Service" value={booking.serviceType.toUpperCase()} />
              )}
            </div>
            <div className="space-y-4">
              <DetailItem
                icon={paymentInfo.icon}
                label="Payment Method"
                value={paymentInfo.label}
              />
              {booking.childSeat && (
                <DetailItem icon={Baby} label="Extras" value="Child Seat Included" />
              )}
            </div>
          </div>

          {booking.notes && (
            <div className="border-t border-border/30 pt-4">
              <p className="label-luxury text-muted-foreground mb-2">Special Notes</p>
              <div className="bg-muted/50 p-4 rounded-sm text-sm font-serif italic text-muted-foreground">
                {booking.notes}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ 
  icon: Icon, 
  label, 
  value, 
  subValue 
}: { 
  icon: LucideIcon; 
  label: string; 
  value: string; 
  subValue?: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-sm bg-muted flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
      </div>
      <div>
        <p className="label-luxury text-muted-foreground text-[10px]">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-serif text-foreground">{value}</p>
          {subValue && (
            <Badge variant="outline" className="text-[10px] h-4 py-0 border-gold/30 text-gold">
              {subValue}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
