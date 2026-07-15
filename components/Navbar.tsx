"use strict";

"use client";

import { useState, useEffect } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Facilities", href: "#facilities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Experience", href: "#experience" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050505]/70 backdrop-blur-md border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home");
            }}
            className="flex items-center space-x-2 text-2xl font-bold tracking-widest text-white group"
          >
            <Trophy className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-anton tracking-wider text-xl md:text-2xl">
              GAME<span className="text-primary">ON</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-300 font-medium py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Booking CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#booking");
              }}
              className="relative inline-flex items-center justify-center px-6 py-2.5 font-bold uppercase tracking-wider text-sm text-[#050505] bg-primary overflow-hidden rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] group hover:scale-[1.02]"
            >
              <span className="relative z-10">Book Slot</span>
              <span className="absolute inset-0 bg-[#8AFFC1] translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 bg-[#050505]/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 lg:hidden"
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xl uppercase tracking-widest text-gray-300 hover:text-primary transition-colors font-anton"
              >
                {link.name}
              </motion.a>
            ))}

            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#booking");
              }}
              className="px-8 py-3 text-lg font-bold uppercase tracking-wider text-[#050505] bg-primary rounded-sm shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_25px_rgba(0,255,102,0.6)]"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
