/**
 * The Manora catalog. Everything the store sells lives here: the homepage, listings, search,
 * product pages, the cart and checkout all read from this one source, and the server
 * re-prices every order from it, so a price edited in the browser never reaches an order.
 * Prices are integer cents.
 */

export type Color = { name: string; hex: string };
export type Option = { label: string; price: number; compareAt?: number };
export type Review = { author: string; rating: number; title: string; body: string; date: string };

export type Category = { slug: string; name: string; description: string; image: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  images: string[];
  colors: Color[];
  /** Storage / size tiers, each with its own price. Absent = single price. */
  optionName?: string;
  options?: Option[];
  price: number;
  compareAt?: number;
  features: string[];
  specs: [string, string][];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
};

export const categories: Category[] = [
  { slug: "smartphones", name: "Smartphones", description: "Flagship power, pocket-sized.", image: "na-iphone17" },
  { slug: "audio", name: "Audio", description: "Headphones, earbuds and speakers tuned for detail.", image: "cat-buds" },
  { slug: "gaming", name: "Gaming", description: "Controllers and gear for every session.", image: "cat-gamepad" },
  { slug: "tv-home-theater", name: "TV & Home Theater", description: "Cinematic pictures and room-filling sound.", image: "lu-qled" },
  { slug: "computers-tablets", name: "Computers & Tablets", description: "Laptops, tablets and monitors for work and play.", image: "deal-laptop" },
  { slug: "cameras", name: "Cameras", description: "Lenses and cameras for crisp, creative shots.", image: "cat-lens" },
  { slug: "wearables", name: "Wearables & VR", description: "Smartwatches and immersive headsets.", image: "pick-vr" },
];

const black = { name: "Mist Black", hex: "#1f1f1f" };
const blue = { name: "Sky Blue", hex: "#a9c4e4" };
const teal = { name: "Teal", hex: "#b9e0cf" };
const grey = { name: "Grey", hex: "#d9d9d9" };
const white = { name: "Cloud White", hex: "#f2f2f2" };
const cream = { name: "Cream", hex: "#eadfcf" };
const graphite = { name: "Graphite", hex: "#4a4a4a" };

