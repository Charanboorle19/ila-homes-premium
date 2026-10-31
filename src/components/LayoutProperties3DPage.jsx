import { useState, useEffect, useRef } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

const PROPERTIES_3D = [
  {
    id: "lake-view-enclave",
    name: "Lake View Enclave",
    category: "Villa Development",
    location: "Tellapur, Hyderabad",
    price: "₹5.2 Cr",
    priceUnit: "Onwards",
    type: "4 BHK Luxury Villas",
    area: "4,800 Sq. Ft.",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
    coords: [78.31, 17.465],
    plotsCount: "42 Luxury Units",
  },
  {
    id: "serenity-greens",
    name: "Serenity Greens",
    category: "Plotted Development",
    location: "Narsingi, Hyderabad",
    price: "₹1.6 Cr",
    priceUnit: "Onwards",
    type: "Residential Plots",
    area: "200 – 500 Sq. Yd.",
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85",
    coords: [78.356, 17.377],
    plotsCount: "120 Plots",
  },
  {
    id: "urban-heights",
    name: "Urban Heights",
    category: "Gated Community",
    location: "Kokapet, Hyderabad",
    price: "₹2.8 Cr",
    priceUnit: "Onwards",
    type: "3 & 4 BHK Sky Villas",
    area: "3,200 – 4,500 Sq. Ft.",
    status: "Under Development",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85",
    coords: [78.342, 17.391],
    plotsCount: "85 Units",
  },
  {
    id: "meadow-lands",
    name: "Meadow Lands",
    category: "Plotted Development",
    location: "Chevella, Hyderabad",
    price: "₹38 L",
    priceUnit: "Onwards",
    type: "Farm & Villa Plots",
    area: "150 – 300 Sq. Yd.",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=85",
    coords: [78.137, 17.307],
    plotsCount: "200 Plots",
  },
  {
    id: "skyline-villas",
    name: "Skyline Villas",
    category: "Villa Development",
    location: "Manikonda, Hyderabad",
    price: "₹7.4 Cr",
    priceUnit: "Onwards",
    type: "4 BHK Signature Villas",
    area: "5,200 Sq. Ft.",
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85",
    coords: [78.382, 17.405],
    plotsCount: "28 Villas",
  },
  {
    id: "oakridge-greens",
    name: "Oakridge Greens",
    category: "Plotted Development",
    location: "Mokila, Hyderabad",
    price: "₹55 L",
    priceUnit: "Onwards",
    type: "Gated Plot Layout",
    area: "200 – 400 Sq. Yd.",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85",
    coords: [78.214, 17.393],
    plotsCount: "95 Plots",
  },
  {
    id: "trident-towers",
    name: "Trident Towers",
    category: "Gated Community",
    location: "Narsingi, Hyderabad",
    price: "₹1.4 Cr",
    priceUnit: "Onwards",
    type: "2 & 3 BHK Apartments",
    area: "1,450 – 2,200 Sq. Ft.",
    status: "Under Development",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85",
    coords: [78.36, 17.38],
    plotsCount: "160 Units",
  },
  {
    id: "sunrise-county",
    name: "Sunrise County",
    category: "Plotted Development",
    location: "Shankarpally, Hyderabad",
    price: "₹42 L",
    priceUnit: "Onwards",
    type: "HMDA Approved Layout",
    area: "150 – 300 Sq. Yd.",
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85",
    coords: [78.128, 17.452],
    plotsCount: "140 Plots",
  },
];

const RECENT_3D_LAYOUTS = [
  {
    name: "Greenwood Villas",
    loc: "Narsingi, Hyderabad",
    price: "₹6.9 Cr Onwards",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Vista Apartments",
    loc: "Kokapet, Hyderabad",
    price: "₹1.1 Cr Onwards",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "The Elite Villas",
    loc: "Manikonda, Hyderabad",
    price: "₹7.4 Cr Onwards",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Riverfront Plots",
    loc: "Chevella, Hyderabad",
    price: "₹32 L Onwards",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
  },
];

