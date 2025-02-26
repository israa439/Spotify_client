import { navigateTo } from "./change-path.js";
let homeIcon = document.getElementById("footer-home-page-icon");
let favsIcon = document.getElementById("footer-favoritesContainer");
let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
console.log(isAuth);
let logoutBtn = document.getElementById("logout-btn");
homeIcon.addEventListener("click", () => {
  navigateTo("/home");
});
favsIcon.addEventListener("click", () => {
  navigateTo("/favorites");
});
if (!isAuth) {
  console.log("not authenticated");
  logoutBtn.style.display = "none";
}
