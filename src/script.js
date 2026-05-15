//function to navigate pages
function navigate(page) {
  window.location.href = page;
}

//function to access profile
function profile() {
  alert("Opening profile...");
  window.location.href = "myProfileDemo.html";
}

//sign out function
function signOut() {
  const confirmLogout = confirm("Are you sure you want to sign out?");
  if (confirmLogout) {
    alert("Signed out!");
    window.location.href = "guestDemo.html";
  }
}
