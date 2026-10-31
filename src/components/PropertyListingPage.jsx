import { useState, useEffect } from "react";

const STEPS = [
  { id: 0, title: "Listing Type", sub: "Tell us who you are and what type of property you want to list." },
  { id: 1, title: "Basic Information", sub: "Add key introductory details, listing title, and intent." },
  { id: 2, title: "Location", sub: "Pinpoint where your property is situated across Hyderabad." },
  { id: 3, title: "Property Details", sub: "Add configuration specs, dimensions, facing, and floor plans." },
  { id: 4, title: "Pricing & Terms", sub: "Define expected price, negotiation terms, and availability timeline." },
  { id: 5, title: "Amenities", sub: "Highlight community features and premium infrastructure." },
  { id: 6, title: "Photos & Media", sub: "Upload high-resolution photography, video flythrough, or 3D assets." },
  { id: 7, title: "Description & Highlights", sub: "Articulate unique architectural and lifestyle characteristics." },
  { id: 8, title: "Contact Information", sub: "Specify how genuine buyers and investors can reach you." },
  { id: 9, title: "Review & Publish", sub: "Inspect your listing preview before submitting for live publication." },
];

const COMMON_AMENITIES = [
  "Covered Parking", "High-Speed Lift", "100% Power Backup", "24/7 Gated Security",
  "Luxury Gymnasium", "Infinity Swimming Pool", "Grand Clubhouse", "Landscaped Park",
  "Children Play Zone", "Indoor Games Suite", "Jogging & Cycle Track", "CCTV Surveillance",
  "24/7 Water Supply", "Piped Gas Pipeline", "Video Intercom", "Fire Sprinkler System",
  "Visitor Valet Parking", "Rainwater Harvesting", "Sewage Treatment Plant", "High-Speed Wi-Fi"
];

