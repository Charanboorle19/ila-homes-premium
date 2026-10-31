# ILA HOMES — React prototype

A Vite + React conversion of the ILA Homes hero and featured properties prototype.

## Requirements

- Node.js 20 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite prints the local preview URL (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Project structure

```
index.html                  Vite entry HTML
src/main.jsx                React root
src/App.jsx                 Page composition (hero + featured properties)
src/styles.css              Global design system and all page styles
src/components/             Hero, header, search, property cards, location strip
src/data/content.js         Property, category, location and search copy
public/assets/              Logo and landscape imagery
public/hero-video.mp4       Hero background video
public/featured-properties.html  Standalone single-screen featured-properties showcase
```

`public/featured-properties.html` is the self-contained static variant and is
served at `/featured-properties.html` by Vite. The React app does not link to it.

## Behaviour notes

- Search, category filtering, favourites, sharing, voice search and the mobile
  menu are implemented as React state instead of DOM manipulation.
- Property search is a frontend prototype; connect the submit handler in
  `src/components/Hero.jsx` to a real AI/property-search endpoint.
- Voice search uses the browser Web Speech API when available.
- The supplied logo is preserved as a transparent PNG.
- The standalone featured-properties showcase is viewport-fit: the masthead,
  filters, all four property cards and the location strip stay on one screen
  without page scrolling. Filtering to a category expands the matching card
  into a wide single result.
