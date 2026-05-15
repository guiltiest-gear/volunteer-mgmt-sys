import { useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { Toast } from "./Toast.jsx";

export function Header() {
  const { url } = useLocation();
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    setToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  }

  return (
    <>
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
        {user ? (
          <>
            <button onClick={() => window.location.href = "/profile"} className="btn">Profile</button>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => window.location.href = "/signin"} className="btn">Sign In</button>
            <button onClick={() => window.location.href = "/signup"} className="btn">Sign Up</button>
          </>
        )}
      </div>
    </div>
    {toast && <Toast message="Logged out successfully!" onClose={() => setToast(false)} />}
    </>
  );
}
