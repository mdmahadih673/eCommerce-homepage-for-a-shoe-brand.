import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: string, size: number, color: string) => void;
  onUpdateQuantity: (id: string, size: number, color: string, qty: number) => void;
  onClearCart: () => void;
  onCheckoutComplete: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onCheckoutComplete,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "processing" | "success">("cart");

  const subtotal = cart.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const discountRate = discountApplied ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const deliveryCost = 0; // Free global priority shipping
  const total = subtotal - discountAmount + deliveryCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "AURACLUB-15") {
      setDiscountApplied(true);
    } else {
      alert("Invalid code. Try using 'AURACLUB-15'.");
    }
  };

  const handleMockCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("processing");

    // Simulate 2 seconds transaction security check
    setTimeout(() => {
      setCheckoutStep("success");
    }, 2200);
  };

  const handleFinishSuccess = () => {
    // Clear cart, close and reset steps
    onClearCart();
    setCheckoutStep("cart");
    setDiscountApplied(false);
    setCouponCode("");
    onCheckoutComplete();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={checkoutStep === "processing" ? undefined : onClose}
            className="fixed inset-0 bg-[#000000] z-50 pointer-events-auto"
          />

          {/* Cart Sliding Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#050505] border-l border-white/10 z-50 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between"
          >
            {/* Header section of Drawer */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h3 className="font-sans font-bold text-lg text-white uppercase tracking-wider">
                  Your Secured Cart
                </h3>
              </div>
              <button
                onClick={checkoutStep === "processing" ? undefined : onClose}
                disabled={checkoutStep === "processing"}
                className="p-1.5 rounded-full hover:bg-white/5 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Core Body Container with state switching */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {checkoutStep === "cart" ? (
                /* Item list or empty screen */
                cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 text-gray-500 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-white uppercase">Your cart is empty</p>
                      <p className="text-gray-400 text-xs max-w-xs">
                        Select your sizing options on any premium product and click "Add to Cart" to outfit your collection.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.shoe.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex gap-4 relative group"
                      >
                        {/* Shimmer overlay on item hover */}
                        <div className="w-16 h-16 rounded-xl bg-white/5 p-1.5 flex items-center justify-center shrink-0 overflow-hidden relative border border-white/5">
                          <img
                            src={item.shoe.image}
                            alt={item.shoe.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain transform -rotate-12 scale-110 group-hover:scale-120 duration-300"
                          />
                        </div>

                        {/* Text info and pricing controls */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-bold text-white truncate uppercase tracking-tight">
                              {item.shoe.name}
                            </h4>
                            <button
                              onClick={() =>
                                onRemoveFromCart(
                                  item.shoe.id,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-all cursor-pointer shrink-0"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-0.5">
                            Color: <span className="text-gray-200">{item.selectedColor}</span> | Size: <span className="text-gray-200">{item.selectedSize}</span>
                          </p>

                          {/* Controls bar */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity adjusting toggle */}
                            <div className="flex items-center gap-1.5 bg-white/5 rounded-lg border border-white/5 px-1 py-0.5">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.shoe.id,
                                    item.selectedSize,
                                    item.selectedColor,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-5 text-center font-mono select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.shoe.id,
                                    item.selectedSize,
                                    item.selectedColor,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <p className="text-sm font-black text-orange-500">
                              ${item.shoe.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : checkoutStep === "processing" ? (
                /* Secured payment loading step */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                  <div className="relative">
                    {/* Glowing spinner animations */}
                    <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-orange-500 animate-spin" />
                    <CreditCard className="w-6 h-6 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-bold text-white uppercase tracking-wider text-sm">
                      Securing Transaction...
                    </p>
                    <p className="text-gray-400 text-xs max-w-xs">
                      Connecting with 256-bit encrypted bank terminal. Safeguarding card authorization credentials.
                    </p>
                  </div>
                </div>
              ) : (
                /* Success screen */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-bounce">
                    <ShieldCheck className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-white uppercase tracking-wider text-lg">
                      Purchase Complete
                    </p>
                    <p className="text-gray-400 text-xs max-w-sm">
                      Your premium sequence ID card and NFC secure key tag have been recorded under <span className="text-white font-mono">AURA-SEC-{(Math.random()*10000).toFixed(0)}</span>. A tracking dispatch link will hit your email shortly.
                    </p>
                  </div>
                  <button
                    onClick={handleFinishSuccess}
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer"
                  >
                    Generate Air Ticket
                  </button>
                </div>
              )}
            </div>

            {/* Bottom section (Receipt, coupon, order submit) - hidden during checkout step animations on success/pending */}
            {checkoutStep === "cart" && cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/80 space-y-4">
                {/* Coupon application form */}
                {!discountApplied ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="GIFT / VIP VOUCHER"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white text-gray-300 hover:text-black font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer border border-white/5 font-mono"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/25 flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-emerald-400">
                      15% VIP Club Applied
                    </span>
                    <button
                      onClick={() => setDiscountApplied(false)}
                      className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotals receipts summary */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Retail Value</span>
                    <span>${subtotal}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>VIP Privilege Discount</span>
                      <span>-${discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Priority Dispatch (Global)</span>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider">Free</span>
                  </div>
                  <div className="border-t border-white/10 my-1 pb-1" />
                  <div className="flex items-center justify-between text-white font-bold font-sans text-sm">
                    <span>AURA TOTAL VALUE</span>
                    <span className="text-orange-500 text-lg font-black">${total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleMockCheckout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 duration-200 shadow-[0_0_25px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Secure checkout <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[9px] text-gray-500 font-mono tracking-wider text-center flex items-center justify-center gap-1">
                  🔒 256-Bit SSL Secured Network. Verified compliance.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
