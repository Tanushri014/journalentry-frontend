import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate=useNavigate();
  return (
    <section id="hero" className="hero">

      <div className="hero-badge">
        📖 YOUR PRIVATE JOURNAL
      </div>

      <h1 className="hero-title">
        The page that listens
        <br />
        <span>without judgment.</span>
      </h1>

      <p className="hero-description">
        A quiet corner for your daily reflections, honest writing,
        and personal growth. Capture your thoughts, revisit your
        memories, and understand yourself better—entirely yours.
      </p>
<div className="hero-buttons">
    <button
        className="primary-btn"
        onClick={() => navigate("/register")}
    >
        Start Journaling
    </button>

    <button
        className="secondary-btn"
        onClick={() => navigate("/login")}
    >
        I already have an account
    </button>
</div>

    </section>
  );
}

export default Hero;