import { useEffect, useRef, useState } from "react";
import "@google/model-viewer";

declare global {
  interface Window {
    mapboxgl?: any;
    MAPBOX_TOKEN?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

const MODEL_SRC = "/assets/sample-demo-3d.glb";

const MAPBOX_TOKEN =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  (typeof window !== "undefined" ? window.MAPBOX_TOKEN : "") ||
  "";

const REGION_LABEL =
  "Thukkuguda ORR Toll Gate - Maheshwaram, 501359, India";

const REGION_LINE: [number, number][] = 
 [
          [
            78.4619793,
            17.1499472
          ],
          [
            78.4619793,
            17.1499472
          ],
          [
            78.4820102,
            17.1476385
          ],
          [
            78.4820882,
            17.1474895
          ],
          [
            78.4969749,
            17.1508409
          ],
          [
            78.4970529,
            17.1508409
          ],
          [
            78.503522,
            17.1593309
          ],
          [
            78.5035999,
            17.1593309
          ],
          [
            78.5053926,
            17.1696822
          ],
          [
            78.5054705,
            17.1696078
          ],
          [
            78.5148234,
            17.1787671
          ],
          [
            78.5148234,
            17.1787671
          ],
          [
            78.5139373,
            17.189496
          ],
          [
            78.5139373,
            17.189496
          ],
          [
            78.5169628,
            17.2044821
          ],
          [
            78.5169628,
            17.204268
          ],
          [
            78.5124806,
            17.2151857
          ],
          [
            78.5125927,
            17.2151857
          ],
          [
            78.5141749,
            17.2269811
          ],
          [
            78.514024,
            17.2266929
          ],
          [
            78.5113077,
            17.2393765
          ],
          [
            78.5113077,
            17.2392324
          ],
          [
            78.4939534,
            17.2462944
          ],
          [
            78.4941043,
            17.2461503
          ],
          [
            78.4845972,
            17.2390882
          ],
          [
            78.4845972,
            17.2388
          ],
          [
            78.4654321,
            17.220639
          ],
          [
            78.465583,
            17.220639
          ],
          [
            78.4548686,
            17.2197742
          ],
          [
            78.4547177,
            17.2197742
          ],
          [
            78.4424943,
            17.2239542
          ],
          [
            78.4424943,
            17.223666
          ],
          [
            78.4328363,
            17.2148733
          ],
          [
            78.4329872,
            17.214585
          ],
          [
            78.4298181,
            17.1962775
          ],
          [
            78.4298181,
            17.1959891
          ],
          [
            78.4360053,
            17.1833026
          ],
          [
            78.4361562,
            17.1830142
          ],
          [
            78.4465688,
            17.1716244
          ],
          [
            78.4465688,
            17.171336
          ],
          [
            78.4503414,
            17.1586477
          ],
          [
            78.4501905,
            17.1583593
          ],
          [
            78.4557741,
            17.1521591
          ],
          [
            78.4556231,
            17.1518707
          ],
          [
            78.4592449,
            17.1502845
          ],
          [
            78.4592449,
            17.1501403
          ]
        ];

/** Deduplicate consecutive identical points and close the ring for a fillable polygon. */
function buildClosedRing(coords: [number, number][]): [number, number][] {
  const ring: [number, number][] = [];

  coords.forEach(([lng, lat]) => {
    const prev = ring[ring.length - 1];
    if (!prev || prev[0] !== lng || prev[1] !== lat) {
      ring.push([lng, lat]);
    }
  });

  if (ring.length > 2) {
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      ring.push([first[0], first[1]]);
    }
  }

  return ring;
}

const REGION_RING = buildClosedRing(REGION_LINE as [number, number][]);

const HIGHLIGHT_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { label: REGION_LABEL },
      geometry: {
        type: "Polygon" as const,
        coordinates: [REGION_RING],
      },
    },
  ],
};

/** Ray-casting point-in-polygon check. Ring may be open or closed. */
function pointInPolygon(point: [number, number], ring: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersects) inside = !inside;
  }

  return inside;
}

