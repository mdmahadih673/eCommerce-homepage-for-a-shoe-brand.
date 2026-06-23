import React from "react";
import { Zap, Wind, Truck, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { WHY_CHOOSE_US } from "../data";

export default function WhyChooseUs() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Zap":
        return <Zap className="w-6 h-6 text-orange-500" />;
      case "Wind":
        return <Wind className="w-6 h-6 text-amber-400" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-orange-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      default:
        return <Zap className="w-6 h-6 text-orange-500" />;
    }
  };

  const getCardBorderHoverClass = (name: string) => {
    switch (name) {
      case "Zap":
        return "hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]";
      case "Wind":
        return "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]";
      case "Truck":
        return "hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]";
      case "ShieldCheck":
        return "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]";
      default:
        return "hover:border-orange-500/30";
    }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black">
      {/* Decorative side blurs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#f97316]"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>High Performance Engineering</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white uppercase leading-tight"
          >
            The AURA Anatomical Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            We merge aerospace materials with biological shock absorption to outline a faster, lighter, and more secure stride.
          </motion.p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`p-6 rounded-3xl glass-panel bg-[#050505]/95 border border-white/5 flex flex-col justify-between h-64 transition-all duration-300 transform hover:-translate-y-1 ${getCardBorderHoverClass(
                item.iconName
              )} group`}
            >
              {/* Icon Holder */}
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                {getIcon(item.iconName)}
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mt-8">
                <h3 className="text-base font-bold text-white transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
