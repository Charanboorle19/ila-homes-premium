import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "./SiteHeader";
import SearchPanel from "./SearchPanel";
import { SEARCH_EXAMPLES, SUGGESTIONS } from "../data/content";
import { MapIcon, SearchIcon } from "./icons";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [status, setStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [placeholder, setPlaceholder] = useState(SEARCH_EXAMPLES[0]);
  const [placeholderFade, setPlaceholderFade] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const inputRef = useRef(null);
  const placeholderIndex = useRef(0);
  const reduceMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (reduceMotion || inputFocused || query.trim()) return undefined;

    const interval = window.setInterval(() => {
      placeholderIndex.current = (placeholderIndex.current + 1) % SEARCH_EXAMPLES.length;
      setPlaceholderFade(true);
      window.setTimeout(() => {
        setPlaceholder(SEARCH_EXAMPLES[placeholderIndex.current]);
        setPlaceholderFade(false);
      }, 180);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [inputFocused, query, reduceMotion]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setStatus("");
  };

  const handleSelectType = (type) => {
    setActiveType(type);
    if (!query.trim()) {
      setPlaceholder(
        type === "All"
          ? SEARCH_EXAMPLES[0]
          : `Tell us what ${type.toLowerCase()} you're looking for...`
      );
    }
  };

  const handleSuggestion = (suggestion) => {
    setQuery(suggestion);
    setStatus("");
    inputRef.current?.focus();
    const end = suggestion.length;
    inputRef.current?.setSelectionRange(end, end);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    try {
      if (trimmedQuery) {
        sessionStorage.setItem("ila_search_query", trimmedQuery);
      }
      if (activeType && activeType !== "All") {
        sessionStorage.setItem("ila_search_type", activeType);
      } else {
        sessionStorage.removeItem("ila_search_type");
      }
    } catch (e) {
      console.error(e);
    }

    // Navigate to property discovery page
    window.location.hash = "#discover";
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus(
        "Voice search isn't supported in this browser. You can type your search instead."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    setStatus("Listening… say what kind of property you're looking for.");

    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
      setStatus("");
      inputRef.current?.focus();
    };
    recognition.onerror = () => {
      setStatus("Couldn't capture your voice. Please try again or type your search.");
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex="-1"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="ambient ambient-one" aria-hidden="true"></div>
      <div className="ambient ambient-two" aria-hidden="true"></div>

      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={closeMenu}
      />

      <section className="hero-content" aria-labelledby="hero-title">
        <div className="eyebrow">BETTER PLACES. BRIGHTER POSSIBILITIES.</div>

        <h1 id="hero-title">
          Find more than a property.<span>Find your place.</span>
        </h1>
        <p className="intro">
          Explore homes, plots and investment opportunities with the power of AI.
        </p>

        <SearchPanel
          query={query}
          onQueryChange={handleQueryChange}
          activeType={activeType}
          onSelectType={handleSelectType}
          onSubmit={handleSubmit}
          onVoice={handleVoice}
          listening={listening}
          placeholder={placeholder}
          placeholderFade={placeholderFade}
          inputRef={inputRef}
          onFocus={() => {
            setInputFocused(true);
            setStatus("");
          }}
          onBlur={() => setInputFocused(false)}
        />

        <div className="suggestions-block">
          <p className="suggestions-label">NOT SURE? TRY THESE</p>
          <div className="suggestions" aria-label="Example searches">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion"
                data-query={suggestion}
                onClick={() => handleSuggestion(suggestion)}
              >
                <SearchIcon />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>

        <a className="explore-map" href="#map">
          <span className="map-icon" aria-hidden="true">
            <MapIcon />
          </span>
          <span>Explore Map</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </a>

        <p className="status-message" id="status-message" role="status" aria-live="polite">
          {status}
        </p>
      </section>
    </section>
  );
}
