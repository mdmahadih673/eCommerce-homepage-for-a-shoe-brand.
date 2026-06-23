import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black">
      {/* Visual glowing backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#f97316]">
            <Quote className="w-3.5 h-3.5" />
            <span>Community Echo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white uppercase">
            Aura Athletes & Stylists
          </h2>
        </div>

        {/* Testimonials Core Slider Box */}
        <div className="relative glass-panel bg-[#050505]/95 border border-white/15 p-8 sm:p-12 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col items-center">
          {/* Quote Giant Graphic Accent */}
          <div className="absolute top-6 right-6 text-white/[0.03] select-none pointer-events-none">
            <Quote className="w-36 h-36" style={{ transform: "scaleY(-1)" }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6 w-full"
            >
              {/* Star rating stars cluster */}
              <div className="flex justify-center items-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Comment Text */}
              <p className="text-sm sm:text-lg text-gray-200 leading-relaxed font-sans max-w-2xl mx-auto italic">
                "{current.comment}"
              </p>

              {/* User Bio and Product model */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white capitalize">
                  {current.name}
                </h4>
                <p className="text-xs text-[#f97316] tracking-wider uppercase font-mono">
                  {current.role}
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase font-mono text-amber-400 tracking-widest">
                  Purchased: {current.shoeWorn}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigative controls */}
          <div className="flex items-center justify-between w-full mt-8 pt-6 border-t border-white/5">
            {/* Quick avatar badges jumper */}
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(index)}
                  className="relative group focus:outline-none cursor-pointer"
                  id={`review-avatar-${index}`}
                  aria-label={`Show testimonial from ${t.name}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full overflow-hidden border transition-all duration-300 ${
                      index === activeIndex
                        ? "border-[#f97316] scale-110 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Left/Right manual buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500 text-white bg-white/5 active:scale-95 transition-all cursor-pointer"
                id="review-prev-btn"
                aria-label="Previous Customer Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500 text-white bg-white/5 active:scale-95 transition-all cursor-pointer"
                id="review-next-btn"
                aria-label="Next Customer Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
