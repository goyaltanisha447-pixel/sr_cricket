"use strict";

"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Calendar, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero() {
  const [frame, setFrame] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = 121;

  // Preload walkthrough frames on mount for instant zero-latency swapping
  useEffect(() => {
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `/images/walkthrough/ezgif-frame-${frameStr}.jpg`;
    }
  }, []);

  // Auto-play walkthrough video at 30 FPS when mouse is hovered
  useEffect(() => {
    if (isHovered) {
      playIntervalRef.current = setInterval(() => {
        setFrame((prev) => (prev % totalFrames) + 1);
      }, 35); // ~30 FPS
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isHovered]);

  // Keypad / keyboard interactivity: advancing the video walkthrough on keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if user is in the Hero view region
      if (window.scrollY > window.innerHeight) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFrame((prev) => (prev % totalFrames) + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setFrame((prev) => (prev - 2 + totalFrames) % totalFrames + 1);
      } else {
        // Any standard keyboard key, keypad numbers, etc.
        setFrame((prev) => (prev % totalFrames) + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax background scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  
  // Parallax overlay opacity (darken as we scroll)
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.95]);

  // Content translate Y and opacity fade out
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Format frame filename
  const frameString = String(frame).padStart(3, '0');
  const backgroundImageSrc = `/images/walkthrough/ezgif-frame-${frameString}.jpg`;

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black cursor-pointer"
    >
      {/* Background Walkthrough Image - Scroll / Hover Scrubbed Frame */}
      <motion.div
        style={{ scale, backgroundImage: `url(${backgroundImageSrc})` }}
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-75"
      />

      {/* Dark Ambient Gradient Overlays for readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* Center Cinematic Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Premium Indoor Box Cricket Arena
          </span>
        </motion.div>

        {/* Big Heading */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-anton tracking-tight leading-none text-white uppercase mb-6 max-w-4xl">
          THE ULTIMATE <br />
          <span className="text-primary text-glow-neon">BOX CRICKET</span> <br />
          EXPERIENCE
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-gray-300 font-medium max-w-xl mb-10 tracking-wide leading-relaxed">
          Step into the world's most premium indoor sports turf. Pro-grade grass,
          LED floodlighting, and real-time electronic scoreboard.
          <span className="block text-primary font-semibold mt-1">Book your slot in seconds.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={() => handleScrollTo("#booking")}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Book Now</span>
          </button>

          <button
            onClick={() => handleScrollTo("#facilities")}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 border border-white/20 hover:border-primary text-white font-bold uppercase tracking-wider rounded-sm bg-white/5 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <Play className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
            <span>Explore Arena</span>
          </button>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer pointer-events-none hidden md:flex"
      >
        <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Scroll to enter</span>
        <div className="w-[20px] h-[36px] rounded-full border-2 border-white/30 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
