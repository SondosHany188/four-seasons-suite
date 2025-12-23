import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Car } from "lucide-react";

interface Message {
  id: string;
  sender: "staff" | "driver";
  content: string;
  timestamp: Date;
}

interface DriverChatProps {
  bookingId: string;
  driverName?: string;
}

export function DriverChat({ bookingId, driverName = "Assigned Driver" }: DriverChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "driver",
      content: "I'm on my way to the pickup location.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      sender: "staff",
      content: "Great! The guest is waiting at the main lobby.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "staff",
      content: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 hover:bg-gold/10 hover:text-gold transition-colors text-gold"
          title="Chat with driver"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="label-luxury text-[10px] hidden sm:inline">Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border/50 bg-card">
        <DialogHeader className="border-b border-border/30 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center">
              <Car className="h-4 w-4 text-gold" />
            </div>
            <span className="font-serif text-foreground">{driverName}</span>
            <span className="label-luxury text-[10px] text-muted-foreground">• {bookingId}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "staff" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "driver" ? "bg-gold/10" : "bg-muted"
                    }`}
                  >
                    {msg.sender === "driver" ? (
                      <Car className="h-4 w-4 text-gold" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-sm px-4 py-2 ${
                      msg.sender === "staff"
                        ? "bg-gold text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm font-serif">{msg.content}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        msg.sender === "staff" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-4 border-t border-border/30">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border-border/50 focus:border-gold"
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              disabled={!newMessage.trim()}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
