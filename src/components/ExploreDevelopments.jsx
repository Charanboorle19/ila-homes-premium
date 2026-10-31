import { useState, useRef } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const MODES = {
  "3D": { filter: "saturate(1.02) contrast(1.02)", label: "3D perspective selected" },
  Aerial: { filter: "saturate(0.9) contrast(1.05)", label: "Aerial view selected" },
  Corner: { filter: "saturate(1.15) contrast(1.05)", label: "Corner perspective selected" },
  Top: { filter: "saturate(0.82) contrast(1.08)", label: "Top view selected" },
  Street: { filter: "saturate(0.95) brightness(1.04)", label: "Street-level view selected" },
};

const DEVELOPMENTS = [
  {
    id: "green-valley",
    name: "Green Valley",
    location: "Tellapur, Hyderabad",
    plots: "80+",
    plotSizes: "25–40 Sq.Yd",
    image: "/assets/Luxury Lakeside Residential Masterplan.png",
  },
  {
    id: "lakefront-enclave",
    name: "Lakefront Enclave",
    location: "Mokila, Hyderabad",
    plots: "150+",
    plotSizes: "30–60 Sq.Yd",
    image: "/assets/Golden-Hour Lakeside Luxury Community.png",
  },
  {
    id: "urban-nest",
    name: "Urban Nest",
    location: "Narsingi, Hyderabad",
    plots: "95+",
    plotSizes: "20–40 Sq.Yd",
    image: "/assets/Luxury Lakeside Residential Masterplan.png",
  },
  {
    id: "riverside-county",
    name: "Riverside County",
    location: "Shankarpally, Hyderabad",
    plots: "200+",
    plotSizes: "30–70 Sq.Yd",
    image: "/assets/Golden-Hour Lakeside Luxury Community.png",
  },
];


