import { useState } from "react";
import { X, Star, Sparkles, Check, ShoppingCart, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Shoe } from "../types";

interface ProductDetailsModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (shoe: Shoe, size: number, color: string) => void;
}

export default function ProductDetailsModal({
  shoe,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(shoe?.sizes[2] || 9);
  const [selectedColor, setSelectedColor] = useState<string>(shoe?.colorOptions[0].name || "");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  // Synchronize dynamic updates if shoe shifts
  useState(() => {
    if (shoe) {
      setSelectedSize(shoe.sizes[2]);
      setSelectedColor(shoe.colorOptions[0].name);
    }
  });

  if (!shoe) return null;

  const handleAddToCart = () => {
    onAddToCart(shoe, selectedSize, selectedColor);
    setAddedSuccessfully(true);
    setTimeout(() => {
      setAddedSuccessfully(false);
      onClose(); // Auto close to drive them to cart
    }, 1500);
  };

  const getAccentColorStyle = (accent: string) => {
    switch (accent) {
      case "cyan":
        return { text: "text-orange-500", bg: "bg-orange-500 hover:bg-orange-600", border: "border-orange-500/20", btnGlow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]" };
      case "amber":
        return { text: "text-amber-400", bg: "bg-amber-500 hover:bg-amber-600", border: "border-amber-500/20", btnGlow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]" };
      case "purple":
        return { text: "text-orange-500 hover:bg-orange-600", bg: "bg-orange-500 hover:bg-orange-600", border: "border-orange-500/20", btnGlow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]" };
      case "rose":
        return { text: "text-orange-500 hover:bg-orange-600", bg: "bg-orange-500 hover:bg-orange-600", border: "border-orange-500/20", btnGlow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]" };
      case "lime":
        return { text: "text-amber-400 hover:bg-amber-600", bg: "bg-amber-500 hover:bg-amber-600", border: "border-amber-500/20", btnGlow: "shadow-[0_0_20px_rgba(251,191,36,0.45)]" };
      case "yellow":
        return { text: "text-yellow-400 hover:bg-yellow-500 hover:bg-yellow-600", border: "border-yellow-500/20", btnGlow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]" };
      default:
        return { text: "text-orange-500", bg: "bg-orange-500 hover:bg-orange-600", border: "border-orange-500/20", btnGlow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]" };
    }
  };

  const styleObj = getAccentColorStyle(shoe.accentClass);

  const materialsList = [
    { label: "Midsole Technology", value: "Pressurized Nitrogen-Vented Micro Nodes" },
    { label: "Shank Support", value: "3D aerospace grade graphite structural matrix" },
    { label: "Upper Knit", value: "Heat-mapped dynamic tensile recycled fibers" },
    { label: "Lacing Lock", value: "Integrated speed-tension eyelets" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Dark blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#02000c] backdrop-blur-md pointer-events-auto"
        />

        {/* Modal Sheet panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="w-full max-w-4xl glass-panel bg-[#050505]/98 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative z-10 flex flex-col lg:flex-row"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 border border-white/5 hover:border-white/15 text-gray-400 hover:text-white transition-all z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Block: Image showcase with giant backing glows */}
          <div className="lg:w-1/2 p-6 sm:p-10 flex items-center justify-center relative bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/5">
            <div
              className="absolute w-56 h-56 rounded-full blur-[70px] opacity-20 pointer-events-none"
              style={{ backgroundColor: shoe.accentHex }}
            />

            {/* Rotating detailed sneaker image */}
            <motion.div
              animate={{
                rotate: [-12, -8, -12],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-sm aspect-[4/3] flex items-center justify-center pointer-events-none select-none"
            >
              <img
                src={shoe.image}
                alt={shoe.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Micro Tag details indicator */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-300">100% Verified Genuine</span>
            </div>
          </div>

          {/* Right Block: Fully customized product ordering layout */}
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 space-y-6 max-h-[85vh] lg:max-h-none overflow-y-auto w-full text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f97316]">
                {shoe.series}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
                {shoe.name}
              </h2>
              
              {/* Product Rating and Reviews */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(shoe.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {shoe.rating} | {shoe.reviewsCount} member evaluations
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                ${shoe.price}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 border border-orange-500/30 text-orange-400 bg-orange-500/5 rounded">
                VIP Selection Included
              </span>
            </div>

            {/* Materials summary details text */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                Specifications & Sourcing
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans pb-1">
                {shoe.longDescription}
              </p>
            </div>

            {/* Swatch color picker option */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                Select Colorway: <span className="text-white font-mono">{selectedColor}</span>
              </h4>
              <div className="flex items-center gap-3">
                {shoe.colorOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedColor(opt.name)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      selectedColor === opt.name
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/15 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span>{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing list picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Select Size (US Men's):
                </h4>
                <span className="text-[10px] font-mono text-gray-500">True-to-fit compliance modal</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {shoe.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono border transition-all flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Anatomy metrics checklist */}
            <div className="table w-full border-t border-b border-white/5 py-4 space-y-2">
              {materialsList.map((mat, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 text-left">
                  <span className="text-gray-500 uppercase font-mono tracking-wider">{mat.label}</span>
                  <span className="text-gray-300 font-medium text-right">{mat.value}</span>
                </div>
              ))}
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none ${
                addedSuccessfully
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : `${styleObj.bg} ${styleObj.btnGlow} text-white font-extrabold shadow-lg`
              }`}
            >
              {addedSuccessfully ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Order
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
