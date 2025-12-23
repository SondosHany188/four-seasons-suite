import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plane, Clock, MapPin, User, Car, Crown, Check, Route, Navigation, Plus, Minus, Trash2, CreditCard, Banknote, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BookingType = "airport" | "hourly" | "city" | "point-to-point" | "multi-stop";
type VehicleClass = "sedan" | "suv" | "van" | "luxury-van" | "luxury-sedan" | "luxury-suv" | "coaster" | "coach";
type GuestCategory = "vvip" | "vip" | "regular";

interface BookingFormProps {
  onBookingComplete?: (booking: BookingData) => void;
}

export interface BookingData {
  id: string;
  guestName: string;
  phone: string;
  roomNumber?: string;
  bookingType: BookingType;
  vehicleClass: VehicleClass;
  guestCategory: GuestCategory;
  pickupLocation: string;
  dropoffLocation?: string;
  stops?: string[];
  flightNumber?: string;
  duration?: string;
  date: string;
  time: string;
  passengers: number;
  childSeat: boolean;
  serviceType?: string;
  notes?: string;
  paymentMethod?: "cash" | "online" | "hotel-billing";
  status: "pending" | "confirmed" | "dispatched" | "in-progress" | "completed";
  createdAt: Date;
}

const bookingTypes = [
  { value: "airport", label: "Airport Transfer", icon: Plane },
  { value: "hourly", label: "Hourly Chauffeur", icon: Clock },
  { value: "city", label: "City-to-City", icon: MapPin },
  { value: "point-to-point", label: "Point-to-Point", icon: Route },
  { value: "multi-stop", label: "Multi-Stop", icon: Navigation },
];

const vehicleClasses = [
  { value: "sedan", label: "Sedan", description: "Standard comfort" },
  { value: "suv", label: "SUV", description: "Extra space" },
  { value: "van", label: "Van", description: "Group travel" },
  { value: "luxury-sedan", label: "Luxury Sedan", description: "Premium sedan" },
  { value: "luxury-suv", label: "Luxury SUV", description: "Premium SUV" },
  { value: "luxury-van", label: "Luxury Van", description: "Premium group" },
  { value: "coaster", label: "Coaster", description: "Small bus" },
  { value: "coach", label: "Coach", description: "Large bus" },
];

const guestCategories = [
  { value: "vvip", label: "VVIP" },
  { value: "vip", label: "VIP" },
  { value: "regular", label: "Regular" },
];

const serviceTypes = [
  { value: "standard", label: "Standard Service" },
  { value: "premium", label: "Premium Service" },
  { value: "vip", label: "VIP Service" },
  { value: "corporate", label: "Corporate Package" },
  { value: "wedding", label: "Wedding Package" },
  { value: "tour", label: "Tour Package" },
];

