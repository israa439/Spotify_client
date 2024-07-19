let createAccountContainer = document.getElementById("createAccount");
let userInfoAccount = document.getElementById("userInfo");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://spotify-server-76gp.onrender.com/userInfo",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let data = await response.text();
    console.log(data);
    if (response.status === 400) {
      createAccountContainer.classList.add("active")
      userInfoAccount.classList.remove("active")
      return
    }
    userInfoAccount.classList.add("active")
    createAccountContainer.classList.remove("active")
    
  } catch (err) {}
});
