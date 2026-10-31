import { useState } from "react";
import FormFillingSection from "./form-filling";

const POPULAR_SUGGESTIONS = [
  { icon: "⌂", label: "Villas with garden", query: "Villas with garden" },
  { icon: "♙", label: "Plots near ORR", query: "Plots near ORR" },
  { icon: "⌁", label: "Homes with a view", query: "Homes with a view" },
  { icon: "♧", label: "Near top schools", query: "Near top schools" },
];

export default function HeroFooter() {
  const [query, setQuery] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((current) => (current === msg ? "" : current));
    }, 2800);
  };

  const handleSuggestionClick = (sug) => {
    setQuery(sug.query);
    setActiveSuggestion(sug.query);
    showToast(`Filtered by: ${sug.label}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      showToast("Please enter a location or keyword to search");
      return;
    }
    showToast(`Searching properties for: "${trimmed}"`);
  };

  const handleMapClick = () => {
    const mapSection = document.getElementById("property-map-explorer") || document.getElementById("map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    } else {
      showToast("Opening interactive map explorer...");
    }
  };

  const handleLinkClick = (e, label) => {
    e.preventDefault();
    showToast(`Navigating to ${label}...`);
  };

  return (
    <div className="hero-footer-wrapper">
      {/* Visual Search CTA Banner / Next Chapter Section */}
      <section className="cta-hero-section" aria-labelledby="cta-hero-title">
        <div className="cta-hero-section__glow" aria-hidden="true" />
        <div className="cta-hero-section__lines" aria-hidden="true">
          <span className="cta-hero-section__vline cta-hero-section__vline--one" />
          <span className="cta-hero-section__vline cta-hero-section__vline--two" />
          <span className="cta-hero-section__hline cta-hero-section__hline--one" />
          <span className="cta-hero-section__hline cta-hero-section__hline--two" />
          <svg className="cta-hero-section__plot-art" viewBox="0 0 480 360" fill="none">
            <path d="M40 48 H440" />
            <path d="M40 120 H440" />
            <path d="M40 192 H440" />
            <path d="M40 264 H440" />
            <path d="M40 336 H440" />
            <path d="M72 24 V348" />
            <path d="M168 24 V348" />
            <path d="M264 24 V348" />
            <path d="M360 24 V348" />
            <rect x="168" y="120" width="96" height="72" />
            <rect x="264" y="192" width="96" height="72" />
            <circle cx="216" cy="156" r="11" />
            <path d="M72 264 L168 192 L264 192 L360 120" strokeDasharray="5 7" />
          </svg>
        </div>

        <div className="cta-hero-content">
          <p className="cta-hero-eyebrow">Find your place</p>
          <h2 id="cta-hero-title">
            Your next chapter<br />starts with <span>the right place.</span>
          </h2>
          <div className="cta-hero-rule" aria-hidden="true" />
          <p className="cta-hero-subtitle">
            Search by location, lifestyle or what matters to you —
            our AI will help you find the right properties.
          </p>

          <div className="search-row">
            <div className="search-stack">
              <form className="search-box" onSubmit={handleSearchSubmit}>
                <span className="sparkle" aria-hidden="true">✦</span>
                <input
                  id="propertySearch"
                  type="search"
                  aria-label="Search properties"
                  placeholder='Try “villas with private garden in Kokapet” or “plots near ORR”'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-submit" type="submit" aria-label="Search">
                  ⌕
                </button>
              </form>

              <div className="suggestions" aria-label="Popular searches">
                {POPULAR_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.query}
                    type="button"
                    className={`suggestion ${activeSuggestion === sug.query ? "active" : ""}`}
                    onClick={() => handleSuggestionClick(sug)}
                  >
                    <span className="icon">{sug.icon}</span> {sug.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="or-divider" aria-hidden="true">
              <span>or</span>
            </div>

            <button className="map-cta" type="button" onClick={handleMapClick}>
              <span className="map-cta-icon" aria-hidden="true">⌖</span>
              <span className="map-cta-copy">
                <strong>
                  Explore the Map <span className="map-arrow">→</span>
                </strong>
                <small>Discover properties visually</small>
              </span>
            </button>
          </div>
        </div>
      </section>

      <FormFillingSection />

      {/* Comprehensive Site Footer */}
      <footer className="site-footer">
        <svg className="footer-leaf" viewBox="0 0 180 280" fill="none" aria-hidden="true">
          <path
            d="M180 270C123 204 130 116 177 12M154 228C110 209 86 184 68 145C111 149 142 175 154 228ZM145 183C105 160 91 130 91 96C125 115 144 146 145 183ZM163 135C138 98 139 65 153 37C177 68 179 103 163 135ZM122 247C89 235 60 212 42 180C79 185 106 209 122 247Z"
            stroke="#16806b"
            strokeWidth="1.2"
          />
        </svg>

        <div className="footer-main">
          <div className="brand-block">
            <a className="brand" href="#top" aria-label="ILA Homes home">
              <img
                className="brand-logo"
                src="/assets/Thin%20White%20ILA%20HOMES%20Logo.png"
                alt="ILA Homes — Building futures and unlocking possibilities"
                width={280}
                height={102}
              />
            </a>
            <p className="about">
              ILA HOMES helps you discover residential properties with clarity and confidence, backed by real data, immersive experiences and neighbourhood insights.
            </p>
            <div className="socials">
              <a className="social" href="#instagram" aria-label="Instagram" onClick={(e) => handleLinkClick(e, "Instagram")}>
                ◎
              </a>
              <a className="social" href="#linkedin" aria-label="LinkedIn" onClick={(e) => handleLinkClick(e, "LinkedIn")}>
                in
              </a>
              <a className="social" href="#youtube" aria-label="YouTube" onClick={(e) => handleLinkClick(e, "YouTube")}>
                ▶
              </a>
              <a className="social" href="#whatsapp" aria-label="WhatsApp" onClick={(e) => handleLinkClick(e, "WhatsApp")}>
                ◉
              </a>
            </div>
          </div>

          <nav className="footer-col" aria-label="Properties">
            <h3>Properties</h3>
            <ul>
              <li><a href="#properties" onClick={(e) => handleLinkClick(e, "All Properties")}>All Properties</a></li>
              <li><a href="#villas" onClick={(e) => handleLinkClick(e, "Villas")}>Villas</a></li>
              <li><a href="#apartments" onClick={(e) => handleLinkClick(e, "Apartments")}>Apartments</a></li>
              <li><a href="#plots" onClick={(e) => handleLinkClick(e, "Residential Plots")}>Residential Plots</a></li>
              <li><a href="#launches" onClick={(e) => handleLinkClick(e, "New Launches")}>New Launches</a></li>
              <li><a href="#premium" onClick={(e) => handleLinkClick(e, "Premium Properties")}>Premium Properties</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Explore">
            <h3>Explore</h3>
            <ul>
              <li><a href="#property-details" onClick={() => { window.location.hash = "#property-details"; }}>Demo 1: Property Details</a></li>
              <li><a href="#explore-developments-all" onClick={() => { window.location.hash = "#explore-developments-all"; }}>Demo 2: 3D Masterplan</a></li>
              <li><a href="#map" onClick={handleMapClick}>Interactive Map</a></li>
              <li><a href="#discover" onClick={() => { window.location.hash = "#discover"; }}>Property Discovery</a></li>
              <li><a href="#connectivity" onClick={(e) => handleLinkClick(e, "Connectivity")}>Connectivity</a></li>
              <li><a href="#curated-collections" onClick={(e) => handleLinkClick(e, "Property Collections")}>Property Collections</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, "About Us")}>About Us</a></li>
              <li><a href="#builders" onClick={(e) => handleLinkClick(e, "For Builders & Developers")}>For Builders &amp; Developers</a></li>
              <li><a href="#list-property" onClick={() => { window.location.hash = "#list-property"; }}>List Your Property</a></li>
              <li><a href="#careers" onClick={(e) => handleLinkClick(e, "Careers")}>Careers</a></li>
              <li><a href="#blog" onClick={(e) => handleLinkClick(e, "Blog")}>Blog</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, "Contact Us")}>Contact Us</a></li>
            </ul>
          </nav>

          <div className="contact">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <span className="contact-icon">🇮🇳</span>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <a href="mailto:hello@ilahomes.com">hello@ilahomes.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⌖</span>
              <p>Hyderabad, Telangana<br />India</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-demo-options" aria-label="Demo Experiences">
            <span className="demo-label">Live Demos:</span>
            <a
              href="#property-details"
              className="demo-btn"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "#property-details";
              }}
            >
              <span className="demo-badge">1</span>
              <span>Demo 1</span>
              <small className="demo-hint">(Property Details)</small>
            </a>
            <a
              href="#explore-developments-all"
              className="demo-btn"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "#explore-developments-all";
              }}
            >
              <span className="demo-badge">2</span>
              <span>Demo 2</span>
              <small className="demo-hint">(3D Masterplan)</small>
            </a>
          </div>

          <nav className="legal" aria-label="Legal">
            <a href="#privacy" onClick={(e) => handleLinkClick(e, "Privacy Policy")}>Privacy Policy</a>
            <span>|</span>
            <a href="#terms" onClick={(e) => handleLinkClick(e, "Terms of Use")}>Terms of Use</a>
            <span>|</span>
            <a href="#cookies" onClick={(e) => handleLinkClick(e, "Cookie Policy")}>Cookie Policy</a>
            <span>|</span>
            <a href="#disclaimer" onClick={(e) => handleLinkClick(e, "Disclaimer")}>Disclaimer</a>
            <span>|</span>
            <a href="#sitemap" onClick={(e) => handleLinkClick(e, "Sitemap")}>Sitemap</a>
          </nav>
          <div className="copyright">© 2024 ILA HOMES. All rights reserved.</div>
        </div>
      </footer>

      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
