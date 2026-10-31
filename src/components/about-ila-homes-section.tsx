import { useEffect, useState } from "react";
import { FEATURED_PROPERTY, SIDE_PROPERTIES } from "../data/content";
import { navigateToPropertyDetails } from "../data/navigation";

const ABOUT_PROPERTIES = [FEATURED_PROPERTY, ...SIDE_PROPERTIES];
const ROTATE_MS = 3800;

export default function AboutIlaHomesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (paused || ABOUT_PROPERTIES.length <= 1) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % ABOUT_PROPERTIES.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const active = ABOUT_PROPERTIES[activeIndex];

  return (
    <section
      className="about-ila-section"
      id="about"
      aria-labelledby="about-ila-heading"
    >
      <div className="about-ila-section__glow" aria-hidden="true" />
      <div className="about-ila-section__lines" aria-hidden="true">
        <span className="about-ila-section__vline about-ila-section__vline--one" />
        <span className="about-ila-section__vline about-ila-section__vline--two" />
        <span className="about-ila-section__hline about-ila-section__hline--one" />
        <span className="about-ila-section__hline about-ila-section__hline--two" />
        <svg className="about-ila-section__grid-art" viewBox="0 0 420 320" fill="none">
          <path d="M28 48 H392" />
          <path d="M28 112 H392" />
          <path d="M28 176 H392" />
          <path d="M28 240 H392" />
          <path d="M28 304 H392" />
          <path d="M48 28 V300" />
          <path d="M132 28 V300" />
          <path d="M216 28 V300" />
          <path d="M300 28 V300" />
          <path d="M384 28 V300" />
          <rect x="132" y="112" width="84" height="64" />
          <rect x="216" y="176" width="84" height="64" />
          <circle cx="174" cy="144" r="10" />
          <path d="M48 240 L132 176 L216 176 L300 112" strokeDasharray="5 6" />
        </svg>
      </div>

      <div className="about-ila-section__inner">
        <div className="about-ila-section__copy">
          <p className="about-ila-section__eyebrow">About ILA Homes</p>
          <h2 id="about-ila-heading">
            Find Your Place.
            <span>Build Your Future.</span>
          </h2>
          <div className="about-ila-section__rule" aria-hidden="true" />
          <p className="about-ila-section__lede">
            ILA Homes brings homes, residential plots, and thoughtfully planned
            communities together in one seamless property discovery experience.
          </p>
          <a className="about-ila-section__cta" href="#discover">
            Explore properties
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          className="about-ila-section__visual"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <div className="about-ila-section__frame" aria-hidden="true">
            <span className="about-ila-section__corner about-ila-section__corner--tl" />
            <span className="about-ila-section__corner about-ila-section__corner--tr" />
            <span className="about-ila-section__corner about-ila-section__corner--bl" />
            <span className="about-ila-section__corner about-ila-section__corner--br" />
          </div>

          <div
            className="about-ila-section__card-stage"
            aria-live="polite"
            aria-atomic="true"
          >
            {ABOUT_PROPERTIES.map((property, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={property.id}
                  className={[
                    "about-property-card",
                    isActive ? "is-active" : "",
                    isActive && direction < 0 ? "is-from-prev" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  role="button"
                  onClick={() => navigateToPropertyDetails(property)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigateToPropertyDetails(property);
                    }
                  }}
                >
                  <div className="about-property-card__media">
                    <img src={property.image} alt={property.alt} loading="lazy" />
                    <div className="about-property-card__fade" aria-hidden="true" />
                    <div className="about-property-card__pills">
                      {index === 0 ? (
                        <span className="about-property-card__pill about-property-card__pill--featured">
                          ★ Featured
                        </span>
                      ) : property.pill ? (
                        <span className="about-property-card__pill">
                          {property.pill.glyph ? `${property.pill.glyph} ` : ""}
                          {property.pill.label}
                        </span>
                      ) : null}
                      <span className="about-property-card__pill about-property-card__pill--verified">
                        ✓ Verified
                      </span>
                    </div>
                  </div>

                  <div className="about-property-card__body">
                    <div className="about-property-card__meta">
                      <span>{property.category || "Featured"}</span>
                      <span>{property.propertyType || property.type}</span>
                    </div>
                    <h3>{property.title}</h3>
                    <p className="about-property-card__location">
                      <span aria-hidden="true">⌖</span>
                      {property.location}
                    </p>
                    <div className="about-property-card__price-row">
                      <strong>{property.price}</strong>
                      {(property.priceNote || property.area) && (
                        <span>{property.priceNote || property.area}</span>
                      )}
                    </div>
                    {(property.specs || []).length > 0 && (
                      <div className="about-property-card__specs">
                        {(property.specs || []).slice(0, 3).map((spec) => (
                          <div key={spec.label}>
                            <strong>{spec.value}</strong>
                            <span>{spec.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      className="about-property-card__cta"
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigateToPropertyDetails(property);
                      }}
                    >
                      Explore <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="about-ila-section__card-nav" role="tablist" aria-label="Property cards">
            {ABOUT_PROPERTIES.map((property, index) => (
              <button
                key={property.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${property.title}`}
                className={
                  index === activeIndex
                    ? "about-ila-section__dot is-active"
                    : "about-ila-section__dot"
                }
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className="about-ila-section__note">
            <strong>{active.propertyType || "Property"}</strong>
            <span>
              {activeIndex + 1} of {ABOUT_PROPERTIES.length} curated picks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
