let createAccountContainer = document.getElementById("createAccount");
let userInfoAccount = document.getElementById("userInfo");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5000/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
