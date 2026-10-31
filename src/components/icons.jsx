export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

export function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function MapIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15m6-12v15" />
    </svg>
  );
}

export function TypeIcon({ type }) {
  switch (type) {
    case "Apartments":
      return (
        <svg className="type-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16M3 21h18M9 8h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1m-2 5v-4h-3v4" />
        </svg>
      );
    case "Villas":
      return (
        <svg className="type-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
        </svg>
      );
    case "Plots":
      return (
        <svg className="type-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 9 17H3L12 3Z" />
          <path d="M12 9v4m0 3h.01" />
        </svg>
      );
    case "Commercial":
      return (
        <svg className="type-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 21V4h16v17M2 21h20M8 8h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2" />
        </svg>
      );
    default:
      return (
        <svg className="type-icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
  }
}
