import { useState } from "preact/hooks";

export function SignIn() {
  const [message, setMessage] = useState("");

  /** @param {Event} event */
  function handleSubmit(event) {
    event.preventDefault();
    
    const email = (/** @type {HTMLInputElement} */ (document.getElementById("email"))).value;
    const password = (/** @type {HTMLInputElement} */ (document.getElementById("password"))).value;

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    // Send signin request to server
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage('Signed in successfully! Welcome, ' + data.full_name);
        // Optionally, store user data or redirect
        localStorage.setItem('user', JSON.stringify(data));
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
    </div>
  );
}
