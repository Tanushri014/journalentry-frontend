import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>JournalApp</h2>
      </div>

       <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-buttons">

    <Link to="/login">
        <button className="login-btn">
            Login
        </button>
    </Link>

    <Link to="/register">
        <button className="signup-btn">
            Sign Up
        </button>
    </Link>

</div>
    </nav>
  );
}

export default Navbar;