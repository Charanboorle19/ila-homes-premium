import { useState } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const SAVED_PROPERTIES_DATA = [
  {
    id: "the-grove-kokapet",
    name: "The Grove",
    category: "Plot",
    location: "Kokapet, Hyderabad",
    price: "₹1.8 Cr",
    priceUnit: "Onwards",
    specs: "200 – 500 Sq. Yd.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "serenity-villas-tellapur",
    name: "Serenity Villas",
    category: "Villa",
    location: "Tellapur, Hyderabad",
    price: "₹5.2 Cr",
    priceUnit: "Onwards",
    specs: "4 BHK · 4,800 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "urban-heights-narsingi",
    name: "Urban Heights",
    category: "Apartment",
    location: "Narsingi, Hyderabad",
    price: "₹2.8 Cr",
    priceUnit: "Onwards",
    specs: "3 & 4 BHK · 2,100 Sq. Ft.",
    image: "https://images.unsplash.com/photo-1600607687175-5a5a3c1c3a6f?auto=format&fit=crop&w=700&q=85",
  },
];

const SAVED_SEARCHES_DATA = [
  {
    id: 1,
    title: "Villas in Hyderabad",
    filterDesc: "Hyderabad · Luxury Villas · ₹3 Cr – ₹8 Cr",
    notifActive: true,
  },
  {
    id: 2,
    title: "Plots near Kokapet & Financial District",
    filterDesc: "Kokapet · Plotted Developments · ₹50 L – ₹2 Cr",
    notifActive: false,
  },
  {
    id: 3,
    title: "Gated Communities along ORR",
    filterDesc: "Tellapur, Narsingi · Gated Township",
    notifActive: true,
  },
];

const COMPARE_ITEMS_DATA = [
  {
    id: "the-grove",
    name: "The Grove",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80",
    price: "₹1.8 Cr",
    type: "Plotted Land",
  },
  {
    id: "serenity-villas",
    name: "Serenity Villas",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80",
    price: "₹5.2 Cr",
    type: "4 BHK Villa",
  },
  {
    id: "urban-heights",
    name: "Urban Heights",
    image: "https://images.unsplash.com/photo-1600607687175-5a5a3c1c3a6f?auto=format&fit=crop&w=300&q=80",
    price: "₹2.8 Cr",
    type: "Sky Villa",
  },
];

const MY_ENQUIRIES_DATA = [
  {
    id: 101,
    name: "The Grove",
    location: "Kokapet, Hyderabad",
    date: "Oct 20, 2025",
    status: "Replied",
    statusColor: "status-replied",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 102,
    name: "Serenity Villas",
    location: "Tellapur, Hyderabad",
    date: "Oct 18, 2025",
    status: "In Progress",
    statusColor: "status-inprogress",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 103,
    name: "Urban Heights",
    location: "Narsingi, Hyderabad",
    date: "Oct 12, 2025",
    status: "New",
    statusColor: "status-new",
    image: "https://images.unsplash.com/photo-1600607687175-5a5a3c1c3a6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 104,
    name: "Sunrise County",
    location: "Shankarpally, Hyderabad",
    date: "Oct 10, 2025",
    status: "Replied",
    statusColor: "status-replied",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=200&q=80",
  },
];

