import { navigateTo } from "./change-path.js";
import { sendRequest } from "./header.js";
let logoutContainer = document.getElementById("logoutContainer");
let logoutModal = document.getElementById("logoutModal");
let logoutNo = document.getElementById("logout-no");
let logoutYes = document.getElementById("logout-yes");
let sideBar = document.getElementById("sideBar");
let logoutBtn = document.getElementById("logout-btn");

let isResizing = false;
let startX = 0;
let sidebarWidth = 70;

function resizeSidebar(e) {
  if (!isResizing) return;

  let newWidth = sidebarWidth + e.clientX - startX;
  if (newWidth < 170 && sidebarWidth >= 170) {
    newWidth = 70;
  } else if (newWidth > 70 && newWidth < 170 && sidebarWidth === 70) {
    newWidth = 170;
  } else if (newWidth >= 350) {
    newWidth = 350;
  }
  sideBar.style.width = `${newWidth}px`;
  let albumsContainer = document.getElementById("AlbumsContainer");
  if (!albumsContainer) return;
  let wrapper = document.getElementById("Albums-wrapper");
  let temp =
    albumsContainer.getBoundingClientRect().right -
    wrapper.getBoundingClientRect().right;
  if (temp < 0) {
    albumsContainer.style.transform = `translateX(${-(
      albumsContainer.clientWidth - wrapper.clientWidth
    )}px)`;
  }
}

sideBar.addEventListener("mousedown", (e) => {
  isResizing = true;
  startX = e.clientX;
  sidebarWidth = sideBar.offsetWidth;
  sideBar.classList.add("resizing");
  e.preventDefault();
});

document.addEventListener("mousemove", resizeSidebar);

sideBar.addEventListener("mouseup", () => {
  isResizing = false;
  sideBar.classList.remove("resizing");
});
logoutBtn.addEventListener("click", () => {
  logoutModal.style.display = "flex";
});
logoutContainer.addEventListener("click", async () => {
  logoutModal.style.display = "flex";
});

logoutNo.addEventListener("click", () => {
  logoutModal.style.display = "none";
});
logoutYes.addEventListener("click", async () => {
  const response = fetch("https://spotify-web-app.azurewebsites.net/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response;
  console.log(data);
  localStorage.clear();
  navigateTo("/home");
  logoutModal.style.display = "none";
  await sendRequest();
});
