import { homePage } from "../home.js";
import { songsPage } from "../songs.js";
const homeIcon = document.getElementById("home-page-icon");
const homeHeader = document.getElementById("home-page-subtitle");

window.addEventListener("DOMContentLoaded", () => {
  router(window.location.pathname);
});

function navigateTo(path) {
  // Change the URL without reloading the page
  window.history.pushState({}, path, window.location.origin + path);

  // Load the appropriate content
  router(path.trim());
}

homeHeader.addEventListener("click", () => {
  navigateTo("/home");
});
homeIcon.addEventListener("click", () => {
  navigateTo("/home");
});

function router(path) {
  if (path === "/home") {
    console.log("Home Page");
    homePage();
  } else if (path === "/songs") {
    songsPage();
  } 
}
window.onpopstate = router;

// Initial route on page load
router();

export { navigateTo };
