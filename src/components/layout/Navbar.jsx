import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>JournalApp</h2>
      </div>

      {/* Hamburger */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </li>

        <li>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
        </li>

        <li>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </li>

        <li>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </li>

        <li className="mobile-buttons">
          <Link to="/login">
            <button
              className="login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              className="signup-btn"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </button>
          </Link>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;