export const products: Product[] = [
  {
    slug: "iphone-17",
    name: "iPhone 17",
    category: "smartphones",
    tagline: "The festive-season flagship.",
    description:
      "Experience cutting-edge performance, a stunning design and powerful new features. iPhone 17 pairs an all-day battery with a pro-grade camera system and a brilliant edge-to-edge display.",
    images: ["products/iphone-17.png"],
    colors: [black, blue, teal],
    optionName: "Storage",
    options: [
      { label: "128 GB", price: 64999 },
      { label: "256 GB", price: 74999 },
      { label: "512 GB", price: 79999, compareAt: 89999 },
    ],
    price: 64999,
    features: ["6.3-inch Super Retina display", "48 MP dual camera", "All-day battery", "USB-C fast charging"],
    specs: [["Display", "6.3\" OLED, 120 Hz"], ["Camera", "48 MP + 12 MP ultra-wide"], ["Battery", "Up to 26 h video"], ["Connectivity", "5G, Wi-Fi 7, Bluetooth 5.4"]],
    rating: 4.8,
    reviewCount: 1284,
    inStock: true,
    featured: true,
    createdAt: "2026-10-01",
  },
  {
    slug: "oneplus-12-pro",
    name: "OnePlus 12 Pro",
    category: "smartphones",
    tagline: "Fast and smooth, at a fair price.",
    description:
      "OnePlus 12 Pro brings a silky 120 Hz display, Hasselblad-tuned cameras and 100 W charging that fills the battery before your coffee cools.",
    images: ["products/oneplus-12-pro.png"],
    colors: [grey, blue, teal],
    optionName: "Storage",
    options: [
      { label: "128 GB", price: 24999, compareAt: 29999 },
      { label: "256 GB", price: 26999, compareAt: 31999 },
    ],
    price: 24999,
    compareAt: 29999,
    features: ["6.8-inch 120 Hz AMOLED", "Hasselblad camera", "100 W SuperVOOC charging", "5,400 mAh battery"],
    specs: [["Display", "6.8\" AMOLED, 120 Hz"], ["Camera", "50 MP triple camera"], ["Charging", "100 W wired, 50 W wireless"], ["Battery", "5,400 mAh"]],
    rating: 4.6,
    reviewCount: 642,
    inStock: true,
    createdAt: "2026-09-20",
  },
  {
    slug: "iphone-16-plus",
    name: "iPhone 16 Plus",
    category: "smartphones",
    tagline: "Bigger screen, bigger battery.",
    description:
      "iPhone 16 Plus gives you a large 6.7-inch display and the longest battery life in its class, with a capable dual camera for everyday moments.",
    images: ["products/iphone-16-plus.png"],
    colors: [teal, blue, black],
    price: 69999,
    compareAt: 79999,
    features: ["6.7-inch Super Retina display", "48 MP main camera", "Camera Control button", "Up to 27 h video"],
    specs: [["Display", "6.7\" OLED"], ["Camera", "48 MP + 12 MP"], ["Battery", "Up to 27 h video"], ["Chip", "A18"]],
    rating: 4.7,
    reviewCount: 903,
    inStock: true,
    createdAt: "2026-09-12",
  },
  {
    slug: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    category: "smartphones",
    tagline: "Built-in S Pen. Titanium strong.",
    description:
      "Galaxy S25 Ultra combines a 200 MP camera, a built-in S Pen and a titanium frame with Galaxy AI features that help you write, translate and edit faster.",
    images: ["products/galaxy-s25-ultra.png"],
    colors: [black, grey, blue],
    optionName: "Storage",
    options: [
      { label: "256 GB", price: 79999 },
      { label: "512 GB", price: 99999, compareAt: 109999 },
    ],
    price: 79999,
    features: ["200 MP quad camera", "Built-in S Pen", "Titanium frame", "Galaxy AI"],
    specs: [["Display", "6.9\" Dynamic AMOLED 2X"], ["Camera", "200 MP + 50 MP + 10 MP + 50 MP"], ["Battery", "5,000 mAh"], ["Frame", "Titanium"]],
    rating: 4.8,
    reviewCount: 1110,
    inStock: true,
    featured: true,
    createdAt: "2026-09-28",
  },
  {
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "smartphones",
    tagline: "Pro cameras, titanium design.",
    description:
      "iPhone 15 Pro Max features a titanium design, a 5x telephoto camera and the Action button, powered by the A17 Pro chip.",
    images: ["products/iphone-15-pro-max.png"],
    colors: [graphite, white, blue],
    price: 89999,
    features: ["5x telephoto zoom", "Titanium design", "Action button", "A17 Pro chip"],
    specs: [["Display", "6.7\" OLED, 120 Hz"], ["Camera", "48 MP triple, 5x telephoto"], ["Chip", "A17 Pro"], ["Frame", "Titanium"]],
    rating: 4.7,
    reviewCount: 2210,
    inStock: true,
    createdAt: "2026-06-02",
  },
  {
    slug: "galaxy-s24-fe",
    name: "Galaxy S24 FE",
    category: "smartphones",
    tagline: "The fan favourite, refreshed.",
    description:
      "Galaxy S24 FE brings flagship features like a 50 MP camera and Galaxy AI to a more affordable price.",
    images: ["products/galaxy-s24-fe.png"],
    colors: [graphite, blue, teal],
    price: 49999,
    features: ["6.7-inch 120 Hz display", "50 MP triple camera", "Galaxy AI", "IP68 water resistance"],
    specs: [["Display", "6.7\" AMOLED, 120 Hz"], ["Camera", "50 MP triple"], ["Battery", "4,700 mAh"], ["Durability", "IP68"]],
    rating: 4.5,
    reviewCount: 488,
    inStock: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "galaxy-z-fold-7",
    name: "Galaxy Z Fold 7",
    category: "smartphones",
    tagline: "Innovation in your hands.",
    description:
      "Experience futuristic multitasking, an ultra-smooth foldable display and cutting-edge performance with the new Galaxy Z Fold 7.",
    images: ["products/galaxy-z-fold-7.png"],
    colors: [{ name: "Slate Blue", hex: "#5b7f9e" }, black, grey],
    optionName: "Storage",
    options: [
      { label: "256 GB", price: 179999, compareAt: 199999 },
      { label: "512 GB", price: 191999 },
      { label: "1 TB", price: 215999 },
    ],
    price: 179999,
    features: ["7.6-inch foldable main display", "Three-app multitasking", "200 MP main camera", "Thinnest Fold yet"],
    specs: [["Main display", "7.6\" foldable AMOLED"], ["Cover display", "6.5\" AMOLED"], ["Camera", "200 MP triple"], ["Weight", "215 g"]],
    rating: 4.6,
    reviewCount: 314,
    inStock: true,
    featured: true,
    createdAt: "2026-10-20",
  },
  {
    slug: "hyperview-smartphone",
    name: "HyperView Smartphone",
    category: "smartphones",
    tagline: "Our own flagship, edge to edge.",
    description:
      "The Manora HyperView puts a bezel-less display, a clean Android experience and three years of updates in a lightweight, comfortable body.",
    images: ["products/hyperview-smartphone.png"],
    colors: [black, white],
    price: 79999,
    compareAt: 89999,
    features: ["6.5-inch edge-to-edge display", "Clean Android, 3 years of updates", "Dual SIM", "Wireless charging"],
    specs: [["Display", "6.5\" OLED"], ["Storage", "256 GB"], ["Battery", "4,800 mAh"], ["Charging", "45 W wired, 15 W wireless"]],
    rating: 4.4,
    reviewCount: 176,
    inStock: true,
    createdAt: "2026-07-10",
  },
  {
    slug: "airbeats-pro-buds",
    name: "AirBeats Pro Buds",
    category: "audio",
    tagline: "Pocket-sized sound perfection.",
    description:
      "AirBeats Pro Buds deliver rich, balanced sound with adaptive noise cancellation, transparency mode and up to 30 hours of listening with the case.",
    images: ["products/airbeats-pro-buds.png", "products/airbeats-pro-buds-b.png"],
    colors: [white, black],
    price: 14999,
    compareAt: 19999,
    features: ["Adaptive noise cancellation", "Transparency mode", "30 h with case", "Sweat and water resistant"],
    specs: [["Battery", "6 h buds, 30 h with case"], ["Charging", "USB-C and wireless"], ["Water resistance", "IPX4"], ["Bluetooth", "5.3"]],
    rating: 4.7,
    reviewCount: 3021,
    inStock: true,
    featured: true,
    createdAt: "2026-10-05",
  },
  {
    slug: "cylinder-audio-core",
    name: "Cylinder Audio Core",
    category: "audio",
    tagline: "360° sound for any room.",
    description:
      "Cylinder Audio Core fills a room with 360° sound, works with your voice assistant and groups with other Manora speakers for whole-home audio.",
    images: ["products/cylinder-audio-core.png"],
    colors: [grey, white, black],
    price: 29999,
    features: ["360° sound", "Voice assistant built in", "Multi-room grouping", "Wi-Fi and Bluetooth"],
    specs: [["Drivers", "1 woofer, 3 tweeters"], ["Connectivity", "Wi-Fi 6, Bluetooth 5.2"], ["Height", "18 cm"], ["Power", "AC adapter"]],
    rating: 4.5,
    reviewCount: 712,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    slug: "manora-studio-anc",
    name: "Manora Studio ANC",
    category: "audio",
    tagline: "Next-gen noise cancellation.",
    description:
      "Manora Studio ANC headphones combine plush memory-foam cushions, studio-tuned drivers and next-gen noise cancellation for focus anywhere.",
    images: ["products/manora-studio-anc.png"],
    colors: [cream, black, blue],
    price: 34999,
    compareAt: 44999,
    features: ["Next-gen noise cancellation", "40 h battery", "Memory-foam cushions", "Multipoint Bluetooth"],
    specs: [["Battery", "Up to 40 h"], ["Drivers", "40 mm dynamic"], ["Weight", "250 g"], ["Charging", "USB-C, 10 min = 5 h"]],
    rating: 4.8,
    reviewCount: 1906,
    inStock: true,
    featured: true,
    createdAt: "2026-10-12",
  },
  {
    slug: "sonicwave-headphones",
    name: "SonicWave Headphones",
    category: "audio",
    tagline: "Deep bass, all-day comfort.",
    description:
      "SonicWave over-ear headphones deliver deep, punchy bass and crisp highs, with a foldable design that travels well.",
    images: ["products/sonicwave-headphones.png"],
    colors: [black, graphite],
    price: 79999,
    compareAt: 99999,
    features: ["Hi-Res Audio certified", "Active noise cancellation", "Foldable design", "30 h battery"],
    specs: [["Battery", "Up to 30 h"], ["Drivers", "50 mm"], ["Codec", "LDAC, AAC"], ["Weight", "265 g"]],
    rating: 4.6,
    reviewCount: 458,
    inStock: true,
    createdAt: "2026-07-22",
  },
  {
    slug: "q-series-soundbar",
    name: "Q-Series Soundbar",
    category: "tv-home-theater",
    tagline: "Cinema sound without the clutter.",
    description:
      "The Q-Series Soundbar delivers Dolby Atmos surround with a wireless subwoofer, and pairs automatically with Manora TVs.",
    images: ["products/q-series-soundbar.png"],
    colors: [black],
    price: 39999,
    compareAt: 49999,
    features: ["Dolby Atmos", "Wireless subwoofer", "HDMI eARC", "Night mode"],
    specs: [["Channels", "5.1.2"], ["Power", "430 W"], ["Connectivity", "HDMI eARC, Wi-Fi, Bluetooth"], ["Width", "98 cm"]],
    rating: 4.5,
    reviewCount: 389,
    inStock: true,
    createdAt: "2026-09-05",
  },
  {
    slug: "neo-qled-8k",
    name: "Neo QLED 8K",
    category: "tv-home-theater",
    tagline: "Every detail, in 8K.",
    description:
      "Neo QLED 8K uses Quantum Mini LEDs and AI upscaling to bring breathtaking contrast and detail to everything you watch.",
    images: ["products/neo-qled-8k.png"],
    colors: [black],
    optionName: "Size",
    options: [
      { label: "65\"", price: 249999 },
      { label: "75\"", price: 329999 },
    ],
    price: 249999,
    features: ["8K resolution", "Quantum Mini LED", "AI upscaling", "120 Hz gaming mode"],
    specs: [["Resolution", "7680 × 4320"], ["Refresh rate", "120 Hz"], ["HDR", "HDR10+, HLG"], ["Ports", "4 × HDMI 2.1"]],
    rating: 4.7,
    reviewCount: 97,
    inStock: false,
    createdAt: "2026-10-25",
  },
  {
    slug: "smart-tv",
    name: "Manora Smart TV",
    category: "tv-home-theater",
    tagline: "Unmatched visual clarity.",
    description:
      "Manora Smart TV delivers crisp, vibrant 4K visuals and fast refresh rates, with all your streaming apps built in.",
    images: ["products/smart-tv.png"],
    colors: [black],
    optionName: "Size",
    options: [
      { label: "50\"", price: 69999 },
      { label: "55\"", price: 89999 },
      { label: "65\"", price: 119999 },
    ],
    price: 69999,
    features: ["4K UHD", "Built-in streaming apps", "Voice remote", "Game mode"],
    specs: [["Resolution", "3840 × 2160"], ["Refresh rate", "60 Hz (120 Hz on 65\")"], ["HDR", "HDR10, HLG"], ["Ports", "3 × HDMI"]],
    rating: 4.4,
    reviewCount: 521,
    inStock: true,
    createdAt: "2026-08-20",
  },
  {
    slug: "smart-monitor-m7",
    name: "Smart Monitor M7",
    category: "computers-tablets",
    tagline: "A monitor that's also a TV.",
    description:
      "Smart Monitor M7 is a 32-inch 4K display with built-in streaming and remote-desktop apps, so it works as a monitor, a TV and a workspace.",
    images: ["products/smart-monitor-m7.png"],
    colors: [white, black],
    price: 44999,
    features: ["32-inch 4K UHD", "Built-in streaming apps", "USB-C 65 W", "Remote access to PC"],
    specs: [["Size", "32\""], ["Resolution", "3840 × 2160"], ["Ports", "USB-C 65 W, 2 × HDMI"], ["Speakers", "2 × 5 W"]],
    rating: 4.3,
    reviewCount: 266,
    inStock: true,
    createdAt: "2026-09-01",
  },
  {
    slug: "fusioncore-laptop",
    name: "FusionCore Laptop",
    category: "computers-tablets",
    tagline: "Power that fits in a backpack.",
    description:
      "FusionCore is a thin, light laptop with a vivid display, a fast processor and a battery that lasts the whole working day.",
    images: ["products/fusioncore-laptop.png"],
    colors: [graphite, grey],
    optionName: "Memory",
    options: [
      { label: "16 GB / 512 GB", price: 79999, compareAt: 94999 },
      { label: "32 GB / 1 TB", price: 109999, compareAt: 124999 },
    ],
    price: 79999,
    compareAt: 94999,
    features: ["14-inch 2.8K display", "Up to 18 h battery", "Backlit keyboard", "Wi-Fi 7"],
    specs: [["Display", "14\" 2.8K, 120 Hz"], ["Battery", "Up to 18 h"], ["Weight", "1.3 kg"], ["Ports", "2 × USB-C, USB-A, HDMI"]],
    rating: 4.6,
    reviewCount: 344,
    inStock: true,
    createdAt: "2026-07-30",
  },
  {
    slug: "manora-tab-pro",
    name: "Manora Tab Pro",
    category: "computers-tablets",
    tagline: "Sketch, stream and work.",
    description:
      "Manora Tab Pro pairs a bright 11-inch display with stylus support, quad speakers and a battery built for long flights.",
    images: ["products/manora-tab-pro.png"],
    colors: [graphite, grey],
    optionName: "Storage",
    options: [
      { label: "128 GB", price: 64999 },
      { label: "256 GB", price: 74999 },
    ],
    price: 64999,
    features: ["11-inch 120 Hz display", "Stylus support", "Quad speakers", "Up to 14 h battery"],
    specs: [["Display", "11\" LCD, 120 Hz"], ["Battery", "Up to 14 h"], ["Weight", "480 g"], ["Stylus", "Supported (sold separately)"]],
    rating: 4.5,
    reviewCount: 233,
    inStock: true,
    createdAt: "2026-10-08",
  },
  {
    slug: "shadowplay-gamepad",
    name: "ShadowPlay GamePad",
    category: "gaming",
    tagline: "Precision in every press.",
    description:
      "ShadowPlay GamePad offers hall-effect sticks, remappable back buttons and low-latency wireless that works with PC, console and mobile.",
    images: ["products/shadowplay-gamepad.png", "products/shadowplay-gamepad-b.png"],
    colors: [black, white, { name: "Neon", hex: "#8c6cf2" }],
    price: 9999,
    compareAt: 12999,
    features: ["Hall-effect sticks", "Remappable back buttons", "Low-latency 2.4 GHz", "40 h battery"],
    specs: [["Connectivity", "2.4 GHz, Bluetooth, USB-C"], ["Battery", "Up to 40 h"], ["Compatibility", "PC, console, mobile"], ["Weight", "240 g"]],
    rating: 4.7,
    reviewCount: 1530,
    inStock: true,
    featured: true,
    createdAt: "2026-09-15",
  },
  {
    slug: "neozoom-4k-lens",
    name: "NeoZoom 4K Lens",
    category: "cameras",
    tagline: "Creator-grade 4K, simplified.",
    description:
      "NeoZoom 4K is a compact smart camera with a pan-and-tilt lens, sharp 4K video and AI auto-framing, ideal for streaming, video calls and keeping an eye on home.",
    images: ["products/neozoom-4k-lens.png"],
    colors: [white, black],
    price: 14999,
    features: ["4K video", "360° pan and tilt", "AI auto-framing", "Night vision"],
    specs: [["Video", "4K at 30 fps"], ["Field of view", "360° pan, 110° tilt"], ["Audio", "Dual noise-cancelling mics"], ["Connectivity", "Wi-Fi 6, USB-C"]],
    rating: 4.4,
    reviewCount: 211,
    inStock: true,
    createdAt: "2026-08-28",
  },
  {
    slug: "vision-vr-headset",
    name: "Vision VR Headset",
    category: "wearables",
    tagline: "Step inside your games.",
    description:
      "Vision VR is a standalone headset with high-resolution displays, hand tracking and a library of games and fitness apps, no PC required.",
    images: ["products/vision-vr-headset.png"],
    colors: [white],
    optionName: "Storage",
    options: [
      { label: "128 GB", price: 49999 },
      { label: "512 GB", price: 64999 },
    ],
    price: 49999,
    features: ["Standalone, no PC needed", "Hand tracking", "Mixed-reality passthrough", "Up to 2.5 h battery"],
    specs: [["Resolution", "2064 × 2208 per eye"], ["Refresh rate", "Up to 120 Hz"], ["Tracking", "Inside-out, hands"], ["Weight", "515 g"]],
    rating: 4.6,
    reviewCount: 808,
    inStock: true,
    createdAt: "2026-10-15",
  },
  {
    slug: "pulse-smartwatch",
    name: "Pulse Smartwatch",
    category: "wearables",
    tagline: "Health and fitness on your wrist.",
    description:
      "Pulse tracks heart rate, sleep and over 100 workouts, with GPS, contactless payments and a battery that lasts a full week.",
    images: ["products/pulse-smartwatch.png", "products/pulse-smartwatch-b.png"],
    colors: [white, black],
    price: 24999,
    compareAt: 29999,
    features: ["Heart rate and SpO₂", "Built-in GPS", "7-day battery", "5 ATM water resistance"],
    specs: [["Display", "1.4\" AMOLED"], ["Battery", "Up to 7 days"], ["Water resistance", "5 ATM"], ["Sensors", "HR, SpO₂, GPS"]],
    rating: 4.5,
    reviewCount: 902,
    inStock: true,
    createdAt: "2026-09-25",
  },
];

