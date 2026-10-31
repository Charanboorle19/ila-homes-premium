import { NAV_LINKS } from "../data/content";
import { HeartIcon, UserIcon } from "./icons";

export default function SiteHeader({ menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="ILA HOMES home" onClick={onNavigate}>
        <img
          src="/assets/ila-homes-logo-white.png"
          alt="ILA HOMES — Building futures and unlocking possibilities"
        />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span></span>
        <span></span>
      </button>

      <nav
        className={menuOpen ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={onNavigate}>
            {link.label}
            {link.chevron ? (
              <span className="nav-chevron" aria-hidden="true">
                ⌄
              </span>
            ) : null}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="saved-link" href="#saved" aria-label="Saved properties" onClick={() => { window.location.hash = "#dashboard"; }}>
          <HeartIcon />
          <span>Saved</span>
        </a>
        <a className="signin-link" href="#signin" onClick={() => { window.location.hash = "#signin"; }}>
          <UserIcon />
          <span>Sign In</span>
        </a>
        <a className="signup-link-btn" href="#signup" onClick={() => { window.location.hash = "#signup"; }}>
          Sign Up
        </a>
        <a
          className="list-property"
          href="#list-property"
          onClick={() => {
            window.location.hash = "#list-property";
          }}
        >
          List Property <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
