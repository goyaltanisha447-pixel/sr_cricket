"use strict";

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is Box Cricket, and how does it differ from regular cricket?",
    answer: "Box cricket is an indoor or semi-indoor version of cricket played inside a netted cage or 'box' (typically 8v8 or 6v6). The rules are modified for fast-paced action: there are no runs for hitting outside the box (hitting the net directly gives specific runs), bowlers bowl underarm, and matches usually finish in 6 to 8 overs. It's designed for maximum fun and quick game play.",
  },
  {
    question: "How do I book a turf slot, and can I pay online?",
    answer: "You can book your turf slot using our website's Booking CTA in under 30 seconds. Choose your package, date, and preferred time slot, and submit the details. Currently, we operate on a 'reserve now, pay at counter' model. You can pay via Credit/Debit Cards, UPI, or Cash when you arrive at the arena counter before your match starts.",
  },
  {
    question: "Is the arena completely rain-proof and open 365 days?",
    answer: "Yes, absolutely! GAME ON features a premium, heavy-duty weatherproof tensile ceiling cover that is 100% rain-proof and wind-resistant. We operate year-round, including during heavy monsoon seasons, so your matches are never delayed or cancelled due to bad weather.",
  },
  {
    question: "Do we need to bring our own cricket bats and balls?",
    answer: "We provide high-quality professional SS & Kookaburra bats, wickets, and safety batting pads at no extra charge. We also supply heavy-duty, felt-covered tennis cricket balls designed specifically for synthetic turf rebound. However, you are always welcome to bring your personal favorite bat if you prefer!",
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer: "We offer free rescheduling or full booking cancellation up to 12 hours before your scheduled slot. You can cancel or move your slot by calling or WhatsApping our support desk at +91 83410 29797 with your booking details. Cancellations under 12 hours may be subject to a nominal re-booking fee.",
  },
  {
    question: "Do you have locker rooms, showers, and changing facilities?",
    answer: "Yes, we feature fully air-conditioned locker rooms separate for men and women, equipped with clean showers, secure digital lockers, fresh towels, and hair dryers. These facilities are complimentary for all players with a valid slot booking.",
  },
];

function FAQItem({ item, idx }: { item: typeof FAQ_ITEMS[0]; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="border-b border-white/10 py-6 first:pt-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-anton text-lg md:text-xl uppercase tracking-wider text-white group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 group-hover:text-primary transition-transform duration-300 shrink-0 ml-4 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4 font-medium max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-7xl font-anton uppercase tracking-tight">
            FREQUENTLY ASKED <span className="text-stroke text-white/90">FAQS</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mt-2" />
        </div>

        {/* FAQ Accordion List */}
        <div className="glass-panel p-8 md:p-12 rounded-sm border border-white/10 space-y-6">
          {FAQ_ITEMS.map((item, idx) => (
            <FAQItem key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
