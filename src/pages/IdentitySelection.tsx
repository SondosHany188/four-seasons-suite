import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserCircle, Shield } from "lucide-react";
import { RoleCard } from "@/components/ui/role-card";
import luxuryLobby from "@/assets/luxury-lobby.jpg";

const IdentitySelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "staff" | "admin") => {
    // Store role for later use
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden film-grain">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={luxuryLobby}
          alt="Luxury hotel lobby"
          className="w-full h-full object-cover"
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Warm tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Brand Mark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <span className="label-luxury text-gold tracking-[0.3em]">
            Executive Suite
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-white text-center mb-4 tracking-tight"
        >
          Welcome to the
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-white text-center mb-20 tracking-tight italic"
        >
          Executive Suite.
        </motion.h2>

        {/* Role Selection */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <RoleCard
            title="Staff Receptionist"
            subtitle="Guest Management & Check-in"
            icon={UserCircle}
            onClick={() => handleRoleSelect("staff")}
            delay={0.2}
          />
          <RoleCard
            title="Super Admin"
            subtitle="System Oversight & Analytics"
            icon={Shield}
            onClick={() => handleRoleSelect("admin")}
            delay={0.35}
          />
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 text-white/30 text-xs font-sans tracking-widest uppercase"
        >
          Select your role to continue
        </motion.p>
      </div>
    </div>
  );
};

export default IdentitySelection;
