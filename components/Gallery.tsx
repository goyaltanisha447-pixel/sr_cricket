"use strict";

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "/images/hero-1.jpg",
    title: "Opening Batsman Stroke",
    category: "Action",
    aspect: "aspect-video md:col-span-2",
  },
  {
    src: "/images/hero-2.jpg",
    title: "Turf Cover Drive",
    category: "Nets",
    aspect: "aspect-[4/3] md:col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
    title: "Professional Pitch",
    category: "Match",
    aspect: "aspect-[3/4] md:col-span-1 md:row-span-2",
  },
  {
    src: "/images/hero-3.jpg",
    title: "Professional Box Nets",
    category: "Facilities",
    aspect: "aspect-[4/3] md:col-span-1",
  },
  {
    src: "/images/hero-4.jpg",
    title: "Night LED Lights Setup",
    category: "Night Game",
    aspect: "aspect-video md:col-span-2",
  },
  {
    src: "/images/hero-5.jpg",
    title: "Winning Run Moment",
    category: "Action",
    aspect: "aspect-[4/3] md:col-span-1",
  },
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#050505]">
      {/* Glow elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Visual Tour
            </span>
            <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
              CINEMATIC <span className="text-stroke text-white/90">GALLERY</span>
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>
          <p className="text-gray-400 font-medium max-w-md text-sm md:text-base leading-relaxed">
            Take a look inside the turf layout, high-density professional net installations, and action shots under our stadium LED illumination.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className={`${img.aspect} relative overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/50 rounded-sm bg-white/2 transition-colors duration-500`}
            >
              {/* Image with hover zoom */}
              <motion.img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Title & Category on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-anton text-xl uppercase tracking-wider text-white">
                    {img.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-black">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary hover:text-black text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary hover:text-black text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary hover:text-black text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Frame */}
            <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
              <motion.img
                key={activeIdx}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_IMAGES[activeIdx].src}
                alt={GALLERY_IMAGES[activeIdx].title}
                className="max-w-full max-h-[70vh] object-contain border border-white/10 rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Caption */}
              <motion.div
                key={`caption-${activeIdx}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-center"
              >
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {GALLERY_IMAGES[activeIdx].category}
                </span>
                <h3 className="font-anton text-2xl md:text-3xl uppercase tracking-wider text-white mt-1">
                  {GALLERY_IMAGES[activeIdx].title}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
