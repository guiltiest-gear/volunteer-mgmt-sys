import { useState } from "preact/hooks";
import { Toast } from "../components/Toast.jsx";

export function SignUp() {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  /** @param {Event} event */
  function handleSubmit(event) {
    event.preventDefault();

    //validate name to contain first and last name
    const name = (/** @type {HTMLInputElement} */ (document.getElementById("name"))).value;
    
    if (!name.includes(" ")) {
      setMessage("Please enter your full name.");
      return;
    }

    //validate email and confirm email to be same
    const email = (/** @type {HTMLInputElement} */ (document.getElementById("email"))).value.toLowerCase();
    const confirmEmail = (/** @type {HTMLInputElement} */ (document.getElementById("confirmEmail"))).value.toLowerCase();

    if (email !== confirmEmail) {
      setMessage("Emails do not match.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Invalid email format.");
      return;
    }

    //validate password and confirm password to be the same and at least 6 characters long
    const password = (/** @type {HTMLInputElement} */ (document.getElementById("password"))).value;
    const confirmPassword = (/** @type {HTMLInputElement} */ (document.getElementById("confirmPassword"))).value;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    } else if (password.includes(" ")) {
      setMessage("Password cannot contain spaces.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setMessage("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setMessage("Password must contain at least one lowercase letter.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setMessage("Password must contain at least one number.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setMessage("Password must contain at least one special character.");
      return;
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    } else {
      const role = (/** @type {HTMLSelectElement} */ (document.getElementById("role"))).value;
      
      // Send signup request to server
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          email: email,
          password: password,
          role: role
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setToast(true);
          setTimeout(() => {
            window.location.href = '/';
          }, 2500);
        }
      })
      .catch(error => {
        setMessage('Error creating account: ' + error.message);
      });
      return true;
    }
  }

  return (
    <div class="signup-container">
      <h2>Create Account</h2>

      <form id="signupForm" onSubmit={handleSubmit}>
        <select id="role" name="role" required>
          <option value="">Select Role</option>
          <option value="volunteer">Volunteer</option>
          <option value="administrator">Administrator</option>
        </select>
        <input type="text" id="name" placeholder="Full Name" required />
        <input type="email" id="email" placeholder="Email" required />
        <input
          type="email"
          id="confirmEmail"
          placeholder="Confirm Email"
          required
        />
        <a style="font-size: 12px;">
          Password must include at least 6 characters, 1 uppercase letter, 1
          lowercase letter, 1 number, and 1 special character.
        </a>
        <input type="password" id="password" placeholder="Password" required />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <p id="message">{message}</p>
      {toast && <Toast message="Account created successfully!" onClose={() => setToast(false)} />}
    </div>
  );
}
