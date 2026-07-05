import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function DashboardNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="dashboard-navbar">

      <div className="logo">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <span className="logo-icon">📖</span>
        <h2>My Safe Corner</h2>
      </div>


<Link to="/journal/new">
  <button className="create-btn">
    + Create Journal Entry
  </button>
</Link>

    </nav>
  );
}
export default DashboardNavbar;