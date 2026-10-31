import { useRef, useState } from "react";

const TIMELINE_LOCATIONS = [
  {
    id: "kokapet",
    name: "Kokapet",
    city: "Hyderabad",
    growth: "+320%",
    growthLabel: "Growth Over the Years",
    initialDivider: 27.5,
    eras: {
      past: {
        year: "2010",
        caption: "Farmland & Open Land",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
      },
      present: {
        year: "2024",
        caption: "IT Hub & Residential Growth",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=750&q=85",
      },
      future: {
        year: "2030",
        caption: "Planned Infrastructure & Smart City Expansion",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
        callouts: [
          { label: "Proposed Metro", top: "24%", left: "44%" },
          { label: "Mega IT Park", top: "49%", left: "66%" },
          { label: "Premium Residential Zone", top: "72%", left: "29%" },
        ],
      },
    },
  },
  {
    id: "tellapur",
    name: "Tellapur",
    city: "Hyderabad",
    growth: "+280%",
    growthLabel: "Growth Over the Years",
    initialDivider: 27.5,
    eras: {
      past: {
        year: "2012",
        caption: "Agricultural Land",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
      },
      present: {
        year: "2024",
        caption: "Residential & Commercial Growth",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=750&q=85",
      },
      future: {
        year: "2030",
        caption: "Planned Business Hub & Green Spaces",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
        callouts: [
          { label: "Proposed Regional Park", top: "24%", left: "44%" },
          { label: "Tech & Business District", top: "49%", left: "66%" },
          { label: "New Connectivity Corridor", top: "72%", left: "29%" },
        ],
      },
    },
  },
  {
    id: "narsingi",
    name: "Narsingi",
    city: "Hyderabad",
    growth: "+300%",
    growthLabel: "Growth Over the Years",
    initialDivider: 27.5,
    eras: {
      past: {
        year: "2011",
        caption: "Open Plots & Sparse Development",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
      },
      present: {
        year: "2024",
        caption: "Gated Communities & Social Infra",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=750&q=85",
      },
      future: {
        year: "2030",
        caption: "Planned Metro Access & Urban Expansion",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
        callouts: [
          { label: "Proposed Metro Station", top: "24%", left: "44%" },
          { label: "Upcoming CBD", top: "49%", left: "66%" },
          { label: "International School", top: "72%", left: "29%" },
        ],
      },
    },
  },
  {
    id: "financial-district",
    name: "Financial District",
    city: "Hyderabad",
    growth: "+400%",
    growthLabel: "Growth Over the Years",
    initialDivider: 27.5,
    eras: {
      past: {
        year: "2013",
        caption: "Initial Development",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
      },
      present: {
        year: "2024",
        caption: "Global Companies & IT Hub",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=750&q=85",
      },
      future: {
        year: "2030",
        caption: "Planned Global Business District",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
        callouts: [
          { label: "Upcoming Metro Line", top: "24%", left: "44%" },
          { label: "Convention Center", top: "49%", left: "66%" },
          { label: "Mixed-Use Development", top: "72%", left: "29%" },
        ],
      },
    },
  },
];

