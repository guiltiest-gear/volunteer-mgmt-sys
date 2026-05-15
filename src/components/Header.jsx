import { useLocation } from "preact-iso";
export function Header() {
  const { url } = useLocation();

  return (
    <div className="navbar">
      <div className="logo">
        <a href="/">
          <img src="https://images.squarespace-cdn.com/content/v1/5e7bccc44c932c510af9fc1c/1646328735683-BQ15AYSZ17BNCR5GMXX6/SacramentoState_1color.png" alt="CSUS Logo" className="logo-img" style="height: 48px; width: 48px; margin-bottom: 0; margin-left: 0;"></img>
        </a>
      </div>
      <div className="nav-links">
        <a href="/events" className={url == "/events" ? "active" : undefined}>
          Events
        </a>
        <a href="/newsletter" className={url == "/newsletter" ? "active" : undefined}>
          Newsletter
        </a>
        <a href="/aboutus" className={url == "/aboutus" ? "active" : undefined}>
          About Us
        </a>
        <a href="/resources" className={url == "/resources" ? "active" : undefined}>
          Resources
        </a>
        <a href="/faq" className={url == "/faq" ? "active" : undefined}>
          FAQ
        </a>
      </div>

      <div className="nav-actions">
        <button onClick={() => window.location.href = "/signin"} className="btn">Sign In</button>
        <button onClick={() => window.location.href = "/signup"} className="btn">Sign Up</button>
      </div>
    </div>
  );
}
