export default function FeaturedCard({
  property,
  hidden,
  saved,
  onToggleSave,
  onShare,
  onDetails,
}) {
  return (
    <article
      className={hidden ? "card featured-card hidden-card" : "card featured-card"}
      data-type={property.type}
      onClick={onDetails}
    >
      <div className="main-image">
        <img src={property.image} alt={property.alt} loading="lazy" />
        <div className="image-overlay-gradient"></div>

        {/* Top Badges & Actions */}
        <div className="image-top">
          <div className="image-badges">
            <span className="pill featured-pill">★ Featured</span>
            <span className="pill verified-pill">✓ Verified</span>
          </div>
          <div className="image-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className={saved ? "round-action favorite saved" : "round-action favorite"}
              type="button"
              aria-label={`Save ${property.title}`}
              aria-pressed={saved}
              onClick={() => onToggleSave(property.id)}
            >
              {saved ? "♥" : "♡"}
            </button>
            <button
              className="round-action share"
              type="button"
              aria-label={`Share ${property.title}`}
              onClick={onShare}
            >
              ↗
            </button>
          </div>
        </div>

        {/* Floating image media counts */}
        <div className="image-bottom">
          <span className="image-tag">📷 {property.images}</span>
          <span className="image-tag">🎥 {property.tour}</span>
        </div>
      </div>

      <div className="featured-info">
        {/* Header Block: Category, Title & Location */}
        <div className="featured-header-row">
          <div className="title-block">
            <div className="category-and-type">
              <span className="property-category-tag">Luxury Living</span>
              <span className="property-type-chip">Villa</span>
            </div>
            <h2 className="featured-title">{property.title}</h2>
            <div className="location">
              <svg className="loc-dot-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{property.location}</span>
            </div>
          </div>
          <div className="price-block">
            <div className="price">{property.price}</div>
            <small>{property.priceNote}</small>
          </div>
        </div>

        {/* Key Specs Row */}
        <div className="specs">
          {property.specs.map((spec) => (
            <div className="spec" key={spec.label}>
              <span className="spec-val">
                {spec.icon && <span className="spec-ico">{spec.icon}</span>}
                {spec.value}
              </span>
              <span className="spec-lbl">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Trust Badges & Action CTA */}
        <div className="trust-row">
          <div className="trust-tags">
            {property.trust.slice(0, 3).map((item) => (
              <span className="trust" key={item.label}>
                ✓ {item.label}
              </span>
            ))}
          </div>
          <button
            className="details-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDetails();
            }}
          >
            Explore Property <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
