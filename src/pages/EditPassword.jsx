import { useState } from "preact/hooks";
import { Toast } from "../components/Toast.jsx";

export function EditPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  /** @param {Event} e */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.includes(" ")) {
      setError("Password cannot contain spaces.");
      return;
    } else if (!/[A-Z]/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(newPassword)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    } else if (!/[0-9]/.test(newPassword)) {
      setError("Password must contain at least one number.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError("Password must contain at least one special character.");
      return;
    } else if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const stored = localStorage.getItem("user");
    if (!stored) {
      setError("You must be signed in to change your password.");
      return;
    }

    const user = JSON.parse(stored);

    try {
      const res = await fetch("/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: user.userid,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update password.");
        return;
      }

      setToast(true);
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2500);
    } catch {
      setError("Could not connect to server.");
    }
  }

  return (
    <div class="signup-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onInput={(e) => setCurrentPassword((/** @type {any} */ (e.target)).value)}
          required
        />
        <a style="font-size: 12px;">Password must include at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.</a>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onInput={(e) => setNewPassword((/** @type {any} */ (e.target)).value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onInput={(e) => setConfirmPassword((/** @type {any} */ (e.target)).value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {error && <p id="message">{error}</p>}
      {toast && <Toast message="Password updated successfully!" onClose={() => setToast(false)} />}
    </div>
  );
}
