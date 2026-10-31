import { useState, useMemo, useEffect, useRef } from "react";

// Gallery images matching the mockup
const MAIN_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
    label: "Front View",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
    label: "Living Room",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
    label: "Dining Area",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
    label: "Master Bedroom",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
    label: "Kitchen Lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=90",
    label: "Family Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90",
    label: "Pool & Deck",
  },
  {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=90",
    label: "Garden Villa",
  },
];

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80",
];

const AMENITY_TAGS = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Gated Community",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M4 18h16M6 18V8M10 18V8M14 18V8M18 18V8M2 8l10-5 10 5" />
      </svg>
    ),
    label: "Clubhouse",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
        <path d="M2 18c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
        <circle cx="16" cy="6" r="2" />
      </svg>
    ),
    label: "Swimming Pool",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    label: "Landscaped Gardens",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "24/7 Security",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    label: "Play Park",
  },
];

export default function PropertyDetailsPage({ property, onBack }) {
  const [activeMainIdx, setActiveMainIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("Photos");
  const [isSaved, setIsSaved] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [readMore, setReadMore] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? "" : curr));
    }, 2800);
  };

  const navigateBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = "";
    }
  };

  // Get active property from prop or sessionStorage
  const storedProperty = useMemo(() => {
    if (property) return property;
    try {
      const saved = sessionStorage.getItem("ila_selected_property");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  }, [property]);

  const propTitle = storedProperty?.title || "Serene Meadows";
  const propLocation = storedProperty?.location || "Kokapet, Hyderabad";
  const propPrice = storedProperty?.price || "₹ 1.8 Cr – 3.2 Cr";

  // Booking Form State
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Evening");
  const [similarSlideIdx, setSimilarSlideIdx] = useState(0);

  // Location Past/Present/Future Era State
  const [selectedEra, setSelectedEra] = useState("present"); // 'past', 'present', 'future'

  // Interactive EMI Calculator State
  const [propertyPrice, setPropertyPrice] = useState(18000000); // 1.80 Cr
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [loanTenure, setLoanTenure] = useState(20); // 20 Years

  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPct) / 100);
  }, [propertyPrice, downPaymentPct]);

  const loanPrincipal = useMemo(() => {
    return Math.max(0, propertyPrice - downPaymentAmount);
  }, [propertyPrice, downPaymentAmount]);

  const monthlyEmi = useMemo(() => {
    const P = loanPrincipal;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    if (P <= 0 || r <= 0 || n <= 0) return 0;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanPrincipal, interestRate, loanTenure]);

  const totalInterest = useMemo(() => {
    const totalPayments = monthlyEmi * (loanTenure * 12);
    return Math.max(0, totalPayments - loanPrincipal);
  }, [monthlyEmi, loanTenure, loanPrincipal]);

  const otherCharges = useMemo(() => {
    return 2200000; // 22 L standard registration and legal fees
  }, []);

  const totalCost = useMemo(() => {
    return loanPrincipal + totalInterest + otherCharges;
  }, [loanPrincipal, totalInterest, otherCharges]);

  const formatRupee = (num) => {
    return num.toLocaleString("en-IN");
  };

  const formatCr = (num) => {
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(num / 100000).toFixed(2)} L`;
  };

  const [activeDestKey, setActiveDestKey] = useState("hospital");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

  // Kokapet Site (Your Plot) coordinates
  const PLOT_COORDS = [78.3375, 17.4125];

  const DESTINATIONS = useMemo(() => [
    {
      key: "hospital",
      title: "Hospital",
      name: "Continental Hospital",
      category: "Healthcare",
      time: "12 min",
      dist: "6.8 km",
      color: "#e53e3e",
      coords: [78.3496, 17.4344],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      key: "school",
      title: "School",
      name: "Oakridge Intl. School",
      category: "Education",
      time: "8 min",
      dist: "4.2 km",
      color: "#2563eb",
      coords: [78.3622, 17.4285],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 10-10-5L2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      key: "business",
      title: "Business Hub",
      name: "Financial District",
      category: "IT / Corporate",
      time: "18 min",
      dist: "14.5 km",
      color: "#7c3aed",
      coords: [78.3448, 17.4218],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      key: "shopping",
      title: "Shopping & Retail",
      name: "Gachibowli Central",
      category: "Retail & Malls",
      time: "16 min",
      dist: "11.2 km",
      color: "#059669",
      coords: [78.3610, 17.4411],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      key: "metro",
      title: "Metro Station",
      name: "Raidurg Metro Station",
      category: "Transit Access",
      time: "14 min",
      dist: "9.1 km",
      color: "#d97706",
      coords: [78.3775, 17.4428],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="m8 19-3 3" />
          <path d="m16 19 3 3" />
        </svg>
      ),
    },
    {
      key: "airport",
      title: "Airport",
      name: "Rajiv Gandhi Intl. Airport",
      category: "Aviation",
      time: "35 min",
      dist: "28.4 km",
      color: "#0891b2",
      coords: [78.4294, 17.2403],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
      ),
    },
  ], []);

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof window === "undefined" || !window.mapboxgl) return;

    window.mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [78.358, 17.418],
      zoom: 12.2,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    map.on("load", () => {
      // Add routes geojson source
      DESTINATIONS.forEach((dest) => {
        const routeId = `route-${dest.key}`;
        // Create a bezier-curved path between plot and dest
        const p1 = PLOT_COORDS;
        const p2 = dest.coords;
        const mid = [(p1[0] + p2[0]) / 2 + (p2[1] - p1[1]) * 0.15, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * 0.15];

        map.addSource(routeId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [p1, mid, p2],
            },
          },
        });

        map.addLayer({
          id: routeId,
          type: "line",
          source: routeId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": dest.color,
            "line-width": 3.8,
            "line-opacity": 0.88,
          },
        });
      });

      // Marker for "Your Plot"
      const plotEl = document.createElement("div");
      plotEl.className = "custom-mapbox-plot-pin";
      plotEl.innerHTML = `
        <div class="plot-pin-badge">Your Plot</div>
        <div class="plot-pin-pulse">
          <div class="plot-pin-core"></div>
        </div>
      `;
      new window.mapboxgl.Marker({ element: plotEl })
        .setLngLat(PLOT_COORDS)
        .addTo(map);

      // Markers for each destination
      DESTINATIONS.forEach((dest) => {
        const markerEl = document.createElement("div");
        markerEl.className = "custom-mapbox-dest-pin";
        markerEl.style.setProperty("--pin-color", dest.color);
        markerEl.innerHTML = `
          <div class="dest-pin-card">
            <span class="dest-pin-dot" style="background:${dest.color}"></span>
            <strong>${dest.name}</strong>
            <small>${dest.time} (${dest.dist})</small>
          </div>
        `;
        markerEl.addEventListener("click", () => {
          setActiveDestKey(dest.key);
          map.flyTo({ center: dest.coords, zoom: 13, speed: 0.8 });
        });
        new window.mapboxgl.Marker({ element: markerEl })
          .setLngLat(dest.coords)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, [DESTINATIONS]);

  const nextPhoto = () => {
    setActiveMainIdx((curr) => (curr + 1) % MAIN_IMAGES.length);
  };

  const prevPhoto = () => {
    setActiveMainIdx((curr) => (curr - 1 + MAIN_IMAGES.length) % MAIN_IMAGES.length);
  };

  return (
    <div className="property-page-redesign">
      {/* 1. Clean Top Navigation Bar */}
      <header className="page-header">
        <div className="header-inner">
          <div className="header-brand-wrap">
            <button className="back-nav-btn" type="button" onClick={navigateBack} aria-label="Go back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <a className="brand-logo" href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }}>
              <img src="/assets/ila-homes-logo-white.png" alt="ILA HOMES" />
            </a>
          </div>

          <nav className="header-menu" aria-label="Main menu">
            <a href="#properties">Properties</a>
            <a href="#buy" onClick={navigateBack}>Buy</a>
            <a href="#rent">Rent</a>
            <a href="#projects">Projects</a>
            <a href="#map">Explore Map</a>
            <a href="#resources" className="dropdown-link">
              Resources{" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </nav>

          <div className="header-actions-right">
            <button
              className={`pill-btn ${isSaved ? "active" : ""}`}
              type="button"
              onClick={() => {
                setIsSaved(!isSaved);
                showToast(isSaved ? "Removed from saved" : "Saved to your list");
              }}
            >
              <span className="btn-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
              </span>{" "}
              Saved
            </button>
            <button
              className="pill-btn signin-btn"
              type="button"
              onClick={() => {
                window.location.hash = "#signup";
              }}
            >
              <span className="btn-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>{" "}
              Sign Up
            </button>
            <button
              className="btn-list-property"
              type="button"
              onClick={() => {
                window.location.hash = "#list-property";
              }}
            >
              List Property{" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content */}
      <main className="page-body">
        <div className="page-container">
          {/* Breadcrumbs */}
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <span className="home-icon" onClick={navigateBack} title="Home">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
            <span className="sep" onClick={navigateBack}>Home</span>
            <span className="arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
            <span className="sep" onClick={navigateBack}>Buy</span>
            <span className="arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
            <span className="sep">Villas</span>
            <span className="arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
            <span className="current">{propTitle}</span>
          </nav>

          {/* 3. Hero Visual Section: Sleek Bento 5-Item Gallery */}
          <section className="hero-gallery-composite" aria-label="Property Media Showcase">
            {/* Left Primary Hero Showcase */}
            <div className="hero-main-frame">
              <img
                src={MAIN_IMAGES[activeMainIdx].src}
                alt={`${propTitle} - ${MAIN_IMAGES[activeMainIdx].label}`}
              />
              <div className="hero-glass-gradient" />

              <div className="hero-floating-top-row">
                <span className="featured-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Verified Luxury
                </span>

                <span className="hero-status-pill">
                  <span className="live-pulse" /> Ready to Move
                </span>
              </div>

              <div className="main-photo-footer">
                <span className="photo-counter">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>{activeMainIdx + 1} / 24</span>
                  <span className="counter-dot">•</span>
                  <span className="counter-label">{MAIN_IMAGES[activeMainIdx].label}</span>
                </span>

                <div className="carousel-nav-arrows">
                  <button type="button" onClick={prevPhoto} aria-label="Previous photo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button type="button" onClick={nextPhoto} aria-label="Next photo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Quad Grid */}
            <div className="hero-quad-grid">
              {/* Tile 1: Video with Play */}
              <div
                className="quad-tile video-tile"
                onClick={() => showToast("Playing Serene Meadows Project Video (2:18)")}
              >
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85"
                  alt="Aerial video preview"
                />
                <div className="quad-tile-overlay" />
                <div className="video-play-center">
                  <div className="play-circle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="play-label">Project Film</span>
                </div>
                <span className="duration-pill">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  2:18
                </span>
              </div>

              {/* Tile 2: 3D Tour */}
              <div
                className="quad-tile 3d-tile"
                onClick={() => showToast("Opening interactive 3D Exterior Tour")}
              >
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85"
                  alt="3D Villa Exterior View"
                />
                <div className="quad-tile-overlay" />
                <div className="tile-badge-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span>3D Tour</span>
                </div>
              </div>

              {/* Tile 3: Floor Plan */}
              <div
                className="quad-tile floorplan-tile"
                onClick={() => showToast("Viewing detailed 3 & 4 BHK Floor Plans")}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85"
                  alt="Floor Plan preview"
                />
                <div className="quad-tile-overlay" />
                <div className="tile-badge-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                  <span>Floor Plans</span>
                </div>
              </div>

              {/* Tile 4: Layout View / Gallery */}
              <div
                className="quad-tile layout-tile"
                onClick={() => showToast("Opening 24-photo master gallery")}
              >
                <img
                  src="/assets/3d-img-1.png"
                  alt="3D Masterplan Layout View"
                />
                <div className="quad-tile-overlay" />
                <div className="more-photos-overlay">
                  <div className="more-icon-circle">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <strong>+20</strong>
                  <small>View All Photos</small>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Horizontal Thumbnail Strip */}
          <div className="thumbnail-strip" aria-label="Photo thumbnails">
            {THUMBNAILS.map((thumb, idx) => (
              <div
                key={idx}
                className={`thumb-card ${activeMainIdx === idx ? "active" : ""}`}
                onClick={() => setActiveMainIdx(idx)}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
                <div className="thumb-shine-effect" />
              </div>
            ))}
            <div
              className="thumb-card thumb-more"
              onClick={() => showToast("Opening full photo collection")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <strong>+20</strong>
              <small>Gallery</small>
            </div>
          </div>

          {/* 5. Clean View Tabs Bar */}
          <div className="view-mode-tabs-bar">
            {[
              {
                id: "Photos",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                ),
                label: "Photos",
              },
              {
                id: "Video",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ),
                label: "Video Tour",
              },
              {
                id: "3D View",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                ),
                label: "3D Exterior",
              },
              {
                id: "Floor Plan",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                ),
                label: "Floor Plan",
              },
              {
                id: "Map View",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
                    <path d="M9 3v15m6-12v15" />
                  </svg>
                ),
                label: "Map & Vicinity",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`view-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  showToast(`${tab.label} selected`);
                }}
              >
                <span className="tab-icon">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* 6. Two-Column Property Information & Sticky Contact Card */}
          <section className="property-summary-container">
            {/* Left Column: Details */}
            <div className="summary-left-column">
              {/* Badge */}
              <div className="verified-status-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Verified Property</span>
              </div>

              {/* Title & Actions Row */}
              <div className="title-action-header">
                <div>
                  <h1 className="main-property-heading">{propTitle}</h1>
                  <p className="property-subhead">
                    Premium villas in a peaceful gated community surrounded by nature.
                  </p>
                  <div className="location-meta-row">
                    <span className="loc-pin">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span>{propLocation}</span> &nbsp;
                    <button
                      className="view-map-link"
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("masterplan-map");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                        <line x1="8" y1="2" x2="8" y2="18" />
                        <line x1="16" y1="6" x2="16" y2="22" />
                      </svg>
                      <span>View on Map</span>
                    </button>
                  </div>
                </div>

                {/* Right actions: Save, Compare, Share */}
                <div className="quick-action-btns">
                  <button
                    className={`btn-action ${isSaved ? "active" : ""}`}
                    type="button"
                    onClick={() => {
                      setIsSaved(!isSaved);
                      showToast(isSaved ? "Removed from saved" : "Property saved");
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                    <span>Save</span>
                  </button>
                  <button
                    className={`btn-action ${isCompared ? "active" : ""}`}
                    type="button"
                    onClick={() => {
                      setIsCompared(!isCompared);
                      showToast(isCompared ? "Removed from comparison" : "Added to comparison");
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16 3 4 4-4 4" />
                      <path d="M20 7H4" />
                      <path d="m8 21-4-4 4-4" />
                      <path d="M4 17h16" />
                    </svg>
                    <span>Compare</span>
                  </button>
                  <button
                    className="btn-action"
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        showToast("Property link copied to clipboard!");
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Description with Read More */}
              <div className="property-description-block">
                <p>
                  Serene Meadows is a thoughtfully planned gated community that blends modern architecture
                  with natural surroundings. Designed for families who value space, privacy, and a premium
                  lifestyle, this project offers spacious villas, landscaped green spaces, and world-class
                  amenities.
                  {readMore && (
                    <span>
                      {" "}
                      Each residence features vastu-compliant layouts, high 11-foot ceilings, imported Italian
                      marble flooring, pre-wired smart home automation, and expansive private terrace decks
                      overlooking manicured community parks.
                    </span>
                  )}
                </p>
                <button
                  className="read-more-toggle"
                  type="button"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read Less" : "Read More"}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: readMore ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Specifications Matrix (Property Type, Configuration, Built-up Area, Plot Area, Status) */}
              <div className="specs-card-grid">
                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <span className="spec-caption">Property Type</span>
                    <strong className="spec-value">Villa</strong>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4v16" />
                      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                      <path d="M2 17h20" />
                      <path d="M6 8v9" />
                    </svg>
                  </div>
                  <div>
                    <span className="spec-caption">Configuration</span>
                    <strong className="spec-value">3, 4 BHK</strong>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <span className="spec-caption">Built-up Area</span>
                    <strong className="spec-value">2,400 – 3,200 Sq.Ft.</strong>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <div>
                    <span className="spec-caption">Plot Area</span>
                    <strong className="spec-value">300 – 500 Sq.Yd.</strong>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon green">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <span className="spec-caption">Status</span>
                    <strong className="spec-value green-text">Ready to Move</strong>
                  </div>
                </div>
              </div>

              {/* Amenity Badges Row */}
              <div className="amenity-badges-row">
                {AMENITY_TAGS.map((tag) => (
                  <span key={tag.label} className="amenity-pill-tag">
                    <span className="tag-ico">{tag.icon}</span> {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing & Sticky Lead Card */}
            <aside className="summary-right-column">
              <div className="interest-lead-card">
                <div className="pricing-display">
                  <div className="main-price-figure">{propPrice}</div>
                  <div className="price-sqft-caption">₹ 8,500 per Sq.Ft. (Approx)</div>
                </div>

                <div className="lead-card-body">
                  <h3>Interested in this property?</h3>
                  <p>Get in touch with our team for more details, site visit or a personalised consultation.</p>

                  <button
                    className="btn-contact-seller"
                    type="button"
                    onClick={() => showToast("Connecting to verified developer sales advisor...")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Contact Seller</span>
                  </button>

                  <button
                    className="btn-schedule-visit"
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("enquiry-form-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Schedule a Site Visit</span>
                  </button>

                  <div className="lead-assurances-list">
                    <div className="assurance-line">
                      <span className="assurance-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                      </span>
                      <span>Zero Brokerage</span>
                    </div>
                    <div className="assurance-line">
                      <span className="assurance-icon green">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>100% Verified Title</span>
                    </div>
                    <div className="assurance-line">
                      <span className="assurance-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </span>
                      <span>Dedicated Advisor</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </section>

          {/* 7. 3D Masterplan Layout Section (using /assets/3d-img-1.png) */}
          <section className="section masterplan-section" id="masterplan-map">
            <div className="section-title-wrap">
              <h2>Interactive Layout &amp; Masterplan</h2>
              <p>Explore the full residential gated layout, road hierarchy, and designated plots.</p>
            </div>

            <div className="masterplan-frame">
              <img
                src="/assets/3d-img-1.png"
                alt="3D Masterplan Layout of Serene Meadows"
              />
              <div className="plot-marker-badge">
                <span className="dot"></span> Plot 28 · Available
              </div>
              <div className="layout-overlay-tools">
                <button type="button" onClick={() => showToast("Satellite mode")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Satellite
                </button>
                <button type="button" className="active" onClick={() => showToast("3D Aerial view active")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 21 16z" />
                  </svg>
                  3D View
                </button>
              </div>
            </div>
          </section>

          {/* 8. How This Plot Matches Your Goal Section */}
          <section className="section goal-match-section" aria-label="Goal match analysis">
            <div className="section-title-wrap">
              <h2 className="goal-match-heading">How This Plot Matches Your Goal</h2>
            </div>

            <div className="goal-cards-grid">
              {/* Card 1: Build Your Home */}
              <div className="goal-match-card active-card">
                <div className="goal-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85"
                    alt="Build Your Home modern villa"
                  />
                  <span className="goal-best-match-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Best Match
                  </span>
                </div>

                <div className="goal-card-content">
                  <div className="goal-card-info-row">
                    <div className="goal-icon-badge teal-bg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>

                    <div className="goal-text-group">
                      <h3>Build</h3>
                      <strong>Your Home</strong>
                    </div>

                    <div className="goal-progress-circle teal-circle" aria-label="92% Match">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-fill teal-stroke"
                          strokeDasharray="92, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="circle-inner-label">
                        <span className="percent-num">92%</span>
                        <span className="percent-sub">Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="goal-card-desc">
                    Ideal location to build your dream home.
                  </p>
                </div>
              </div>

              {/* Card 2: Investment Opportunity */}
              <div className="goal-match-card">
                <div className="goal-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=85"
                    alt="Investment Opportunity with growth chart"
                  />
                </div>

                <div className="goal-card-content">
                  <div className="goal-card-info-row">
                    <div className="goal-icon-badge gold-bg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>

                    <div className="goal-text-group">
                      <h3>Investment</h3>
                      <strong>Opportunity</strong>
                    </div>

                    <div className="goal-progress-circle gold-circle" aria-label="86% Match">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-fill gold-stroke"
                          strokeDasharray="86, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="circle-inner-label">
                        <span className="percent-num">86%</span>
                        <span className="percent-sub">Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="goal-card-desc">
                    Strong potential for long-term value.
                  </p>
                </div>
              </div>

              {/* Card 3: Family Living */}
              <div className="goal-match-card">
                <div className="goal-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=700&q=85"
                    alt="Family Living garden and playground"
                  />
                </div>

                <div className="goal-card-content">
                  <div className="goal-card-info-row">
                    <div className="goal-icon-badge blue-bg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>

                    <div className="goal-text-group">
                      <h3>Family</h3>
                      <strong>Living</strong>
                    </div>

                    <div className="goal-progress-circle blue-circle" aria-label="83% Match">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-fill blue-stroke"
                          strokeDasharray="83, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="circle-inner-label">
                        <span className="percent-num">83%</span>
                        <span className="percent-sub">Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="goal-card-desc">
                    Peaceful and well-connected for a better family life.
                  </p>
                </div>
              </div>

              {/* Card 4: Weekend Retreat */}
              <div className="goal-match-card">
                <div className="goal-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=85"
                    alt="Weekend Retreat poolside villa lounge"
                  />
                </div>

                <div className="goal-card-content">
                  <div className="goal-card-info-row">
                    <div className="goal-icon-badge purple-bg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
                      </svg>
                    </div>

                    <div className="goal-text-group">
                      <h3>Weekend</h3>
                      <strong>Retreat</strong>
                    </div>

                    <div className="goal-progress-circle purple-circle" aria-label="76% Match">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-fill purple-stroke"
                          strokeDasharray="76, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="circle-inner-label">
                        <span className="percent-num">76%</span>
                        <span className="percent-sub">Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="goal-card-desc">
                    A calm getaway from the city, close to nature.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Connectivity & Nearby Places Section (Interactive Mapbox & Cards) */}
          <section className="section connectivity-places-section" id="connectivity-section" aria-label="Connectivity & Nearby Places">
            <div className="section-title-wrap">
              <h2 className="connectivity-main-heading">Connectivity &amp; Nearby Places</h2>
              <p className="connectivity-subheading">
                Travel times to workplaces, schools, hospitals, and other key destinations.
              </p>
            </div>

            <div className="connectivity-composite-grid">
              {/* Left Column: 6 Destination Cards (2 columns x 3 rows) */}
              <div className="destination-cards-matrix">
                {DESTINATIONS.map((dest) => (
                  <div
                    key={dest.key}
                    className={`dest-card-item ${activeDestKey === dest.key ? "active-dest-card" : ""}`}
                    onClick={() => {
                      setActiveDestKey(dest.key);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo({ center: dest.coords, zoom: 13, speed: 0.8 });
                      }
                      showToast(`Route to ${dest.name} (${dest.time}, ${dest.dist})`);
                    }}
                  >
                    <div className="dest-card-top">
                      <div
                        className="dest-icon-bubble"
                        style={{ background: `${dest.color}15`, color: dest.color }}
                      >
                        {dest.icon}
                      </div>

                      <div className="dest-meta-title">
                        <span className="dest-category-caption">{dest.title}</span>
                        <strong className="dest-full-name">{dest.name}</strong>
                      </div>
                    </div>

                    <div className="dest-card-bottom">
                      <div className="dest-commute-badge">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>
                        <div className="dest-time-dist">
                          <strong>{dest.time}</strong>
                          <small>{dest.dist}</small>
                        </div>
                      </div>

                      <span className="dest-chevron">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Live Interactive Mapbox Container */}
              <div className="connectivity-mapbox-panel">
                <div ref={mapContainerRef} className="mapbox-canvas-inner" />

                {/* Floating Map Controls */}
                <div className="mapbox-floating-controls">
                  <button
                    type="button"
                    className="map-ctrl-btn compass"
                    aria-label="Reset North"
                    onClick={() => {
                      if (mapInstanceRef.current) mapInstanceRef.current.resetNorth();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 19 21 12 17 5 21 12 2" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="map-ctrl-btn"
                    aria-label="Zoom In"
                    onClick={() => {
                      if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="map-ctrl-btn"
                    aria-label="Zoom Out"
                    onClick={() => {
                      if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="map-ctrl-btn target"
                    aria-label="Recenter Your Plot"
                    onClick={() => {
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo({ center: [78.358, 17.418], zoom: 12.2, speed: 0.8 });
                      }
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="22" y1="12" x2="18" y2="12" />
                      <line x1="6" y1="12" x2="2" y2="12" />
                      <line x1="12" y1="6" x2="12" y2="2" />
                      <line x1="12" y1="22" x2="12" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 10. EMI Calculator Section */}
          <section className="section emi-calculator-section" id="emi" aria-label="EMI Calculator">
            <div className="section-title-wrap">
              <h2 className="emi-main-heading">EMI Calculator</h2>
              <p className="emi-subheading">Plan your purchase with a clear monthly estimate.</p>
            </div>

            <div className="emi-composite-grid">
              {/* Card 1: Loan Details Inputs */}
              <div className="emi-panel-card">
                <h3 className="emi-panel-title">Loan Details</h3>

                <div className="emi-input-row">
                  <span className="emi-field-label">Property Price</span>
                  <div className="emi-input-box">
                    <span className="box-prefix">₹</span>
                    <input
                      type="text"
                      value={formatRupee(propertyPrice)}
                      onChange={(e) => {
                        const raw = Number(e.target.value.replace(/[^0-9]/g, ""));
                        setPropertyPrice(raw || 0);
                      }}
                    />
                  </div>
                </div>

                <div className="emi-input-row">
                  <span className="emi-field-label">Down Payment</span>
                  <div className="emi-split-inputs">
                    <div className="emi-input-box flex-1">
                      <span className="box-prefix">₹</span>
                      <input
                        type="text"
                        value={formatRupee(downPaymentAmount)}
                        onChange={(e) => {
                          const raw = Number(e.target.value.replace(/[^0-9]/g, ""));
                          if (propertyPrice > 0) {
                            setDownPaymentPct(Math.min(90, Math.max(5, Math.round((raw / propertyPrice) * 100))));
                          }
                        }}
                      />
                    </div>
                    <div className="emi-badge-box">
                      <span>{downPaymentPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="emi-input-row">
                  <span className="emi-field-label">Interest Rate (p.a.)</span>
                  <div className="emi-split-inputs">
                    <div className="emi-input-box flex-1">
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="emi-badge-box">
                      <span>%</span>
                    </div>
                  </div>
                </div>

                <div className="emi-input-row">
                  <span className="emi-field-label">Loan Tenure</span>
                  <div className="emi-split-inputs">
                    <div className="emi-input-box flex-1">
                      <input
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value) || 1)}
                      />
                    </div>
                    <div className="emi-badge-box select-badge">
                      <span>Years ⌄</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Estimated Monthly EMI & Slider */}
              <div className="emi-panel-card">
                <div className="emi-panel-header-info">
                  <h3 className="emi-panel-title">Estimated Monthly EMI</h3>
                  <span className="info-tooltip-ico" title="Based on standard diminishing balance calculation">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </span>
                </div>

                <div className="emi-highlight-box">
                  <div className="emi-big-amount">
                    ₹ {formatRupee(monthlyEmi)} <small>/month</small>
                  </div>
                  <div className="emi-amount-caption">Principal + interest</div>
                </div>

                <div className="tenure-slider-group">
                  <div className="slider-top-label">
                    <span>Loan Tenure</span>
                    <strong>{loanTenure} years</strong>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="custom-range-slider"
                  />

                  <div className="slider-scale-points">
                    <span>5</span>
                    <span>10</span>
                    <span className="active-point">20</span>
                    <span>30</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Cost Breakdown Ring & Percentages */}
              <div className="emi-panel-card">
                <h3 className="emi-panel-title">Cost Breakdown</h3>

                <div className="breakdown-chart-flex">
                  {/* Conic Ring Chart */}
                  <div className="cost-donut-chart">
                    <div className="donut-center-info">
                      <strong>{formatCr(totalCost)}</strong>
                      <small>Total Cost</small>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div className="breakdown-legend-list">
                    <div className="legend-row">
                      <span className="legend-indicator teal-dot"></span>
                      <div className="legend-meta">
                        <small>Principal Amount</small>
                        <strong>{formatCr(loanPrincipal)}</strong>
                      </div>
                      <span className="legend-pct">48%</span>
                    </div>

                    <div className="legend-row">
                      <span className="legend-indicator dark-green-dot"></span>
                      <div className="legend-meta">
                        <small>Interest Amount</small>
                        <strong>{formatCr(totalInterest)}</strong>
                      </div>
                      <span className="legend-pct">44%</span>
                    </div>

                    <div className="legend-row">
                      <span className="legend-indicator gold-dot"></span>
                      <div className="legend-meta">
                        <small>Other Charges</small>
                        <strong>₹ 22.00 L</strong>
                      </div>
                      <span className="legend-pct">8%</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-view-cost-breakdown"
                  onClick={() => showToast("Opening full amortisation schedule...")}
                >
                  <span>View Cost Breakdown</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* 11. Legal Documents Section */}
          <section className="section legal-docs-section" id="documents" aria-label="Legal Documents">
            <div className="legal-section-header">
              <span className="legal-eyebrow-tag">LEGAL</span>
              <h2 className="legal-main-heading">Legal Documents</h2>
              <p className="legal-subheading">All key documents are verified and available for your review.</p>
            </div>

            <div className="legal-docs-composite-grid">
              {/* Left 4 Document Cards in 2x2 layout */}
              <div className="legal-cards-quad">
                {[
                  {
                    title: "Title Deed",
                    desc: "Ownership and property title verification document.",
                    verified: "Verified",
                  },
                  {
                    title: "Layout Approval",
                    desc: "Approved layout plan from authorized authority.",
                    verified: "Verified",
                  },
                  {
                    title: "Land Conversion",
                    desc: "Agricultural to residential conversion document.",
                    verified: "Verified",
                  },
                  {
                    title: "Encumbrance Certificate",
                    desc: "Confirms no legal dues on the property.",
                    verified: "Verified",
                  },
                ].map((doc, idx) => (
                  <div key={idx} className="legal-doc-card">
                    <div className="legal-card-top-row">
                      <div className="doc-icon-bubble">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>

                      <div className="doc-title-meta">
                        <div className="doc-headline-pill">
                          <strong>{doc.title}</strong>
                          <span className="doc-verified-pill">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {doc.verified}
                          </span>
                        </div>
                        <p className="doc-snippet-desc">{doc.desc}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-download-pdf"
                      onClick={() => showToast(`Downloading ${doc.title} (PDF)...`)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Summary Verified & Approved Card */}
              <div className="legal-summary-card">
                <div className="verified-shield-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>

                <h3 className="verified-card-heading">Verified &amp; Approved</h3>
                <p className="verified-card-text">
                  These documents have been verified for authenticity and are available for your reference.
                </p>

                <ul className="verified-check-list">
                  <li>
                    <span className="check-bullet">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Clear title</span>
                  </li>
                  <li>
                    <span className="check-bullet">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>No legal disputes</span>
                  </li>
                  <li>
                    <span className="check-bullet">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>All approvals in place</span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn-request-full-docs"
                  onClick={() => showToast("Request submitted for full RERA/HMDA title documentation kit.")}
                >
                  <span>Request Full Document Set</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* 12. Location (Past, Present & Future) Section */}
          <section className="section location-timeline-section" id="location" aria-label="Location evolution">
            <div className="location-header-row">
              <div>
                <span className="location-eyebrow-tag">LOCATION</span>
                <h2 className="location-city-title">Kokapet</h2>
              </div>

              {/* Location Dropdown selector pill */}
              <div className="location-selector-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#075b49" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Kokapet, Hyderabad</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Aerial Showcase Box with Past / Present / Future Interactive Switcher */}
            <div className="location-aerial-frame">
              {/* Top Floating Era Tabs Switcher */}
              <div className="era-switcher-capsule">
                <button
                  type="button"
                  className={`era-btn ${selectedEra === "past" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedEra("past");
                    showToast("Kokapet (2010): Agricultural farmland & open landscape");
                  }}
                >
                  <span className="era-name">Past</span>
                  <small className="era-year">2010</small>
                </button>

                <button
                  type="button"
                  className={`era-btn ${selectedEra === "present" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedEra("present");
                    showToast("Kokapet (2024): Thriving IT & premium residential hub");
                  }}
                >
                  <span className="era-name">Present</span>
                  <small className="era-year">2024</small>
                </button>

                <button
                  type="button"
                  className={`era-btn ${selectedEra === "future" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedEra("future");
                    showToast("Kokapet (Upcoming): Metro expansion, mega tech parks & green corridors");
                  }}
                >
                  <span className="era-name">Future</span>
                  <small className="era-year">Upcoming</small>
                </button>
              </div>

              {/* Background Aerial Landscape Image depending on selectedEra */}
              <img
                src={
                  selectedEra === "past"
                    ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90"
                    : selectedEra === "future"
                    ? "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=90"
                    : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=90"
                }
                alt={`Kokapet aerial view - ${selectedEra}`}
                className={`aerial-img ${selectedEra === "past" ? "past-filter" : ""}`}
              />
            </div>
          </section>

          {/* 13. Buying Journey Section */}
          <section className="section buying-journey-section" aria-label="Buying Journey">
            <div className="section-title-wrap">
              <span className="journey-eyebrow-tag">BUYING JOURNEY</span>
              <h2 className="journey-main-heading">A simple, transparent process.</h2>
              <p className="journey-subheading">
                A clear path from your first conversation to the final handover.
              </p>
            </div>

            {/* Step Progress Track */}
            <div className="journey-track-container">
              <div className="journey-horizontal-line" />

              <div className="journey-steps-grid">
                {/* Step 1 */}
                <div className="journey-step-node">
                  <div className="step-circle-badge">01</div>
                  <h3 className="step-title">Enquire</h3>
                  <p className="step-desc">
                    Tell us what you're looking for, and we'll share the right options.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="journey-step-node">
                  <div className="step-circle-badge">02</div>
                  <h3 className="step-title">Site Visit</h3>
                  <p className="step-desc">
                    Visit the property with our team and explore the layout and surroundings.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="journey-step-node">
                  <div className="step-circle-badge">03</div>
                  <h3 className="step-title">Legal Verification</h3>
                  <p className="step-desc">
                    Review approvals, title documents, and property details with complete clarity.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="journey-step-node">
                  <div className="step-circle-badge">04</div>
                  <h3 className="step-title">Book &amp; Pay</h3>
                  <p className="step-desc">
                    Select your plot and complete the booking with a clear payment schedule.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="journey-step-node">
                  <div className="step-circle-badge completed-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="step-title">Registration</h3>
                  <p className="step-desc">
                    We coordinate the registration process and guide you through the final handover.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 14. Dark Luxury Booking Section ("Ready to visit this plot?") */}
          <section className="section dark-booking-section" id="enquiry-form-section" aria-label="Visit Booking Section">
            <div className="dark-booking-card">
              <div className="booking-card-inner">
                {/* Left Side: Headline, Copy & Illustration */}
                <div className="booking-left-copy">
                  <span className="booking-eyebrow-tag">NEXT STEP</span>
                  <h2 className="booking-main-title">Ready to visit this plot?</h2>
                  <p className="booking-sub-desc">
                    Leave your details and our team will call you back with availability. You can also pick a preferred slot and book a site visit directly.
                  </p>

                  <div className="booking-illustration-box">
                    <img
                      src="/assets/team-expert-advisor.png"
                      alt="Property consultant helping user"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>
                </div>

                {/* Right Side: Form with Slot Pickers & Dual Action CTAs */}
                <form
                  className="booking-dark-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast("Site visit scheduled! Our team will contact you shortly.");
                  }}
                >
                  <div className="form-inputs-two-col">
                    <div className="dark-input-group">
                      <label>NAME</label>
                      <input required placeholder="Your full name" defaultValue="" />
                    </div>

                    <div className="dark-input-group">
                      <label>PHONE NUMBER</label>
                      <div className="phone-input-combo">
                        <span className="country-code">+91</span>
                        <input required type="tel" placeholder="98765 43210" defaultValue="" />
                      </div>
                    </div>
                  </div>

                  <div className="dark-input-group full-width">
                    <label>DESCRIPTION <span className="opt-tag">Optional</span></label>
                    <textarea
                      rows="3"
                      defaultValue="Hi, I'm interested in learning more about this property. Could you please share the details?"
                    />
                    <small className="field-hint">Anything you add helps us shortlist the right plots.</small>
                  </div>

                  {/* Preferred Visit Slot */}
                  <div className="dark-slot-selection-wrap">
                    <div className="slot-heading-row">
                      <label>PREFERRED VISIT SLOT <span className="opt-tag">Optional</span></label>
                    </div>

                    <div className="slot-days-carousel-row">
                      {[
                        { day: "TODAY", date: "30" },
                        { day: "SAT", date: "31" },
                        { day: "SUN", date: "1" },
                        { day: "MON", date: "2" },
                        { day: "TUE", date: "3" },
                        { day: "WED", date: "4" },
                      ].map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`slot-day-btn ${selectedDayIdx === idx ? "active-slot-day" : ""}`}
                          onClick={() => setSelectedDayIdx(idx)}
                        >
                          <span className="slot-day-label">{slot.day}</span>
                          <span className="slot-date-num">{slot.date}</span>
                        </button>
                      ))}

                      {/* Pick a Date fallback input */}
                      <div className="or-pick-date-box">
                        <span className="pick-label">OR PICK A DATE <small>Optional</small></span>
                        <div className="date-picker-mini">
                          <input type="date" defaultValue="2026-10-31" />
                        </div>
                      </div>
                    </div>

                    {/* Time Period Tabs (Morning, Afternoon, Evening) */}
                    <div className="time-periods-segmented-pill">
                      {["Morning", "Afternoon", "Evening"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          className={`period-btn ${selectedTimePeriod === period ? "active-period" : ""}`}
                          onClick={() => setSelectedTimePeriod(period)}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    <small className="slot-hint-text">
                      Pick a slot to book a visit, or leave it empty and we'll call you back.
                    </small>
                  </div>

                  {/* Dual Action CTA Buttons */}
                  <div className="booking-cta-buttons-stack">
                    <button
                      type="button"
                      className="btn-gold-callback"
                      onClick={() => showToast("Callback requested! Our advisor will call you within 15 minutes.")}
                    >
                      Request a callback
                    </button>

                    <button type="submit" className="btn-dark-schedule-visit">
                      Schedule site visit
                    </button>
                  </div>

                  <small className="privacy-reassurance-text">
                    We'll only use your number to contact you about this property.
                  </small>
                </form>
              </div>

              {/* Bottom Quick Tools Pill Icons (Save & Share) */}
              <div className="booking-bottom-icons-row">
                <button
                  type="button"
                  className="quick-circle-tool"
                  onClick={() => {
                    setIsSaved(!isSaved);
                    showToast(isSaved ? "Removed from saved" : "Saved to your list");
                  }}
                  title="Save property"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="quick-circle-tool"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      showToast("Property link copied to clipboard!");
                    }
                  }}
                  title="Share property"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* 15. Explore More Properties in Kokapet Section */}
          <section className="section similar-properties-section" aria-label="Similar Properties">
            <div className="section-head-with-arrows">
              <div>
                <span className="similar-eyebrow-tag">SIMILAR PROPERTIES</span>
                <h2 className="similar-main-heading">Explore More Properties in Kokapet</h2>
                <p className="similar-subheading">Discover similar plots and villas in and around Kokapet.</p>
              </div>

              {/* Prev / Next circular slider navigation buttons */}
              <div className="slider-nav-arrows">
                <button
                  type="button"
                  className="round-arrow-btn"
                  aria-label="Previous properties"
                  onClick={() => setSimilarSlideIdx((curr) => Math.max(0, curr - 1))}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="round-arrow-btn"
                  aria-label="Next properties"
                  onClick={() => setSimilarSlideIdx((curr) => curr + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="similar-cards-grid">
              {[
                {
                  id: "sim-1",
                  img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
                  badge1: "Featured",
                  badge2: "Ready to Build",
                  title: "300 Sq. Yd. Plot",
                  price: "₹ 3.6 Cr",
                  sqftPrice: "₹ 1.2 L / Sq. Yd.",
                  loc: "Kokapet, Hyderabad",
                  spec1: "300 Sq. Yd.",
                  spec2: "East Facing",
                  isPlot: true,
                },
                {
                  id: "sim-2",
                  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
                  badge1: "Premium",
                  badge2: "Gated Community",
                  title: "4 BHK Villa",
                  price: "₹ 8.5 Cr",
                  sqftPrice: "₹ 12,500 / Sq. Ft.",
                  loc: "Kokapet, Hyderabad",
                  spec1: "4 Beds",
                  spec2: "4 Baths",
                  spec3: "6,800 Sq. Ft.",
                  isPlot: false,
                },
                {
                  id: "sim-3",
                  img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=85",
                  badge1: "Investment Pick",
                  badge2: "Near ORR",
                  title: "500 Sq. Yd. Plot",
                  price: "₹ 5.9 Cr",
                  sqftPrice: "₹ 1.18 L / Sq. Yd.",
                  loc: "Kokapet, Hyderabad",
                  spec1: "500 Sq. Yd.",
                  spec2: "West Facing",
                  isPlot: true,
                },
                {
                  id: "sim-4",
                  img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85",
                  badge1: "New Launch",
                  badge2: "Close to Financial District",
                  title: "400 Sq. Yd. Plot",
                  price: "₹ 4.8 Cr",
                  sqftPrice: "₹ 1.2 L / Sq. Yd.",
                  loc: "Kokapet, Hyderabad",
                  spec1: "400 Sq. Yd.",
                  spec2: "North Facing",
                  isPlot: true,
                },
              ].map((card) => (
                <article key={card.id} className="similar-property-card">
                  {/* Card Media Wrap */}
                  <div className="similar-card-media">
                    <img src={card.img} alt={card.title} />

                    {/* Floating Badges */}
                    <div className="similar-card-badges-row">
                      <span className="sim-badge dark-badge">{card.badge1}</span>
                      <span className="sim-badge white-badge">{card.badge2}</span>
                    </div>

                    {/* Save Heart Button */}
                    <button
                      type="button"
                      className="sim-heart-btn"
                      aria-label="Save to shortlist"
                      onClick={() => showToast("Property shortlisted!")}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="similar-card-body">
                    <div className="similar-title-price-row">
                      <h3 className="sim-prop-title">{card.title}</h3>
                      <div className="sim-price-block">
                        <strong>{card.price}</strong>
                        <small>{card.sqftPrice}</small>
                      </div>
                    </div>

                    <div className="sim-location-line">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#075b49" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{card.loc}</span>
                    </div>

                    {/* Specs Row */}
                    <div className="sim-specs-row">
                      {card.isPlot ? (
                        <>
                          <div className="sim-spec-tag">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            <span>{card.spec1}</span>
                          </div>
                          <div className="sim-spec-tag">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2" />
                            </svg>
                            <span>{card.spec2}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="sim-spec-tag">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20" />
                            </svg>
                            <span>{card.spec1}</span>
                          </div>
                          <div className="sim-spec-tag">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 0l-2 2a1.5 1.5 0 0 0 0 2.1L6 10" />
                              <path d="m2 13 4 4" />
                              <path d="M12 21a6 6 0 0 0 6-6H6a6 6 0 0 0 6 6z" />
                            </svg>
                            <span>{card.spec2}</span>
                          </div>
                          <div className="sim-spec-tag">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="15 3 21 3 21 9" />
                              <polyline points="9 21 3 21 3 15" />
                              <line x1="21" y1="3" x2="14" y2="10" />
                            </svg>
                            <span>{card.spec3}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* View Details Outline Button */}
                    <button
                      type="button"
                      className="btn-similar-view-details"
                      onClick={() => showToast(`Viewing details for ${card.title}`)}
                    >
                      <span>View Details</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 16. Deep Forest Green Master Site Footer */}
      <footer className="master-site-footer">
        <div className="footer-leaf-art" aria-hidden="true">
          <svg viewBox="0 0 180 280" fill="none">
            <path d="M180 270C123 204 130 116 177 12M154 228C110 209 86 184 68 145C111 149 142 175 154 228ZM145 183C105 160 91 130 91 96C125 115 144 146 145 183ZM163 135C138 98 139 65 153 37C177 68 179 103 163 135ZM122 247C89 235 60 212 42 180C79 185 106 209 122 247Z" stroke="#0e6854" strokeWidth="1.2"/>
          </svg>
        </div>

        <div className="page-container">
          <div className="footer-main-columns-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-brand-column">
              <a className="footer-brand-logo" href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }}>
                <span className="brand-wordmark">ILA</span>
                <span className="brand-homes">HOMES</span>
              </a>
              <p className="footer-brand-tagline">A smarter way to find your place.</p>
              <p className="footer-brand-desc">
                ILA HOMES helps you discover residential properties with clarity and confidence, backed by real data, immersive experiences and neighbourhood insights.
              </p>

              <div className="footer-social-links-row">
                {/* Instagram */}
                <a href="#instagram" aria-label="Instagram" className="social-circle-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#linkedin" aria-label="LinkedIn" className="social-circle-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#youtube" aria-label="YouTube" className="social-circle-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="#whatsapp" aria-label="WhatsApp" className="social-circle-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Properties */}
            <div className="footer-links-column">
              <h4>Properties</h4>
              <nav className="footer-nav-list">
                <a href="#properties">All Properties</a>
                <a href="#villas">Villas</a>
                <a href="#apartments">Apartments</a>
                <a href="#plots">Residential Plots</a>
                <a href="#launches">New Launches</a>
                <a href="#premium">Premium Properties</a>
              </nav>
            </div>

            {/* Column 3: Explore */}
            <div className="footer-links-column">
              <h4>Explore</h4>
              <nav className="footer-nav-list">
                <a href="#map">Interactive Map</a>
                <a href="#3d">3D Visualisation</a>
                <a href="#insights">Location Insights</a>
                <a href="#connectivity">Connectivity</a>
                <a href="#collections">Property Collections</a>
                <a href="#guide">Buying Guide</a>
              </nav>
            </div>

            {/* Column 4: Company */}
            <div className="footer-links-column">
              <h4>Company</h4>
              <nav className="footer-nav-list">
                <a href="#about">About Us</a>
                <a href="#developers">For Builders &amp; Developers</a>
                <a href="#list">List Your Property</a>
                <a href="#careers">Careers</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact Us</a>
              </nav>
            </div>

            {/* Column 5: Get in Touch */}
            <div className="footer-links-column contact-column">
              <h4>Get in Touch</h4>
              <div className="footer-contact-items-stack">
                <div className="footer-contact-row">
                  <span className="contact-bullet-ico">🇮🇳</span>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="footer-contact-row">
                  <span className="contact-bullet-ico">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <a href="mailto:hello@ilahomes.com">hello@ilahomes.com</a>
                </div>
                <div className="footer-contact-row align-start">
                  <span className="contact-bullet-ico">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <p>Hyderabad, Telangana<br />India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Sub-row: Legal & Copyright */}
          <div className="footer-legal-bar-row">
            <nav className="footer-legal-links" aria-label="Legal links">
              <a href="#privacy">Privacy Policy</a>
              <span className="pipe">|</span>
              <a href="#terms">Terms of Use</a>
              <span className="pipe">|</span>
              <a href="#cookies">Cookie Policy</a>
              <span className="pipe">|</span>
              <a href="#disclaimer">Disclaimer</a>
              <span className="pipe">|</span>
              <a href="#sitemap">Sitemap</a>
            </nav>

            <span className="footer-copyright-note">
              © 2024 ILA HOMES. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="action-toast-pill" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
