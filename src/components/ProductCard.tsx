import React, { useState } from "react";
import { Star, ShoppingCart, Sparkles, Check } from "lucide-react";
import { motion } from "motion/react";
import { Shoe } from "../types";

interface ProductCardProps {
  key?: string | number;
  shoe: Shoe;
  onAddToCart: (shoe: Shoe, size: number, color: string) => void;
  onOpenDetails: (shoe: Shoe) => void;
}

export default function ProductCard({ shoe, onAddToCart, onOpenDetails }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[2] || 9);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colorOptions[0].name);
  const [isHovered, setIsHovered] = useState(false);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const absoluteRating = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= absoluteRating) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        );
      } else if (i === absoluteRating + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-3.5 h-3.5 text-gray-600" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-gray-600" />
        );
      }
    }
    return stars;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    onAddToCart(shoe, selectedSize, selectedColor);
    
    setAddedSuccessfully(true);
    setTimeout(() => {
      setAddedSuccessfully(false);
    }, 1800);
  };

  // Construct dynamic accent styles
  const getAccentColorStyle = (accent: string) => {
    switch (accent) {
      case "cyan":
        return { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/20", btnGlow: "shadow-orange-500/20 hover:shadow-orange-400/40" };
      case "amber":
        return { text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/20", btnGlow: "shadow-amber-500/20 hover:shadow-amber-400/40" };
      case "purple":
        return { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/20", btnGlow: "shadow-orange-500/20 hover:shadow-orange-400/40" };
      case "rose":
        return { text: "text-orange-400", bg: "bg-orange-500", border: "border-orange-500/20", btnGlow: "shadow-orange-500/20 hover:shadow-orange-400/40" };
      case "lime":
        return { text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/20", btnGlow: "shadow-amber-500/20 hover:shadow-amber-400/40" };
      case "yellow":
        return { text: "text-yellow-400", bg: "bg-yellow-500", border: "border-yellow-500/20", btnGlow: "shadow-yellow-500/20 hover:shadow-yellow-400/40" };
      default:
        return { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/20", btnGlow: "shadow-orange-500/20 hover:shadow-orange-400/40" };
    }
  };

  const styleObj = getAccentColorStyle(shoe.accentClass);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(shoe)}
      className="group relative flex flex-col justify-between h-[480px] rounded-3xl glass-panel bg-[#050505]/95 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden cursor-pointer select-none"
    >
      {/* Background shadow glow (active on card hover) */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[65px] opacity-10 group-hover:opacity-30 transition-all duration-500 pointer-events-none"
        style={{ backgroundColor: shoe.accentHex }}
      />

      {/* Tags Block - Sticky Left Top */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        {shoe.isNewArrival && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest bg-white/5 backdrop-blur border border-white/10 text-white">
            <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
            New Season
          </span>
        )}
        {shoe.isPopular && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#c084fc]/10 border border-[#c084fc]/20 text-[#d8b4fe]">
            Highly Coveted
          </span>
        )}
      </div>

      {/* Shoe Interactive Canvas Layout */}
      <div className="pt-8 px-6 flex items-center justify-center relative h-56 shrink-0 bg-white/[0.01]">
        {/* Decorative dynamic neon beam behind shoe */}
        <div
          className="absolute w-28 h-28 rounded-full blur-[45px] opacity-20 group-hover:opacity-40 transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: shoe.accentHex }}
        />

        {/* Shoe Image with realistic micro hover translation */}
        <img
          src={shoe.image}
          alt={shoe.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transform -rotate-12 group-hover:rotate-[-6deg] group-hover:scale-105 duration-300 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] group-hover:drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Shoe Meta & Details */}
      <div className="p-6 pt-2 flex-1 flex flex-col justify-between relative z-10">
        <div className="space-y-2">
          {/* Rating, Series and Category */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
              {shoe.series}
            </span>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              <span className="text-[10px] font-bold text-white leading-none">
                {shoe.rating}
              </span>
              <div className="flex leading-none">
                {renderStars(shoe.rating)[0]} {/* Show single star for space efficiency */}
              </div>
            </div>
          </div>

          {/* Shoe Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight line-clamp-1">
            {shoe.name}
          </h3>

          {/* Colors and Specs Selectors shown on Hover / Focus */}
          <div className="flex items-center justify-between pt-1 h-6">
            {/* Sizing Chips preview or single color name */}
            <p className="text-xs text-gray-400 truncate w-36">
              {selectedColor}
            </p>

            {/* Custom Color Circle Selection Buttons */}
            <div className="flex items-center gap-1.5">
              {shoe.colorOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(opt.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === opt.name
                      ? "border-white scale-120 shadow-[0_0_8px_white]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: opt.hex }}
                  title={opt.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Button & Sizing block */}
        <div className="space-y-3.5 pt-3 border-t border-white/5">
          {/* Quick Shoe Sizing Horizontal list */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500">
              Select Size (US)
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[150px]">
              {shoe.sizes.slice(1, 5).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`w-6 h-6 rounded-md text-[10px] font-bold font-mono border transition-all flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing + Quick Add Button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-gray-500 leading-none">
                Aura Price
              </p>
              <p className="text-xl font-black text-white mt-1">
                ${shoe.price}
              </p>
            </div>

            <button
              onClick={handleQuickAdd}
              className={`relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-300 py-2.5 font-bold cursor-pointer select-none border border-white/5 ${
                addedSuccessfully
                  ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : `text-white bg-white/5 hover:bg-white hover:text-black border-white/15 h-10`
              }`}
            >
              {addedSuccessfully ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Buy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
