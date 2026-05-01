/*
  We will need to change the alerts later on, but this is how it will work in the development stage.
*/

//page navigation
function navigate(page) {
  alert("Navigating to " + page);
}
//function to access profile
function profile() {
  alert("Opening profile...");
}
//sign out function
function signOut() {
  //prompt user to confirm logout
  const confirmLogout = confirm("Are you sure you want to sign out?");
  if (confirmLogout) {
    alert("Signed out!");
  }
}
