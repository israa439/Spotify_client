let sideBar = document.getElementById("sideBar");
let logoutContainer = document.getElementById("logoutContainer");
let isResizing = false;
let startX = 0;
let sidebarWidth = 70;

function resizeSidebar(e) {
  if (!isResizing) return;

  let newWidth = sidebarWidth + e.clientX - startX;
  if (newWidth < 170 && sidebarWidth >= 170) {
    newWidth = 70;
  } else if (newWidth > 70 && newWidth<170 && sidebarWidth === 70) {
    newWidth = 170;
  }
  sideBar.style.width = `${newWidth}px`;
}

sideBar.addEventListener("mousedown", (e)=> {
  isResizing = true;
  startX = e.clientX;
  sidebarWidth = sideBar.offsetWidth;
  sideBar.classList.add("resizing");
  e.preventDefault();
});

document.addEventListener("mousemove", resizeSidebar);

document.addEventListener("mouseup",()=> {
  isResizing = false;
  sideBar.classList.remove("resizing");
});


logoutContainer.addEventListener("click",()=>{
  
})