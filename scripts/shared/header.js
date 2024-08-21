let headerHTML = `
        <div class="create-account" id="createAccount">
          <a href="account.html"><button class="sign-up">Sign Up</button></a>
          <a href="account.html"><button class="log-in">Log In</button></a>
        </div>
        <div class="user-info" id="userInfo">asa</div>
`;
let header = document.getElementById("homeHeader");
header.innerHTML = headerHTML;
let createAccountContainer = document.getElementById("createAccount");
let userInfoAccount = document.getElementById("userInfo");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://spotify-music-app.azurewebsites.net/userInfo",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let data = await response.text();
    if (response.status === 400) {
      createAccountContainer.classList.add("active");
      userInfoAccount.classList.remove("active");
      return;
    }
    userInfoAccount.classList.add("active");
    createAccountContainer.classList.remove("active");
  } catch (err) {
    createAccountContainer.classList.add("active");
  }
});