function TimelineCard({ loc, isVideoCard }) {
  const [selectedEra, setSelectedEra] = useState("present"); // 'past' | 'present' | 'future'
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (isVideoCard && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isVideoCard && videoRef.current) {
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  const eraOrder = ["past", "present", "future"];
  const currentEraIndex = eraOrder.indexOf(selectedEra);

  return (
    <article
      className="location-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-head">
        <span className="place-mark" aria-hidden="true">♧</span>
        <div className="place-name">
          <h2>{loc.name}</h2>
          <p>{loc.city}</p>
        </div>
        <div className="growth">
          <span className="growth-icon" aria-hidden="true">↗</span>
          <div>
            <strong>{loc.growth}</strong>
            <small>{loc.growthLabel}</small>
          </div>
        </div>
        <button
          className="view-location"
          type="button"
          onClick={() => alert(`Exploring ${loc.name} masterplan`)}
        >
          View Location <span>→</span>
        </button>
      </div>

      {isVideoCard ? (
        <div className="timeline video-timeline">
          <video
            ref={videoRef}
            src="/assets/past-present-video.mp4"
            className="timeline-video-player"
            muted
            playsInline
            loop
            preload="auto"
          />
          <div className="video-card-badge">
            <span className={`live-dot ${isPlaying ? "pulsing" : ""}`}></span>
            {isPlaying ? "Playing Evolution Video" : "Hover card to play video"}
          </div>
        </div>
      ) : (
        <div className="timeline-tabbed-container">
          {/* Top Era Selector Tabs: Past, Present, Future */}
          <div className="era-tab-pills" role="tablist">
            {["past", "present", "future"].map((eraKey) => (
              <button
                key={eraKey}
                type="button"
                className={`era-tab-btn ${selectedEra === eraKey ? "active" : ""}`}
                onClick={() => setSelectedEra(eraKey)}
              >
                <span className="era-tab-name">
                  {eraKey.charAt(0).toUpperCase() + eraKey.slice(1)}
                </span>
                <span className="era-tab-year">({loc.eras[eraKey].year})</span>
              </button>
            ))}
          </div>

          {/* Smooth Sliding Viewport */}
          <div className="era-slider-viewport">
            <div
              className="era-slider-track"
              style={{
                transform: `translateX(-${currentEraIndex * 100}%)`,
              }}
            >
              {/* Slide 1: Past */}
              <div className="era-slide past">
                <img
                  src={loc.eras.past.image}
                  alt={`${loc.name} past`}
                  loading="lazy"
                />
                <div className="era-slide-overlay">
                  <span className="era-badge">Past ({loc.eras.past.year})</span>
                  <p className="era-desc">{loc.eras.past.caption}</p>
                </div>
              </div>

              {/* Slide 2: Present (Default) */}
              <div className="era-slide present">
                <img
                  src={loc.eras.present.image}
                  alt={`${loc.name} present`}
                  loading="lazy"
                />
                <div className="era-slide-overlay">
                  <span className="era-badge present-badge">Present ({loc.eras.present.year})</span>
                  <p className="era-desc">{loc.eras.present.caption}</p>
                </div>
              </div>

              {/* Slide 3: Future */}
              <div className="era-slide future">
                <img
                  src={loc.eras.future.image}
                  alt={`${loc.name} future`}
                  loading="lazy"
                />
                {loc.eras.future.callouts.map((c, i) => (
                  <span
                    key={i}
                    className="callout"
                    style={{ top: c.top, left: c.left }}
                  >
                    {c.label}
                  </span>
                ))}
                <div className="era-slide-overlay">
                  <span className="era-badge future-badge">Future ({loc.eras.future.year})</span>
                  <p className="era-desc">{loc.eras.future.caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PastPresentFuture() {
  const gridRef = useRef(null);

  const scrollGrid = (direction) => {
    if (gridRef.current) {
      gridRef.current.scrollBy({
        left: direction * (gridRef.current.clientWidth / 2),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="past-present" id="past-present-future" aria-labelledby="timeline-heading">
      <header className="section-head">
        <div className="head-title">
          <div className="accent-line"></div>
          <h2 id="timeline-heading">
            Explore the <span>Past, Present & Future</span>
          </h2>
        </div>
        <div className="head-right">
          <p>
            See how these locations have evolved over the years and what’s planned ahead — so you can invest with confidence.
          </p>
          <div className="head-arrows">
            <button
              className="circle"
              type="button"
              aria-label="Previous locations"
              onClick={() => scrollGrid(-1)}
            >
              ‹
            </button>
            <button
              className="circle"
              type="button"
              aria-label="Next locations"
              onClick={() => scrollGrid(1)}
            >
              ›
            </button>
          </div>
        </div>
      </header>

      <div className="cards-grid" ref={gridRef}>
        {TIMELINE_LOCATIONS.map((loc, index) => (
          <TimelineCard
            key={loc.id}
            loc={loc}
            isVideoCard={index === 0 || index === 3}
          />
        ))}
      </div>
    </section>
  );
}