export default function ExploreDevelopments({ onSelectProperty }) {
  const [activeMode, setActiveMode] = useState("3D");
  const [dayNight, setDayNight] = useState("day"); // 'day' | 'night'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [toastMsg, setToastMsg] = useState("");
  const visualRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMsg("");
    }, 2400);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    showToast(`${MODES[mode]?.label || mode} · demo preview`);
  };

  const handleZoom = (delta) => {
    setZoom((prev) => {
      const next = Math.max(1, Math.min(1.6, Number((prev + delta).toFixed(1))));
      showToast(next === 1 ? "Minimum zoom" : `Zoom ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const toggleFavorite = (id, name, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const isFav = !prev[id];
      showToast(isFav ? `${name} saved to favourites` : `Removed ${name} from favourites`);
      return { ...prev, [id]: isFav };
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && visualRef.current?.requestFullscreen) {
      visualRef.current.requestFullscreen().catch(() => {
        showToast("Fullscreen is not available in this browser");
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const currentFilter =
    dayNight === "night"
      ? "brightness(0.62) saturate(0.78)"
      : MODES[activeMode]?.filter || "none";

  return (
    <section className="developments" id="explore-developments" aria-labelledby="developments-heading">
      <header className="section-head">
        <h2 id="developments-heading">
          Explore Our <span>Developments</span>
        </h2>
        <button
          className="outline-btn"
          type="button"
          onClick={() => {
            window.location.hash = "#explore-developments-all";
          }}
        >
          View All Developments <span>→</span>
        </button>
      </header>

      <div className="development-grid">
        {/* Left: Featured Card with Interactive 3D Viewer */}
        <article className="featured-card">
          <div className="featured-visual" ref={visualRef} id="featuredVisual">
            <video
              id="heroImage"
              src="/assets/3d-recording-1.mp4"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                filter: currentFilter,
              }}
            />
            <div className="visual-shade"></div>

            {/* Top Pill Tabs */}
            <div className="pill-tabs">
              {Object.keys(MODES).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={activeMode === mode ? "active" : ""}
                  onClick={() => handleModeChange(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Compass */}
            <button
              className="compass"
              type="button"
              aria-label="Rotate compass"
              onClick={() => {
                setRotation((prev) => prev + 15);
                showToast("Compass angle adjusted");
              }}
            >
              N
            </button>

            {/* Map Controls */}
            <div className="map-controls">
              <button type="button" aria-label="Zoom in" onClick={() => handleZoom(0.1)}>
                +
              </button>
              <button type="button" aria-label="Zoom out" onClick={() => handleZoom(-0.1)}>
                −
              </button>
              <button type="button" aria-label="Toggle fullscreen" onClick={toggleFullscreen}>
                ⛶
              </button>
            </div>

            {/* Bottom Toolbar */}
            <div className="bottom-toolbar">
              <div className="camera-modes">
                {Object.keys(MODES).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={activeMode === mode ? "active" : ""}
                    onClick={() => handleModeChange(mode)}
                  >
                    {mode}
                  </button>
                ))}
                <button type="button" onClick={() => handleZoom(0.1)} aria-label="Zoom in">
                  ＋
                </button>
                <button type="button" onClick={() => handleZoom(-0.1)} aria-label="Zoom out">
                  −
                </button>
              </div>

              <div className="scene-actions">
                <button
                  type="button"
                  aria-label="Change lighting"
                  onClick={() => showToast("Lighting calibrated")}
                >
                  <span className="sym">☼</span>
                </button>
                <button
                  type="button"
                  className={dayNight === "day" ? "active" : ""}
                  aria-label="Daylight mode"
                  onClick={() => {
                    setDayNight("day");
                    showToast("Daylight view selected");
                  }}
                >
                  ☀
                </button>
                <button
                  type="button"
                  className={dayNight === "night" ? "active" : ""}
                  aria-label="Night mode"
                  onClick={() => {
                    setDayNight("night");
                    showToast("Night view selected");
                  }}
                >
                  ☾
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Live sensor feed simulated")}
                >
                  <span className="sym">≋</span>Live
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Flying car camera perspective demo")}
                >
                  <span className="sym">♧</span>Flying car
                </button>
              </div>
            </div>
          </div>

          <div className="featured-details">
            <div className="featured-title-row">
              <div>
                <h2>Serene Meadows</h2>
                <div className="sub-location">
                  <span className="pin">⌖</span> Kokapet, Hyderabad
                </div>
              </div>
              <button
                className="explore-3d"
                type="button"
                onClick={() => {
                  navigateToPropertyDetails({
                    title: "Serene Meadows",
                    location: "Kokapet, Hyderabad, Telangana",
                    price: "₹1.8 Cr – ₹3.2 Cr",
                  });
                }}
              >
                Explore in 3D &nbsp; →
              </button>
            </div>

            <div className="feature-stats">
              <div className="feature-stat">
                <span className="symbol">↗</span>
                <div>
                  <strong>120+</strong>
                  <small>Plots</small>
                </div>
              </div>
              <div className="feature-stat">
                <span className="symbol">⤢</span>
                <div>
                  <strong>30–50 Sq.Yd</strong>
                  <small>Plot Sizes</small>
                </div>
              </div>
              <div className="feature-stat">
                <span className="symbol">⌂</span>
                <div>
                  <strong>Clubhouse</strong>
                  <small>Modern Amenities</small>
                </div>
              </div>
              <div className="feature-stat">
                <span className="symbol">▣</span>
                <div>
                  <strong>Ready to Build</strong>
                  <small>RERA Approved</small>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Right: 4 Mini Developments Grid */}
        <div className="side-grid">
          {DEVELOPMENTS.map((dev) => {
            const isFav = !!favorites[dev.id];
            return (
              <article
                key={dev.id}
                className="mini-card"
                tabIndex={0}
                onClick={() => {
                  navigateToPropertyDetails({
                    title: dev.name,
                    location: dev.location,
                    price: "₹1.5 Cr – ₹3.0 Cr",
                  });
                }}
              >
                <div className="mini-visual">
                  <img src={dev.image} alt={dev.name} loading="lazy" />
                  <button
                    className={`favorite ${isFav ? "active" : ""}`}
                    type="button"
                    aria-label={`Save ${dev.name}`}
                    aria-pressed={isFav}
                    onClick={(e) => toggleFavorite(dev.id, dev.name, e)}
                  >
                    {isFav ? "♥" : "♡"}
                  </button>
                </div>
                <div className="mini-details">
                  <div className="mini-title-row">
                    <h3>{dev.name}</h3>
                    <button className="mini-arrow" type="button" aria-label={`View ${dev.name}`}>
                      ›
                    </button>
                  </div>
                  <p className="mini-location">⌖ &nbsp;{dev.location}</p>
                  <div className="mini-stats">
                    <div className="mini-stat">
                      <span className="symbol">↗</span>
                      <div>
                        <strong>{dev.plots}</strong>
                        <small>Plots</small>
                      </div>
                    </div>
                    <div className="mini-stat">
                      <span className="symbol">⌁</span>
                      <div>
                        <strong>{dev.plotSizes}</strong>
                        <small>Plot Sizes</small>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive Toast */}
      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </section>
  );
}
