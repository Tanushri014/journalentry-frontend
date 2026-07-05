import "./AuthLayout.css";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">

      <div className="overlay"></div>

      <div className="auth-card">

        <div className="logo">
          📖 JournalApp
        </div>

        <h2>{title}</h2>

        <p>{subtitle}</p>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;