/** Keep pins clearly inside by checking an inset ring around the point. */
function isWellInsideRegion(
  point: [number, number],
  ring: [number, number][],
  inset = 0.006
): boolean {
  const [lng, lat] = point;
  if (!pointInPolygon(point, ring)) return false;

  const offsets: [number, number][] = [
    [inset, 0],
    [-inset, 0],
    [0, inset],
    [0, -inset],
    [inset * 0.75, inset * 0.75],
    [-inset * 0.75, inset * 0.75],
    [inset * 0.75, -inset * 0.75],
    [-inset * 0.75, -inset * 0.75],
  ];

  return offsets.every(([dx, dy]) => pointInPolygon([lng + dx, lat + dy], ring));
}

function getRingBounds(ring: [number, number][]) {
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  ring.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  return { minLng, maxLng, minLat, maxLat };
}

/** Deterministic pseudo-random in [0, 1) so pins stay stable across remounts. */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function distanceSq(a: [number, number], b: [number, number]) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function generatePinsInsideRegion(
  ring: [number, number][],
  count = 8
): { coords: [number, number]; id: number }[] {
  const bounds = getRingBounds(ring);
  const padLng = (bounds.maxLng - bounds.minLng) * 0.22;
  const padLat = (bounds.maxLat - bounds.minLat) * 0.22;
  const inner = {
    minLng: bounds.minLng + padLng,
    maxLng: bounds.maxLng - padLng,
    minLat: bounds.minLat + padLat,
    maxLat: bounds.maxLat - padLat,
  };

  const pins: { coords: [number, number]; id: number }[] = [];
  const minSeparation = 0.01;
  const minSeparationSq = minSeparation * minSeparation;
  let attempts = 0;
  let seed = 1;

  while (pins.length < count && attempts < count * 280) {
    attempts += 1;
    seed += 1;
    const lng =
      inner.minLng + seededRandom(seed) * (inner.maxLng - inner.minLng);
    const lat =
      inner.minLat + seededRandom(seed + 17) * (inner.maxLat - inner.minLat);
    const coords: [number, number] = [lng, lat];

    if (!isWellInsideRegion(coords, ring, 0.0065)) continue;
    if (pins.some((pin) => distanceSq(pin.coords, coords) < minSeparationSq)) continue;

    pins.push({
      coords,
      id: pins.length + 1,
    });
  }

  return pins;
}

