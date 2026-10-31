import { useState, useEffect, useRef } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

// Locations with rich metadata for map and cards
const LOCATIONS = [
  {
    name: "Patancheru",
    count: 8,
    coords: [78.265, 17.533],
    color: "#ef535b",
    type: "Gated Communities",
    price: "₹3.9 Cr",
    project: "Lake View Enclave",
    statusBadge: "Ready to Move",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80",
    specs: "3, 4 BHK Villas • Lakefront Homes",
  },
  {
    name: "Tellapur",
    count: 12,
    coords: [78.31, 17.465],
    color: "#1688e7",
    type: "Villas",
    price: "₹5.2 Cr",
    project: "Serenity Villas",
    statusBadge: "Premium",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    specs: "4 BHK • 4,800 Sq. Ft. • 12 Acres",
  },
  {
    name: "Kokapet",
    count: 24,
    coords: [78.342, 17.391],
    color: "#006452",
    type: "Plots",
    price: "₹1.8 Cr",
    project: "The Grove",
    statusBadge: "New Launch",
    active: true,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    specs: "150–300 Sq. Yd. • 150 Acres Gated",
  },
  {
    name: "Narsingi",
    count: 16,
    coords: [78.356, 17.377],
    color: "#079568",
    type: "Apartments",
    price: "₹1.2 Cr",
    project: "Seyline Enclave",
    statusBadge: "Under Construction",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    specs: "2, 3 BHK • 1,150–2,100 Sq. Ft.",
  },
  {
    name: "Manikonda",
    count: 14,
    coords: [78.382, 17.405],
    color: "#8b5be7",
    type: "Villas",
    price: "₹7.4 Cr",
    project: "The Elite Villas",
    statusBadge: "Luxury",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80",
    specs: "4 BHK • 4,600 Sq. Ft.",
  },
  {
    name: "Financial District",
    count: 22,
    coords: [78.342, 17.421],
    color: "#f59b19",
    type: "Apartments",
    price: "₹1.4 Cr",
    project: "Trident Towers",
    statusBadge: "High Rise",
    img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=80",
    specs: "2, 3 BHK • Panoramic Views",
  },
  {
    name: "Shankarpally",
    count: 10,
    coords: [78.128, 17.452],
    color: "#ef535b",
    type: "Plots",
    price: "₹28 L",
    project: "Sunrise County",
    statusBadge: "HMDA Approved",
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=80",
    specs: "200–500 Sq. Yd. • Fast Appreciation",
  },
  {
    name: "Mokila",
    count: 6,
    coords: [78.214, 17.393],
    color: "#079568",
    type: "Gated Communities",
    price: "₹3.2 Cr",
    project: "Oakridge Greens",
    statusBadge: "Eco Luxury",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80",
    specs: "3, 4 BHK • Clubhouse & Sports",
  },
  {
    name: "Chevella",
    count: 9,
    coords: [78.137, 17.307],
    color: "#8b5be7",
    type: "Plots",
    price: "₹38 L",
    project: "Meadow Lands",
    statusBadge: "Farm & Villa Plots",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    specs: "200–500 Sq. Yd. • Green Belt",
  },
];