export default function PropertyListingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [toastMsg, setToastMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    sellerType: "Property Owner",
    propertyType: "Villa",
    listingTitle: "Spacious 4 BHK Luxury Villa in Kokapet",
    projectName: "The Grove",
    intent: "Sell",
    description: "An architect-designed 4 BHK luxury villa with private plunge pool, panoramic green corridor view, and immediate ORR connectivity.",
    city: "Hyderabad",
    locality: "Kokapet",
    address: "Plot 42, Golden Mile Road, Financial District Extension, Kokapet, 500075",
    landmark: "Near Kokapet SEZ & Neopolis",
    bhk: "4 BHK",
    builtup: "4800",
    plotArea: "350",
    floors: "G+2",
    bathrooms: "5",
    balconies: "3",
    furnishing: "Semi-furnished",
    possession: "Ready to Move",
    facing: "East Facing",
    expectedPrice: "52000000",
    priceDisplay: "₹5.2 Cr",
    negotiable: "Yes",
    availability: "Available",
    possessionDate: "2025-12-01",
    amenities: ["Covered Parking", "100% Power Backup", "24/7 Gated Security", "Infinity Swimming Pool", "Grand Clubhouse", "CCTV Surveillance"],
    otherAmenities: "Solar water heating, Italian marble flooring",
    mediaTab: "Photos",
    longDescription: "Positioned in the prime luxury corridor of Kokapet, this bespoke residence boasts double-height ceilings, bespoke teakwood fittings, solar rooftop grid, and a private landscaped terrace overlooking the protected lake boundary.",
    nearby: "Neopolis (3 mins), Continental Hospital (7 mins), Financial District (5 mins)",
    highlights: ["Corner Plot", "100% Vastu Compliant", "Private Plunge Pool", "Clear Title Deeds"],
    contactName: "Surya Charan",
    phone: "+91 98765 43210",
    email: "surya.charan@email.com",
    showContact: true,
    contactTime: "Morning (9 AM – 12 PM)",
    termsConfirmed: false,
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
  ]);

  const [customHighlightInput, setCustomHighlightInput] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? "" : curr));
    }, 2800);
  };

  const navigateHome = () => {
    window.location.hash = "#top";
  };

  const handleNextStep = () => {
    if (currentStep === 9) {
      if (!formData.termsConfirmed) {
        showToast("Please confirm authorization checkbox before submitting");
        return;
      }
      showToast("Listing published successfully! Visible on ILA Homes search.");
      setTimeout(() => {
        window.location.hash = "#account";
      }, 1500);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 9));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAmenity = (name) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== name)
          : [...prev.amenities, name],
      };
    });
  };

  const addHighlight = () => {
    if (!customHighlightInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, customHighlightInput.trim()],
    }));
    setCustomHighlightInput("");
    showToast("Added highlight tag");
  };

  const removeHighlight = (tag) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((h) => h !== tag),
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("ilaListingDraft", JSON.stringify(formData));
    showToast("Listing draft saved to browser storage!");
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    setUploadedPhotos((prev) => [...prev, ...urls]);
    showToast(`${files.length} photo(s) added to gallery`);
  };

  const removePhoto = (idx) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== idx));
    showToast("Photo removed from preview");
  };

  const progressPct = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <div className="property-listing-page-wrapper">
      {/* 1. Header Bar */}
      <header className="listing-topbar">
        <div className="listing-brand-wrap" onClick={navigateHome}>
          <button type="button" className="btn-back-home" aria-label="Back to home">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <img
            src="/assets/ila-logo.png"
            alt="ILA HOMES"
            className="listing-brand-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/ila-homes-logo-white.png";
            }}
          />
        </div>

        <nav className="listing-header-nav" aria-label="Portal Navigation">
          <a href="#top" onClick={navigateHome}>Home</a>
          <a href="#properties">Properties</a>
          <a href="#explore-developments-all">3D Layouts</a>
          <a href="#map">Map Explorer</a>
          <a href="#account">My Account</a>
        </nav>

        <div className="listing-topbar-actions">
          <button
            type="button"
            className="btn-save-draft-ghost"
            onClick={handleSaveDraft}
          >
            <span>Save Draft</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </button>
          <div className="listing-user-pill" onClick={() => { window.location.hash = "#account"; }}>
            <div className="user-disc">SC</div>
            <span>Surya Charan</span>
          </div>
        </div>
      </header>

      {/* 2. Top Progress Ribbon */}
      <div className="listing-progress-container">
        <div className="listing-progress-bar" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="listing-main-content">
        {/* Intro Page Title & Step Indicator */}
        <div className="listing-title-row">
          <div>
            <div className="listing-eyebrow-chip">
              <span className="dot" />
              <span>SELL OR LEASE WITH CONFIDENCE</span>
            </div>
            <h1>Post Your Luxury Property</h1>
            <p>Showcase plotted developments, signature villas, or luxury apartments to qualified buyers across Hyderabad.</p>
          </div>
          <div className="step-counter-box">
            <span className="step-fraction">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="step-progress-percent">{progressPct}% Completed</span>
          </div>
        </div>

        {/* 3. Main Two-Column Workflow Layout */}
        <div className="listing-workflow-grid">
          {/* Left Column: Vertical Step Navigation Card */}
          <aside className="steps-nav-card" aria-label="Listing Steps Index">
            <div className="steps-nav-header">
              <span>WORKFLOW STAGES</span>
              <small>{progressPct}% done</small>
            </div>

            <div className="steps-nav-list">
              {STEPS.map((s, idx) => {
                const isCurrent = idx === currentStep;
                const isPassed = idx < currentStep;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`step-nav-btn ${isCurrent ? "current" : ""} ${isPassed ? "completed" : ""}`}
                    onClick={() => {
                      setCurrentStep(idx);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span className="step-nav-disc">
                      {isPassed ? "✓" : idx + 1}
                    </span>
                    <div className="step-nav-text">
                      <span className="step-nav-title">{s.title}</span>
                    </div>
                    {isCurrent && <span className="active-dot-indicator" />}
                  </button>
                );
              })}
            </div>

            <div className="listing-help-card">
              <div className="help-spark">✦ ASSISTANCE</div>
              <h4>Need help with specs?</h4>
              <p>Our dedicated onboarding managers will verify your cadastral boundaries and RERA documents.</p>
              <button
                type="button"
                className="btn-contact-support"
                onClick={() => showToast("Connecting with ILA Listing Specialist...")}
              >
                Talk to Advisor →
              </button>
            </div>
          </aside>

          {/* Right Column: Step Form Surface */}
          <main className="form-card-surface">
            {/* Form Top Title */}
            <div className="form-surface-header">
              <div>
                <span className="form-step-kicker">STEP {currentStep + 1} OF 10</span>
                <h2>{STEPS[currentStep].title}</h2>
                <p>{STEPS[currentStep].sub}</p>
              </div>
              <span className="autosave-pill">
                <span className="pulse-green" /> Auto-saved locally
              </span>
            </div>

            {/* STEP 0: LISTING TYPE */}
            {currentStep === 0 && (
              <div className="step-panel-block">
                <div className="form-group-full">
                  <label className="section-label">I am listing as a <span className="req">*</span></label>
                  <div className="selection-cards-grid-3">
                    {[
                      { role: "Property Owner", desc: "I hold direct legal ownership of this land/home", icon: "⌂" },
                      { role: "Real Estate Agent", desc: "I represent the seller under an exclusive mandate", icon: "♙" },
                      { role: "Builder / Developer", desc: "I am a registered developer launching inventory", icon: "▥" },
                    ].map((item) => (
                      <div
                        key={item.role}
                        className={`selectable-choice-card ${formData.sellerType === item.role ? "is-selected" : ""}`}
                        onClick={() => setFormData({ ...formData, sellerType: item.role })}
                      >
                        <span className="choice-icon-wrap">{item.icon}</span>
                        <div>
                          <strong>{item.role}</strong>
                          <small>{item.desc}</small>
                        </div>
                        <span className="choice-check-glyph">✓</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group-full" style={{ marginTop: 24 }}>
                  <label className="section-label">Property Category <span className="req">*</span></label>
                  <div className="selection-cards-grid-3">
                    {[
                      { type: "Villa", desc: "Independent luxury gated villa", icon: "🏡" },
                      { type: "Apartment / Flat", desc: "Sky villa or premium gated apartment", icon: "▦" },
                      { type: "Residential Plot", desc: "HMDA / DTCP approved plotted layout", icon: "▧" },
                      { type: "Independent House", desc: "Standalone multi-story bungalow", icon: "⌂" },
                      { type: "Commercial Property", desc: "Grade-A office, retail or clinic", icon: "▤" },
                      { type: "Residential Project", desc: "Township or multi-unit layout", icon: "▥" },
                    ].map((item) => (
                      <div
                        key={item.type}
                        className={`selectable-choice-card ${formData.propertyType === item.type ? "is-selected" : ""}`}
                        onClick={() => setFormData({ ...formData, propertyType: item.type })}
                      >
                        <span className="choice-icon-wrap">{item.icon}</span>
                        <div>
                          <strong>{item.type}</strong>
                          <small>{item.desc}</small>
                        </div>
                        <span className="choice-check-glyph">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: BASIC INFORMATION */}
            {currentStep === 1 && (
              <div className="step-panel-block">
                <div className="form-fields-2col">
                  <div className="field-box full">
                    <label>Listing Title <span className="req">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Spacious 4 BHK Luxury Villa in Kokapet"
                      value={formData.listingTitle}
                      onChange={(e) => setFormData({ ...formData, listingTitle: e.target.value })}
                    />
                  </div>

                  <div className="field-box">
                    <label>Project / Township Name <span className="opt">(Optional)</span></label>
                    <input
                      type="text"
                      placeholder="e.g. The Grove, My Home Avatar"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    />
                  </div>

                  <div className="field-box">
                    <label>Property Sub-Category <span className="req">*</span></label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    >
                      <option>Villa</option>
                      <option>Apartment / Flat</option>
                      <option>Residential Plot</option>
                      <option>Independent House</option>
                      <option>Commercial Property</option>
                    </select>
                  </div>

                  <div className="field-box full">
                    <label>Transaction Intent <span className="req">*</span></label>
                    <div className="chip-selection-row">
                      {["Sell", "Rent", "Lease"].map((int) => (
                        <button
                          key={int}
                          type="button"
                          className={`chip-choice ${formData.intent === int ? "active" : ""}`}
                          onClick={() => setFormData({ ...formData, intent: int })}
                        >
                          {int}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-box full">
                    <label>Summary Description <span className="req">*</span></label>
                    <textarea
                      rows={4}
                      maxLength={500}
                      placeholder="Describe what makes this property exceptional..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <div className="char-count-line">{formData.description.length} / 500 characters</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {currentStep === 2 && (
              <div className="step-panel-block">
                <div className="location-split-workspace">
                  <div className="location-form-fields">
                    <div className="field-box">
                      <label>City <span className="req">*</span></label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      >
                        <option>Hyderabad</option>
                        <option>Secunderabad</option>
                        <option>Warangal</option>
                        <option>Vijayawada</option>
                        <option>Visakhapatnam</option>
                      </select>
                    </div>

                    <div className="field-box">
                      <label>Locality / Micro-Market <span className="req">*</span></label>
                      <select
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      >
                        <option>Kokapet</option>
                        <option>Tellapur</option>
                        <option>Narsingi</option>
                        <option>Gachibowli</option>
                        <option>Mokila</option>
                        <option>Financial District</option>
                        <option>Shankarpally</option>
                        <option>Manikonda</option>
                        <option>Chevella</option>
                      </select>
                    </div>

                    <div className="field-box full">
                      <label>Complete Property Address <span className="req">*</span></label>
                      <textarea
                        rows={3}
                        placeholder="Plot No., Road No., Colony, Pin Code"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="field-box full">
                      <label>Landmark <span className="opt">(Optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. Near Kokapet SEZ & ORR Exit 1"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      />
                    </div>

                    <div className="field-box full">
                      <button
                        type="button"
                        className="btn-use-gps"
                        onClick={() => showToast("Device GPS coordinates captured: [78.342, 17.382]")}
                      >
                        <span>◎</span> Use Current GPS Pinpoint
                      </button>
                    </div>
                  </div>

                  {/* Visual Location Map Preview Box */}
                  <div className="map-pinpoint-preview-card">
                    <div className="pinpoint-art-grid" />
                    <div className="pinpoint-pin-icon">
                      <div className="pin-pulse-disc" />
                    </div>
                    <div className="pinpoint-badge-info">
                      <strong>{formData.locality}, {formData.city}</strong>
                      <small>Verified Hyderabad Hub</small>
                    </div>
                    <div className="map-preview-tag">Interactive Map Pin Active</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROPERTY DETAILS */}
            {currentStep === 3 && (
              <div className="step-panel-block">
                <div className="form-fields-2col">
                  <div className="field-box">
                    <label>Configuration (BHK) <span className="req">*</span></label>
                    <select
                      value={formData.bhk}
                      onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    >
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4 BHK</option>
                      <option>5+ BHK</option>
                      <option>Residential Plot (Not Applicable)</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Built-Up Area (Sq. Ft.) <span className="req">*</span></label>
                    <input
                      type="number"
                      placeholder="e.g. 4800"
                      value={formData.builtup}
                      onChange={(e) => setFormData({ ...formData, builtup: e.target.value })}
                    />
                  </div>

                  <div className="field-box">
                    <label>Plot / Land Area (Sq. Yd.)</label>
                    <input
                      type="number"
                      placeholder="e.g. 350"
                      value={formData.plotArea}
                      onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                    />
                  </div>

                  <div className="field-box">
                    <label>Total Floors</label>
                    <select
                      value={formData.floors}
                      onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                    >
                      <option>G+1</option>
                      <option>G+2</option>
                      <option>G+3</option>
                      <option>Single Floor</option>
                      <option>High Rise (Tower)</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Bathrooms</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6+</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Balconies</label>
                    <select
                      value={formData.balconies}
                      onChange={(e) => setFormData({ ...formData, balconies: e.target.value })}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Furnishing Status</label>
                    <select
                      value={formData.furnishing}
                      onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                    >
                      <option>Semi-furnished</option>
                      <option>Unfurnished</option>
                      <option>Fully furnished</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Facing Direction</label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    >
                      <option>East Facing</option>
                      <option>North Facing</option>
                      <option>West Facing</option>
                      <option>South Facing</option>
                      <option>North-East Facing</option>
                    </select>
                  </div>

                  <div className="field-box full">
                    <label>Architectural Floor Plan <span className="opt">(PDF / Image)</span></label>
                    <div className="upload-mini-strip">
                      <label className="btn-upload-file">
                        <span>＋ Upload Floor Plan</span>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          hidden
                          onChange={() => showToast("Floor plan CAD/PDF attached successfully")}
                        />
                      </label>
                      <small>Attached: kokapet_villa_g2_layout.pdf (3.2 MB)</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: PRICING & TERMS */}
            {currentStep === 4 && (
              <div className="step-panel-block">
                <div className="form-fields-2col">
                  <div className="field-box">
                    <label>Expected Price (₹) <span className="req">*</span></label>
                    <input
                      type="number"
                      placeholder="e.g. 52000000"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    />
                  </div>

                  <div className="field-box">
                    <label>Display Price Label</label>
                    <select
                      value={formData.priceDisplay}
                      onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                    >
                      <option>₹5.2 Cr</option>
                      <option>₹1.8 Cr</option>
                      <option>₹2.8 Cr</option>
                      <option>Price on Request</option>
                    </select>
                  </div>

                  <div className="field-box full">
                    <label>Price Negotiable?</label>
                    <div className="chip-selection-row">
                      {["Yes", "No"].map((neg) => (
                        <button
                          key={neg}
                          type="button"
                          className={`chip-choice ${formData.negotiable === neg ? "active" : ""}`}
                          onClick={() => setFormData({ ...formData, negotiable: neg })}
                        >
                          {neg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-box">
                    <label>Availability Status <span className="req">*</span></label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option>Available</option>
                      <option>Under Construction</option>
                      <option>Pre-Launch</option>
                      <option>Occupied (Yield Asset)</option>
                    </select>
                  </div>

                  <div className="field-box">
                    <label>Possession Date</label>
                    <input
                      type="date"
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({ ...formData, possessionDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pro-tip-banner">
                  <span className="tip-badge">TRANSACTION NOTE</span>
                  <p>Properties with clear RERA numbers, OC certificates, and Bank APF IDs attract 3x faster investor commitments.</p>
                </div>
              </div>
            )}

            {/* STEP 5: AMENITIES */}
            {currentStep === 5 && (
              <div className="step-panel-block">
                <label className="section-label">Select All Infrastructure &amp; Amenities Provided</label>
                <div className="amenities-selection-grid">
                  {COMMON_AMENITIES.map((am) => {
                    const isChecked = formData.amenities.includes(am);
                    return (
                      <div
                        key={am}
                        className={`amenity-toggle-card ${isChecked ? "active" : ""}`}
                        onClick={() => toggleAmenity(am)}
                      >
                        <span className="checkbox-disc">{isChecked ? "✓" : ""}</span>
                        <span>{am}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="field-box full" style={{ marginTop: 22 }}>
                  <label>Additional Amenities or Club Features <span className="opt">(Optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. EV Charging Station, Squash Court, Cigar Lounge"
                    value={formData.otherAmenities}
                    onChange={(e) => setFormData({ ...formData, otherAmenities: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: PHOTOS & MEDIA */}
            {currentStep === 6 && (
              <div className="step-panel-block">
                <div className="media-upload-area">
                  <div className="upload-dropzone-box">
                    <div className="dropzone-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#006452" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h4>Upload High-Resolution Property Visuals</h4>
                    <p>Supports JPG, PNG, WEBP. Minimum 3 photos, up to 30 photos.</p>
                    <label className="btn-emerald-upload">
                      <span>＋ Select Photos</span>
                      <input type="file" multiple accept="image/*" hidden onChange={handlePhotoUpload} />
                    </label>
                  </div>

                  <div className="uploaded-gallery-strip">
                    {uploadedPhotos.map((img, i) => (
                      <div key={i} className="gallery-thumbnail-card">
                        <img src={img} alt={`Preview ${i + 1}`} />
                        <button
                          type="button"
                          className="btn-remove-thumb"
                          onClick={() => removePhoto(i)}
                          title="Remove image"
                        >
                          &times;
                        </button>
                        <span className="thumb-idx-badge">{i === 0 ? "Cover" : `#${i + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pro-tip-banner" style={{ marginTop: 20 }}>
                  <span className="tip-badge">MEDIA TIP</span>
                  <p>Listings with professional front-facade photography and clear daylight shots receive up to 65% higher buyer engagement.</p>
                </div>
              </div>
            )}

            {/* STEP 7: ADDITIONAL HIGHLIGHTS & DESCRIPTION */}
            {currentStep === 7 && (
              <div className="step-panel-block">
                <div className="form-fields-2col">
                  <div className="field-box full">
                    <label>Comprehensive Architectural Description <span className="req">*</span></label>
                    <textarea
                      rows={5}
                      maxLength={1000}
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                      placeholder="Describe the lifestyle, natural ventilation, ceiling heights, and finishes..."
                    />
                    <div className="char-count-line">{formData.longDescription.length} / 1000 characters</div>
                  </div>

                  <div className="field-box full">
                    <label>Key Connectivity &amp; Nearby Milestones <span className="opt">(Optional)</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Financial District (5 mins), ORR Exit 1 (2 mins)"
                      value={formData.nearby}
                      onChange={(e) => setFormData({ ...formData, nearby: e.target.value })}
                    />
                  </div>

                  <div className="field-box full">
                    <label>Property Highlights &amp; USPs</label>
                    <div className="tags-interactive-strip">
                      {formData.highlights.map((h) => (
                        <span key={h} className="active-tag-chip">
                          {h}
                          <button type="button" onClick={() => removeHighlight(h)}>&times;</button>
                        </span>
                      ))}
                    </div>

                    <div className="add-tag-inline-form">
                      <input
                        type="text"
                        placeholder="Add another highlight (e.g. 100% Vastu, Corner Plot)..."
                        value={customHighlightInput}
                        onChange={(e) => setCustomHighlightInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                      />
                      <button type="button" className="btn-add-tag" onClick={addHighlight}>
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: CONTACT DETAILS */}
            {currentStep === 8 && (
              <div className="step-panel-block">
                <div className="form-fields-2col">
                  <div className="field-box">
                    <label>Contact Full Name <span className="req">*</span></label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="field-box">
                    <label>Direct Phone Number <span className="req">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="field-box full">
                    <label>Email Address <span className="req">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="field-box full">
                    <label className="checkbox-toggle-label">
                      <input
                        type="checkbox"
                        checked={formData.showContact}
                        onChange={(e) => setFormData({ ...formData, showContact: e.target.checked })}
                      />
                      <span>Display verified contact badge directly to qualified buyers</span>
                    </label>
                  </div>

                  <div className="field-box">
                    <label>Preferred Time for Site Visits</label>
                    <select
                      value={formData.contactTime}
                      onChange={(e) => setFormData({ ...formData, contactTime: e.target.value })}
                    >
                      <option>Morning (9 AM – 12 PM)</option>
                      <option>Afternoon (12 PM – 4 PM)</option>
                      <option>Evening (4 PM – 8 PM)</option>
                      <option>Anytime with Prior Notice</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: REVIEW & SUBMIT */}
            {currentStep === 9 && (
              <div className="step-panel-block">
                {/* Hero Summary Card */}
                <div className="review-hero-card">
                  <div
                    className="review-hero-img"
                    style={{ backgroundImage: `url(${uploadedPhotos[0] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"})` }}
                  >
                    <div className="hero-img-shade">
                      <span className="review-badge-cat">{formData.propertyType}</span>
                      <h3>{formData.listingTitle}</h3>
                      <p>📍 {formData.locality}, {formData.city}</p>
                    </div>
                  </div>

                  <div className="review-hero-side">
                    <span className="lbl">Expected Asking Price</span>
                    <strong className="review-price-display">{formData.priceDisplay}</strong>
                    <span className="review-specs-line">{formData.bhk} • {formData.builtup} Sq. Ft.</span>
                    <span className="badge-ready">{formData.possession}</span>
                  </div>
                </div>

                {/* Summary Rows Breakdown */}
                <div className="review-rows-table">
                  <div className="review-spec-row">
                    <strong>Listing Entity</strong>
                    <span>{formData.sellerType} • For {formData.intent}</span>
                    <button type="button" onClick={() => setCurrentStep(0)}>Edit</button>
                  </div>
                  <div className="review-spec-row">
                    <strong>Location</strong>
                    <span>{formData.address}</span>
                    <button type="button" onClick={() => setCurrentStep(2)}>Edit</button>
                  </div>
                  <div className="review-spec-row">
                    <strong>Specifications</strong>
                    <span>{formData.bhk} • {formData.bathrooms} Baths • {formData.facing}</span>
                    <button type="button" onClick={() => setCurrentStep(3)}>Edit</button>
                  </div>
                  <div className="review-spec-row">
                    <strong>Amenities &amp; Media</strong>
                    <span>{formData.amenities.length} Amenities • {uploadedPhotos.length} Photos</span>
                    <button type="button" onClick={() => setCurrentStep(5)}>Edit</button>
                  </div>
                  <div className="review-spec-row">
                    <strong>Primary Contact</strong>
                    <span>{formData.contactName} ({formData.phone})</span>
                    <button type="button" onClick={() => setCurrentStep(8)}>Edit</button>
                  </div>
                </div>

                <div className="declaration-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.termsConfirmed}
                      onChange={(e) => setFormData({ ...formData, termsConfirmed: e.target.checked })}
                    />
                    <span>
                      I confirm that I am duly authorized to market this property and that all specifications and legal titles provided are accurate and authentic.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Form Actions Strip */}
            <div className="form-surface-footer">
              <div className="footer-status-txt">
                {currentStep === 9
                  ? "Carefully review all details before submitting for publication."
                  : "All changes are saved automatically in your browser."}
              </div>

              <div className="footer-buttons-group">
                {currentStep > 0 && (
                  <button
                    type="button"
                    className="btn-form-back"
                    onClick={handlePrevStep}
                  >
                    &larr; Back
                  </button>
                )}
                <button
                  type="button"
                  className="btn-form-continue"
                  onClick={handleNextStep}
                >
                  {currentStep === 9 ? "Publish Property Listing →" : "Continue →"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Toast Feedback */}
      {toastMsg && (
        <div className="listing-toast" role="status" aria-live="polite">
          <span className="toast-pulse-dot" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
