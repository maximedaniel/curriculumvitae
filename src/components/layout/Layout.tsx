import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { navLeft, navMisc, SITE_TITLE } from "../../site";
import { pageTitle } from "../../routes";
import { Toc } from "./Toc";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand-container">
            <Link className="navbar-brand" to="/">
              <span className="navbar-title">{SITE_TITLE}</span>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={menuOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
            <ul className="navbar-nav me-auto">
              {navLeft.map((l) => (
                <li className="nav-item" key={l.path}>
                  <Link className="nav-link" to={l.path}>
                    <span className="menu-text">{pageTitle(l.path)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  aria-expanded={dropdownOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen((v) => !v);
                  }}
                >
                  <span className="menu-text">{navMisc.label}</span>
                </a>
                <ul className={dropdownOpen ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"}>
                  {navMisc.items.map((l) => (
                    <li key={l.path}>
                      <Link className="dropdown-item" to={l.path} onClick={() => setDropdownOpen(false)}>
                        <span className="dropdown-text">{pageTitle(l.path)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="page-grid">
        <main className="page-main content">{children}</main>
        <Toc />
      </div>
    </>
  );
}
