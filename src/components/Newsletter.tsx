import React, { useState } from "react";
import { Send, Check, Sparkles, Copy, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const promoCode = "AURACLUB-15";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <section id="newsletter" className="py-24 relative overflow-hidden bg-black">
      {/* Background ambient mesh gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-900/10 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-900/10 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="glass-panel bg-black/95 border border-white/5 p-8 sm:p-14 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle background abstract shapes */}
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full border border-white/[0.03]" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-white/[0.03]" />

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.div
                key="subscribe"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                    <Mail className="w-5 h-5 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                    Join the Aura Collective
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                    Subscribe to receive immediate priority notifications for designer shoe drops, access invitations to AURA Member events, and get 15% off your first purchase.
                  </p>
                </div>

                {/* Subscription input form */}
                <form
                  onSubmit={handleSubscribe}
                  className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row gap-3 relative z-10"
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all uppercase tracking-wide text-center sm:text-left"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 duration-200 shadow-[0_0_20px_rgba(249,115,22,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Send Invite</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <p className="text-[10px] text-gray-500 font-mono tracking-wider">
                  WE RESPECT YOUR PRIVACY. ZERO SPAM. SECURE ENCRYPTED NETWORK.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check className="w-7 h-7 stroke-[3] animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    Welcome to the Circle
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                    A verification voucher code has been successfully recorded for <span className="text-white font-mono">{email}</span>. Use the custom code below during checkout to activate your 15% VIP discount.
                  </p>
                </div>

                {/* Copy Voucher block */}
                <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 text-left font-mono leading-none">
                      Your Coupon Code
                    </p>
                    <p className="text-lg font-black text-white mt-1 leading-none font-mono">
                      {promoCode}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2"
                    title="Copy promo code"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-400 font-mono">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase font-mono text-gray-400 group-hover:text-white">COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-gray-500 font-mono select-none">
                  Voucher valid on performance and luxury collections for 30 days.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