export default function LayoutProperties3DPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState({});
  const [toastMsg, setToastMsg] = useState("");
  const [videoZoom, setVideoZoom] = useState(1);
  const [videoRotate, setVideoRotate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const overviewMapRef = useRef(null);
  const overviewMapInstance = useRef(null);

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

  const navigateHome = () => {
    window.location.hash = "#top";
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      showToast("3D Flythrough Playing");
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      showToast("3D Flythrough Paused");
    }
  };

  const handleZoom = (delta) => {
    setVideoZoom((prev) => {
      const next = Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.8), 2.2);
      showToast(`Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleRotate = () => {
    setVideoRotate((prev) => {
      const next = (prev + 15) % 360;
      showToast(`Heading: ${next}°`);
      return next;
    });
  };

  const resetVideoView = () => {
    setVideoZoom(1);
    setVideoRotate(0);
    showToast("3D View Reset");
  };

  // Initialize Map for City Overview
  useEffect(() => {
    if (!window.mapboxgl) return;
    window.mapboxgl.accessToken = MAPBOX_TOKEN;

    // 2. City Overview Map
    if (overviewMapRef.current && !overviewMapInstance.current) {
      const mapOverview = new window.mapboxgl.Map({
        container: overviewMapRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.32, 17.39],
        zoom: 10.2,
        interactive: true,
        attributionControl: false,
      });

      mapOverview.addControl(new window.mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

      mapOverview.on("load", () => {
        PROPERTIES_3D.forEach((prop) => {
          const el = document.createElement("button");
          el.className = "overview-location-marker";
          el.innerHTML = `<span>${prop.name.split(" ")[0]}</span>`;
          el.addEventListener("click", () => {
            showToast(`Viewing 3D layout of ${prop.name}`);
            mapOverview.flyTo({ center: prop.coords, zoom: 12.5, duration: 800 });
          });
          new window.mapboxgl.Marker(el).setLngLat(prop.coords).addTo(mapOverview);
        });
      });

      overviewMapInstance.current = mapOverview;
    }

    return () => {
      overviewMapInstance.current?.remove();
      overviewMapInstance.current = null;
    };
  }, []);

  // Filter properties
  const filteredProperties = PROPERTIES_3D.filter((item) => {
    const matchCategory =
      activeCategory === "All" ||
      (activeCategory === "Plotted Layouts" && item.category === "Plotted Development") ||
      (activeCategory === "Villa Developments" && item.category === "Villa Development") ||
      (activeCategory === "Gated Communities" && item.category === "Gated Community");

    const matchSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="layout-3d-page-wrapper">
      {/* 1. Header Bar */}
      <header className="layout-3d-header">
        <div className="header-brand-side" onClick={navigateHome}>
          <button type="button" className="btn-back-round" aria-label="Back to home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <img
            src="/assets/ila-logo.png"
            alt="ILA HOMES"
            className="brand-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/ila-homes-logo-white.png";
            }}
          />
        </div>

        <nav className="header-nav-menu" aria-label="3D Navigation">
          <a href="#top" onClick={navigateHome}>Home</a>
          <a href="#properties">Properties</a>
          <a href="#explore-3d" className="active">3D Layouts</a>
          <a href="#map-overview">Map</a>
          <a href="#resources">Resources <span>⌄</span></a>
        </nav>

        <div className="header-action-tools">
          <button
            type="button"
            className="round-tool-btn"
            aria-label="Search"
            onClick={() => document.getElementById("search3dInput")?.focus()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />
            </svg>
          </button>
          <button
            type="button"
            className="round-tool-btn"
            aria-label="Saved"
            onClick={() => showToast("Saved properties list")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn-emerald-signin"
            onClick={() => {
              window.location.hash = "#signup";
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="layout-3d-hero">
        <div className="hero-content-col">
          <div className="hero-crumb-nav">
            <span onClick={navigateHome}>Home</span>
            <span className="sep">›</span>
            <span className="current">3D Layout Properties</span>
          </div>

          <div className="hero-eyebrow-pill">
            <span className="pill-dot" />
            <span>INTERACTIVE 3D EXPLORER</span>
          </div>

          <h1 className="hero-heading">
            Explore Properties in <span className="highlight">Immersive 3D</span>
          </h1>

          <p className="hero-subtext">
            Discover plotted developments, examine high-resolution terrain layouts, and visualise plots in their real-world surroundings.
          </p>

          {/* Search Pill */}
          <form
            className="hero-search-pill"
            onSubmit={(e) => {
              e.preventDefault();
              showToast(searchQuery ? `Searching "${searchQuery}"` : "Showing all 3D properties");
            }}
          >
            <span className="search-lead-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />
              </svg>
            </span>
            <input
              id="search3dInput"
              type="text"
              placeholder="Search projects, locations, or developments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="location-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Hyderabad</span>
              <span className="chev">⌄</span>
            </div>
            <button type="submit" className="search-go-circle" aria-label="Submit search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />
              </svg>
            </button>
          </form>

          {/* Category Pills */}
          <div className="hero-category-pills">
            {["All", "Plotted Layouts", "Villa Developments", "Gated Communities"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  showToast(`Category: ${cat}`);
                }}
              >
                {cat === "All" ? "All 3D Properties" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filter Bar */}
      <section className="layout-filters-bar">
        <div className="filters-strip">
          <button type="button" className="filter-pill-button" onClick={() => showToast("Location filter")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div className="f-meta"><span>Location</span><strong>Hyderabad ⌄</strong></div>
          </button>

          <button type="button" className="filter-pill-button" onClick={() => showToast("Property Type filter")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18M5 21V8l7-5 7 5v13M9 11h2m2 0h2m-6 4h2m2 0h2" />
            </svg>
            <div className="f-meta"><span>Property Type</span><strong>All Types ⌄</strong></div>
          </button>

          <button type="button" className="filter-pill-button" onClick={() => showToast("Budget filter")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <div className="f-meta"><span>Budget Range</span><strong>Any ⌄</strong></div>
          </button>

          <button type="button" className="filter-pill-button" onClick={() => showToast("Plot Area filter")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <div className="f-meta"><span>Plot Area</span><strong>Any ⌄</strong></div>
          </button>

          <button type="button" className="filter-pill-button" onClick={() => showToast("Project Status filter")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h10M7 12h6" />
            </svg>
            <div className="f-meta"><span>Project Status</span><strong>All ⌄</strong></div>
          </button>

          <button type="button" className="filter-pill-button more-btn" onClick={() => showToast("More filter options")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
            </svg>
            <strong>More Filters</strong>
          </button>
        </div>

        {/* Active Filter Tags */}
        <div className="active-tags-strip">
          <span className="tag-chip">Hyderabad ✕</span>
          <span className="tag-chip">Villas &amp; Plots ✕</span>
          <span className="tag-chip">Ready to Move ✕</span>
          <button type="button" className="btn-clear-tags" onClick={() => showToast("Filters reset")}>
            Clear All
          </button>

          <div className="sort-box">
            <span>Sort by:</span>
            <select onChange={(e) => showToast(`Sorted by: ${e.target.value}`)}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest 3D Layouts</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. Featured 3D Master Showcase Section */}
      <section className="featured-3d-showcase">
        <div className="featured-specs-column">
          <div className="eyebrow-line">
            <span className="dot" />
            <span>FEATURED 3D MASTERPLAN</span>
          </div>

          <h2 className="featured-project-name">
            The Grove <span className="featured-gold-badge">Flagship 3D</span>
          </h2>

          <div className="featured-location-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Kokapet, Hyderabad</span>
          </div>

          <p className="featured-overview-copy">
            A signature 150-acre gated plotted development featuring full interactive 3D terrain simulation, underground utility trunk lines, and immediate ORR access.
          </p>

          <div className="featured-price-tag">
            <strong>₹1.8 Cr</strong>
            <small>Onwards • ₹1.2 L / Sq. Yd.</small>
          </div>

          <div className="featured-stats-grid">
            <div className="stat-card">
              <span className="stat-value">150 – 300</span>
              <span className="stat-label">Plot Sizes (Sq. Yd.)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">150 Acres</span>
              <span className="stat-label">Total Township</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">HMDA</span>
              <span className="stat-label">Approved &amp; RERA</span>
            </div>
          </div>

          <div className="featured-amenities-row">
            <span>✓ Grand Clubhouse</span>
            <span>✓ Central Boulevard</span>
            <span>✓ 40ft Internal Roads</span>
            <span>✓ 24/7 Security</span>
          </div>

          <div className="featured-cta-buttons">
            <button
              type="button"
              className="btn-primary-3d"
              onClick={() => {
                navigateToPropertyDetails({
                  id: "the-grove-kokapet",
                  title: "The Grove",
                  location: "Kokapet, Hyderabad",
                  price: "₹1.8 Cr",
                });
              }}
            >
              Explore Full 3D Layout &rarr;
            </button>
            <button
              type="button"
              className="btn-outline-details"
              onClick={() => showToast("Opening The Grove plot brochure")}
            >
              Download Brochure
            </button>
          </div>
        </div>

        {/* Right: Featured 3D Interactive Video Player */}
        <div className="featured-video-column">
          <video
            ref={videoRef}
            src="/assets/3d-recording-1.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="featured-3d-video-player"
            style={{
              transform: `scale(${videoZoom}) rotate(${videoRotate}deg)`,
            }}
          />
          <div className="video-visual-shade" />

          {/* Top Glass Header Overlay */}
          <div className="map-glass-topline">
            <span className="chip-badge">
              <span className="live-pulse-dot" /> LIVE 3D FLYTHROUGH
            </span>
            <div className="map-status-legend">
              <span><i className="l-dot available" /> Phase 1 Open</span>
              <span><i className="l-dot booked" /> 82% Sold</span>
              <span><i className="l-dot selected" /> The Grove</span>
            </div>
          </div>

          {/* Compass Button */}
          <button
            className="video-compass-btn"
            type="button"
            aria-label="Rotate 3D orientation"
            onClick={handleRotate}
            title="Rotate 3D Orientation"
          >
            <span>N</span>
          </button>

          {/* Interactive Player Controls */}
          <div className="video-floating-controls">
            <button
              type="button"
              className="ctrl-pill-btn"
              onClick={toggleVideoPlay}
              aria-label={isPlaying ? "Pause flythrough" : "Play flythrough"}
            >
              {isPlaying ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
            <button
              type="button"
              className="ctrl-icon-btn"
              onClick={() => handleZoom(0.15)}
              aria-label="Zoom in"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              className="ctrl-icon-btn"
              onClick={() => handleZoom(-0.15)}
              aria-label="Zoom out"
              title="Zoom Out"
            >
              −
            </button>
            <button
              type="button"
              className="ctrl-pill-btn reset-btn"
              onClick={resetVideoView}
              title="Reset View"
            >
              Reset
            </button>
          </div>

          {/* Floating Plot Popup Preview */}
          <div className="floating-plot-popup">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=260&q=80"
              alt="Plot A-12"
            />
            <div className="plot-data">
              <b>Plot A-12 (Corner)</b>
              <small>300 Sq. Yd. • East Facing</small>
              <strong>₹72 Lakhs</strong>
            </div>
            <button
              type="button"
              className="btn-select-plot"
              onClick={() => showToast("Plot A-12 shortlisted!")}
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 5. 3D Properties Grid Section */}
      <section className="layout-grid-section" id="explore-3d">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">All 3D Layout Properties</h2>
            <p className="section-subtext">
              Examine spatial layouts, road widths, plot orientations and proximity in 3D.
            </p>
          </div>
          <span className="results-count-badge">
            Showing {filteredProperties.length} Properties with 3D Models
          </span>
        </div>

        <div className="properties-3d-grid">
          {filteredProperties.map((prop) => (
            <article key={prop.id} className="card-3d-property">
              <div className="card-media-wrap">
                <img src={prop.image} alt={prop.name} />
                <span className="card-status-pill">{prop.status}</span>
                <span className="card-3d-model-tag">3D Ready</span>
                <button
                  type="button"
                  className="card-heart-btn"
                  onClick={(e) => toggleSave(prop.id, prop.name, e)}
                  aria-label={`Save ${prop.name}`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={savedIds[prop.id] ? "#e53e3e" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                  </svg>
                </button>
              </div>

              <div className="card-content-body">
                <div className="card-title-type-row">
                  <h3 className="prop-name">{prop.name}</h3>
                  <span className="prop-cat-badge">{prop.category}</span>
                </div>

                <div className="card-location-line">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#006452" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{prop.location}</span>
                </div>

                <div className="card-price-line">
                  <strong>{prop.price}</strong>
                  <span>{prop.priceUnit}</span>
                </div>

                <div className="card-specs-line">
                  <span>{prop.type}</span>
                  <span>•</span>
                  <span>{prop.area}</span>
                </div>

                <div className="card-actions-row">
                  <button
                    type="button"
                    className="btn-card-3d-launch"
                    onClick={() => {
                      navigateToPropertyDetails({
                        id: prop.id,
                        title: prop.name,
                        location: prop.location,
                        price: prop.price,
                      });
                    }}
                  >
                    <span>Explore in 3D</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn-card-details"
                    onClick={() => {
                      navigateToPropertyDetails({
                        id: prop.id,
                        title: prop.name,
                        location: prop.location,
                        price: prop.price,
                      });
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Overview Map Banner Strip */}
      <section className="overview-map-strip" id="map-overview">
        <div id="overview-map-canvas" ref={overviewMapRef} />
        <div className="map-strip-overlay-card">
          <span className="strip-eyebrow">GEOGRAPHIC EXPLORER</span>
          <h2>Find 3D Properties on the Map</h2>
          <p>
            Locate 3D-enabled luxury villa communities and HMDA layouts across Hyderabad's key investment growth zones.
          </p>
          <button
            type="button"
            className="btn-strip-fly"
            onClick={() => {
              overviewMapInstance.current?.flyTo({ center: [78.34, 17.39], zoom: 11.8, duration: 900 });
              showToast("Viewing Kokapet & Narsingi 3D properties");
            }}
          >
            Explore All on Map &rarr;
          </button>
        </div>
      </section>

      {/* 7. Recently Added 3D Layouts */}
      <section className="recently-added-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Recently Added 3D Layouts</h2>
            <p className="section-subtext">Be the first to inspect new development releases with interactive layouts.</p>
          </div>
          <button
            type="button"
            className="btn-view-all-link"
            onClick={() => showToast("Loading more new 3D releases")}
          >
            View All Recent &rarr;
          </button>
        </div>

        <div className="recent-cards-row">
          {RECENT_3D_LAYOUTS.map((item, idx) => (
            <div key={idx} className="recent-layout-card">
              <img src={item.img} alt={item.name} />
              <div className="recent-card-info">
                <strong>{item.name}</strong>
                <span>{item.loc}</span>
                <b className="recent-price">{item.price}</b>
              </div>
              <button
                type="button"
                className="btn-recent-arrow"
                onClick={() => {
                  navigateToPropertyDetails({
                    id: `recent-${idx}`,
                    title: item.name,
                    location: item.loc,
                    price: item.price,
                  });
                }}
                aria-label={`View ${item.name}`}
              >
                &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="layout-cta-banner">
        <div className="cta-banner-content">
          <h2>See More Than a Property. Explore the Entire Layout.</h2>
          <p>Inspect plots, boundary lines, roads, park locations and clubhouse access with millimeter accuracy in 3D.</p>
        </div>
        <div className="cta-banner-actions">
          <button
            type="button"
            className="btn-cta-emerald"
            onClick={() => {
              window.scrollTo({ top: 400, behavior: "smooth" });
              showToast("Browsing 3D property catalogue");
            }}
          >
            Explore All 3D Properties &rarr;
          </button>
          <button
            type="button"
            className="btn-cta-outline"
            onClick={() => {
              const el = document.getElementById("map-overview");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Interactive Map
          </button>
        </div>
      </section>

      {/* 9. Master Footer */}
      <footer className="layout-master-footer">
        <div className="footer-cols-grid">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span>ILA</span> HOMES
            </div>
            <p className="footer-tagline">A smarter way to find your place.</p>
            <p className="footer-desc">
              Discover residential plots, modern villas and apartments with real geospatial precision, 3D visualization, and legal transparency.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Properties</h4>
            <a href="#properties">All Properties</a>
            <a href="#villas">Villas</a>
            <a href="#apartments">Apartments</a>
            <a href="#plots">Residential Plots</a>
            <a href="#explore-3d">3D Layouts</a>
          </div>

          <div className="footer-links-col">
            <h4>Explore</h4>
            <a href="#map-overview">Interactive Map</a>
            <a href="#explore-3d">3D Visualisation</a>
            <a href="#insights">Location Insights</a>
            <a href="#connectivity">Connectivity</a>
            <a href="#guide">Buying Guide</a>
          </div>

          <div className="footer-links-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#developers">For Builders &amp; Developers</a>
            <a href="#list">List Your Property</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer-links-col">
            <h4>Get in Touch</h4>
            <p>☎ +91 98765 43210</p>
            <p>✉ hello@ilahomes.com</p>
            <p>📍 Hyderabad, Telangana, India</p>
          </div>
        </div>

        <div className="footer-bottom-legal">
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>|</span>
            <a href="#terms">Terms of Use</a>
            <span>|</span>
            <a href="#disclaimer">Disclaimer</a>
          </div>
          <span className="copyright-text">© 2026 ILA HOMES. All rights reserved.</span>
        </div>
      </footer>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="layout-toast-pill" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
