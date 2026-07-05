import { useNavigate } from "react-router-dom";
import "./QuoteCTA.css";

function QuoteCTA() {
  const navigate=useNavigate();
  return (
    <section className="quote-section">
      <div className="quote-card">

        <h2 className="quote-text">
          "Fill your paper with the breathings of
          <br />
          your heart."
        </h2>

        <p className="quote-author">
          — WILLIAM WORDSWORTH
        </p>

         <button
          className="quote-btn"
          onClick={() => navigate("/login")}
        >
          Open your first entry
          {/* on clicking this button the login page should open */}
        </button>

      </div>
    </section>
  );
}

export default QuoteCTA;