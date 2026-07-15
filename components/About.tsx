"use strict";

"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Layers,
  Zap,
  Moon,
  Car,
  UserCheck,
  ShieldCheck,
  Droplet,
  Music,
  Tv,
  LucideIcon,
} from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
  glow: string;
  image: string;
}

const FEATURES: Feature[] = [
  {
    title: "Professional Turf",
    desc: "FIFA-grade, high-density shock-absorbent synthetic grass for maximum player safety and ball rebound.",
    icon: Layers,
    glow: "rgba(0, 255, 102, 0.4)",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "LED Flood Lights",
    desc: "Professional stadium-grade shadowless LED setup designed for zero-glare catching and maximum visibility.",
    icon: Zap,
    glow: "rgba(138, 255, 193, 0.4)",
    image: "https://images.unsplash.com/photo-1569074187119-c87815b476da?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Night Matches",
    desc: "Experience box cricket under the stars with cool ambient conditions, perfect for late-night tournaments.",
    icon: Moon,
    glow: "rgba(0, 255, 102, 0.4)",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Valet & Parking",
    desc: "Generous designated car and bike parking space with active surveillance and CCTV monitoring.",
    icon: Car,
    glow: "rgba(138, 255, 193, 0.4)",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Changing Rooms",
    desc: "Sleek, air-conditioned locker rooms equipped with modern showers and secure digital lockers.",
    icon: UserCheck,
    glow: "rgba(0, 255, 102, 0.4)",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Equipment Rental",
    desc: "Premium SS & Kookaburra bats, leather-feel tennis balls, wickets, and safety gears available.",
    icon: ShieldCheck,
    glow: "rgba(138, 255, 193, 0.4)",
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Purified Water",
    desc: "Complimentary, chilled RO purified drinking water stations placed at multiple turf locations.",
    icon: Droplet,
    glow: "rgba(0, 255, 102, 0.4)",
    image: "https://images.unsplash.com/photo-1548839130-3bf3e443f60c?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Surround Sound",
    desc: "High-fidelity JBL outdoor Bluetooth audio system. Play your own playlists while batting.",
    icon: Music,
    glow: "rgba(138, 255, 193, 0.4)",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Live Scoreboard",
    desc: "Ultra-bright electronic scoreboard display with wireless controls, tracking overs, runs, and wickets.",
    icon: Tv,
    glow: "rgba(0, 255, 102, 0.4)",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
  },
];

// Interactive 3D Tilt Card Wrapper Component
function TiltCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out coordinate tracking
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  // Rotate angles (ranges -12 to 12 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between -0.5 and 0.5
    const relX = (e.clientX - rect.left) / width - 0.5;
    const relY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel relative p-8 rounded-sm hover:border-primary transition-all duration-300 group overflow-hidden cursor-pointer flex flex-col justify-between min-h-[280px]"
    >
      {/* Background Image ghosting layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none"
        style={{ backgroundImage: `url(${feature.image})` }}
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500 pointer-events-none" />

      {/* 3D hover overlay glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${feature.glow} 0%, transparent 65%)`,
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 space-y-4">
        {/* Icon with glow background */}
        <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:text-black group-hover:bg-primary transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Feature Title */}
        <h3 className="font-anton text-2xl uppercase tracking-wider text-white group-hover:text-primary transition-colors">
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          {feature.desc}
        </p>
      </div>

      {/* Little accent line at bottom right */}
      <div className="w-4 h-0.5 bg-white/20 absolute bottom-6 right-8 group-hover:w-12 group-hover:bg-primary transition-all duration-300" />
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="facilities" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#8AFFC1]/5 filter blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Uncompromising Excellence
          </span>
          <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
            WHY PLAY <span className="text-stroke text-white/90">HERE?</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mt-2" />
        </div>

        {/* Grid of features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
            <TiltCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
