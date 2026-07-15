"use strict";

"use client";

import { motion } from "framer-motion";
import { Check, Flame, Trophy, Star } from "lucide-react";

const PACKAGES = [
  {
    name: "Practice Lane",
    price: "₹800",
    period: "Hour",
    icon: Star,
    desc: "Perfect for single player or pairs looking to refine batting, bowling, or use the bowling machine.",
    features: [
      "1 Dedicated Practice Net Lane",
      "Wireless Bowling Machine (Optional)",
      "Standard Tennis/Leather Balls",
      "Locker & Shower Access",
      "Drinking Water Station Access",
    ],
    popular: false,
    color: "border-white/10 hover:border-white/30",
    glow: "rgba(255, 255, 255, 0.05)",
  },
  {
    name: "Hourly Turf Booking",
    price: "₹1,500",
    period: "Hour",
    icon: Flame,
    desc: "Rent the entire box cricket turf for team matches, group practice, or corporate recreational matches.",
    features: [
      "Full Arena Turf Access",
      "Full Stadium LED Lights System",
      "Live Wireless Electronic Scoreboard",
      "SS/Kookaburra Bats & Wickets",
      "JBL High-Fidelity Audio System",
    ],
    popular: true,
    color: "border-primary/50 hover:border-primary",
    glow: "rgba(0, 255, 102, 0.15)",
  },
  {
    name: "Tournament League",
    price: "₹12,000",
    period: "Full Day",
    icon: Trophy,
    desc: "Host matches, club leagues, or ultimate weekend cups with all professional arrangements completed by us.",
    features: [
      "Full Arena Day Buyout (10 Hours)",
      "Match Referee & Official Umpire",
      "Live Web/YouTube Streaming (1080p)",
      "Custom Medals, Trophy & Match MVP",
      "Dedicated Event Coordinator",
    ],
    popular: false,
    color: "border-accent/40 hover:border-accent",
    glow: "rgba(138, 255, 193, 0.1)",
  },
];

export default function Pricing() {
  const handleScrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background element */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Flexible Rates
          </span>
          <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
            PREMIUM <span className="text-stroke text-white/90">PRICING</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mt-2" />
          <p className="text-gray-400 font-medium max-w-md text-sm md:text-base mt-2">
            No registration fees. Pick your tier, choose your hours, and book your slot in seconds.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`glass-panel relative p-8 md:p-10 rounded-sm flex flex-col justify-between border-2 transition-all duration-300 ${
                  pkg.popular ? "bg-[#0c0c0c]" : "bg-white/2"
                } ${pkg.color}`}
                style={{
                  boxShadow: `0 10px 40px -10px ${pkg.glow}`,
                }}
              >
                {/* Popular Ribbon */}
                {pkg.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-full shadow-[0_0_15px_rgba(0,255,102,0.4)]">
                    Most Popular
                  </div>
                )}

                {/* Card Title & Icon */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-widest text-gray-400 font-bold">
                      {pkg.name}
                    </span>
                    <div className={`p-2.5 rounded-sm bg-white/5 border border-white/10 ${pkg.popular ? "text-primary border-primary/20" : "text-white"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pricing Rate */}
                  <div className="flex items-baseline space-x-2">
                    <span className="font-anton text-5xl md:text-6xl text-white">
                      {pkg.price}
                    </span>
                    <span className="text-gray-400 font-medium text-sm">
                      / {pkg.period}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    {pkg.desc}
                  </p>

                  <div className="w-full h-px bg-white/10 my-4" />

                  {/* Features List */}
                  <ul className="space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3 text-sm text-gray-300 font-medium">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Action Button */}
                <div className="mt-8">
                  <button
                    onClick={handleScrollToBooking}
                    className={`w-full py-4 font-bold uppercase tracking-wider text-xs md:text-sm rounded-sm transition-all duration-300 cursor-pointer ${
                      pkg.popular
                        ? "bg-primary text-black hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] hover:scale-[1.01]"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30"
                    } relative overflow-hidden group`}
                  >
                    {/* Breathing pulse effect inside popular button */}
                    {pkg.popular && (
                      <span className="absolute inset-0 bg-[#00FF66]/20 animate-ping rounded-sm pointer-events-none" />
                    )}
                    <span className="relative z-10">Reserve This Tier</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
