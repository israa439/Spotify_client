
let logoutContainer = document.getElementById("logoutContainer");
let sideBar = document.getElementById("sideBar");
let footer = document.getElementById("footerBar");



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
  }else if(newWidth>=350){
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
