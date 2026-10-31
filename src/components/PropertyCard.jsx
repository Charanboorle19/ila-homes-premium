export default function PropertyCard({
  property,
  hidden,
  saved,
  onToggleSave,
  onDetails,
}) {
  const pillClassName = property.pill?.className
    ? `pill ${property.pill.className}`
    : "pill";

  return (
    <article
      className={hidden ? "card side-card hidden-card" : "card side-card"}
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
      <div className="mini-image">
        <img src={property.image} alt={property.alt} loading="lazy" />
        <div className="mini-image-overlay"></div>
        {property.pill && (
          <span className={pillClassName}>
            {property.pill.glyph && <span className="pill-glyph">{property.pill.glyph}</span>}
            {property.pill.label}
          </span>
        )}
        <button
          className={saved ? "round-action favorite saved" : "round-action favorite"}
          type="button"
          aria-label={`Save ${property.title}`}
          aria-pressed={saved}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="side-info">
        <div className="side-header">
          <div className="side-title-wrap">
            <h3 className="side-title">{property.title}</h3>
            <span className="side-location">
              <span className="side-loc-pin">📍</span> {property.location}
            </span>
          </div>
          <button
            className="side-next"
            type="button"
            aria-label={`View ${property.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onDetails(property);
            }}
          >
            →
          </button>
        </div>

        <div className="side-footer">
          <div className="side-price-row">
            <span className="side-price">{property.price}</span>
            <span className="side-area-tag">{property.area}</span>
          </div>
          <div className="badges">
            {property.badges.slice(0, 2).map((badge) => (
              <span
                className={badge.green ? "badge green" : "badge"}
                key={badge.label}
              >
                {badge.green ? "✓ " : ""}{badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
