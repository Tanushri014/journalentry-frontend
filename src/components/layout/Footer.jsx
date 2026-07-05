import "./Footer.css";
import {Link} from "react-router-dom";
function Footer() {
  return (
    <footer id="contact" className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>📖 JournalApp</h2>
          <p>
            Your private space to reflect, grow,
            and capture life's moments.
          </p>
          <p>Get in touch with  :  matretanushri@gmail.com</p>
          
        </div>

        <div className="footer-links">

          <div>
            <h4>Quick Links</h4>

            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h4>Account</h4>
<Link to="/login">Login</Link>
<Link to="/register">Sign Up</Link>
          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © 2026 JournalApp. All Rights Reserved.
        </p>

        <p>
          Made with ❤️ using React & Spring Boot
        </p>

      </div>

    </footer>
  );
}

export default Footer;