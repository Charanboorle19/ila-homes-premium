import { useRef, useState } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const COMMUTE_DATA = {
  Workplace: {
    time: "18 min",
    alt: "26 min",
    via: "via ORR",
    destination: "Financial District",
    icon: "▣",
    travelMin: "18 min",
  },
  Schools: {
    time: "10 min",
    alt: "16 min",
    via: "via Main Road",
    destination: "Oakridge International",
    icon: "♧",
    travelMin: "10 min",
  },
  Hospitals: {
    time: "14 min",
    alt: "21 min",
    via: "via ORR",
    destination: "Continental Hospital",
    icon: "✚",
    travelMin: "14 min",
  },
  Shopping: {
    time: "8 min",
    alt: "13 min",
    via: "via Main Road",
    destination: "Premium Shopping",
    icon: "▢",
    travelMin: "8 min",
  },
  Transit: {
    time: "12 min",
    alt: "19 min",
    via: "via ORR",
    destination: "Raidurg Metro",
    icon: "▤",
    travelMin: "12 min",
  },
  More: {
    time: "11 min",
    alt: "17 min",
    via: "via Main Road",
    destination: "Nearby Amenities",
    icon: "•••",
    travelMin: "11 min",
  },
};

const DEVELOPMENTS = [
  {
    name: "Green Valley",
    location: "Tellapur, Hyderabad",
    plots: "80+",
    villas: "3",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Lakefront Enclave",
    location: "Mokila, Hyderabad",
    plots: "150+",
    villas: "3",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Urban Nest",
    location: "Narsingi, Hyderabad",
    plots: "95+",
    villas: "3",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=85",
  },
];

export default function ConnectivityExplorer({ onSelectProperty }) {
  const [activeKind, setActiveKind] = useState("Workplace");
  const videoRef = useRef(null);

  return (
    <section className="connectivity" id="connectivity" aria-labelledby="connectivity-heading">
      <header className="connectivity-head">
        <div className="accent-bar"></div>
        <h2 id="connectivity-heading">
          Homes Closer to <span>What Matters.</span>
        </h2>
        <p className="connectivity-sub">
          Strategically located communities connected to prime business hubs, premier schools, and daily conveniences.
        </p>
      </header>

      <div className="layout">
        {/* Left Column: Featured Project, Category Tabs, and Developments */}
        <div className="left-panel">
          <article
            className="featured"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigateToPropertyDetails({
                title: "Serene Meadows",
                location: "Kokapet, Hyderabad",
                price: "₹1.2 Cr Onwards",
              });
            }}
          >
            <div className="feature-image">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=88"
                alt="Luxury villa in a landscaped residential community"
                loading="lazy"
              />
              <span className="tag3d">◇ 3D View</span>
            </div>
            <div className="feature-info">
              <div className="feature-top">
                <h2>Serene Meadows</h2>
                <button
                  className="round-go"
                  type="button"
                  aria-label="View Serene Meadows"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToPropertyDetails({
                      title: "Serene Meadows",
                      location: "Kokapet, Hyderabad",
                      price: "₹1.2 Cr Onwards",
                    });
                  }}
                >
                  ›
                </button>
              </div>
              <div className="location">
                <b>⌖</b> Kokapet, Hyderabad
              </div>
              <div className="stats">
                <div className="stat">
                  <span className="stat-icon">▦</span>
                  <div>
                    <strong>120+</strong>
                    <small>Plots</small>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-icon">⌂</span>
                  <div>
                    <strong>4</strong>
                    <small>Villa Designs</small>
                  </div>
                </div>
              </div>
              <div className="price">
                ₹1.2 Cr <small>Onwards</small>
              </div>
            </div>
          </article>

          {/* Quick Category Commute Selectors */}
          <div className="category-tabs" id="categoryTabs">
            {Object.keys(COMMUTE_DATA).map((kind) => {
              const data = COMMUTE_DATA[kind];
              const isActive = activeKind === kind;
              return (
                <button
                  key={kind}
                  type="button"
                  className={`category-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveKind(kind)}
                >
                  <span className="icon">{data.icon}</span>
                  <span>
                    {kind}
                    <small>{data.travelMin}</small>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Developments List */}
          <div className="project-list">
            {DEVELOPMENTS.map((dev) => (
              <article
                key={dev.name}
                className="project-row"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigateToPropertyDetails({
                    title: dev.name,
                    location: dev.location,
                    price: "₹1.4 Cr Onwards",
                  });
                }}
              >
                <div className="project-img">
                  <img src={dev.image} alt={dev.name} loading="lazy" />
                </div>
                <div className="project-title">
                  <h3>{dev.name}</h3>
                  <p>⌖ {dev.location}</p>
                </div>
                <div className="project-stat">
                  <span className="ico">▦</span>
                  <div>
                    <strong>{dev.plots}</strong>
                    <small>Plots</small>
                  </div>
                </div>
                <div className="project-stat">
                  <span className="ico">⌂</span>
                  <div>
                    <strong>{dev.villas}</strong>
                    <small>Villa Designs</small>
                  </div>
                </div>
                <button className="row-arrow" type="button" aria-label={`View ${dev.name}`}>
                  ›
                </button>
              </article>
            ))}
          </div>

          <button
            className="view-all"
            type="button"
            onClick={() => alert("Viewing all developments")}
          >
            View All Developments <span>→</span>
          </button>
        </div>

        {/* Right Column: Clean Map Video Panel */}
        <div
          className="map-panel"
          id="mapPanel"
          aria-label="Map video showcase"
        >
          <video
            ref={videoRef}
            src="/assets/connectivity.mp4"
            className="map-video-bg"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
}


