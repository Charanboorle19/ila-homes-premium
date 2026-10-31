export const SEARCH_EXAMPLES = [
  "Tell us what you're looking for...",
  "Find a villa near Hyderabad...",
  "Discover plots within ₹80 lakhs...",
  "Find a home near my workplace...",
];

export const PROPERTY_TYPES = ["All", "Apartments", "Villas", "Plots", "Commercial"];

export const SUGGESTIONS = [
  "3 BHK in Hyderabad under ₹1.2 Cr",
  "Villa plots near ORR",
  "Commercial spaces in Gachibowli",
];

export const NAV_LINKS = [
  { href: "#properties", label: "Properties" },
  { href: "#discover", label: "Buy" },
  { href: "#discover", label: "Rent" },
  { href: "#explore-developments-all", label: "Developments" },
  { href: "#map", label: "Explore Map" },
  { href: "#resources", label: "Resources", chevron: true },
];

export const CATEGORIES = [
  { value: "all", label: "All Properties", icon: "▦" },
  { value: "apartments", label: "Apartments", icon: "▥" },
  { value: "villas", label: "Villas", icon: "⌂" },
  { value: "plots", label: "Plots", icon: "⌁" },
  { value: "commercial", label: "Commercial", icon: "▤" },
];

export const FEATURED_PROPERTY = {
  id: "luxury-villa-kokapet",
  type: "villas",
  category: "Luxury Living",
  propertyType: "Villa",
  title: "Luxury Villa in Kokapet",
  location: "Kokapet, Hyderabad",
  price: "₹4.80 Cr",
  priceNote: "₹12,000 per sq.ft.",
  area: "3,200 sq.ft.",
  image:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  alt: "Contemporary luxury villa with landscaped garden",
  images: "24 Images",
  tour: "3D Tour",
  specs: [
    { icon: "▤", value: "4 BHK", label: "Configuration" },
    { icon: "▧", value: "3,200 sq.ft.", label: "Built-up Area" },
    { icon: "⌂", value: "Villa", label: "Property Type" },
    { icon: "▦", value: "Dec 2025", label: "Possession" },
  ],
  trust: [
    { icon: "◆", label: "RERA Approved" },
    { icon: "◆", label: "Verified Property" },
    { icon: "▦", label: "Gated Community" },
    { label: "Premium Location", glyph: "♧" },
  ],
  badges: [
    { label: "Verified", green: true },
    { label: "Villa" },
    { label: "Ready to Move" },
  ],
};

export const SIDE_PROPERTIES = [
  {
    id: "sattva-knowledge-city",
    type: "apartments",
    category: "Urban Living",
    propertyType: "Apartment",
    title: "Sattva Knowledge City",
    location: "HITEC City, Hyderabad",
    price: "₹1.25 Cr",
    priceNote: "₹6,750 per sq.ft.",
    area: "1,850 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=850&q=85",
    alt: "Modern apartment towers",
    images: "18 Images",
    tour: "Video Tour",
    photos: "12",
    pill: { glyph: "♨", label: "Popular", className: "popular-pill" },
    specs: [
      { icon: "▤", value: "3 BHK", label: "Configuration" },
      { icon: "▧", value: "1,850 sq.ft.", label: "Built-up Area" },
      { icon: "⌂", value: "Apartment", label: "Property Type" },
      { icon: "▦", value: "Ready", label: "Possession" },
    ],
    trust: [
      { label: "Verified" },
      { label: "RERA Approved" },
      { label: "Ready to Move" },
    ],
    badges: [
      { label: "Verified", green: true },
      { label: "Apartment" },
      { label: "Ready to Move" },
    ],
  },
  {
    id: "urbanrise-highgrove",
    type: "plots",
    category: "Open Plots",
    propertyType: "Plot",
    title: "Urbanrise Highgrove",
    location: "Shadnagar, Hyderabad",
    price: "₹48.5 Lakhs",
    priceNote: "₹18,150 per sq.yd.",
    area: "267 sq.yd.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=850&q=85",
    alt: "Green plotted residential layout",
    images: "14 Images",
    tour: "Site Walkthrough",
    photos: "8",
    pill: { glyph: "▥", label: "New Launch" },
    specs: [
      { icon: "▤", value: "267 yd", label: "Plot Size" },
      { icon: "▧", value: "40 ft", label: "Road Width" },
      { icon: "⌂", value: "Plot", label: "Property Type" },
      { icon: "▦", value: "Immediate", label: "Possession" },
    ],
    trust: [
      { label: "RERA Approved" },
      { label: "HMDA Layout" },
      { label: "Clear Title" },
    ],
    badges: [
      { label: "RERA Approved", green: true },
      { label: "Plot" },
      { label: "HMDA Layout" },
    ],
  },
  {
    id: "commercial-space-gachibowli",
    type: "commercial",
    category: "Business Spaces",
    propertyType: "Commercial",
    title: "Commercial Space",
    location: "Gachibowli, Hyderabad",
    price: "₹6.2 Cr",
    priceNote: "₹14,250 per sq.ft.",
    area: "4,350 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=850&q=85",
    alt: "Contemporary commercial office building",
    images: "16 Images",
    tour: "3D Tour",
    photos: "10",
    pill: { glyph: "▥", label: "High ROI", className: "roi-pill" },
    specs: [
      { icon: "▤", value: "Grade A", label: "Building" },
      { icon: "▧", value: "4,350 sq.ft.", label: "Carpet Area" },
      { icon: "⌂", value: "Office", label: "Property Type" },
      { icon: "▦", value: "Q2 2026", label: "Possession" },
    ],
    trust: [
      { label: "Verified" },
      { label: "Prime Location" },
      { label: "High Footfall" },
    ],
    badges: [
      { label: "Verified", green: true },
      { label: "Commercial" },
      { label: "Prime Location" },
    ],
  },
];

export const LOCATIONS = [
  {
    name: "Gachibowli",
    count: "120+ Properties",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Kokapet",
    count: "85+ Properties",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Shadnagar",
    count: "60+ Properties",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Tellapur",
    count: "40+ Properties",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=160&q=80",
  },
];