export function BookingForm({ onBookingComplete }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>("airport");
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>("sedan");
  const [guestCategory, setGuestCategory] = useState<GuestCategory>("regular");
  const [stops, setStops] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    roomNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    flightNumber: "",
    duration: "",
    date: "",
    time: "",
    passengers: "1",
    childSeat: false,
    serviceType: "",
    notes: "",
    paymentMethod: "cash" as "cash" | "online" | "hotel-billing",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const booking: BookingData = {
      id: `BKG-${Date.now().toString(36).toUpperCase()}`,
      guestName: formData.guestName,
      phone: formData.phone,
      roomNumber: formData.roomNumber || undefined,
      bookingType,
      vehicleClass,
      guestCategory,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation || undefined,
      stops: bookingType === "multi-stop" ? stops.filter(s => s.trim()) : undefined,
      flightNumber: formData.flightNumber || undefined,
      duration: formData.duration || undefined,
      date: formData.date,
      time: formData.time,
      passengers: parseInt(formData.passengers) || 1,
      childSeat: formData.childSeat,
      serviceType: formData.serviceType || undefined,
      notes: formData.notes || undefined,
      paymentMethod: formData.paymentMethod,
      status: "confirmed",
      createdAt: new Date(),
    };

    toast({
      title: "Booking Confirmed",
      description: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-gold" />
          <span>Reference: <strong className="font-serif">{booking.id}</strong></span>
        </div>
      ),
    });

    onBookingComplete?.(booking);
    setIsSubmitting(false);

    setFormData({
      guestName: "",
      phone: "",
      roomNumber: "",
      pickupLocation: "",
      dropoffLocation: "",
      flightNumber: "",
      duration: "",
      date: "",
      time: "",
      passengers: "1",
      childSeat: false,
      serviceType: "",
      notes: "",
      paymentMethod: "cash",
    });
    setStops([""]);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addStop = () => setStops((prev) => [...prev, ""]);
  const removeStop = (index: number) => setStops((prev) => prev.filter((_, i) => i !== index));
  const updateStop = (index: number, value: string) => setStops((prev) => prev.map((s, i) => (i === index ? value : s)));

  const getCategoryBadgeClass = (category: GuestCategory) => {
    switch (category) {
      case "vvip": return "bg-gold text-white";
      case "vip": return "bg-gold/20 text-gold border border-gold/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="w-full max-w-4xl border-border/50 shadow-sm animate-fade-up">
      <CardHeader className="pb-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-2xl text-foreground">New Booking</CardTitle>
            <CardDescription className="label-luxury text-muted-foreground mt-1">
              Create a reservation in under 30 seconds
            </CardDescription>
          </div>
          <Badge className={getCategoryBadgeClass(guestCategory)}>
            {guestCategory.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Booking Type */}
          <div className="space-y-3">
            <Label className="label-luxury text-muted-foreground">Booking Type</Label>
            <div className="grid grid-cols-5 gap-3">
              {bookingTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = bookingType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setBookingType(type.value as BookingType)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-sm border transition-all duration-300 ${
                      isSelected
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-border/50 bg-card hover:border-gold/30"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? "text-gold" : "text-muted-foreground"}`} strokeWidth={1.5} />
                    <span className={`text-[10px] label-luxury text-center ${isSelected ? "text-gold" : "text-foreground"}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guest Info */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guestName" className="flex items-center gap-2 label-luxury text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                Guest Name *
              </Label>
              <Input
                id="guestName"
                placeholder="Enter guest name"
                value={formData.guestName}
                onChange={(e) => updateFormData("guestName", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="label-luxury text-muted-foreground">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+20 (xxx) xxx-xxxx"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber" className="label-luxury text-muted-foreground">Room Number</Label>
              <Input
                id="roomNumber"
                placeholder="e.g., 501"
                value={formData.roomNumber}
                onChange={(e) => updateFormData("roomNumber", e.target.value)}
                className="border-border/50 focus:border-gold"
              />
            </div>
          </div>

          {/* Vehicle & Guest Category */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 label-luxury text-muted-foreground">
                <Car className="h-3.5 w-3.5" />
                Vehicle Class
              </Label>
              <Select value={vehicleClass} onValueChange={(v) => setVehicleClass(v as VehicleClass)}>
                <SelectTrigger className="border-border/50 focus:border-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vehicleClasses.map((vc) => (
                    <SelectItem key={vc.value} value={vc.value}>
                      <div className="flex items-center gap-2">
                        <span className="font-serif">{vc.label}</span>
                        <span className="text-muted-foreground text-xs">• {vc.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 label-luxury text-muted-foreground">
                <Crown className="h-3.5 w-3.5" />
                Guest Category
              </Label>
              <Select value={guestCategory} onValueChange={(v) => setGuestCategory(v as GuestCategory)}>
                <SelectTrigger className="border-border/50 focus:border-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {guestCategories.map((gc) => (
                    <SelectItem key={gc.value} value={gc.value}>
                      <Badge className={getCategoryBadgeClass(gc.value as GuestCategory)}>
                        {gc.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Passengers, Child Seat, Service Type */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="label-luxury text-muted-foreground">Passengers</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-border/50 hover:border-gold hover:text-gold"
                  onClick={() => {
                    const current = parseInt(formData.passengers) || 1;
                    if (current > 1) updateFormData("passengers", (current - 1).toString());
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-serif text-lg">{formData.passengers}</div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-border/50 hover:border-gold hover:text-gold"
                  onClick={() => {
                    const current = parseInt(formData.passengers) || 1;
                    updateFormData("passengers", (current + 1).toString());
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="label-luxury text-muted-foreground">Child Seat</Label>
              <div className="flex items-center h-10 gap-3">
                <Switch
                  checked={formData.childSeat}
                  onCheckedChange={(checked) => updateFormData("childSeat", checked)}
                />
                <span className="text-sm font-serif text-muted-foreground">
                  {formData.childSeat ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="label-luxury text-muted-foreground">Service Type</Label>
              <Select value={formData.serviceType} onValueChange={(v) => updateFormData("serviceType", v)}>
                <SelectTrigger className="border-border/50 focus:border-gold">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((st) => (
                    <SelectItem key={st.value} value={st.value}>
                      {st.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="label-luxury text-muted-foreground">Pickup Location *</Label>
              <Input
                id="pickup"
                placeholder="Hotel lobby, room number..."
                value={formData.pickupLocation}
                onChange={(e) => updateFormData("pickupLocation", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
            {bookingType !== "hourly" && bookingType !== "multi-stop" && (
              <div className="space-y-2">
                <Label htmlFor="dropoff" className="label-luxury text-muted-foreground">
                  {bookingType === "airport" ? "Airport/Terminal" : "Destination"} *
                </Label>
                <Input
                  id="dropoff"
                  placeholder={bookingType === "airport" ? "Cairo International - Terminal 3" : "City destination"}
                  value={formData.dropoffLocation}
                  onChange={(e) => updateFormData("dropoffLocation", e.target.value)}
                  className="border-border/50 focus:border-gold"
                  required
                />
              </div>
            )}
            {bookingType === "hourly" && (
              <div className="space-y-2">
                <Label className="label-luxury text-muted-foreground">Duration (hours) *</Label>
                <Select value={formData.duration} onValueChange={(v) => updateFormData("duration", v)}>
                  <SelectTrigger className="border-border/50 focus:border-gold">
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 4, 6, 8, 10, 12].map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h} hours
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Multi-stop locations */}
          {bookingType === "multi-stop" && (
            <div className="space-y-3">
              <Label className="label-luxury text-muted-foreground">Stops</Label>
              {stops.map((stop, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Stop ${index + 1}`}
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                    className="border-border/50 focus:border-gold"
                  />
                  {stops.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStop(index)} className="shrink-0 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addStop} className="gap-2 ghost-luxury">
                <Plus className="h-4 w-4" />
                Add Stop
              </Button>
            </div>
          )}

          {/* Airport-specific: Flight Number */}
          {bookingType === "airport" && (
            <div className="space-y-2">
              <Label htmlFor="flight" className="label-luxury text-muted-foreground">Flight Number *</Label>
              <Input
                id="flight"
                placeholder="e.g., MS804"
                value={formData.flightNumber}
                onChange={(e) => updateFormData("flightNumber", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="label-luxury text-muted-foreground">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateFormData("date", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="label-luxury text-muted-foreground">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => updateFormData("time", e.target.value)}
                className="border-border/50 focus:border-gold"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="label-luxury text-muted-foreground">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Special requests, additional information..."
              value={formData.notes}
              onChange={(e) => updateFormData("notes", e.target.value)}
              rows={3}
              className="border-border/50 focus:border-gold resize-none"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="label-luxury text-muted-foreground">Payment Method</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "cash", label: "Cash", icon: Banknote },
                { value: "online", label: "Online (Visa)", icon: CreditCard },
                { value: "hotel-billing", label: "Hotel Billing", icon: Building2 },
              ].map(({ value, label, icon: Icon }) => (
                <div
                  key={value}
                  className={`flex items-center gap-3 p-4 rounded-sm border cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === value
                      ? "border-gold bg-gold/5 shadow-sm"
                      : "border-border/50 hover:border-gold/30"
                  }`}
                  onClick={() => updateFormData("paymentMethod", value)}
                >
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                    formData.paymentMethod === value ? "bg-gold text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-serif">{label}</span>
                  {formData.paymentMethod === value && <Check className="h-4 w-4 text-gold ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-border/30">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gold hover:bg-gold-dark text-white font-serif tracking-wide"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
