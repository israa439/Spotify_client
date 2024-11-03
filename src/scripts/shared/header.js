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
  async function sendRequest() {
    try {
      const response = await fetch("http://localhost:5000/userInfo", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.text();
      if (response.status === 400) {
        logoutHTML.innerHTML = ``;
        createAccountContainer.classList.add("active");
        userInfoAccount.classList.remove("active");
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
    } catch (err) {
      createAccountContainer.classList.add("active");
    }
  }
  setInterval(sendRequest, 28 * 60 * 1000);
  sendRequest();
});
