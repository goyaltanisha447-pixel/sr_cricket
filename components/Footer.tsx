"use strict";

"use client";

import { MessageSquare, Mail, Phone, MapPin, Clock, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative bg-[#050505] border-t border-white/10 pt-20 pb-8 overflow-hidden">
      
      {/* Background element */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Logo & Slogan */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#home");
              }}
              className="flex items-center space-x-2 text-2xl font-bold tracking-widest text-white group w-fit"
            >
              <Trophy className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-anton tracking-wider text-2xl">
                GAME<span className="text-primary">ON</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              The world's most premium indoor box cricket arena. Experience shadowless stadium floodlights, FIFA-grade turf cushioning, and live electronic match scoreboards.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              
              {/* WhatsApp */}
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                href="https://wa.me/918341029797"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors"
                aria-label="WhatsApp Chat Support"
              >
                <MessageSquare className="w-5 h-5" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                href="https://instagram.com/gameon_arena"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors"
                aria-label="Instagram Page"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                href="mailto:contact@gameon.com"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors"
                aria-label="Email support"
              >
                <Mail className="w-5 h-5" />
              </motion.a>

            </div>
          </div>

          {/* Column 2: Hours & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-anton text-lg uppercase tracking-wider text-white">
              CONTACT & HOURS
            </h3>
            
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              
              {/* Hours */}
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="block text-white uppercase font-bold text-xs tracking-wider">OPENING HOURS</span>
                  <span className="block mt-0.5">Monday - Sunday: Open 24 Hours</span>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="block text-white uppercase font-bold text-xs tracking-wider">RESERVATIONS DESK</span>
                  <span className="block mt-0.5">+91 83410 29797 (WhatsApp Available)</span>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="block text-white uppercase font-bold text-xs tracking-wider">ARENA LOCATION</span>
                  <span className="block mt-0.5">Rd Number 7, Beside Vikas School, Meerpet, Hyderabad, Telangana 500097</span>
                </div>
              </li>

            </ul>
          </div>

          {/* Column 3: Live Map */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-anton text-lg uppercase tracking-wider text-white">
              ARENA MAP
            </h3>
            
            {/* Embedded Google Maps inside glass panel */}
            <div className="w-full h-48 rounded-sm overflow-hidden border border-white/10 glass-panel p-1">
              <iframe
                title="GAME ON Box Cricket Arena Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.4348612543944!2d77.19013097637852!3d28.60172607567824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19808df6f809%3A0xe5cd6b9bf73e9702!2sSports%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full object-cover rounded-sm filter invert grayscale"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-semibold space-y-4 sm:space-y-0">
          <p>© {currentYear} GAME ON Arena. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#booking" onClick={(e) => { e.preventDefault(); handleScrollTo("#booking"); }} className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); handleScrollTo("#booking"); }} className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); handleScrollTo("#booking"); }} className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
