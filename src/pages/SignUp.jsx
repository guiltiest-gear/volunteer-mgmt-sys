import { useState } from "preact/hooks";

export function SignUp() {
  const [message, setMessage] = useState("");

  /** @param {Event} event */
  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Account created successfully!");
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
        <a style="font-size: 8px;">
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