/* ------------------------------------------------------------------ */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

/** "products/x.png" → "/products/x.png" (cut-outs); a bare name → "/images/<name>.jpg" (lifestyle photos). */
export function imageUrl(name: string): string {
  return name.includes(".") ? `/${name}` : `/images/${name}.jpg`;
}

/** Price of one specific variant: an option's own price, else the product price. */
export function variantPrice(product: Product, optionIndex?: number | null) {
  const option = optionIndex != null ? product.options?.[optionIndex] : undefined;
  if (option) return { price: option.price, compareAt: option.compareAt };
  return { price: product.price, compareAt: product.compareAt };
}

/** Lowest price a product can be bought for — what listings show as "From". */
export function lowestPrice(product: Product): number {
  return product.options?.length ? Math.min(...product.options.map((o) => o.price)) : product.price;
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category && p.featured);
  return [...same, ...others].slice(0, limit);
}

/* ---------------- search & sort ---------------- */

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products
    .map((p) => {
      const category = getCategory(p.category)?.name ?? "";
      const name = p.name.toLowerCase();
      const haystack = `${name} ${p.tagline} ${p.description} ${category} ${p.features.join(" ")}`.toLowerCase();
      if (!terms.every((t) => haystack.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (name.includes(t) ? 3 : 1), 0);
      return { p, score };
    })
    .filter((x): x is { p: Product; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function sortProducts(list: Product[], sort: string | undefined): Product[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return copy.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    case "price-desc":
      return copy.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}

/* ---------------- seeded reviews ---------------- */

const reviewers = ["Priya S.", "Daniel K.", "Aisha M.", "Marco R.", "Sofia L.", "Kenji T.", "Emma W.", "Rahul V."];
const templates: Omit<Review, "author" | "date">[] = [
  { rating: 5, title: "Exceeded my expectations", body: "Build quality is excellent and it does everything I hoped. Delivery was quick too." },
  { rating: 4, title: "Great value", body: "Really happy with it overall. A couple of small quirks, but nothing that bothers me day to day." },
  { rating: 5, title: "Would buy again", body: "Set-up took minutes and it has worked flawlessly since. Highly recommend." },
  { rating: 4, title: "Solid choice", body: "Does exactly what it says. The design looks even better in person." },
];

export function seededReviews(product: Product): Review[] {
  const seed = [...product.slug].reduce((s, c) => s + c.charCodeAt(0), 0);
  return [0, 1, 2].map((i) => {
    const t = templates[(seed + i) % templates.length];
    return {
      ...t,
      author: reviewers[(seed + i * 3) % reviewers.length],
      date: `2026-${String(((seed + i) % 9) + 1).padStart(2, "0")}-${String(((seed * (i + 1)) % 27) + 1).padStart(2, "0")}`,
    };
  });
}
