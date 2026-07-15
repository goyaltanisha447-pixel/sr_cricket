"use strict";

"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    name: "Rohit Sharma",
    role: "Local Club Captain",
    quote: "The turf rebound is absolutely uniform! Playing night matches here feels exactly like walking into a professional stadium. The shadowless LED setup is a complete game changer.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Tanisha Goyal",
    role: "Corporate Lead",
    quote: "We hosted our corporate cricket match last weekend and everyone was blown away. Excellent parking, pristine changing rooms, and booking was done in literally seconds. Will book again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Kabir Mehta",
    role: "Regular Weekend Player",
    quote: "Hands down the best box cricket arena in the city. The live scoreboard keeps the matches exciting and the surrounding sound lets us blast our favorite team tracks while playing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Sneha Patel",
    role: "State League Batter",
    quote: "Having rain-proof protection means we never miss our practice sessions. The synthetic grass quality is high-density, meaning zero skid and excellent ankle support. High-end facility!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background glow lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Player Reviews
          </span>
          <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
            WHAT PLAYERS <span className="text-stroke text-white/90">SAY</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mt-2" />
        </div>

        {/* Carousel slide container */}
        <div className="min-h-[300px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glass-panel-heavy p-8 md:p-12 rounded-sm border border-white/10 w-full relative"
            >
              {/* Quote Mark Icon */}
              <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                
                {/* Player Photo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/45 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                  <img
                    src={REVIEWS[activeIdx].image}
                    alt={REVIEWS[activeIdx].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content details */}
                <div className="space-y-4 text-center md:text-left flex-1">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center md:justify-start space-x-1">
                    {[...Array(REVIEWS[activeIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-gray-300 font-medium text-base md:text-lg italic leading-relaxed">
                    "{REVIEWS[activeIdx].quote}"
                  </p>

                  {/* Player Name and Role */}
                  <div>
                    <h4 className="font-anton text-xl uppercase tracking-wider text-white">
                      {REVIEWS[activeIdx].name}
                    </h4>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">
                      {REVIEWS[activeIdx].role}
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bullet Nav Indicators */}
        <div className="flex justify-center items-center space-x-3 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIdx ? "bg-primary w-8 shadow-[0_0_10px_rgba(0,255,102,0.5)]" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
