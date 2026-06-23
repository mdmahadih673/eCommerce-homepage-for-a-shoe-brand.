import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Flame, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Shoe } from "../types";

interface HeroSliderProps {
  products: Shoe[];
  onAddToCart: (shoe: Shoe, size: number, color: string) => void;
  onOpenDetails: (shoe: Shoe) => void;
}

export default function HeroSlider({ products, onAddToCart, onOpenDetails }: HeroSliderProps) {
  // We showcase the first 3 custom-generated premium shoes in the Hero Slider
  const heroProducts = products.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3500); // Set to 3.5s to allow smooth transition reading
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroProducts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === heroProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentProduct = heroProducts[currentIndex];

  // Custom stats for the highlighted hero products to give that high-tech luxury feel
  const productStats = [
    { label: "Energy Return", value: "96%", desc: "Nitrogen Nodes" },
    { label: "Stability", value: "Carbon Frame", desc: "Adaptive Shank" },
    { label: "Avg Weight", value: "245g", desc: "Ultra-Lightweight" },
  ];

  // Dynamic Tailwind accent color classes
  const getAccentBtnClass = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.45)]";
      case "amber":
        return "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.45)]";
      case "purple":
        return "bg-amber-500 text-black hover:bg-amber-600 shadow-[0_0_25px_rgba(251,191,36,0.45)]";
      default:
        return "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.45)]";
    }
  };

  const getAccentTextClass = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "text-orange-500";
      case "amber":
        return "text-amber-400";
      case "purple":
        return "text-orange-500";
      default:
        return "text-orange-500";
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#050505] flex items-center pt-24 overflow-hidden"
    >
      {/* Background Animated Orb Overlay */}
      <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none overflow-hidden select-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 opacity-30"
          style={{
            background: `radial-gradient(circle, ${currentProduct.accentHex}40 0%, transparent 70%)`,
          }}
        />
        <div className="absolute -left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-purple-900/10 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-1/4 w-[300px] h-[300px] rounded-full bg-indigo-900/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        {/* Slides details block */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {/* Floating Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-orange-500 select-none">
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>Selected Masterpiece</span>
              </div>

              {/* Product Title */}
              <div className="space-y-2">
                <h2 className="text-sm font-mono tracking-wider text-gray-400 uppercase">
                  {currentProduct.series}
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                  {currentProduct.name}
                </h1>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  ${currentProduct.price}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5 font-mono">
                  Standard Delivery Included
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans max-w-lg">
                {currentProduct.description}
              </p>

              {/* Custom specs cards for luxury touch */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {productStats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 relative group hover:border-white/25 transition-all text-left"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5 group-hover:text-orange-500 transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-gray-500 mt-0.5">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() =>
                    onAddToCart(
                      currentProduct,
                      currentProduct.sizes[2],
                      currentProduct.colorOptions[0].name
                    )
                  }
                  className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer select-none ${getAccentBtnClass(
                    currentProduct.accentClass
                  )}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>

                <button
                  onClick={() => onOpenDetails(currentProduct)}
                  className="px-6 py-4 rounded-full border border-white/10 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer"
                >
                  Explore Anatomy
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Big Rotating Shoe Image Container */}
        <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 min-h-[300px] sm:min-h-[400px] relative select-none">
          {/* Animated Background Glowing Aura rings */}
          <div className="absolute w-[240px] sm:w-[350px] md:w-[450px] h-[240px] sm:h-[350px] md:h-[450px] rounded-full border border-white/[0.04] flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
            <div className="w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full border border-white/[0.06] flex items-center justify-center">
              <div className="w-[120px] sm:w-[190px] h-[120px] sm:h-[190px] rounded-full border border-white/[0.1] border-dashed" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Soft, custom glowing drop shadow matched to shoe theme */}
            <div
              className="w-52 sm:w-80 h-32 blur-[80px] rounded-full opacity-65 transition-all duration-700"
              style={{ backgroundColor: currentProduct.accentHex }}
            />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={{
                enter: (dir) => ({
                  x: dir > 0 ? 120 : -120,
                  rotate: dir > 0 ? 15 : -15,
                  opacity: 0,
                  scale: 0.8,
                }),
                center: {
                  x: 0,
                  rotate: -12,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    x: { type: "spring", stiffness: 200, damping: 20 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.35 },
                  },
                },
                exit: (dir) => ({
                  x: dir < 0 ? 120 : -120,
                  rotate: dir < 0 ? 15 : -15,
                  opacity: 0,
                  scale: 0.8,
                  transition: {
                    x: { type: "spring", stiffness: 200, damping: 20 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center"
              style={{ perspective: 1200 }}
            >
              {/* Real high quality floating Shoe Image */}
              <motion.img
                src={currentProduct.image}
                alt={currentProduct.name}
                referrerPolicy="no-referrer"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-4/5 sm:w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:scale-105 duration-500 cursor-pointer"
              />

              {/* Dynamic Overlay Tags indicating specifications */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-12 left-8 md:left-4 p-2.5 rounded-2xl glass-panel border border-white/15 flex items-center gap-2 hover:border-white/30 transition-all cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-orange-500/10 text-orange-400">
                  <Compass className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-mono leading-none">
                    Traction
                  </p>
                  <p className="text-[11px] font-bold text-white mt-0.5">
                    Multi-Surface
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-16 right-8 md:right-4 p-2.5 rounded-2xl glass-panel border border-white/15 flex items-center gap-2 hover:border-white/30 transition-all cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-mono leading-none">
                    Premium Fit
                  </p>
                  <p className="text-[11px] font-bold text-white mt-0.5">
                    Heat-Moldable
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls Overlay */}
      <div className="absolute inset-x-0 bottom-12 z-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Navigation Dot Indicators */}
        <div className="flex items-center gap-3">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="group focus:outline-none cursor-pointer p-1"
              id={`hero-dot-${index}`}
              aria-label={`Show slide number ${index + 1}`}
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `${
                        index % 2 === 0
                          ? "w-8 bg-orange-500 shadow-[0_0_12px_#f97316]"
                          : "w-8 bg-amber-400 shadow-[0_0_12px_#fbbf24]"
                      }`
                    : "w-2.5 bg-white/25 hover:bg-white/50"
                 }`}
              />
            </button>
          ))}
        </div>

        {/* Manual navigation arrows */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500 bg-white/5 active:scale-95 text-white transition-all cursor-pointer"
            id="hero-prev-btn"
            aria-label="Previous Premium Shoe Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/10 hover:border-orange-500 hover:text-orange-500 bg-white/5 active:scale-95 text-white transition-all cursor-pointer"
            id="hero-next-btn"
            aria-label="Next Premium Shoe Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