export default function DevelopmentsMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[2]); // Default Kokapet (The Grove)
  const [mapTypeFilter, setMapTypeFilter] = useState("All");
  const [savedIds, setSavedIds] = useState({});
  const [toastMsg, setToastMsg] = useState("");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? "" : curr));
    }, 2800);
  };

  const toggleSave = (id, name, e) => {
    e?.stopPropagation();
    setSavedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `Saved ${name}` : `Removed ${name} from saved`);
      return next;
    });
  };

  const handleSelectLocation = (loc) => {
    setActiveLocation(loc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: loc.coords,
        zoom: 12.2,
        duration: 900,
        essential: true,
      });
    }
  };

  // Initialize Mapbox map
  useEffect(() => {
    if (!window.mapboxgl || !mapContainerRef.current) return;

    window.mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new window.mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: activeLocation.coords,
      zoom: 10.2,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    map.addControl(new window.mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(
      new window.mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
      }),
      "bottom-right"
    );

    map.on("load", () => {
      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      LOCATIONS.forEach((loc) => {
        const el = document.createElement("button");
        el.className = `dev-map-pin ${loc.name === activeLocation.name ? "is-active" : ""}`;
        el.setAttribute("type", "button");
        el.innerHTML = `
          <span class="pin-dot" style="background:${loc.color}">●</span>
          <span class="pin-text">
            <strong>${loc.name}</strong>
            <small>${loc.count} projects</small>
          </span>
        `;

        el.addEventListener("click", () => {
          handleSelectLocation(loc);
        });

        const marker = new window.mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(loc.coords)
          .addTo(map);

        markersRef.current.push({ marker, data: loc, element: el });
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  // Update marker selection state
  useEffect(() => {
    markersRef.current.forEach(({ data, element }) => {
      if (element) {
        if (data.name === activeLocation.name) {
          element.classList.add("is-active");
        } else {
          element.classList.remove("is-active");
        }
      }
    });
  }, [activeLocation]);

  // Filter markers on map tab change
  const handleMapFilterChange = (filter) => {
    setMapTypeFilter(filter);
    markersRef.current.forEach(({ data, element }) => {
      if (element) {
        const visible = filter === "All" || data.type === filter;
        element.style.display = visible ? "flex" : "none";
      }
    });
    showToast(`Map filtered: ${filter}`);
  };

  const navigateHome = () => {
    window.location.hash = "#top";
  };

  return (
    <div className="developments-page-layout">
      {/* LEFT SCROLLABLE EXPLORER CONTENT */}
      <main className="developments-content-stream">
        {/* Top Header / Navigation Bar */}
        <header className="dev-page-header">
          <div className="dev-brand-combo" onClick={navigateHome}>
            <button type="button" className="dev-back-link" aria-label="Back to home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="dev-brand-logo-container">
              <img
                src="/assets/ila-logo.png"
                alt="ILA HOMES — Building futures and unlocking possibilities"
                className="dev-brand-logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/ila-homes-logo-white.png";
                }}
              />
            </div>
          </div>

          <nav className="dev-navlinks-bar" aria-label="Developments menu">
            <a href="#top" onClick={navigateHome}>Home</a>
            <a href="#properties" className="active">Properties</a>
            <a href="#developments">Developments</a>
            <a href="#map">Map</a>
            <a href="#resources">Resources <span>⌄</span></a>
          </nav>

          <div className="dev-header-actions">
            <button
              type="button"
              className="dev-icon-action"
              aria-label="Search"
              onClick={() => document.getElementById("devProjectSearch")?.focus()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 5 5" />
              </svg>
            </button>

            <button
              type="button"
              className="dev-icon-action"
              aria-label="Saved developments"
              onClick={() => showToast("Your saved developments are stored here")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
            </button>

            <button
              type="button"
              className="dev-btn-signin"
              onClick={() => {
                window.location.hash = "#signup";
              }}
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* Intro & Search Hero Area */}
        <section className="dev-intro-section">
          <div className="dev-intro-badge-row">
            <span className="dev-eyebrow-caps">
              <span className="eyebrow-dot" />
              EXPLORE DEVELOPMENTS &amp; PROPERTIES
            </span>
            <span className="dev-count-pill">120+ Active Projects</span>
          </div>

          <h1 className="dev-main-title">
            Find the Right Development <span className="title-highlight">for Your Future</span>
          </h1>

          <p className="dev-main-subtext">
            Discover premium villa communities, plotted layouts, luxury apartments and gated enclaves across Hyderabad.
          </p>

          {/* Interactive Search Bar */}
          <form
            className="dev-hero-searchbar"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const match = LOCATIONS.find((l) =>
                  (l.name + " " + l.project + " " + l.type).toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (match) handleSelectLocation(match);
                showToast(`Searching for "${searchQuery}"...`);
              }
            }}
          >
            <span className="search-lead-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 5 5" />
              </svg>
            </span>

            <input
              id="devProjectSearch"
              type="text"
              placeholder='Search projects, locations, developers or try "villas in kokapet"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="search-location-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Hyderabad</span>
              <span className="chev">⌄</span>
            </div>

            <button type="submit" className="search-submit-circle" aria-label="Submit search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 5 5" />
              </svg>
            </button>
          </form>

          {/* Filter Chips Bar */}
          <div className="dev-filter-matrix">
            <button type="button" className="dev-filter-btn" onClick={() => showToast("Location filter opened")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="f-text"><strong>Location</strong><span>Hyderabad</span></span>
              <span className="f-chev">⌄</span>
            </button>

            <button type="button" className="dev-filter-btn" onClick={() => showToast("Budget filter opened")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span className="f-text"><strong>Budget Range</strong><span>Any</span></span>
              <span className="f-chev">⌄</span>
            </button>

            <button type="button" className="dev-filter-btn" onClick={() => showToast("Development Type filter opened")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V8l7-5 7 5v13M9 11h2m2 0h2m-6 4h2m2 0h2" />
              </svg>
              <span className="f-text"><strong>Development Type</strong><span>All Types</span></span>
              <span className="f-chev">⌄</span>
            </button>

            <button type="button" className="dev-filter-btn" onClick={() => showToast("Project Status filter opened")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6" />
              </svg>
              <span className="f-text"><strong>Project Status</strong><span>All</span></span>
              <span className="f-chev">⌄</span>
            </button>

            <button type="button" className="dev-filter-btn more-btn" onClick={() => showToast("More filter options")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>More Filters</span>
            </button>
          </div>

          {/* Active Tags Strip */}
          <div className="active-tag-chips-row">
            <span className="active-chip">Hyderabad ✕</span>
            <span className="active-chip">₹30L – ₹5Cr+ ✕</span>
            <span className="active-chip">Verified RERA ✕</span>
            <button type="button" className="clear-all-link" onClick={() => showToast("Filters reset")}>
              Clear All
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="dev-categories-container">
          {/* CATEGORY 1: VILLA PROJECTS */}
          <article className="dev-category-group">
            <div className="dev-cat-header-row">
              <div className="cat-icon-badge villa-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 15 16 4l13 11M7 13v15h18V13M12 28v-9h8v9" />
                </svg>
              </div>
              <div className="cat-text-wrap">
                <h2>Villa Projects</h2>
                <p>Luxury villa communities with world-class clubhouse amenities and expansive private green living.</p>
              </div>
              <div className="cat-header-actions">
                <a href="#villas" className="cat-view-all-link" onClick={(e) => { e.preventDefault(); showToast("Viewing all villa developments"); }}>
                  View All &rarr;
                </a>
                <div className="cat-carousel-arrows">
                  <button type="button" className="cat-round-btn" aria-label="Previous villas">‹</button>
                  <button type="button" className="cat-round-btn" aria-label="Next villas">›</button>
                </div>
              </div>
            </div>

            {/* Showcase Row */}
            <div className="dev-project-cards-row">
              {/* Featured Big Visual Card */}
              <div
                className="dev-hero-feature-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "serenity-villas",
                    title: "Serenity Villas",
                    location: "Tellapur, Hyderabad",
                    price: "₹5.2 Cr",
                  });
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                  alt="Serenity Villas"
                />
                <span className="dev-floating-status-badge">Premium</span>
                <div className="dev-feature-bottom-caption">
                  <strong>Serenity Villas</strong>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Tellapur, Hyderabad
                  </span>
                </div>
              </div>

              {/* Middle Detail Spec Card */}
              <div className="dev-detail-specs-card">
                <div className="spec-top-badges">
                  <div className="badge-pills-row">
                    <span className="spec-pill">Gated Community</span>
                    <span className="spec-pill">RERA Approved</span>
                  </div>
                  <button
                    type="button"
                    className="spec-heart-btn"
                    onClick={(e) => toggleSave("serenity", "Serenity Villas", e)}
                    aria-label="Save Serenity Villas"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={savedIds["serenity"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>

                <div className="spec-card-price">
                  ₹5.2 Cr <small>Onwards</small>
                </div>

                <div className="spec-key-features">
                  <span>▤ 4 BHK</span>
                  <span>◩ 4,800 Sq. Ft.</span>
                  <span>♧ 12 Acres</span>
                </div>

                <div className="spec-amenities-grid">
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Clubhouse</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Pool</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Parks</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Security</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="spec-action-cta-btn"
                  onClick={() => {
                    navigateToPropertyDetails({
                      id: "serenity-villas",
                      title: "Serenity Villas",
                      location: "Tellapur, Hyderabad",
                      price: "₹5.2 Cr",
                    });
                  }}
                >
                  Explore Villas &rarr;
                </button>
              </div>

              {/* Mini Card 1 */}
              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "elite-villas",
                    title: "The Elite Villas",
                    location: "Manikonda, Hyderabad",
                    price: "₹7.4 Cr",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=80"
                    alt="The Elite Villas"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("elite", "The Elite Villas", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["elite"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>The Elite Villas</h3>
                  <div className="compact-loc">Manikonda, Hyderabad</div>
                  <div className="compact-price">₹7.4 Cr <small>Onwards</small></div>
                  <div className="compact-specs">4 BHK • 4,600 Sq. Ft.</div>
                </div>
              </div>

              {/* Mini Card 2 */}
              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "greenwood-villas",
                    title: "Greenwood Villas",
                    location: "Narsingi, Hyderabad",
                    price: "₹6.9 Cr",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80"
                    alt="Greenwood Villas"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("greenwood", "Greenwood Villas", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["greenwood"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Greenwood Villas</h3>
                  <div className="compact-loc">Narsingi, Hyderabad</div>
                  <div className="compact-price">₹6.9 Cr <small>Onwards</small></div>
                  <div className="compact-specs">4 BHK • 5,000 Sq. Ft.</div>
                </div>
              </div>
            </div>
          </article>

          {/* CATEGORY 2: PLOTTED DEVELOPMENTS */}
          <article className="dev-category-group">
            <div className="dev-cat-header-row">
              <div className="cat-icon-badge plot-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className="cat-text-wrap">
                <h2>Plotted Developments</h2>
                <p>Open premium plots in fast-appreciating growth corridors with immediate ORR and metro connectivity.</p>
              </div>
              <div className="cat-header-actions">
                <a href="#plots" className="cat-view-all-link" onClick={(e) => { e.preventDefault(); showToast("Viewing all plotted developments"); }}>
                  View All &rarr;
                </a>
                <div className="cat-carousel-arrows">
                  <button type="button" className="cat-round-btn" aria-label="Previous plots">‹</button>
                  <button type="button" className="cat-round-btn" aria-label="Next plots">›</button>
                </div>
              </div>
            </div>

            {/* Showcase Row */}
            <div className="dev-project-cards-row">
              {/* Featured Big Visual Card */}
              <div
                className="dev-hero-feature-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "the-grove-kokapet",
                    title: "The Grove",
                    location: "Kokapet, Hyderabad",
                    price: "₹1.8 Cr",
                  });
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85"
                  alt="The Grove Kokapet"
                />
                <span className="dev-floating-status-badge">New Launch</span>
                <div className="dev-feature-bottom-caption">
                  <strong>The Grove</strong>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Kokapet, Hyderabad
                  </span>
                </div>
              </div>

              {/* Middle Detail Spec Card */}
              <div className="dev-detail-specs-card">
                <div className="spec-top-badges">
                  <div className="badge-pills-row">
                    <span className="spec-pill">HMDA Approved</span>
                    <span className="spec-pill">Gated Layout</span>
                  </div>
                  <button
                    type="button"
                    className="spec-heart-btn"
                    onClick={(e) => toggleSave("grove", "The Grove", e)}
                    aria-label="Save The Grove"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={savedIds["grove"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>

                <div className="spec-card-price">
                  ₹1.8 Cr <small>Onwards</small>
                </div>

                <div className="spec-key-features">
                  <span>▱ 150–300 Sq. Yd.</span>
                  <span>▦ 150 Acres</span>
                </div>

                <div className="spec-amenities-grid">
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>HMDA Approved</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Parks</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    </svg>
                    <span>Wide Roads</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                    </svg>
                    <span>Near Fin Dist</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="spec-action-cta-btn"
                  onClick={() => {
                    navigateToPropertyDetails({
                      id: "the-grove-kokapet",
                      title: "The Grove",
                      location: "Kokapet, Hyderabad",
                      price: "₹1.8 Cr",
                    });
                  }}
                >
                  View Plots &rarr;
                </button>
              </div>

              {/* Mini Card 1 */}
              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "sunrise-county",
                    title: "Sunrise County",
                    location: "Shankarpally, Hyderabad",
                    price: "₹28 L",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=500&q=80"
                    alt="Sunrise County"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("sunrise", "Sunrise County", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["sunrise"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Sunrise County</h3>
                  <div className="compact-loc">Shankarpally, Hyderabad</div>
                  <div className="compact-price">₹28 L <small>Onwards</small></div>
                  <div className="compact-specs">200–500 Sq. Yd.</div>
                </div>
              </div>

              {/* Mini Card 2 */}
              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "meadow-lands",
                    title: "Meadow Lands",
                    location: "Chevella, Hyderabad",
                    price: "₹38 L",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80"
                    alt="Meadow Lands"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("meadow", "Meadow Lands", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["meadow"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Meadow Lands</h3>
                  <div className="compact-loc">Chevella, Hyderabad</div>
                  <div className="compact-price">₹38 L <small>Onwards</small></div>
                  <div className="compact-specs">200–500 Sq. Yd.</div>
                </div>
              </div>
            </div>
          </article>

          {/* CATEGORY 3: APARTMENT PROJECTS */}
          <article className="dev-category-group">
            <div className="dev-cat-header-row">
              <div className="cat-icon-badge apt-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 28V9h10v19M14 28V3h14v25" />
                </svg>
              </div>
              <div className="cat-text-wrap">
                <h2>Apartment Projects</h2>
                <p>Architectural high-rises and sky mansions crafted with panoramic skyline views and modern leisure amenities.</p>
              </div>
              <div className="cat-header-actions">
                <a href="#apartments" className="cat-view-all-link" onClick={(e) => { e.preventDefault(); showToast("Viewing all apartment developments"); }}>
                  View All &rarr;
                </a>
                <div className="cat-carousel-arrows">
                  <button type="button" className="cat-round-btn" aria-label="Previous apartments">‹</button>
                  <button type="button" className="cat-round-btn" aria-label="Next apartments">›</button>
                </div>
              </div>
            </div>

            {/* Showcase Row */}
            <div className="dev-project-cards-row">
              <div
                className="dev-hero-feature-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "seyline-enclave",
                    title: "Seyline Enclave",
                    location: "Narsingi, Hyderabad",
                    price: "₹1.2 Cr",
                  });
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85"
                  alt="Seyline Enclave"
                />
                <span className="dev-floating-status-badge">Under Construction</span>
                <div className="dev-feature-bottom-caption">
                  <strong>Seyline Enclave</strong>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Narsingi, Hyderabad
                  </span>
                </div>
              </div>

              <div className="dev-detail-specs-card">
                <div className="spec-top-badges">
                  <div className="badge-pills-row">
                    <span className="spec-pill">RERA Registered</span>
                    <span className="spec-pill">Premium Living</span>
                  </div>
                  <button
                    type="button"
                    className="spec-heart-btn"
                    onClick={(e) => toggleSave("seyline", "Seyline Enclave", e)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={savedIds["seyline"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>

                <div className="spec-card-price">
                  ₹1.2 Cr <small>Onwards</small>
                </div>

                <div className="spec-key-features">
                  <span>▤ 2, 3 BHK</span>
                  <span>◩ 1,150–2,100 Sq. Ft.</span>
                </div>

                <div className="spec-amenities-grid">
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Clubhouse</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18h12M6 6h12M12 2v20" />
                    </svg>
                    <span>Gym</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Play Area</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    <span>Multi-Court</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="spec-action-cta-btn"
                  onClick={() => {
                    navigateToPropertyDetails({
                      id: "seyline-enclave",
                      title: "Seyline Enclave",
                      location: "Narsingi, Hyderabad",
                      price: "₹1.2 Cr",
                    });
                  }}
                >
                  Explore Apartments &rarr;
                </button>
              </div>

              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "urban-heights",
                    title: "Urban Heights",
                    location: "Narsingi, Hyderabad",
                    price: "₹95 L",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80"
                    alt="Urban Heights"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("urban", "Urban Heights", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["urban"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Urban Heights</h3>
                  <div className="compact-loc">Narsingi, Hyderabad</div>
                  <div className="compact-price">₹95 L <small>Onwards</small></div>
                  <div className="compact-specs">2, 3 BHK</div>
                </div>
              </div>

              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "trident-towers",
                    title: "Trident Towers",
                    location: "Kokapet, Hyderabad",
                    price: "₹1.4 Cr",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=500&q=80"
                    alt="Trident Towers"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("trident", "Trident Towers", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["trident"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Trident Towers</h3>
                  <div className="compact-loc">Kokapet, Hyderabad</div>
                  <div className="compact-price">₹1.4 Cr <small>Onwards</small></div>
                  <div className="compact-specs">2, 3 BHK</div>
                </div>
              </div>
            </div>
          </article>

          {/* CATEGORY 4: GATED COMMUNITIES */}
          <article className="dev-category-group">
            <div className="dev-cat-header-row">
              <div className="cat-icon-badge villa-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="cat-text-wrap">
                <h2>Gated Communities</h2>
                <p>Private secure townships featuring 24/7 round-the-clock surveillance, landscaped central parks and elite club living.</p>
              </div>
              <div className="cat-header-actions">
                <a href="#gated" className="cat-view-all-link" onClick={(e) => { e.preventDefault(); showToast("Viewing all gated communities"); }}>
                  View All &rarr;
                </a>
                <div className="cat-carousel-arrows">
                  <button type="button" className="cat-round-btn" aria-label="Previous communities">‹</button>
                  <button type="button" className="cat-round-btn" aria-label="Next communities">›</button>
                </div>
              </div>
            </div>

            {/* Showcase Row */}
            <div className="dev-project-cards-row">
              <div
                className="dev-hero-feature-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "lake-view-enclave",
                    title: "Lake View Enclave",
                    location: "Patancheru, Hyderabad",
                    price: "₹3.9 Cr",
                  });
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85"
                  alt="Lake View Enclave"
                />
                <span className="dev-floating-status-badge">Ready to Move</span>
                <div className="dev-feature-bottom-caption">
                  <strong>Lake View Enclave</strong>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Patancheru, Hyderabad
                  </span>
                </div>
              </div>

              <div className="dev-detail-specs-card">
                <div className="spec-top-badges">
                  <div className="badge-pills-row">
                    <span className="spec-pill">Gated Township</span>
                    <span className="spec-pill">RERA Approved</span>
                  </div>
                  <button
                    type="button"
                    className="spec-heart-btn"
                    onClick={(e) => toggleSave("lakeview", "Lake View Enclave", e)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={savedIds["lakeview"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>

                <div className="spec-card-price">
                  ₹3.9 Cr <small>Onwards</small>
                </div>

                <div className="spec-key-features">
                  <span>▤ 3, 4 BHK Villas</span>
                  <span>◩ Lakefront Homes</span>
                </div>

                <div className="spec-amenities-grid">
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Clubhouse</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Pool</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Parks</span>
                  </div>
                  <div className="amenity-mini-tile">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>24/7 Guard</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="spec-action-cta-btn"
                  onClick={() => {
                    navigateToPropertyDetails({
                      id: "lake-view-enclave",
                      title: "Lake View Enclave",
                      location: "Patancheru, Hyderabad",
                      price: "₹3.9 Cr",
                    });
                  }}
                >
                  Explore Community &rarr;
                </button>
              </div>

              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "oakridge-greens",
                    title: "Oakridge Greens",
                    location: "Mokila, Hyderabad",
                    price: "₹3.2 Cr",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80"
                    alt="Oakridge Greens"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("oakridge", "Oakridge Greens", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["oakridge"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Oakridge Greens</h3>
                  <div className="compact-loc">Mokila, Hyderabad</div>
                  <div className="compact-price">₹3.2 Cr <small>Onwards</small></div>
                  <div className="compact-specs">3, 4 BHK</div>
                </div>
              </div>

              <div
                className="dev-compact-project-card"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: "sreenidhi-county",
                    title: "Sreenidhi County",
                    location: "Kollur, Hyderabad",
                    price: "₹4.1 Cr",
                  });
                }}
              >
                <div className="compact-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80"
                    alt="Sreenidhi County"
                  />
                  <button
                    type="button"
                    className="compact-heart"
                    onClick={(e) => toggleSave("sreenidhi", "Sreenidhi County", e)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds["sreenidhi"] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                  </button>
                </div>
                <div className="compact-body">
                  <h3>Sreenidhi County</h3>
                  <div className="compact-loc">Kollur, Hyderabad</div>
                  <div className="compact-price">₹4.1 Cr <small>Onwards</small></div>
                  <div className="compact-specs">3, 4 BHK</div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* RIGHT STICKY MAP EXPLORER PANEL */}
      <aside className="developments-map-sidebar" aria-label="Interactive developments map">
        <div id="dev-interactive-map" ref={mapContainerRef} />

        {/* Top Floating Map Filters Pill */}
        <div className="map-floating-tabs-overlay">
          <div className="map-tabs-pill-row">
            {["All", "Villas", "Plots", "Apartments", "Gated Communities"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`map-tab-btn ${mapTypeFilter === tab ? "is-active" : ""}`}
                onClick={() => handleMapFilterChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Active Selection Card */}
        {activeLocation && (
          <div className="map-floating-project-card">
            <img src={activeLocation.img} alt={activeLocation.project} />
            <div className="card-info">
              <span className="card-badge">{activeLocation.statusBadge}</span>
              <strong>{activeLocation.project}</strong>
              <span className="card-loc">{activeLocation.name}, Hyderabad</span>
              <b className="card-price">{activeLocation.price} Onwards</b>
              <button
                type="button"
                className="card-cta"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: activeLocation.name.toLowerCase(),
                    title: activeLocation.project,
                    location: `${activeLocation.name}, Hyderabad`,
                    price: activeLocation.price,
                  });
                }}
              >
                View Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="map-legend-bottom-bar">
          <div className="legend-items-wrap">
            <span><i className="dot" style={{ background: "#ef535b" }} /> New Launch</span>
            <span><i className="dot" style={{ background: "#1688e7" }} /> Popular</span>
            <span><i className="dot" style={{ background: "#006452" }} /> Premium</span>
            <span><i className="dot" style={{ background: "#8b5be7" }} /> Upcoming</span>
          </div>
        </div>
      </aside>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="dev-toast-notification" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
