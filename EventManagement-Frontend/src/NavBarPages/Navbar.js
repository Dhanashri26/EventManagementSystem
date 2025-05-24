import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../NavBarPagesCss/Navbaar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setScrolled(true); // Keep navbar white after click
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          scrolled || hovered ? "navbar-white" : "navbar-dark"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          OccasionCraft
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav d-flex gap-5">
            <li className="nav-item active">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                HOME
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about" onClick={handleLinkClick}>
                ABOUT
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                CONTACT
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/service"
                onClick={handleLinkClick}
              >
                SERVICES
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/login" onClick={handleLinkClick}>
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
