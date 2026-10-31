import { useRef } from "react";
import { LOCATIONS } from "../data/content";

export default function LocationStrip({ onSelectLocation }) {
  const chipsRef = useRef(null);

  const scrollChips = (direction) => {
    chipsRef.current?.scrollBy({ left: direction * 260, behavior: "smooth" });
  };

  return (
    <section className="location-strip" aria-label="Explore properties by location">
      <div className="location-intro">
        <div className="pin-circle" aria-hidden="true">
          ♧
        </div>
        <div>
          <strong>
            Explore Properties
            <br />
            by Location
          </strong>
          <p>
            Discover premium properties in
            <br />
            Hyderabad’s top growth corridors.
          </p>
        </div>
      </div>
      <div className="location-chips" ref={chipsRef}>
        {LOCATIONS.map((location) => (
          <div className="location-chip" key={location.name}>
            <img src={location.image} alt="" loading="lazy" />
            <div>
              <strong>{location.name}</strong>
              <small>{location.count}</small>
            </div>
            <button
              className="chip-arrow"
              type="button"
              aria-label={`Explore ${location.name}`}
              onClick={() => onSelectLocation(location.name)}
            >
              →
            </button>
          </div>
        ))}
      </div>
      <div className="location-arrows">
        <button
          className="circle-btn"
          type="button"
          aria-label="Previous locations"
          onClick={() => scrollChips(-1)}
        >
          ‹
        </button>
        <button
          className="circle-btn dark"
          type="button"
          aria-label="Next locations"
          onClick={() => scrollChips(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
