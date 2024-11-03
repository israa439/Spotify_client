let timerInterval;
let flipper = document.getElementById("wrapper");
let flipBack = document.getElementById("flipBack");
let flipFront = document.getElementById("flipFront");
let signupForm = document.getElementById("sign-up-Form");
let signinForm = document.getElementById("sign-in-Form");
let signinspan = document.getElementById("sign-in-error");
let signupspan = document.getElementById("sign-up-error");
let verifierContainer = document.getElementById("verifier-container");

flipBack.addEventListener("click", () => {
  flipper.style.transform = "rotateY(180deg)";
});
flipFront.addEventListener("click", () => {
  flipper.style.transform = "rotateY(0deg)";
});
signinForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById("sign-in-email").value,
    password: document.getElementById("sign-in-password").value,
  };
  try {
    signinspan.innerHTML = " ";

    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let data = await response.text();
    console.log(data);
    if (response.status === 400) {
      if (data == "User not found") {
        signinspan.innerHTML = "Invalid user";
        return;
      }
      signinspan.innerHTML = "your email or password is incorrect";
      return;
    }
    window.location.href = "index.html";
  } catch (error) {
    alert("Error signing in. Please try again.");
  }
});
signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  let formData = {
    username: document.getElementById("sign-up-username").value,
    password: document.getElementById("sign-up-password").value,
    email: document.getElementById("sign-up-email").value,
    fullname: document.getElementById("sign-up-full-name").value,
  };
  if (formData.password.length < 8) {
    signupspan.innerHTML = "Password must be at least 8 characters";
    return;
  } else if (!/\d/.test(formData.password)) {
    signupspan.innerHTML = "Password must contain at least one digit";
    return;
  }
  try {
    signupspan.innerHTML = "";
    let sendEmailresponse = await fetch("http://localhost:5000/sendEmail", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (sendEmailresponse.status === 400) {
      signupspan.innerHTML = "Email already in use";
      return;
    }

    verifierContainer.style.display = "flex";
    startTimer(5 * 60, document.getElementById("timer"));
    document
      .getElementById("verifier-close")
      .addEventListener("click", function () {
        clearInterval(timerInterval);
        document.getElementById("timer").textContent == "";
        document.getElementById("verifier-input").value = "";
        document.getElementById("verifier-error").innerHTML = "";
        verifierContainer.style.display = "none";
      });
    document
      .getElementById("verifier-btn")
      .addEventListener("click", async function () {
        let Data = {
          email: document.getElementById("sign-up-email").value,
          code: document.getElementById("verifier-input").value,
        };
        let verifyResponse = await fetch("http://localhost:5000/verifyEmail", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (verifyResponse.status === 500) {
          alert("Error verifying code. Please try again.");
          return;
        }
        if (verifyResponse.status === 400) {
          document.getElementById("verifier-error").style.color = "red";
          let verified = await verifyResponse.text();
          if (verified == "code expired") {
            document.getElementById("verifier-error").innerHTML =
              "Code Expired";
            return;
          }
          document.getElementById("verifier-error").innerHTML =
            "Code incorrect";
          return;
        }
        if (verifyResponse.ok) {
          document.getElementById("verifier-error").style.color = "green";
          document.getElementById("verifier-error").innerHTML = "Code Verified";
          const signupResponse = await fetch("http://localhost:5000/signup", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (!signupResponse.ok) {
            alert("Error signing up. Please try again.");
          }
          window.location.href = "index.html";
        }
      });
  } catch (error) {
    alert("Error sending verification code. Please try again.");
  }
});
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      display.textContent = "Code expired";
    }
  }, 1000);
}
