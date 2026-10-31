import { useRef, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import LocationStrip from "./LocationStrip";
import PropertyCard from "./PropertyCard";
import {
  CATEGORIES,
  FEATURED_PROPERTY,
  SIDE_PROPERTIES,
} from "../data/content";
import { navigateToPropertyDetails } from "../data/navigation";

export default function FeaturedProperties({ onSelectProperty }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedIds, setSavedIds] = useState({});
  const [status, setStatus] = useState("");
  const gridRef = useRef(null);

  const isVisible = (type) =>
    activeCategory === "all" || activeCategory === type;

  const visibleSideCards = SIDE_PROPERTIES.filter((property) =>
    isVisible(property.type)
  );

  const toggleSave = (id) => {
    setSavedIds((current) => ({ ...current, [id]: !current[id] }));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: FEATURED_PROPERTY.title,
          text: "Explore this featured property on ILA Homes.",
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setStatus("Property link copied.");
      } else {
        setStatus("Sharing is not supported in this browser.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setStatus("Unable to share this property. Please try again.");
      }
    }
  };

  const viewAll = () => {
    setActiveCategory("all");
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollGrid = (direction) => {
    gridRef.current?.scrollBy({ left: direction * 350, behavior: "smooth" });
  };

  const openDetails = (property) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
    navigateToPropertyDetails(property);
  };

  return (
    <section className="featured-section" id="buy" aria-labelledby="featured-heading">
      <i className="leaf one" aria-hidden="true"></i>
      <i className="leaf two" aria-hidden="true"></i>
      <i className="leaf three" aria-hidden="true"></i>
      <i className="leaf four" aria-hidden="true"></i>

      <header className="topline">
        <div className="topline-left">
          <div className="eyebrow">Handpicked for you</div>
          <h1 id="featured-heading">
            Featured <span>Properties</span>
          </h1>
          <p className="subtitle">
            Explore premium homes, plots and investment opportunities in Hyderabad’s most sought-after locations.
          </p>
        </div>
        <div className="header-actions">
          <nav className="categories" aria-label="Featured property categories">
            {CATEGORIES.map((category) => {
              const isActive = category.value === activeCategory;
              return (
                <button
                  key={category.value}
                  className={isActive ? "category active" : "category"}
                  type="button"
                  data-category={category.value}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.value)}
                >
                  <span className="icon" aria-hidden="true">
                    {category.icon}
                  </span>{" "}
                  {category.label}
                </button>
              );
            })}
          </nav>

          <div className="action-buttons">
            <div className="arrow-group">
              <button
                className="circle-btn"
                type="button"
                aria-label="Previous properties"
                onClick={() => scrollGrid(-1)}
              >
                ‹
              </button>
              <button
                className="circle-btn dark"
                type="button"
                aria-label="Next properties"
                onClick={() => scrollGrid(1)}
              >
                ›
              </button>
            </div>
            <button className="outline-btn" type="button" onClick={viewAll}>
              View All <span>→</span>
            </button>
          </div>
        </div>
      </header>

      <div className="property-grid" ref={gridRef}>
        <FeaturedCard
          property={FEATURED_PROPERTY}
          saved={Boolean(savedIds[FEATURED_PROPERTY.id])}
          onToggleSave={toggleSave}
          onShare={handleShare}
          onDetails={() => openDetails(FEATURED_PROPERTY)}
          hidden={!isVisible(FEATURED_PROPERTY.type)}
        />

        <div
          className="side-list"
          style={
            activeCategory !== "all" && visibleSideCards.length === 0
              ? { display: "none" }
              : undefined
          }
        >
          {SIDE_PROPERTIES.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              hidden={!isVisible(property.type)}
              saved={Boolean(savedIds[property.id])}
              onToggleSave={toggleSave}
              onDetails={() => openDetails(property)}
            />
          ))}
        </div>
      </div>

      <LocationStrip
        onSelectLocation={(name) => {
          openDetails({ title: `Properties in ${name}`, location: `${name}, Hyderabad` });
        }}
      />

      <p className="featured-status" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
