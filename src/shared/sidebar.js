let sideBarHtml = `
   <div class="upper-side-bar">
        <div class="logo">
          <i class="fa-brands fa-spotify"></i>
        </div>
        <div class="icon-subtitles" id="homeContainer">
          <a href="index.html"><i class="fa-solid fa-house"></i></a>
          <span>Home</span>
        </div>
        <div class="icon-subtitles" id="searchContainer">
          <i class="fa-solid fa-search"></i>
          <span>Search</span>
        </div>
      </div>
      <div class="lower-side-bar">
        <div class="saving-songs">
          <div class="icon-subtitles" id="playListContainer">
            <a href="list.html"><i class="fa-solid fa-list-ul"></i></a>
            <span>Play List</span>
          </div>
          <div class="icon-subtitles" id="favoritesContainer">
            <a href="favorites.html"><i class="fa-solid fa-heart"></i></a>
            <span>Favorites</span>
          </div>
        </div>
        <div class="icon-subtitles" id="logoutContainer">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Log Out</span>
        </div>
      </div>
      `;
let footerHTML = `
     <a href="index.html"><i class="fa-solid fa-house"></i></a>
     <i class="fa-solid fa-search"></i>
     <a href="list.html"><i class="fa-solid fa-list-ul"></i></a>
     <a href="favorites.html"><i class="fa-solid fa-heart"></i></a>
     <i class="fa-solid fa-right-from-bracket"></i>

`;
let logoutContainer = document.getElementById("logoutContainer");
let sideBar = document.getElementById("sideBar");
let footer = document.getElementById("footerBar");
sideBar.innerHTML = sideBarHtml;
footer.innerHTML = footerHTML;

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
  }
  sideBar.style.width = `${newWidth}px`;
  let albumsContainer = document.getElementById("AlbumsContainer");
  if (!albumsContainer) return;
  let wrapper = document.getElementById("Albums-wrapper");
  let temp =
    albumsContainer.getBoundingClientRect().right -
    wrapper.getBoundingClientRect().right;
  if (temp < 0) {
    albumsContainer.style.transform = `translateX(${
      -(albumsContainer.clientWidth - wrapper.clientWidth)
    }px)`;
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
