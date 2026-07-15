"use strict";

"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  title: string;
  desc: string;
  image: string | string[];
  time: string;
}

const EXPERIENCES: Experience[] = [
  {
    title: "Morning Cricket",
    desc: "Start your day with crisp morning light, refreshing cool breeze, and pre-work batting drills.",
    image: "/images/corporate-2.jpg",
    time: "6:00 AM - 10:00 AM",
  },
  {
    title: "Corporate Matches",
    desc: "Foster team bonding, blow off stress, and run corporate leagues with premium turf facilities.",
    image: "/images/corporate-1.jpg",
    time: "Mon - Fri, Bookings Open",
  },
  {
    title: "Weekend Leagues",
    desc: "Compete in high-stakes matches and premium tournaments. Bring your team and win trophies.",
    image: "/images/corporate-3.jpg",
    time: "Saturdays & Sundays",
  },
  {
    title: "Birthday Cricket",
    desc: "Host sports-themed parties, birthday matches, and unforgettable group celebrations.",
    image: "https://images.unsplash.com/photo-1464349153735-7db5197a18b1?q=80&w=600&auto=format&fit=crop",
    time: "Custom Package Booking",
  },
  {
    title: "Practice Sessions",
    desc: "Dedicated professional net practice lanes with ball-throwing machines and expert coaching.",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f866de?q=80&w=600&auto=format&fit=crop",
    time: "Hourly lane rental",
  },
  {
    title: "Rain-Proof Arena",
    desc: "Zero match delays. Our fully enclosed weatherproof ceiling keeps you playing 365 days a year.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop",
    time: "All Weather Open",
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = Array.isArray(exp.image) ? exp.image : [exp.image];

  // Loop through images inside the card when hovered
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % images.length);
    }, 2200); // Slide every 2.2 seconds

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImgIdx(0);
      }}
      className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[400px] snap-start relative group rounded-sm overflow-hidden border border-white/5 hover:border-primary/40 transition-colors duration-500 bg-white/2"
    >
      {/* Photo Frame */}
      <div className="h-[280px] sm:h-[350px] overflow-hidden relative">
        {images.map((img, imgIdx) => (
          <motion.img
            key={img}
            src={img}
            alt={exp.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            initial={{ opacity: imgIdx === 0 ? 1 : 0 }}
            animate={{ opacity: imgIdx === activeImgIdx ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}
        
        {/* Visual overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent z-10 pointer-events-none" />

        {/* Time Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#050505]/70 border border-white/10 backdrop-blur-md text-xs font-semibold text-primary uppercase rounded-full z-20">
          {exp.time}
        </div>

        {/* Dynamic dot slide-indicator for multi-image slideshows */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex space-x-1.5 z-20 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
            {images.map((_, dotIdx) => (
              <div
                key={dotIdx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeImgIdx ? "bg-primary w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Frame */}
      <div className="p-6 md:p-8 space-y-4 bg-[#050505] flex flex-col justify-between relative z-20">
        <div>
          <h3 className="font-anton text-2xl uppercase tracking-wider text-white group-hover:text-primary transition-colors">
            {exp.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mt-2 font-medium">
            {exp.desc}
          </p>
        </div>

        {/* Animated Arrow Link */}
        <a
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:text-white transition-colors duration-300 mt-2"
        >
          <span>Book Experience</span>
          <MoveRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Experiences() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="experience" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Tailored Events
            </span>
            <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
              CURATED <span className="text-stroke text-white/90">EXPERIENCES</span>
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-primary bg-white/5 hover:bg-primary hover:text-black flex items-center justify-center transition-colors duration-300 text-white"
              aria-label="Scroll Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-primary bg-white/5 hover:bg-primary hover:text-black flex items-center justify-center transition-colors duration-300 text-white"
              aria-label="Scroll Right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
