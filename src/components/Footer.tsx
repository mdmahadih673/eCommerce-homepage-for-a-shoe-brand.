import React from "react";
import { Instagram, Facebook, Twitter, Shield, Heart, HelpCircle, FileText, Gift } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE } from "../data";

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToSection }: FooterProps) {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="w-4 h-4" />, href: "#" },
    { name: "Facebook", icon: <Facebook className="w-4 h-4" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="w-4 h-4" />, href: "#" }
  ];

  const sitemaps = [
    {
      title: "Storefront",
      links: [
        { label: "New Arrivals", target: "collection" },
        { label: "Performance Sneakers", target: "collection" },
        { label: "Lifestyle Suede", target: "collection" },
        { label: "Premium Court", target: "collection" }
      ]
    },
    {
      title: "Navigation",
      links: [
        { label: "Home Base", target: "home" },
        { label: "Anatomical Features", target: "features" },
        { label: "Stylist Reviews", target: "testimonials" },
        { label: "VIP Collective", target: "newsletter" }
      ]
    },
    {
      title: "Assistance",
      links: [
        { label: "Standard Shipping Policy", target: "features" },
        { label: "30-Day Courier Returns", target: "features" },
        { label: "VIP Club Register", target: "newsletter" }
      ]
    }
  ];

  return (
    <footer className="bg-black text-gray-400 font-sans border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Pillar */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-5">
            <button
              onClick={() => onNavigateToSection("home")}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span className="font-sans font-extrabold text-2xl tracking-widest text-white tracking-widest transition-all group-hover:text-orange-500 border-none bg-transparent">
                AURA<span className="text-orange-500 font-normal">.</span>
              </span>
            </button>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {BRAND_TAGLINE}. We merge advanced scientific structures with elite styling to fabricate premium responsive sneakers designed for the next generation of city navigators.
            </p>
            {/* Social channels */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all text-white"
                  title={`Follow us on ${social.name}`}
                  aria-label={`Follow AURA on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sitemaps links list */}
          {sitemaps.map((group) => (
            <div key={group.title} className="col-span-1 lg:col-span-2 space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white font-mono">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigateToSection(link.target)}
                      className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer text-left border-none bg-transparent"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Luxury Certification Stamp */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-white font-mono">
              Certification
            </h3>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 text-left">
              <div className="flex items-center gap-2 text-orange-500">
                <Shield className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider">AURA Authentic</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-normal">
                Each parcel ships with an encrypted NFC certificate of authenticity ensuring premium craftsmanship compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500 font-mono text-center md:text-left select-none">
            &copy; {new Date().getFullYear()} {BRAND_NAME} INC. ALL RIGHTS RESERVED. DESIGNED FOR THE FUTURE.
          </p>

          {/* Support items */}
          <div className="flex items-center gap-6 overflow-x-auto max-w-full text-[10px] uppercase font-mono tracking-wider">
            <span className="flex items-center gap-1 text-gray-500">
              <Gift className="w-3.5 h-3.5 text-orange-400" />
              Member: Active
            </span>
            <span className="text-gray-500">
              Region: Global USD ($)
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              Created with
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              by Aura Systems
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
