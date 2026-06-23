import { Shoe, Testimonial } from "./types";

export const BRAND_NAME = "AURA";
export const BRAND_TAGLINE = "Elevate Your Stride, Command the Future";

export const PRODUCTS: Shoe[] = [
  {
    id: "aura-nebula-x",
    name: "AURA Nebula-X",
    series: "Quantum Running",
    description: "Futuristic athletic running sneaker with pressurized nitrogen-infused foam nodes and dynamic carbon-fiber stabilizing shank.",
    longDescription: "Engineered for high-performing athletes who demand speed and style. The Nebula-X features our revolutionary Aura-Nitrogen midsole, ensuring 45% more energy return. The responsive side-stabilizing structure wraps your foot in adaptive heat-mapped mesh, finished with a glowing cybernetic look.",
    price: 220,
    rating: 4.9,
    reviewsCount: 128,
    image: "/src/assets/images/aura_nebula_x_1782226775187.jpg",
    color: "Neon Blue / Core Gray",
    accentClass: "cyan",
    accentHex: "#06b6d4",
    glowClass: "shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]",
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colorOptions: [
      { name: "Cyan Core", hex: "#06b6d4" },
      { name: "Apex White", hex: "#ffffff" },
      { name: "Stealth Black", hex: "#111827" }
    ],
    isNewArrival: true,
    isPopular: true
  },
  {
    id: "aura-monarch-dusk",
    name: "AURA Monarch Dusk",
    series: "Ultra Lifestyle",
    description: "Premium low-profile designer silhouette featuring hand-burnished gray suede and sunset copper hardware.",
    longDescription: "The Monarch Dusk defines contemporary luxury. Handmade with custom artisan suede panels, this lifestyle shoe features an ergonomically sculpted dual-density cupsole and custom micro-textured copper elements. It is an editorial masterpiece built for the urban connoisseur.",
    price: 260,
    rating: 4.8,
    reviewsCount: 94,
    image: "/src/assets/images/aura_monarch_dusk_1782226790345.jpg",
    color: "Sunset Copper / Dark Charcoal",
    accentClass: "amber",
    accentHex: "#f59e0b",
    glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]",
    sizes: [8, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colorOptions: [
      { name: "Sunset Orange", hex: "#f59e0b" },
      { name: "Gold Dust", hex: "#d97706" },
      { name: "Obsidian", hex: "#030712" }
    ],
    isNewArrival: false,
    isPopular: true
  },
  {
    id: "aura-ghost-carbon",
    name: "AURA Ghost Carbon",
    series: "Hyper Stealth",
    description: "Midnight stealth edition running shoe structured with complex graphite weaving and deep violet glow plates.",
    longDescription: "Crafted for maximum speed and concealment under low light. The Ghost Carbon weaves high-grade graphite threads into a ultra-lightweight one-piece knit upper. Underneath lies an active TPU energy-redirection plate that pulses with micro-bounce technology. Highly responsive and absolutely striking.",
    price: 195,
    rating: 5.0,
    reviewsCount: 142,
    image: "/src/assets/images/aura_ghost_carbon_1782226805903.jpg",
    color: "Stealth Violet / Triple Black",
    accentClass: "purple",
    accentHex: "#a855f7",
    glowClass: "shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]",
    sizes: [7.5, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    colorOptions: [
      { name: "Ghost Violet", hex: "#a855f7" },
      { name: "Pitch Black", hex: "#000000" },
      { name: "Crimson Eclipse", hex: "#dc2626" }
    ],
    isNewArrival: true,
    isPopular: false
  },
  {
    id: "aura-apex-crimson",
    name: "AURA Apex Crimson",
    series: "Elite Court",
    description: "High-octane scarlet basketball court shoe with carbon ankle containment sleeves and chrome plating.",
    longDescription: "Dominating both court and blacktop, the Apex Crimson features full-grain reinforced leather side wings, deep ankle shock-containment pads, and a highly polished metallic hot crimson chrome outsole insert. Feel uninhibited acceleration and unmatched stability.",
    price: 240,
    rating: 4.7,
    reviewsCount: 86,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    color: "Scarlet Red / Eclipse Black",
    accentClass: "rose",
    accentHex: "#f43f5e",
    glowClass: "shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)]",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colorOptions: [
      { name: "Hyper Red", hex: "#f43f5e" },
      { name: "Neon Orange", hex: "#ff5722" },
      { name: "Obsidian", hex: "#1f2937" }
    ],
    isNewArrival: false,
    isPopular: true
  },
  {
    id: "aura-hyper-volt",
    name: "AURA Hyper-Volt",
    series: "Extreme Trainer",
    description: "Shatter-resistant cross-training shoe featuring electric volt yellow trims and a multi-ground sticky grip out-sole.",
    longDescription: "The Hyper-Volt is engineered to survive explosive multi-directional gym workouts. It features high-visibility acid yellow shock panels, laser-cut side breathability vents, and a low-slung, ultra-wide heel structure to support heavy lifts and rapid side-to-side transitions.",
    price: 180,
    rating: 4.6,
    reviewsCount: 73,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
    color: "Acid Volt / Matte Charcoal",
    accentClass: "lime",
    accentHex: "#84cc16",
    glowClass: "shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_35px_rgba(132,204,22,0.6)]",
    sizes: [7, 8, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colorOptions: [
      { name: "Acid Volt", hex: "#84cc16" },
      { name: "Cyber Green", hex: "#10b981" },
      { name: "Ice White", hex: "#f3f4f6" }
    ],
    isNewArrival: true,
    isPopular: false
  },
  {
    id: "aura-lux-leather",
    name: "AURA Ivory Monarch",
    series: "Heritage Court",
    description: "Heritage low-top styled in double-stitched buttery full-grain ivory leather with real brass eyelets.",
    longDescription: "A glorious modern fusion of heritage performance and luxury minimalism. The Ivory Monarch features buttery-soft full-grain calfskin leather that molds to your foot over time. Balanced with beautiful brass lacing hooks and an embossed logo patch in gold foil, this shoe is a subtle flexing of premium luxury.",
    price: 280,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    color: "Alabaster Ivory / Warm Butter",
    accentClass: "yellow",
    accentHex: "#eab308",
    glowClass: "shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.6)]",
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colorOptions: [
      { name: "Ivory White", hex: "#fef08a" },
      { name: "Wheat Desert", hex: "#f0dfb3" },
      { name: "Ebony Leather", hex: "#27272a" }
    ],
    isNewArrival: false,
    isPopular: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Marcus Vance",
    role: "Professional Track Athlete",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    comment: "The Aura Nebula-X completely changed my running experience. The nitrogen-infused sole feels like walking on energetic clouds, and the energy return is immediately noticeable in my split times.",
    shoeWorn: "AURA Nebula-X"
  },
  {
    id: "t2",
    name: "Sophia Sterling",
    role: "High-Fashion Footwear Stylist",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    comment: "The luxury materials on the Monarch Dusk are second to none. The burnished suede and deep glowing copper accents elevate any streetwear look. It’s an absolute masterpiece in my collection.",
    shoeWorn: "AURA Monarch Dusk"
  },
  {
    id: "t3",
    name: "Ethan Thorne",
    role: "Tech Investor & Designer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    comment: "I love the subtle purple branding and raw graphite design of the Ghost Carbons. They look futuristic in a quiet, incredibly premium way. Absolutely worth the investment.",
    shoeWorn: "AURA Ghost Carbon"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "w1",
    title: "Eco-Conscious Carbon Build",
    description: "Every carbon fiber stabilizer in our performance series is woven from 100% recycled structural graphite filaments.",
    iconName: "Zap"
  },
  {
    id: "w2",
    title: "Aura-Nitrogen Cushioning",
    description: "Midsole technology infused with pressurized nitrogen loops to absorb up to 98% of high-impact concrete shock.",
    iconName: "Wind"
  },
  {
    id: "w3",
    title: "Complimentary Expedited Shipping",
    description: "AURA members receive zero-cost global priority courier delivery and hassle-free returns on all designer items.",
    iconName: "Truck"
  },
  {
    id: "w4",
    title: "Artisan Quality Guaranteed",
    description: "Our luxury lifestyle range is hand-finished with premium double stitching to withstand years of active city navigation.",
    iconName: "ShieldCheck"
  }
];
