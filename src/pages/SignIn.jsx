import { useState } from "preact/hooks";
import { Toast } from "../components/Toast.jsx";

export function SignIn() {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  /** @param {Event} event */
  function handleSubmit(event) {
    event.preventDefault();

    const email = (/** @type {HTMLInputElement} */ (document.getElementById("email"))).value;
    const password = (/** @type {HTMLInputElement} */ (document.getElementById("password"))).value;

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setMessage(data.error);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setToast(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 2500);
      }
    })
    .catch(error => {
      setMessage('Error signing in: ' + error.message);
    });
  }

  return (
    <div class="signin-container">
      <h2>Login</h2>
      <form id="signinForm" onSubmit={handleSubmit}>
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <a href="#" class="forgot" onClick={(event) => event.preventDefault()}>
          Forgot password?
        </a>
        <button type="submit">Sign In</button>
      </form>
      <p id="message">{message}</p>
      {toast && <Toast message="Signed in successfully!" onClose={() => setToast(false)} />}
    </div>
  );
}
