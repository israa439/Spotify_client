import { IsAuth } from "./isAuthenticated.js";
let headerHTML = `
<div class="create-account" id="createAccount">
  <a href="account.html"><button class="sign-up">Sign Up</button></a>
  <a href="account.html"><button class="log-in">Log In</button></a>
</div>
<div class="user-info" id="userInfo"></div>
`;
let logoutHTML = document.getElementById("logoutContainer");
let header = document.getElementById("homeHeader");
header.innerHTML = headerHTML;
let createAccountContainer = document.getElementById("createAccount");
let userInfoAccount = document.getElementById("userInfo");

document.addEventListener("DOMContentLoaded", async () => {
  setInterval(sendRequest, 28 * 60 * 1000);
  await sendRequest();
});
export async function sendRequest() {
  try {
    const response = await IsAuth();
    let data = await response.text();
    if (response.status === 400) {
      
      logoutHTML.innerHTML = ``;
      createAccountContainer.classList.add("active");
      userInfoAccount.classList.remove("active");
      localStorage.setItem("isAuthenticated", false);
      return;
    }
    logoutHTML.innerHTML = `
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Log Out</span>
      `;

    createAccountContainer.classList.remove("active");
    userInfoAccount.classList.add("active");
    const initials = data
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
    userInfoAccount.innerHTML = `<div class="user-initials">${initials}</div>`;
    localStorage.setItem("isAuthenticated", true);
  } catch (err) {
    createAccountContainer.classList.add("active");
  }
}
