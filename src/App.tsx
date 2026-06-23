import { useState, useEffect } from "react";
import { Sparkles, ShoppingBag, Eye, Heart, HelpCircle, ArrowUpRight, ArrowRight, Grid, Zap, Flame, CreditCard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Shoe, CartItem } from "./types";
import { PRODUCTS } from "./data";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ProductCard from "./components/ProductCard";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductDetailsModal from "./components/ProductDetailsModal";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "popular" | "performance">("all");
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" }[]>([]);

  // Smooth element viewport scroll function
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add notification to stack
  const addToast = (message: string, type: "success" | "info" = "success") => {
    const id = (Math.random() * 1000).toFixed(0);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Add to Cart Logic: checks unique model + sizing option + selected colorway
  const handleAddToCart = (shoe: Shoe, size: number, color: string) => {
    setCart((prevCart) => {
      const matchIndex = prevCart.findIndex(
        (item) =>
          item.shoe.id === shoe.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (matchIndex > -1) {
        // Increment quantity of existing match
        const copy = [...prevCart];
        copy[matchIndex].quantity += 1;
        addToast(`Incremented ${shoe.name} (${color}, US ${size}) to Cart!`, "info");
        return copy;
      } else {
        // Push brand new item specification
        addToast(`Added ${shoe.name} (US ${size}) to Cart!`, "success");
        return [...prevCart, { shoe, selectedSize: size, selectedColor: color, quantity: 1 }];
      }
    });
  };

  // Removing items from cart state
  const handleRemoveFromCart = (id: string, size: number, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.shoe.id === id && item.selectedSize === size && item.selectedColor === color)
      )
    );
    addToast("Removed item from secured bag.", "info");
  };

  // Modifying item counters direct from cart side panels
  const handleUpdateQuantity = (id: string, size: number, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.shoe.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Client side clear cart trigger
  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutComplete = () => {
    addToast("Authorization authorized! Generating membership codes...", "success");
  };

  // Filter lists matching active filter chip
  const filteredProducts = PRODUCTS.filter((shoe) => {
    if (activeFilter === "new") return shoe.isNewArrival;
    if (activeFilter === "popular") return shoe.isPopular;
    if (activeFilter === "performance") return shoe.series.toLowerCase().includes("running") || shoe.series.toLowerCase().includes("trainer");
    return true; // "all"
  });

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden antialiased">
      {/* Dynamic Backgound Ambient Neon Blurs */}
      <div className="absolute top-0 inset-x-0 w-full h-[1000px] bg-gradient-to-b from-[#050505]/10 via-[#000000] to-transparent pointer-events-none z-0" />

      {/* Primary Navigation System Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onRemoveFromCart={handleRemoveFromCart}
        onNavigateToSection={handleScrollToSection}
        onCheckout={() => {
          setIsCartOpen(true);
          addToast("Secure Checkout requested.", "info");
        }}
      />

      {/* Main Container Content */}
      <main className="relative z-10">
        {/* Module 1: Stunning AutoSlider Hero */}
        <HeroSlider
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenDetails={(shoe) => setSelectedShoe(shoe)}
        />

        {/* Module 2: The Core Product Collection Grid (Below Hero Slider) */}
        <section id="collection" className="py-24 max-w-7xl mx-auto px-6 relative">
          {/* Subtle horizontal break */}
          <div className="w-full h-px bg-white/5 mb-16" />

          {/* Catalog Metadata Section header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 p-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#f97316]">
                <Grid className="w-3.5 h-3.5" />
                <span>The Infinite Index</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
                Curated Sneaker Capsules
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                Durable structures engineered to defy standard velocity logs. Access high performance running nodes or luxurious hand-burnished casual suedes.
              </p>
            </div>

            {/* Responsive Filter Categories Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-2xl">
              {(
                [
                  { id: "all", label: "All Models" },
                  { id: "new", label: "New drops" },
                  { id: "popular", label: "Most Coveted" },
                  { id: "performance", label: "Performance" },
                ] as const
              ).map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setActiveFilter(chip.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                    activeFilter === chip.id
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((shoe) => (
                <ProductCard
                  key={shoe.id}
                  shoe={shoe}
                  onAddToCart={handleAddToCart}
                  onOpenDetails={(s) => { setSelectedShoe(s); }}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Secondary Banner highlighting store memberships */}
          <div className="mt-20 p-8 sm:p-12 rounded-[32px] glass-panel bg-[#050505]/95 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            {/* Visual shine card sweep */}
            <div className="absolute top-0 left-0 w-full h-full bg-aurora opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-orange-400/5 blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl text-left relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-[9px] uppercase font-mono tracking-widest text-orange-400">
                <Sparkles className="w-3 h-3 animate-pulse" /> Limited Release
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                Unlock AURA Vault Privilege Allocations
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Vault members secure instant eligibility access to upcoming micro-production drops including carbon filament silhouettes and metallic plating collaborations. Register to lock in prioritizations.
              </p>
            </div>

            <button
              onClick={() => handleScrollToSection("newsletter")}
              className="px-6 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer shrink-0 inline-flex items-center gap-2 group self-start sm:self-auto"
            >
              <span>Verify Entry Credentials</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
            </button>
          </div>
        </section>

        {/* Module 3: Why Choose Us (Anatomical Advantage) */}
        <WhyChooseUs />

        {/* Module 4: Testimonials Panel Slider */}
        <Testimonials />

        {/* Module 5: Subscription Newsletter Access Club */}
        <Newsletter />
      </main>

      {/* Main Structural Footer */}
      <Footer onNavigateToSection={handleScrollToSection} />

      {/* Cart Navigation Overlay Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Immersive Product Details Overlay modal */}
      <ProductDetailsModal
        shoe={selectedShoe}
        onClose={() => setSelectedShoe(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global floating system-designed micro-toasts feedback pile */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className="p-4 rounded-2xl glass-panel bg-[#070707]/95 border-l-2 border-l-orange-500 border-white/10 flex items-center justify-between gap-3 shadow-2xl"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-tight">{toast.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
