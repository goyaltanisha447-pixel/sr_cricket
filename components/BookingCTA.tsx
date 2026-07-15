"use strict";

"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck } from "lucide-react";

export default function BookingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    turfType: "hourly-turf",
    date: "",
    slot: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll tracking for the rolling cricket ball
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Roll the ball from left (-100px) to right (110% of width)
  const ballX = useTransform(scrollYProgress, [0, 1], ["-10vw", "110vw"]);
  // Rotate the ball as it moves
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.slot || !formData.name || !formData.phone || !formData.email) {
      alert("Please fill in all the booking fields.");
      return;
    }
    // Simulate booking submission
    setIsSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      id="booking"
      className="relative py-24 bg-[#050505] overflow-hidden border-t border-b border-white/5"
    >
      {/* Background radial gradient & grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.03)_0%,transparent_75%)] pointer-events-none" />

      {/* Rolling Cricket Ball Container */}
      <div className="absolute top-16 left-0 right-0 w-full h-12 overflow-hidden pointer-events-none z-10 select-none">
        <motion.div
          style={{ x: ballX, rotate: ballRotate }}
          className="w-10 h-10 rounded-full relative flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-red-700 bg-gradient-to-br from-red-500 via-red-600 to-red-800"
        >
          {/* Cricket Ball Seam (white dashes) */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 border-r border-dashed border-white/80 -translate-x-1/2" />
          <div className="absolute inset-x-0 top-1/2 h-0.5 border-b border-dashed border-white/20 -translate-y-1/2" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-20">
        
        {/* Booking Form Layout */}
        <div className="glass-panel-heavy p-8 md:p-12 rounded-sm border border-white/10 relative overflow-hidden">
          
          {/* Glow backdrop inside form */}
          <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Form Header */}
                <div className="text-center space-y-2">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    Instant Reservation
                  </span>
                  <h2 className="text-4xl md:text-6xl font-anton uppercase tracking-tight text-white">
                    READY TO <span className="text-primary text-glow-neon">PLAY?</span>
                  </h2>
                  <p className="text-gray-400 font-medium text-sm md:text-base mt-2">
                    Book your premium indoor turf slot in under 30 seconds.
                  </p>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Turf Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Select Arena Package
                      </label>
                      <div className="relative">
                        <select
                          name="turfType"
                          value={formData.turfType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="practice-lane" className="bg-[#050505]">Practice Net Lane - ₹800/hr</option>
                          <option value="hourly-turf" className="bg-[#050505]">Hourly Turf Booking - ₹1,500/hr</option>
                          <option value="tournament" className="bg-[#050505]">Tournament Day League - ₹12,000</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</div>
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Choose Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Time Slot Select */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Available Time Slot
                      </label>
                      <div className="relative">
                        <select
                          name="slot"
                          required
                          value={formData.slot}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#050505]">Select time slot...</option>
                          <option value="06:00-08:00" className="bg-[#050505]">06:00 AM - 08:00 AM (Morning Special)</option>
                          <option value="08:00-10:00" className="bg-[#050505]">08:00 AM - 10:00 AM</option>
                          <option value="16:00-18:00" className="bg-[#050505]">04:00 PM - 06:00 PM (Sunset Match)</option>
                          <option value="18:00-20:00" className="bg-[#050505]">06:00 PM - 08:00 PM (LED Shadowless)</option>
                          <option value="20:00-22:00" className="bg-[#050505]">08:00 PM - 10:00 PM (Night Rush)</option>
                          <option value="22:00-00:00" className="bg-[#050505]">10:00 PM - 12:00 AM (Midnight Cup)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4" /></span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Virat Kohli"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Phone className="w-4 h-4" /></span>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 83410 29797"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4" /></span>
                        <input
                          type="email"
                          name="email"
                          placeholder="chiku@gameon.com"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary text-white rounded-sm text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Book Your Match Slot
                    </button>
                  </div>
                </form>

                {/* Secure Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 font-semibold pt-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Secure SSL Booking. Pay at the arena counter.</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center py-12 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-anton text-3xl uppercase tracking-wider text-white">
                    BOOKING CONFIRMED!
                  </h3>
                  <p className="text-gray-400 font-semibold max-w-md mx-auto text-sm md:text-base leading-relaxed">
                    Thank you, <span className="text-white">{formData.name}</span>! Your slot on <span className="text-primary">{formData.date}</span> at <span className="text-primary">{formData.slot}</span> is successfully reserved.
                  </p>
                </div>

                <div className="glass-panel p-6 max-w-sm mx-auto rounded-sm space-y-2 text-left text-sm border-white/10">
                  <div className="flex justify-between"><span className="text-gray-400">Arena:</span> <span className="font-bold text-white uppercase">{formData.turfType.replace('-', ' ')}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Date:</span> <span className="font-bold text-white">{formData.date}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Slot:</span> <span className="font-bold text-white">{formData.slot}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Reservation Name:</span> <span className="font-bold text-white">{formData.name}</span></div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        turfType: "hourly-turf",
                        date: "",
                        slot: "",
                        name: "",
                        phone: "",
                        email: "",
                      });
                    }}
                    className="px-8 py-3 bg-white/5 border border-white/10 hover:border-primary text-white font-bold uppercase tracking-wider text-xs rounded-sm transition-colors duration-300"
                  >
                    Make Another Booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
