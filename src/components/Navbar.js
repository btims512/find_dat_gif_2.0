import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/styles/_navbar.scss";

function Navbar({ onHomeClick }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = (isLink) => {
    if (isLink) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(!isNavOpen);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <div className="navbar__container">
          <Link to="/" className="navbar__logo" onClick={onHomeClick}>
            Find Dat GIF!
          </Link>
          <button className="navbar__toggle" onClick={() => toggleNav(false)}>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
          </button>
        </div>
      </div>
      <div className={`navbar__menu ${isNavOpen ? "navbar__menu--open" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            toggleNav(true);
            onHomeClick();
          }}
        >
          Home
        </Link>
        <Link to="/random" onClick={() => toggleNav(true)}>
          Random
        </Link>
        <Link to="/categories" onClick={() => toggleNav(true)}>
          Categories
        </Link>
        <Link to="/stickers-search" onClick={() => toggleNav(true)}>
          Stickers Search
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
