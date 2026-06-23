export interface Shoe {
  id: string;
  name: string;
  series: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  color: string;
  accentClass: string; // Tailwind class, e.g., 'cyan' to construct dynamic classes or inline colors
  accentHex: string;   // Exact hex color for precise glowing effects
  glowClass: string;   // shadow-cyan-500/40
  sizes: number[];
  colorOptions: { name: string; hex: string }[];
  isNewArrival?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  comment: string;
  shoeWorn: string;
}