const RECENTLY_VIEWED_DATA = [
  {
    id: 201,
    name: "Oakridge Greens",
    location: "Mokila, Hyderabad",
    viewed: "Viewed 2 hours ago",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=220&q=80",
  },
  {
    id: 202,
    name: "Skyline Towers",
    location: "Narsingi, Hyderabad",
    viewed: "Viewed 1 day ago",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=220&q=80",
  },
  {
    id: 203,
    name: "Meadow Lands",
    location: "Chevella, Hyderabad",
    viewed: "Viewed 2 days ago",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=220&q=80",
  },
];

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [savedProps, setSavedProps] = useState(SAVED_PROPERTIES_DATA);
  const [compareItems, setCompareItems] = useState(COMPARE_ITEMS_DATA);
  const [aiPrompt, setAiPrompt] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Surya Charan",
    email: "surya.charan@email.com",
    phone: "+91 98765 43210",
    memberSince: "Oct 2025",
    avatarInitials: "SC",
    role: "Premium Homebuyer",
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? "" : curr));
    }, 2800);
  };

  const navigateHome = () => {
    window.location.hash = "#top";
  };

  const removeSavedProperty = (id, name, e) => {
    e.stopPropagation();
    setSavedProps((prev) => prev.filter((p) => p.id !== id));
    showToast(`Removed "${name}" from saved list`);
  };

  const removeCompareItem = (id, name, e) => {
    e.stopPropagation();
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${name}" from comparison`);
  };

  const handleAiSearch = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      showToast("Please enter what you are looking for");
      return;
    }
    showToast(`AI Concierge matching properties for: "${aiPrompt.trim()}"`);
    setAiPrompt("");
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast("Profile details updated successfully!");
  };

  return (
    <div className="account-dashboard-wrapper">
      {/* 1. Sticky Navigation Header */}
      <header className="account-topbar">
        <div className="account-brand-side" onClick={navigateHome}>
          <button type="button" className="btn-back-home-round" aria-label="Return home">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <img
            src="/assets/ila-logo.png"
            alt="ILA HOMES"
            className="account-brand-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/ila-homes-logo-white.png";
            }}
          />
        </div>

        <nav className="account-header-nav" aria-label="Site Quick Navigation">
          <a href="#top" onClick={navigateHome}>Home</a>
          <a href="#properties">Properties</a>
          <a href="#explore-developments-all">3D Layouts</a>
          <a href="#map">Interactive Map</a>
          <a href="#dashboard" className="is-active">My Account</a>
        </nav>

        <div className="account-header-actions">
          <button
            type="button"
            className="acc-icon-btn"
            aria-label="Search"
            onClick={() => showToast("Quick Search")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
          </button>

          <button
            type="button"
            className="acc-icon-btn"
            aria-label="Saved list"
            onClick={() => {
              setActiveTab("saved-properties");
              showToast("Switched to Saved Properties");
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            <span className="acc-badge-count">{savedProps.length}</span>
          </button>

          <div className="acc-user-badge">
            <div className="acc-avatar-circle">{userProfile.avatarInitials}</div>
            <div className="acc-user-meta-top">
              <span className="acc-user-fullname">{userProfile.name}</span>
              <span className="acc-user-subtag">{userProfile.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Layout Split (Sidebar + Content Workspace) */}
      <div className="account-layout-grid">
        {/* Left Navigation Sidebar */}
        <aside className="account-sidebar" aria-label="Account Dashboard Menu">
          <div className="sidebar-section-title">PORTAL NAVIGATION</div>
          <div className="sidebar-nav-links">
            <button
              type="button"
              className={`side-menu-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Personal Information</span>
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "saved-properties" ? "active" : ""}`}
              onClick={() => setActiveTab("saved-properties")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
              <span>Saved Properties</span>
              <span className="side-pill-count">{savedProps.length}</span>
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "saved-searches" ? "active" : ""}`}
              onClick={() => setActiveTab("saved-searches")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
              <span>Saved Searches</span>
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "compare" ? "active" : ""}`}
              onClick={() => setActiveTab("compare")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              <span>Compare Properties</span>
              <span className="side-pill-count">{compareItems.length}</span>
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "enquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("enquiries")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>My Enquiries</span>
              <span className="side-pill-dot" />
            </button>

            <button
              type="button"
              className={`side-menu-item ${activeTab === "recent" ? "active" : ""}`}
              onClick={() => setActiveTab("recent")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Recently Viewed</span>
            </button>
          </div>

          <div className="sidebar-divider" />

          <div className="sidebar-section-title">PREFERENCES</div>
          <div className="sidebar-nav-links">
            <button
              type="button"
              className="side-menu-item"
              onClick={() => showToast("Notification settings")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>Notifications</span>
            </button>

            <button
              type="button"
              className="side-menu-item"
              onClick={() => showToast("Security & Password settings")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Account Settings</span>
            </button>

            <button
              type="button"
              className="side-menu-item logout"
              onClick={() => {
                showToast("Signed out successfully");
                setTimeout(navigateHome, 600);
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>

          <div className="sidebar-concierge-card">
            <div className="concierge-badge">ILA CONCIERGE</div>
            <h4>Need property advice?</h4>
            <p>Our dedicated luxury property specialists are on hand to schedule site tours and guide approvals.</p>
            <button
              type="button"
              className="btn-talk-advisor"
              onClick={() => showToast("Connecting with ILA Senior Advisor...")}
            >
              Talk to Advisor →
            </button>
          </div>
        </aside>

        {/* Right Main Body Section */}
        <main className="account-workspace">
          {/* A. Profile Welcome Banner */}
          <section className="profile-banner-card">
            <div className="banner-avatar-wrap">
              <div className="banner-avatar-disc">{userProfile.avatarInitials}</div>
              <span className="online-status-dot" title="Online" />
            </div>

            <div className="banner-details-col">
              <div className="banner-headline-row">
                <h2>Hello, {userProfile.name}</h2>
                <span className="premium-buyer-pill">Verified Homebuyer</span>
              </div>
              <p className="banner-subcopy">
                Welcome to your private ILA account. Monitor shortlisted developments, view site visit replies, and explore AI-tailored matches.
              </p>

              <div className="profile-meta-grid">
                <div className="meta-pill-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#006452" strokeWidth="2.2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <span className="val">{userProfile.email}</span>
                    <span className="badge-verified">✓ Verified</span>
                  </div>
                </div>

                <div className="meta-pill-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#006452" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <span className="val">{userProfile.phone}</span>
                    <span className="badge-verified">✓ Verified</span>
                  </div>
                </div>

                <div className="meta-pill-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#006452" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 14 14" />
                  </svg>
                  <div>
                    <span className="lbl">Member Since</span>
                    <span className="val-dark">{userProfile.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="banner-actions-col">
              <button
                type="button"
                className="btn-edit-profile"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
              >
                {isEditingProfile ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </section>

          {/* Inline Profile Editing Drawer/Form */}
          {isEditingProfile && (
            <form className="inline-edit-profile-card" onSubmit={handleProfileSave}>
              <h3>Update Personal Information</h3>
              <div className="form-fields-grid">
                <div className="f-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    required
                  />
                </div>
                <div className="f-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    required
                  />
                </div>
                <div className="f-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-submit-row">
                <button type="submit" className="btn-save-details">Save Changes</button>
                <button type="button" className="btn-cancel-details" onClick={() => setIsEditingProfile(false)}>Cancel</button>
              </div>
            </form>
          )}

          {/* B. Two Column Dashboard Panels */}
          <div className="dashboard-columns-split">
            {/* Left Column (Saved Properties, Saved Searches, Property Comparison) */}
            <div className="dash-col-left">
              {/* 1. Saved Properties Panel */}
              <section className="dash-panel-card">
                <div className="panel-header-row">
                  <div className="panel-title-group">
                    <span className="panel-icon-wrap love">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                      </svg>
                    </span>
                    <div>
                      <h3>Saved Properties</h3>
                      <p>Villas, plots, and apartments you have shortlisted</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="panel-view-all-link"
                    onClick={() => {
                      window.location.hash = "#properties";
                    }}
                  >
                    View All ({savedProps.length}) &rarr;
                  </button>
                </div>

                {savedProps.length === 0 ? (
                  <div className="empty-panel-placeholder">
                    <p>No saved properties yet. Browse our catalog to bookmark your dream homes.</p>
                    <button
                      type="button"
                      className="btn-discover-props"
                      onClick={() => {
                        window.location.hash = "#properties";
                      }}
                    >
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  <div className="saved-properties-grid-3">
                    {savedProps.map((prop) => (
                      <article
                        key={prop.id}
                        className="saved-property-card"
                        onClick={() => navigateToPropertyDetails(prop)}
                      >
                        <div className="saved-img-box">
                          <img src={prop.image} alt={prop.name} loading="lazy" />
                          <span className="saved-type-tag">{prop.category}</span>
                          <button
                            type="button"
                            className="saved-heart-btn active"
                            aria-label={`Remove ${prop.name} from saved`}
                            onClick={(e) => removeSavedProperty(prop.id, prop.name, e)}
                            title="Remove from saved"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                            </svg>
                          </button>
                        </div>

                        <div className="saved-card-body">
                          <h4>{prop.name}</h4>
                          <div className="saved-loc-row">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                              <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            <span>{prop.location}</span>
                          </div>

                          <div className="saved-card-footer">
                            <div className="saved-price-block">
                              <strong>{prop.price}</strong>
                              <small>{prop.priceUnit}</small>
                            </div>
                            <span className="saved-specs-snippet">{prop.specs}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="saved-card-direct-btn"
                          aria-label={`Open ${prop.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToPropertyDetails(prop);
                          }}
                        >
                          &rarr;
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* Sub-Split Panels (Saved Searches + Compare Properties) */}
              <div className="sub-split-grid">
                {/* 2. Saved Searches Panel */}
                <section className="dash-panel-card" id="saved-searches">
                  <div className="panel-header-row">
                    <div className="panel-title-group">
                      <span className="panel-icon-wrap emerald">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" />
                        </svg>
                      </span>
                      <div>
                        <h3>Saved Searches</h3>
                        <p>Receive instant notifications on price drops</p>
                      </div>
                    </div>
                  </div>

                  <div className="saved-searches-list">
                    {SAVED_SEARCHES_DATA.map((item) => (
                      <div
                        key={item.id}
                        className="saved-search-item-row"
                        onClick={() => showToast(`Executing search for: ${item.title}`)}
                      >
                        <div className="search-row-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" />
                          </svg>
                        </div>
                        <div className="search-row-meta">
                          <strong>{item.title}</strong>
                          <small>{item.filterDesc}</small>
                        </div>
                        <button
                          type="button"
                          className={`btn-notify-pill ${item.notifActive ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast(`Alert toggled for: ${item.title}`);
                          }}
                        >
                          <span className="notif-bell-icon">🔔</span>
                          <span>{item.notifActive ? "Active" : "Alert Me"}</span>
                        </button>
                        <span className="chevron-indicator">&rsaquo;</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Compare Properties Panel */}
                <section className="dash-panel-card" id="compare">
                  <div className="panel-header-row">
                    <div className="panel-title-group">
                      <span className="panel-icon-wrap gold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                      </span>
                      <div>
                        <h3>Compare Properties</h3>
                        <p>Analyze side-by-side metrics &amp; ROI</p>
                      </div>
                    </div>
                  </div>

                  {compareItems.length === 0 ? (
                    <div className="empty-panel-placeholder compact">
                      <p>Select properties to view side-by-side comparison.</p>
                    </div>
                  ) : (
                    <>
                      <div className="compare-mini-grid-3">
                        {compareItems.map((item) => (
                          <div key={item.id} className="compare-thumb-card">
                            <div className="compare-img-box">
                              <img src={item.image} alt={item.name} />
                              <button
                                type="button"
                                className="remove-compare-x"
                                aria-label={`Remove ${item.name}`}
                                onClick={(e) => removeCompareItem(item.id, item.name, e)}
                              >
                                &times;
                              </button>
                            </div>
                            <b>{item.name}</b>
                            <small>{item.price}</small>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="btn-launch-comparison"
                        onClick={() => showToast("Opening Full Side-by-Side Comparison Matrix")}
                      >
                        View Full Comparison Matrix &rarr;
                      </button>
                    </>
                  )}
                </section>
              </div>
            </div>

            {/* Right Column (My Enquiries, Recently Viewed) */}
            <div className="dash-col-right">
              {/* 4. My Enquiries Panel */}
              <section className="dash-panel-card" id="enquiries">
                <div className="panel-header-row">
                  <div className="panel-title-group">
                    <span className="panel-icon-wrap blue">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </span>
                    <div>
                      <h3>My Enquiries</h3>
                      <p>Builder responses &amp; visit passes</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="panel-view-all-link"
                    onClick={() => showToast("All Enquiry Logs")}
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="enquiries-stack-list">
                  {MY_ENQUIRIES_DATA.map((enq) => (
                    <div
                      key={enq.id}
                      className="enquiry-card-row"
                      onClick={() => showToast(`Enquiry thread for ${enq.name}`)}
                    >
                      <img src={enq.image} alt={enq.name} className="enquiry-thumb" />
                      <div className="enquiry-meta-copy">
                        <strong>{enq.name}</strong>
                        <small>{enq.location}</small>
                        <span className="enquiry-date">{enq.date}</span>
                      </div>
                      <span className={`enquiry-status-pill ${enq.statusColor}`}>
                        {enq.status}
                      </span>
                      <span className="chevron-indicator">&rsaquo;</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Recently Viewed Panel */}
              <section className="dash-panel-card" id="recent">
                <div className="panel-header-row">
                  <div className="panel-title-group">
                    <span className="panel-icon-wrap emerald">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <h3>Recently Viewed</h3>
                      <p>Pick up right where you left off</p>
                    </div>
                  </div>
                </div>

                <div className="recently-viewed-list">
                  {RECENTLY_VIEWED_DATA.map((item) => (
                    <div
                      key={item.id}
                      className="recent-item-row"
                      onClick={() => showToast(`Opening ${item.name}`)}
                    >
                      <img src={item.image} alt={item.name} className="recent-thumb" />
                      <div className="recent-meta-copy">
                        <strong>{item.name}</strong>
                        <small>{item.location}</small>
                        <span className="recent-time">{item.viewed}</span>
                      </div>
                      <span className="chevron-indicator">&rsaquo;</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* C. AI Property Search Concierge Banner */}
          <section className="dashboard-ai-concierge-card">
            <div className="ai-concierge-copy">
              <span className="ai-eyebrow-spark">✦ ILA INTELLIGENT SEARCH</span>
              <h2>Find your next luxury property with AI</h2>
              <p>
                Describe your exact lifestyle, budget, or architectural preference. Our algorithm analyzes HMDA layouts, commute times, and developer track records.
              </p>
            </div>

            <form className="ai-input-pill-form" onSubmit={handleAiSearch}>
              <span className="ai-sparkle-glyph">✦</span>
              <input
                type="text"
                placeholder='Try "4 BHK Villa with private pool in Tellapur under 6 Cr"'
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                aria-label="Describe your dream home to AI"
              />
              <button type="submit" className="btn-ai-search-submit" aria-label="Search with AI">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16" y1="16" x2="21" y2="21" />
                </svg>
              </button>
            </form>
          </section>
        </main>
      </div>

      {/* Floating Feedback Toast */}
      {toastMsg && (
        <div className="account-toast-notification" role="status" aria-live="polite">
          <span className="toast-dot" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
