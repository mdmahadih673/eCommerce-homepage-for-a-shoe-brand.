import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onRemoveFromCart: (id: string, size: number, color: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onCheckout: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  onRemoveFromCart,
  onNavigateToSection,
  onCheckout,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  // Scroll effect for navbar glass state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.shoe.price * item.quantity,
    0
  );

  const navLinks = [
    { name: "Home", target: "home" },
    { name: "Collection", target: "collection" },
    { name: "Features", target: "features" },
    { name: "Reviews", target: "testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigateToSection("home")}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="font-sans font-extrabold text-2xl tracking-widest text-white transition-all group-hover:text-orange-500">
            AURA<span className="text-orange-500 font-light group-hover:text-white">.</span>
          </span>
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => onNavigateToSection(link.target)}
              className="text-sm font-medium text-gray-300 hover:text-white uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => onNavigateToSection("newsletter")}
            className="text-xs px-4 py-2 rounded-full border border-gray-800 text-gray-300 hover:text-white hover:border-orange-500 bg-transparent transition-all duration-300 uppercase tracking-widest cursor-pointer hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            Access Club
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-4 relative">
          {/* Cart Icon trigger button */}
          <div
            className="relative"
            onMouseEnter={() => setShowMiniCart(true)}
            onMouseLeave={() => setShowMiniCart(false)}
          >
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full glass-panel hover:border-orange-500 text-white transition-all duration-200 cursor-pointer select-none"
              id="cart-trigger-button"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-sans font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.7)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Micro Mini Cart Dropdown on hover */}
            <AnimatePresence>
              {showMiniCart && totalItems > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="hidden md:block absolute right-0 mt-2.5 w-80 glass-panel bg-[#050505]/95 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 p-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="font-medium text-xs text-orange-500 uppercase tracking-widest">
                      Cart Preview ({totalItems})
                    </span>
                    <button
                      onClick={onOpenCart}
                      className="text-[11px] text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-0.5"
                    >
                      View Full <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-3 scrollbar-thin pr-1">
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.shoe.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                        className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#161230] p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.shoe.image}
                            alt={item.shoe.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain transform -rotate-12 scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {item.shoe.name}
                          </h4>
                          <p className="text-[10px] text-gray-400">
                            Size: {item.selectedSize} | Qty: {item.quantity}
                          </p>
                          <p className="text-[11px] font-bold text-orange-500 mt-0.5">
                            ${item.shoe.price * item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            onRemoveFromCart(
                              item.shoe.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-3 mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400">Subtotal</p>
                      <p className="font-bold text-sm text-white">
                        ${cartSubtotal}
                      </p>
                    </div>
                    <button
                      onClick={onCheckout}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.4)] cursor-pointer"
                    >
                      Checkout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger Menu on Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full glass-panel border border-white/5 text-white hover:border-orange-500 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 animate-spin w-5 h-5" style={{ animationDuration: "12s" }} />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Grid */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-[#05031b]/95 border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => {
                    onNavigateToSection(link.target);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-bold text-gray-300 hover:text-orange-500 uppercase tracking-widest py-2 border-b border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigateToSection("newsletter");
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black text-xs font-bold uppercase tracking-widest hover:brightness-110 duration-200"
              >
                Access VIP Club
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
