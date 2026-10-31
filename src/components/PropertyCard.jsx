export default function PropertyCard({
  property,
  hidden,
  saved,
  onToggleSave,
  onDetails,
  spotlight = false,
  featured = false,
  onShare,
}) {
  const pillClassName = property.pill?.className
    ? `pill ${property.pill.className}`
    : "pill";

  const cardClass = [
    "card",
    "property-tile",
    featured ? "is-featured-tile" : "",
    hidden ? "hidden-card" : "",
    spotlight ? "is-spotlight" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const specs = (property.specs || []).slice(0, 3);
  const trust = (property.trust || property.badges || []).slice(0, 3);

  return (
    <article
      className={cardClass}
      data-type={property.type}
      onClick={() => onDetails(property)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDetails(property);
        }
      }}
    >
      <div className="property-tile__media">
        <img src={property.image} alt={property.alt} loading="lazy" />
        <div className="property-tile__media-fade" aria-hidden="true" />

        <div className="property-tile__media-top">
          <div className="property-tile__pills">
            {featured ? (
              <span className="pill featured-pill">★ Featured</span>
            ) : property.pill ? (
              <span className={pillClassName}>
                {property.pill.glyph ? `${property.pill.glyph} ` : ""}
                {property.pill.label}
              </span>
            ) : null}
            <span className="pill verified-pill">✓ Verified</span>
          </div>

          <div className="property-tile__actions" onClick={(e) => e.stopPropagation()}>
            <button
              className={saved ? "round-action favorite saved" : "round-action favorite"}
              type="button"
              aria-label={`Save ${property.title}`}
              aria-pressed={saved}
              onClick={() => onToggleSave(property.id)}
            >
              {saved ? "♥" : "♡"}
            </button>
            {onShare && (
              <button
                className="round-action share"
                type="button"
                aria-label={`Share ${property.title}`}
                onClick={onShare}
              >
                ↗
              </button>
            )}
          </div>
        </div>

        <div className="property-tile__media-bottom">
          {property.images && <span className="image-tag">📷 {property.images}</span>}
          {property.tour && <span className="image-tag">🎥 {property.tour}</span>}
        </div>
      </div>

      <div className="property-tile__body">
        <div className="property-tile__meta">
          <span className="property-category-tag">
            {property.category || "Featured"}
          </span>
          <span className="property-type-chip">
            {property.propertyType || property.type}
          </span>
        </div>

        <h3 className="property-tile__title">{property.title}</h3>

        <p className="property-tile__location">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{property.location}</span>
        </p>

        <div className="property-tile__price-block">
          <strong className="property-tile__price">{property.price}</strong>
          {(property.priceNote || property.area) && (
            <span className="property-tile__price-note">
              {property.priceNote || property.area}
            </span>
          )}
        </div>

        {specs.length > 0 && (
          <div className="property-tile__specs">
            {specs.map((spec) => (
              <div className="property-tile__spec" key={spec.label}>
                <strong>{spec.value}</strong>
                <span>{spec.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="property-tile__footer">
          <div className="property-tile__trust">
            {trust.map((item) => (
              <span className="badge green" key={item.label}>
                ✓ {item.label}
              </span>
            ))}
          </div>
          <button
            className="property-tile__cta"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDetails(property);
            }}
          >
            Explore <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
