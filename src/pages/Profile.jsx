import { useState, useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

export function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const { route } = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function handleEmailSave() {
    setEmailError("");
    setEmailSuccess("");
    if (!newEmail) {
      setEmailError("Please enter a new email.");
      return;
    }
    try {
      const res = await fetch('/api/update-email', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: (/** @type {any} */ (user)).userid, email: newEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error || "Failed to update email.");
        return;
      }
      const updated = { ...(/** @type {any} */ (user)), email: newEmail };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setEditingEmail(false);
      setNewEmail("");
      setEmailSuccess("Email updated successfully.");
    } catch {
      setEmailError("Could not connect to server.");
    }
  }

  if (loading) {
    return <div class="profile-container"><p>Loading...</p></div>;
  }

  if (!user) {
    return (
      <div class="profile-container">
        <h2>Access Denied</h2>
        <p>Please sign in to view your profile.</p>
        <button onClick={() => window.location.href = "/signin"} class="btn">Sign In</button>
      </div>
    );
  }

  return (
    <div class="profile-container">
      <h2>User Profile</h2>
      <div class="profile-info">
        {(/** @type {{userid: number, full_name: string, email: string, role: string}} */ (user)) && (
          <>
            <div class="profile-field">
              <label>Name:</label>
              <p>{(/** @type {any} */ (user)).full_name}</p>
            </div>
            <div class="profile-field">
              <label>Email:</label>
              <div class="profile-field-value">
                <p>{(/** @type {any} */ (user)).email}</p>
                <button class="change-link" onClick={() => { setEditingEmail(!editingEmail); setEmailError(""); setEmailSuccess(""); }}>
                  Change email
                </button>
              </div>
              {editingEmail && (
                <div class="inline-edit">
                  <input
                    type="email"
                    value={newEmail}
                    onInput={(e) => setNewEmail((/** @type {any} */ (e.target)).value)}
                    placeholder="New email address"
                  />
                  <button class="btn-save" onClick={handleEmailSave}>Save</button>
                  <button class="btn-cancel" onClick={() => { setEditingEmail(false); setEmailError(""); setNewEmail(""); }}>Cancel</button>
                  {emailError && <p class="field-error">{emailError}</p>}
                </div>
              )}
              {emailSuccess && <p class="field-success">{emailSuccess}</p>}
            </div>
            <div class="profile-field">
              <label>Password:</label>
              <div class="profile-field-value">
                <p>••••••••</p>
                <button class="change-link" onClick={() => route("/password/change")}>
                  Change password
                </button>
              </div>
            </div>
            <div class="profile-field">
              <label>Role:</label>
              <p>{(/** @type {any} */ (user)).role}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