const REGION_PINS = generatePinsInsideRegion(REGION_RING, 4);

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const openModelRef = useRef<(pinId: number) => void>(() => {});
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState("");
  const [activePinId, setActivePinId] = useState<number | null>(null);

  const showModel = activePinId !== null;

  openModelRef.current = (pinId: number) => {
    setActivePinId(pinId);
  };

  useEffect(() => {
    if (!showModel) {
      // Mapbox needs a resize after the canvas becomes visible again.
      requestAnimationFrame(() => {
        mapRef.current?.resize?.();
      });
    }
  }, [showModel]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    if (!window.mapboxgl) {
      setMapError("Mapbox failed to load. Check your connection and try again.");
      return;
    }

    if (!MAPBOX_TOKEN) {
      setMapError("Mapbox token is missing. Add VITE_MAPBOX_TOKEN to your .env file.");
      return;
    }

    window.mapboxgl.accessToken = MAPBOX_TOKEN;

    let map: any;

    try {
      map = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.47787127, 17.20419087],
        zoom: 12.4,
        pitch: 0,
        bearing: 0,
        antialias: true,
        attributionControl: true,
      });
    } catch (err) {
      console.error("Mapbox initialization failed:", err);
      setMapError("Map could not load. Check your connection and Mapbox token.");
      return;
    }

    mapRef.current = map;

    map.addControl(
      new window.mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    map.addControl(
      new window.mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
      }),
      "bottom-right"
    );

    map.on("load", () => {
      map.addSource("highlighted-region", {
        type: "geojson",
        data: HIGHLIGHT_GEOJSON,
      });

      map.addLayer({
        id: "highlighted-region-glow",
        type: "line",
        source: "highlighted-region",
        paint: {
          "line-color": "#6ee7b7",
          "line-width": 10,
          "line-opacity": 0.26,
          "line-blur": 5,
        },
      });

      map.addLayer({
        id: "highlighted-region-fill",
        type: "fill",
        source: "highlighted-region",
        paint: {
          "fill-color": "#6ee7b7",
          "fill-opacity": 0.2,
        },
      });

      map.addLayer({
        id: "highlighted-region-outline",
        type: "line",
        source: "highlighted-region",
        paint: {
          "line-color": "#34d399",
          "line-width": 3,
          "line-opacity": 0.9,
          "line-dasharray": [2, 1.5],
        },
      });

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      REGION_PINS.forEach((pin) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "home-map-pointer";
        el.innerHTML = `
          <span class="home-map-pointer__badge">
            <img
              class="home-map-pointer__icon"
              src="/assets/ila-homes-pointers.png"
              alt=""
              draggable="false"
            />
          </span>
          <span class="home-map-pointer__needle" aria-hidden="true"></span>
          <span class="home-map-pointer__dot" aria-hidden="true"></span>
        `;
        el.setAttribute("aria-label", `Open 3D layout for pin ${pin.id}`);
        el.addEventListener("click", (event) => {
          event.stopPropagation();
          openModelRef.current(pin.id);
        });

        const marker = new window.mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(pin.coords)
          .addTo(map);

        markersRef.current.push(marker);
      });

      const bounds = new window.mapboxgl.LngLatBounds();
      REGION_RING.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, {
        padding: { top: 56, bottom: 56, left: 48, right: 48 },
        duration: 0,
        maxZoom: 13.2,
      });

      setMapReady(true);
    });

    map.on("error", () => {
      setMapError("Map could not load. Check your connection and Mapbox token.");
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleExploreAll = () => {
    window.location.hash = "#developments-map";
  };

  const handleCloseModel = () => {
    setActivePinId(null);
  };

  return (
    <section className="home-map-section" id="map" aria-labelledby="home-map-heading">
      <div className="home-map-section__glow" aria-hidden="true" />
      <div className="home-map-section__grid" aria-hidden="true" />

      <div className="home-map-section__inner">
        <header className="home-map-section__header">
          <h2 id="home-map-heading">
            {showModel ? "3D plot layout" : "Explore on the map"}
          </h2>
          <button
            type="button"
            className="home-map-section__cta"
            onClick={handleExploreAll}
          >
            Explore map
            <span aria-hidden="true">→</span>
          </button>
        </header>

        <div className="home-map-section__stage">
          <div className={`home-map-section__frame ${showModel ? "is-model" : ""}`}>
            <div
              ref={mapContainerRef}
              className={`home-map-section__canvas ${showModel ? "is-hidden" : ""}`}
              role="application"
              aria-label={REGION_LABEL}
              aria-hidden={showModel}
            />

            {!mapReady && !mapError && !showModel && (
              <div className="home-map-section__status" aria-live="polite">
                Loading map…
              </div>
            )}

            {mapError && !showModel && (
              <div
                className="home-map-section__status home-map-section__status--error"
                role="alert"
              >
                {mapError}
              </div>
            )}

            {showModel && (
              <div className="home-map-section__model" role="dialog" aria-modal="true" aria-label="3D plot layout">
                <button
                  type="button"
                  className="home-map-section__model-close"
                  onClick={handleCloseModel}
                  aria-label="Close 3D view"
                >
                  <span aria-hidden="true">×</span>
                </button>

                <model-viewer
                  className="home-map-section__model-viewer"
                  src={MODEL_SRC}
                  alt={`Interactive 3D layout for pin ${activePinId}`}
                  camera-controls
                  touch-action="pan-y"
                  auto-rotate
                  shadow-intensity="1.1"
                  exposure="1.05"
                  environment-image="neutral"
                  loading="eager"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
