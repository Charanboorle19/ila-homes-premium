import { useRef, useState } from "react";
import { navigateToPropertyDetails } from "../data/navigation";

const INITIAL_DISTRICTS = [
  {
    name: "Hyderabad",
    count: "821+",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Rangareddy",
    count: "654+",
    location: "Rangareddy District",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Medchal-Malkajgiri",
    count: "312+",
    location: "Medchal-Malkajgiri District",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Sangareddy",
    count: "268+",
    location: "Sangareddy District",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Yadadri Bhuvanagiri",
    count: "196+",
    location: "Yadadri Bhuvanagiri District",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Nalgonda",
    count: "142+",
    location: "Nalgonda District",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Mahabubnagar",
    count: "76+",
    location: "Mahabubnagar District",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Vikarabad",
    count: "120+",
    location: "Vikarabad District",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=220&q=80",
  },
];

const CITIES = [
  "Hyderabad",
  "Secunderabad",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Khammam",
  "Siddipet",
  "Nalgonda",
];

const LOCALITIES = [
  { name: "Gachibowli", count: "220+" },
  { name: "Kokapet", count: "180+" },
  { name: "Tellapur", count: "145+" },
  { name: "Shadnagar", count: "90+" },
  { name: "Kondapur", count: "165+" },
  { name: "Miyapur", count: "130+" },
  { name: "Kompally", count: "72+" },
  { name: "Narsingi", count: "85+" },
];

export default function PropertyMapExplorer({ onSelectProperty }) {
  const [activeTab, setActiveTab] = useState("districts"); // 'districts' | 'cities' | 'localities'
  const [selectedName, setSelectedName] = useState("Rangareddy");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef(null);

  // Compute items according to tab
  const getItems = () => {
    return INITIAL_DISTRICTS.map((item, idx) => {
      if (activeTab === "cities") {
        const cityName = CITIES[idx] || item.name;
        return {
          ...item,
          displayName: cityName,
          location: cityName,
          displayCount: item.count,
        };
      }
      if (activeTab === "localities") {
        const loc = LOCALITIES[idx] || { name: item.name, count: "100+" };
        return {
          ...item,
          displayName: loc.name,
          location: loc.name + ", Hyderabad",
          displayCount: loc.count,
        };
      }
      return {
        ...item,
        displayName: item.name,
        location: item.location,
        displayCount: item.count,
      };
    });
  };

  const allItems = getItems();
  const filteredItems = allItems.filter((item) =>
    item.displayName.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const selectedItem =
    allItems.find(
      (item) => item.displayName.toLowerCase() === selectedName.toLowerCase()
    ) || allItems[1];

  const handleSelectDistrict = (name) => {
    setSelectedName(name);
  };

  const handleReset = () => {
    setSearchQuery("");
    setActiveTab("districts");
    setSelectedName("Rangareddy");
  };

  // Play video only when hovering over districts
  const handleDistrictMouseEnter = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleDistrictMouseLeave = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="map-section" id="map-explorer" aria-labelledby="map-heading">
      <header className="heading-row">
        <div>
          <div className="eyebrow">Discover by location</div>
          <h2 id="map-heading">
            Explore Properties <span>on the Map</span>
          </h2>
          <p>
            Discover the right neighbourhood, explore nearby areas, and find properties in the locations that suit you. Hover over districts to explore.
          </p>
        </div>
      </header>

      <div className="explorer">
        <aside className="sidebar">
          <section className={`location-panel ${expanded ? "expanded" : ""}`} id="locationPanel">
            <h3 className="panel-title">Find a Location</h3>
            <label className="searchbox">
              <span>⌕</span>
              <input
                id="locationSearch"
                type="search"
                placeholder="Search state, district or locality..."
                aria-label="Search state district or locality"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            <div className="tabs" role="tablist">
              <button
                className={`tab ${activeTab === "districts" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("districts")}
              >
                Districts
              </button>
              <button
                className={`tab ${activeTab === "cities" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("cities")}
              >
                Cities
              </button>
              <button
                className={`tab ${activeTab === "localities" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("localities")}
              >
                Localities
              </button>
            </div>

            <div className="list-heading">
              <h4>
                {activeTab === "districts"
                  ? "Telangana Districts"
                  : activeTab === "cities"
                  ? "Popular Cities"
                  : "Popular Localities"}
              </h4>
              <button className="reset" type="button" onClick={handleReset}>
                Reset <span>⟳</span>
              </button>
            </div>

            <div
              className="district-list"
              onMouseEnter={handleDistrictMouseEnter}
              onMouseLeave={handleDistrictMouseLeave}
            >
              {filteredItems.map((item) => {
                const isSelected =
                  item.displayName.toLowerCase() === selectedName.toLowerCase();
                return (
                  <button
                    key={item.displayName}
                    className={`district ${isSelected ? "active" : ""}`}
                    type="button"
                    onClick={() => handleSelectDistrict(item.displayName)}
                    onMouseEnter={() => handleSelectDistrict(item.displayName)}
                  >
                    <img src={item.image} alt={item.displayName} loading="lazy" />
                    <span className="district-copy">
                      <strong>{item.displayName}</strong>
                      <small>{item.displayCount} properties</small>
                    </span>
                    <span className="chevron">›</span>
                  </button>
                );
              })}
            </div>

            <button
              className="show-all"
              type="button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show fewer locations ⌃" : "Show all locations ⌄"}
            </button>
          </section>

          <section className="district-detail">
            <img
              src={selectedItem.image}
              alt={selectedItem.displayName}
              loading="lazy"
            />
            <div className="detail-copy">
              <button
                className={`bookmark ${bookmarked ? "saved" : ""}`}
                type="button"
                aria-label="Save location"
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? "♥" : "♧"}
              </button>
              <strong>{selectedItem.location}</strong>
              <p>Telangana, India</p>
              <b><span>{selectedItem.displayCount}</span> properties available</b>
            </div>
            <button
              className="explore-btn"
              type="button"
              onClick={() => {
                navigateToPropertyDetails({
                  title: `Properties in ${selectedItem.displayName}`,
                  location: `${selectedItem.displayName}, Telangana`,
                  price: "₹1.2 Cr – ₹4.5 Cr",
                });
              }}
            >
              Explore Properties <span>→</span>
            </button>
          </section>
        </aside>

        {/* Right Block: Replaced with map-video.mp4, plays on hover */}
        <main
          className="map-canvas video-canvas"
          aria-label="Telangana map video viewer"
        >
          <video
            ref={videoRef}
            src="/assets/map-video.mp4"
            className="map-video-player"
            muted
            playsInline
            loop
            preload="auto"
          />

          {/* Floating district badge highlighting current selection */}
          <div className="video-district-tag">
            <span className="live-indicator">
              <span className={`live-dot ${isVideoPlaying ? "pulsing" : ""}`}></span>
              {isVideoPlaying ? "Previewing Map" : "Hover left list to preview"}
            </span>
            <strong>{selectedItem.displayName}</strong>
            <small>{selectedItem.displayCount} Properties</small>
          </div>
        </main>
      </div>
    </section>
  );
}
