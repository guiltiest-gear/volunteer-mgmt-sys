import { useState } from "preact/hooks";

export function SignUp() {
  const [message, setMessage] = useState("");

  /** @param {Event} event */
  function handleSubmit(event) {
    event.preventDefault();

    //validate name to contain first and last name
  const name = document.getElementById("name").value;
  
  if (!name.includes(" ")) {
    document.getElementById("message").textContent = "Please enter your full name.";
    return;
  }

  //validate email and confirm email to be same
  const email = document.getElementById("email").value.toLowerCase();
  const confirmEmail = document.getElementById("confirmEmail").value.toLowerCase();

  if (email !== confirmEmail) {
    document.getElementById("message").textContent = "Emails do not match.";
    return;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("message").textContent = "Invalid email format.";
    return;
  }

  //validate password and confirm password to be the same and at least 6 characters long
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

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
    setMessage("Account created successfully!");
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
          <option value="organization">Administrator</option>
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
    </div>
  );
}
