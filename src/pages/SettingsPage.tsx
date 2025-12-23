import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your personal information and preferences",
    icon: User,
    items: [
      { label: "Full Name", value: "Executive User", type: "text" },
      { label: "Email", value: "user@executive-suite.com", type: "text" },
      { label: "Phone", value: "+1 555 123 4567", type: "text" },
    ]
  },
  {
    title: "Notifications",
    description: "Configure how you receive alerts and updates",
    icon: Bell,
    items: [
      { label: "New Reservations", value: true, type: "toggle" },
      { label: "Guest Check-ins", value: true, type: "toggle" },
      { label: "Daily Reports", value: false, type: "toggle" },
    ]
  },
  {
    title: "Security",
    description: "Manage your security settings and access",
    icon: Shield,
    items: [
      { label: "Two-Factor Authentication", value: true, type: "toggle" },
      { label: "Session Timeout", value: "30 minutes", type: "select" },
    ]
  },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="label-luxury text-muted-foreground text-[10px] mb-2">Configuration</p>
        <h1 className="font-serif text-4xl lg:text-5xl text-foreground tracking-tight">
          Settings
        </h1>
      </motion.header>

      {/* Settings Sections */}
      <div className="max-w-4xl space-y-12">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.1 }}
          >
            <div className="hairline mb-6" />
            
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-serif text-xl text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground font-sans">{section.description}</p>
              </div>
            </div>

            <div className="space-y-6 pl-14">
              {section.items.map((item, itemIndex) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-4 border-b border-border/20"
                >
                  <span className="label-luxury text-foreground text-xs">{item.label}</span>
                  
                  {item.type === "text" && (
                    <input
                      type="text"
                      defaultValue={item.value as string}
                      className="bg-transparent border border-border/30 px-4 py-2 rounded-sm font-serif text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors text-right w-64"
                    />
                  )}
                  
                  {item.type === "toggle" && (
                    <button
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        item.value ? "bg-gold" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                          item.value ? "right-1" : "left-1"
                        )}
                      />
                    </button>
                  )}
                  
                  {item.type === "select" && (
                    <select
                      defaultValue={item.value as string}
                      className="bg-transparent border border-border/30 px-4 py-2 rounded-sm font-serif text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Never</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 flex gap-4"
        >
          <button className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-sm transition-all duration-200 label-luxury text-xs">
            Save Changes
          </button>
          <button className="ghost-luxury px-8 py-3 rounded-sm label-luxury text-xs hover:border-gold hover:text-gold">
            Cancel
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
