"use strict";

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function StatCounter({ value, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-anton text-4xl md:text-6xl text-primary block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative py-24 bg-[#050505] overflow-hidden border-b border-white/5"
    >
      {/* Background grids and glowing lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Large Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-anton uppercase tracking-tight leading-none">
              ENGINEERED FOR <br />
              <span className="text-stroke text-white/90">HIGH-PERFORMANCE</span> <br />
              CRICKET AT NIGHT
            </h2>
            <div className="w-20 h-[3px] bg-primary rounded-full"></div>
            <p className="text-gray-400 font-medium text-base md:text-lg max-w-lg leading-relaxed">
              Step onto the world's most premium synthetic turf. From LED shadowless lighting to custom nets, our facility is engineered to let you unleash your maximum potential.
            </p>
          </motion.div>

          {/* Right Side: Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">
            
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-sm hover:border-primary/40 transition-colors duration-300 relative group overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full filter blur-xl group-hover:bg-primary/10 transition-colors" />
              <StatCounter value={5000} suffix="+" />
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs md:text-sm mt-2">
                Matches Played
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-6 md:p-8 rounded-sm hover:border-primary/40 transition-colors duration-300 relative group overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full filter blur-xl group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center space-x-1.5 mb-1">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] fill-[#FFD700] animate-pulse" />
              </div>
              <span className="font-anton text-4xl md:text-6xl text-primary block mt-1">4.9</span>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs md:text-sm mt-2">
                Google Rating
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-6 md:p-8 rounded-sm hover:border-primary/40 transition-colors duration-300 relative group overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full filter blur-xl group-hover:bg-primary/10 transition-colors" />
              <StatCounter value={10} suffix="+" />
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs md:text-sm mt-2">
                Professional Nets
              </p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-6 md:p-8 rounded-sm hover:border-primary/40 transition-colors duration-300 relative group overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full filter blur-xl group-hover:bg-primary/10 transition-colors" />
              <StatCounter value={365} suffix=" Days" />
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs md:text-sm mt-2">
                Open Year-Round
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
