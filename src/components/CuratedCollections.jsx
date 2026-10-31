import { useRef, useState } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const COLLECTIONS = [
  {
    id: "exceptional-views",
    title: "Homes with\nExceptional Views",
    desc: "Wake up to serene lakes, green landscapes and stunning city views.",
    icon: "⌁",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "private-gardens",
    title: "Villas with\nPrivate Gardens",
    desc: "Spacious homes with your own outdoor space and lush botanical landscaping.",
    icon: "♧",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "convenient-access",
    title: "Plots with\nConvenient Access",
    desc: "Well-connected plots with verified high-speed arterial road access.",
    icon: "♙",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "established-neighbourhoods",
    title: "Established\nNeighbourhoods",
    desc: "Properties situated in prime, fully developed, trusted residential localities.",
    icon: "▦",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function CuratedCollections({ onSelectProperty }) {
  const [toastMsg, setToastMsg] = useState("");
  const gridRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMsg("");
    }, 2400);
  };

  const handleScroll = (direction) => {
    if (!gridRef.current) return;
    const firstCard = gridRef.current.querySelector(".collection-card");
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    gridRef.current.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <section className="collections" id="curated-collections" aria-labelledby="collections-title">
      <div className="decor"></div>
      <div className="decor two"></div>
      <div className="decor-leaf"></div>

      <header className="section-header">
        <div className="heading-copy">
          <h2 id="collections-title">
            Find a place<br />that <span>feels like you.</span>
          </h2>
          <p className="subtitle">
            Explore curated collections built around the way you want to live.
          </p>
        </div>

        <div className="header-actions">
          <div className="carousel-controls">
            <button
              className="round-control"
              type="button"
              aria-label="Previous collections"
              onClick={() => handleScroll(-1)}
            >
              ‹
            </button>
            <button
              className="round-control"
              type="button"
              aria-label="Next collections"
              onClick={() => handleScroll(1)}
            >
              ›
            </button>
          </div>
          <button
            className="all-link"
            type="button"
            onClick={() => showToast("Opening all collections")}
          >
            Explore All Collections <span>→</span>
          </button>
        </div>
      </header>

      <div className="collection-grid" ref={gridRef} id="collectionGrid">
        {COLLECTIONS.map((col) => {
          return (
            <article
              key={col.id}
              className="collection-card"
              tabIndex={0}
              onClick={() => {
                navigateToPropertyDetails({
                  title: col.title.replace("\n", " "),
                  location: "Hyderabad, Telangana",
                  price: "₹1.8 Cr Onwards",
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigateToPropertyDetails({
                    title: col.title.replace("\n", " "),
                    location: "Hyderabad, Telangana",
                    price: "₹1.8 Cr Onwards",
                  });
                }
              }}
            >
              {col.isVideo ? (
                <video
                  src={col.videoSrc}
                  className="collection-video"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                />
              ) : (
                <img src={col.image} alt={col.title.replace("\n", " ")} loading="lazy" />
              )}

              <div className="collection-icon" aria-hidden="true">
                {col.icon}
              </div>

              <div className="card-copy">
                <h2>
                  {col.title.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx === 0 && <br />}
                    </span>
                  ))}
                </h2>
                <p>{col.desc}</p>
                <button
                  className="card-arrow"
                  type="button"
                  aria-label={`Explore ${col.title.replace("\n", " ")}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToPropertyDetails({
                      title: col.title.replace("\n", " "),
                      location: "Hyderabad, Telangana",
                      price: "₹1.8 Cr Onwards",
                    });
                  }}
                >
                  →
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </section>
  );
}
