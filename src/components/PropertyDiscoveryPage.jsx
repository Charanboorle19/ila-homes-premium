import { useState, useEffect, useRef, useMemo } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

// Rich property items for Discovery in Hyderabad
const DISCOVERY_PROPERTIES = [
  {
    id: 1,
    title: "Serene Meadows",
    area: "Kokapet, Hyderabad",
    price: 1.8,
    priceText: "₹ 1.8 Cr – 3.2 Cr",
    type: "Villa",
    bed: 4,
    size: "180 – 320 Sq.Yd",
    status: "Under Construction",
    features: ["Clubhouse", "Park Facing", "24/7 Security", "Private Pool"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    tag: "Featured",
    lng: 78.3405,
    lat: 17.3934,
    rating: 4.9,
    developer: "ILA Luxury Living",
    furnishing: "Semi-Furnished",
  },
  {
    id: 2,
    title: "Lakeview Residences",
    area: "Narsingi, Hyderabad",
    price: 1.2,
    priceText: "₹ 1.2 Cr – 2.6 Cr",
    type: "Apartment",
    bed: 3,
    size: "1,200 – 2,400 Sq.Ft",
    status: "Under Construction",
    features: ["Swimming Pool", "Gym & Yoga", "Power Backup", "Sky Lounge"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    tag: "Trending",
    lng: 78.365,
    lat: 17.385,
    rating: 4.8,
    developer: "Aura Developers",
    furnishing: "Fully Furnished",
  },
  {
    id: 3,
    title: "Green Valley Plots",
    area: "Mokila, Hyderabad",
    price: 0.6,
    priceText: "₹ 60 Lakhs – 1.5 Cr",
    type: "Plot",
    bed: 0,
    size: "200 – 400 Sq.Yd Plots",
    status: "Ready to Move",
    features: ["Gated Community", "Blacktop Roads", "Landscaped Park", "HMDA Approved"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    tag: "High ROI",
    lng: 78.215,
    lat: 17.365,
    rating: 4.7,
    developer: "Green Horizons",
    furnishing: "Unfurnished",
  },
  {
    id: 4,
    title: "Oakridge Villas",
    area: "Tellapur, Hyderabad",
    price: 2.5,
    priceText: "₹ 2.5 Cr – 4.2 Cr",
    type: "Villa",
    bed: 4,
    size: "300 – 500 Sq.Yd",
    status: "Ready to Move",
    features: ["Clubhouse", "Sports Facilities", "24/7 Security", "Private Garden"],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    tag: "Exclusive",
    lng: 78.315,
    lat: 17.455,
    rating: 5.0,
    developer: "Prestige Crest",
    furnishing: "Fully Furnished",
  },
  {
    id: 5,
    title: "Financial District Heights",
    area: "Gachibowli, Hyderabad",
    price: 3.4,
    priceText: "₹ 3.4 Cr – 5.8 Cr",
    type: "Apartment",
    bed: 4,
    size: "3,200 – 4,500 Sq.Ft",
    status: "Ready to Move",
    features: ["Infinity Pool", "Concierge", "EV Charging", "Golf Simulator"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85",
    tag: "Signature",
    lng: 78.355,
    lat: 17.432,
    rating: 4.9,
    developer: "ILA Signature",
    furnishing: "Designer Finish",
  },
  {
    id: 6,
    title: "The Orchid Estate",
    area: "Kokapet, Hyderabad",
    price: 4.5,
    priceText: "₹ 4.5 Cr – 7.2 Cr",
    type: "Villa",
    bed: 5,
    size: "450 – 750 Sq.Yd",
    status: "New Launch",
    features: ["Private Elevator", "Heated Pool", "Smart Automation", "Servant Quarters"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=85",
    tag: "Ultra Luxury",
    lng: 78.332,
    lat: 17.408,
    rating: 4.95,
    developer: "Orchid Living",
    furnishing: "Luxury Fitted",
  },
];

const POPULAR_SEARCH_CHIPS = [
  "3 BHK in Gachibowli",
  "Villa plots near ORR",
  "Ready to move flats",
  "Plots under ₹1.5 Cr",
  "Gated communities Kokapet",
  "Tellapur luxury villas",
];

const AI_QUICK_FILTERS = [
  "Show only 3 BHK",
  "Under ₹2 Cr",
  "Only ready to move",
  "Near international schools",
  "With swimming pool",
  "HMDA approved plots",
];

export default function PropertyDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState(() => {
    return sessionStorage.getItem("ila_search_query") || "";
  });
  const [selectedLocation, setSelectedLocation] = useState("Hyderabad");
  const [selectedType, setSelectedType] = useState(() => {
    return sessionStorage.getItem("ila_search_type") || "all";
  });
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedBed, setSelectedBed] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState("streets"); // "streets" | "satellite" | "3d"
  const [savedPropertyIds, setSavedPropertyIds] = useState(new Set([1, 4]));
  const [isSearchSaved, setIsSearchSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activePropertyId, setActivePropertyId] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(""), 3000);
  };

  // Filtered and Sorted properties
  const filteredProperties = useMemo(() => {
    let list = DISCOVERY_PROPERTIES.filter((p) => {
      // Type filter
      if (selectedType !== "all" && p.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      // Budget filter
      if (selectedBudget === "under1" && p.price >= 1) return false;
      if (selectedBudget === "1to3" && (p.price < 1 || p.price > 3)) return false;
      if (selectedBudget === "above3" && p.price <= 3) return false;
      // Bed filter
      if (selectedBed !== "all" && p.bed !== Number(selectedBed)) return false;
      // Status filter
      if (selectedStatus !== "all" && p.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const haystack = `${p.title} ${p.area} ${p.type} ${p.developer} ${p.features.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Location selector
      if (selectedLocation !== "Hyderabad" && !p.area.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Sorting
    if (selectedSort === "priceLow") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "priceHigh") {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, selectedLocation, selectedType, selectedBudget, selectedBed, selectedStatus, selectedSort]);

  // Handle map initialization and markers update
  useEffect(() => {
    if (!window.mapboxgl || !mapContainerRef.current) return;

    window.mapboxgl.accessToken =
      import.meta.env.VITE_MAPBOX_TOKEN || "";

    if (!mapInstanceRef.current) {
      try {
        const map = new window.mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [78.355, 17.39],
          zoom: 11,
          pitch: 15,
          antialias: true,
        });

        map.addControl(new window.mapboxgl.NavigationControl({ showCompass: true }), "bottom-right");
        map.addControl(new window.mapboxgl.FullscreenControl(), "bottom-right");

        mapInstanceRef.current = map;
      } catch (err) {
        console.error("Mapbox init failed:", err);
      }
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    const renderMarkers = () => {
      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (!filteredProperties.length) return;

      const bounds = new window.mapboxgl.LngLatBounds();

      filteredProperties.forEach((p) => {
        const el = document.createElement("div");
        el.className = `custom-map-price-marker ${activePropertyId === p.id ? "is-active" : ""}`;
        el.innerHTML = `<span>${p.price >= 1 ? `₹${p.price.toFixed(1)} Cr` : `₹${Math.round(p.price * 100)} L`}</span>`;

        el.addEventListener("click", () => {
          setActivePropertyId(p.id);
          map.flyTo({ center: [p.lng, p.lat], zoom: 13.5, duration: 900 });
        });

        const popup = new window.mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(`
          <div style="font-family:'Montserrat',sans-serif;padding:6px;min-width:180px">
            <strong style="font-size:13px;font-weight:600;color:#0e1713;display:block">${p.title}</strong>
            <span style="font-size:11px;color:#556960;display:block;margin-top:2px">${p.area}</span>
            <div style="font-size:13px;font-weight:700;color:#0f5132;margin-top:5px">${p.priceText}</div>
          </div>
        `);

        const marker = new window.mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([p.lng, p.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
        bounds.extend([p.lng, p.lat]);
      });

      // Corridor labels
      [
        ["Kokapet", 78.34, 17.392],
        ["Gachibowli", 78.348, 17.44],
        ["Tellapur", 78.315, 17.455],
        ["Narsingi", 78.365, 17.385],
        ["HITEC City", 78.382, 17.447],
      ].forEach(([name, lng, lat]) => {
        const lbl = document.createElement("div");
        lbl.className = "custom-corridor-label";
        lbl.innerHTML = `<span class="corridor-dot"></span>${name}`;
        const m = new window.mapboxgl.Marker({ element: lbl, anchor: "center" })
          .setLngLat([lng, lat])
          .addTo(map);
        markersRef.current.push(m);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 45, maxZoom: 13, duration: 800 });
      }
    };

    if (map.loaded()) {
      renderMarkers();
    } else {
      map.once("load", renderMarkers);
    }
  }, [filteredProperties, activePropertyId]);

  // Handle map style changes
  const switchMapStyle = (styleKey) => {
    setMapStyle(styleKey);
    const map = mapInstanceRef.current;
    if (!map) return;

    const styles = {
      streets: "mapbox://styles/mapbox/streets-v12",
      satellite: "mapbox://styles/mapbox/satellite-streets-v12",
      "3d": "mapbox://styles/mapbox/standard",
    };

    map.setStyle(styles[styleKey]);
    if (styleKey === "3d") {
      map.once("style.load", () => {
        try {
          map.setConfigProperty("basemap", "show3dObjects", true);
          map.setPitch(55);
        } catch {
          map.setPitch(45);
        }
      });
    } else {
      map.setPitch(15);
    }
  };

  const toggleSaveProperty = (id) => {
    setSavedPropertyIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from saved collection.");
      } else {
        next.add(id);
        showToast("Saved to your wishlist.");
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setSelectedLocation("Hyderabad");
    setSelectedType("all");
    setSelectedBudget("all");
    setSelectedBed("all");
    setSelectedStatus("all");
    setSearchQuery("");
    sessionStorage.removeItem("ila_search_query");
    sessionStorage.removeItem("ila_search_type");
    showToast("All filters reset.");
  };

  const handleCardClick = (p) => {
    setActivePropertyId(p.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({ center: [p.lng, p.lat], zoom: 14, duration: 1000 });
    }
  };

  const navigateHome = () => {
    window.location.hash = "#top";
  };

  return (
    <div className="discovery-page-root">
      {/* 1. Header Navigation Bar */}
      <header className="discovery-header">
        <div className="discovery-header-inner">
          <div className="discovery-brand" onClick={navigateHome}>
            <button type="button" className="discovery-back-btn" aria-label="Return home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <img
              src="/assets/ila-logo.png"
              alt="ILA HOMES"
              className="discovery-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/ila-homes-logo-white.png";
              }}
            />
          </div>

          <nav className="discovery-nav-links" aria-label="Quick links">
            <a href="#properties" onClick={navigateHome}>Buy</a>
            <a href="#properties" onClick={navigateHome}>Rent</a>
            <a href="#explore-developments-all">Developments</a>
            <a href="#properties">Interactive Map</a>
            <a href="#3d-layout-properties">3D Layouts</a>
          </nav>

          <div className="discovery-nav-actions">
            <button
              type="button"
              className="discovery-saved-btn"
              onClick={() => {
                window.location.hash = "#dashboard";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill={savedPropertyIds.size > 0 ? "#b88a44" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Saved ({savedPropertyIds.size})</span>
            </button>

            <button
              type="button"
              className="discovery-signin-btn"
              onClick={() => {
                window.location.hash = "#signin";
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              className="discovery-list-cta"
              onClick={() => {
                window.location.hash = "#list-property";
              }}
            >
              <span>List Property</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Hero Search Console */}
      <section className="discovery-hero-console">
        <div className="discovery-hero-bg-art" aria-hidden="true"></div>
        <div className="discovery-hero-container">
          <div className="discovery-hero-eyebrow">
            <span className="discovery-eyebrow-pill">INTELLIGENT PROPERTY DISCOVERY</span>
            <span className="discovery-eyebrow-sub">Explore Verified Luxury Homes & Prime Plots</span>
          </div>

          <h1 className="discovery-hero-title">
            Find your perfect place in <span>{selectedLocation}</span>
          </h1>

          {/* Unified AI Search Bar */}
          <form
            className="discovery-search-panel"
            onSubmit={(e) => {
              e.preventDefault();
              showToast(`Searching properties for: "${searchQuery || selectedLocation}"`);
            }}
          >
            <div className="discovery-loc-selector">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by locality"
              >
                <option value="Hyderabad">All Hyderabad</option>
                <option value="Kokapet">Kokapet</option>
                <option value="Gachibowli">Gachibowli</option>
                <option value="Tellapur">Tellapur</option>
                <option value="Narsingi">Narsingi</option>
                <option value="Mokila">Mokila</option>
              </select>
              <span className="select-chevron">⌄</span>
            </div>

            <div className="discovery-ai-sparkle" title="AI Semantic Discovery">
              ✧
            </div>

            <div className="discovery-input-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what you're looking for, e.g. 4 BHK villa with pool or plots near ORR..."
                aria-label="Describe the property you are looking for"
              />
            </div>

            <button
              type="button"
              className="discovery-voice-btn"
              title="Voice Search"
              aria-label="Voice Search"
              onClick={() => showToast("Voice search activated. Speak your requirements...")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            <button type="submit" className="discovery-submit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="7" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
              <span>Search</span>
            </button>
          </form>

          {/* Quick Filter Chips */}
          <div className="discovery-popular-strip">
            <span className="strip-title">Popular searches:</span>
            <div className="popular-chips-list">
              {POPULAR_SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="pop-chip"
                  onClick={() => {
                    setSearchQuery(chip);
                    showToast(`Searching for "${chip}"`);
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Discovery Workspace */}
      <main className="discovery-main-content">
        {/* Comprehensive Filter Bar */}
        <section className="discovery-filterbar" aria-label="Property filters">
          <div className="filter-group-wrap">
            {/* Property Type */}
            <div className="custom-filter-item">
              <span className="filter-label-tiny">Property Type</span>
              <div className="custom-select-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Property Type"
                >
                  <option value="all">All Types</option>
                  <option value="Villa">Villas</option>
                  <option value="Apartment">Apartments</option>
                  <option value="Plot">Plots / Lands</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="custom-filter-item">
              <span className="filter-label-tiny">Budget Range</span>
              <div className="custom-select-box">
                <span className="currency-symbol">₹</span>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  aria-label="Budget"
                >
                  <option value="all">Any Budget</option>
                  <option value="under1">Under ₹1 Cr</option>
                  <option value="1to3">₹1 Cr – ₹3 Cr</option>
                  <option value="above3">Above ₹3 Cr</option>
                </select>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="custom-filter-item">
              <span className="filter-label-tiny">Bedrooms</span>
              <div className="custom-select-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                </svg>
                <select
                  value={selectedBed}
                  onChange={(e) => setSelectedBed(e.target.value)}
                  aria-label="Bedrooms"
                >
                  <option value="all">Any BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
            </div>

            {/* Possession Status */}
            <div className="custom-filter-item">
              <span className="filter-label-tiny">Possession</span>
              <div className="custom-select-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  aria-label="Possession Status"
                >
                  <option value="all">Any Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>
            </div>

            {/* Clear Button */}
            <button
              type="button"
              className="filter-clear-all-btn"
              onClick={clearAllFilters}
              title="Reset all search filters"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              <span>Clear All</span>
            </button>
          </div>
        </section>

        {/* Results Toolbar */}
        <div className="discovery-results-toolbar">
          <div className="results-summary">
            <span className="summary-count">{filteredProperties.length} Properties</span> found in{" "}
            <span className="summary-locality">{selectedLocation}</span>
          </div>

          <div className="toolbar-controls">
            <div className="sort-box">
              <span className="sort-label-text">Sort by:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                aria-label="Sort properties"
              >
                <option value="relevance">Relevance</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="view-switch-group" role="group" aria-label="Layout view switcher">
              <button
                type="button"
                className={`view-btn ${viewMode === "list" ? "is-active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span>List</span>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "is-active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Grid</span>
              </button>
            </div>

            <button
              type="button"
              className={`save-search-pill ${isSearchSaved ? "is-saved" : ""}`}
              onClick={() => {
                setIsSearchSaved(!isSearchSaved);
                showToast(isSearchSaved ? "Search removed from saved list." : "Search criteria saved with email alerts!");
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isSearchSaved ? "#b88a44" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{isSearchSaved ? "Search Saved" : "Save Search"}</span>
            </button>
          </div>
        </div>

        {/* Split Content: Cards + Interactive Map */}
        <div className={`discovery-split-layout ${isMapExpanded ? "map-expanded-mode" : ""}`}>
          {/* Left Cards Section */}
          <div className={`discovery-cards-panel ${viewMode === "grid" ? "is-grid-layout" : "is-list-layout"}`}>
            {filteredProperties.length === 0 ? (
              <div className="discovery-empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No properties found matching your criteria</h3>
                <p>Try widening your budget, selecting "All Types", or resetting your search filters.</p>
                <button type="button" className="empty-reset-btn" onClick={clearAllFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProperties.map((prop) => {
                const isSaved = savedPropertyIds.has(prop.id);
                const isSelected = activePropertyId === prop.id;

                return (
                  <article
                    key={prop.id}
                    className={`discovery-property-card ${isSelected ? "is-selected-card" : ""}`}
                    onClick={() => handleCardClick(prop)}
                  >
                    <div className="discovery-card-image" style={{ backgroundImage: `url(${prop.image})` }}>
                      {prop.tag && <span className="discovery-badge-tag">{prop.tag}</span>}
                      <span className="discovery-status-pill">{prop.status}</span>
                      <button
                        type="button"
                        className={`card-heart-btn ${isSaved ? "is-saved" : ""}`}
                        aria-label="Save property"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProperty(prop.id);
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? "#ffffff" : "rgba(0,0,0,0.3)"} stroke="#ffffff" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    <div className="discovery-card-body">
                      <div className="card-top-row">
                        <div>
                          <h2 className="discovery-card-heading">{prop.title}</h2>
                          <div className="discovery-location-row">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{prop.area}</span>
                          </div>
                        </div>
                        <div className="card-rating-badge">★ {prop.rating}</div>
                      </div>

                      <div className="discovery-price-tag">{prop.priceText}</div>

                      <div className="discovery-specs-row">
                        {prop.bed > 0 && <span className="spec-item">{prop.bed} BHK {prop.type}</span>}
                        {prop.bed > 0 && <span className="spec-dot">•</span>}
                        <span className="spec-item">{prop.size}</span>
                        <span className="spec-dot">•</span>
                        <span className="spec-item">{prop.developer}</span>
                      </div>

                      <div className="discovery-features-wrap">
                        {prop.features.slice(0, 3).map((feat, idx) => (
                          <span key={idx} className="feat-chip">
                            {feat}
                          </span>
                        ))}
                        {prop.features.length > 3 && (
                          <span className="feat-chip more-chip">+{prop.features.length - 3} more</span>
                        )}
                      </div>

                      <div className="card-bottom-actions">
                        <button
                          type="button"
                          className="view-details-action"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToPropertyDetails(prop);
                          }}
                        >
                          <span>Explore Details</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Right Map Section */}
          <div className="discovery-map-container">
            <div ref={mapContainerRef} className="discovery-mapbox-canvas" />

            {/* Map Top Control Strip */}
            <div className="map-overlay-controls">
              <div className="map-view-toggle">
                <button
                  type="button"
                  className={mapStyle === "streets" ? "is-active" : ""}
                  onClick={() => switchMapStyle("streets")}
                >
                  Map
                </button>
                <button
                  type="button"
                  className={mapStyle === "satellite" ? "is-active" : ""}
                  onClick={() => switchMapStyle("satellite")}
                >
                  Satellite
                </button>
                <button
                  type="button"
                  className={mapStyle === "3d" ? "is-active" : ""}
                  onClick={() => switchMapStyle("3d")}
                >
                  3D View
                </button>
              </div>

              <button
                type="button"
                className="map-fullscreen-toggle"
                onClick={() => {
                  setIsMapExpanded(!isMapExpanded);
                  setTimeout(() => {
                    if (mapInstanceRef.current) mapInstanceRef.current.resize();
                  }, 200);
                }}
              >
                {isMapExpanded ? "✕ Close Map" : "⛶ Expand Map"}
              </button>
            </div>
          </div>
        </div>

        {/* 4. AI Refinement Strip */}
        <section className="discovery-ai-strip">
          <div className="ai-strip-icon">✧</div>
          <div className="ai-strip-text">
            <strong>Refine your search with AI Matcher</strong>
            <span>Tell us what you'd like to change, like a different budget, location, or school proximity.</span>
          </div>
          <div className="ai-quick-options">
            {AI_QUICK_FILTERS.map((pill) => (
              <button
                key={pill}
                type="button"
                className="ai-pill-btn"
                onClick={() => {
                  setSearchQuery(pill);
                  showToast(`AI Matcher applied: "${pill}"`);
                }}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        {/* 5. Pagination Footer */}
        <div className="discovery-pagination-bar">
          <span className="pagination-text">
            Showing <strong>1 – {filteredProperties.length}</strong> of <strong>{filteredProperties.length}</strong> verified properties
          </span>
          <div className="discovery-pager">
            <button type="button" className="pager-arrow" disabled>‹</button>
            <button type="button" className="pager-number is-active">1</button>
            <button type="button" className="pager-number" onClick={() => showToast("Page 2")}>2</button>
            <button type="button" className="pager-number" onClick={() => showToast("Page 3")}>3</button>
            <span className="pager-dots">…</span>
            <button type="button" className="pager-arrow" onClick={() => showToast("Next page")}>›</button>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="discovery-toast-popup" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
