let songs = [];
let podcasts = [];
let createAccountContainer = document.getElementById("createAccount");
let userInfoAccount = document.getElementById("userInfo");
let albumsContainer = document.getElementById("AlbumsContainer");
let podcastContainer = document.getElementById("podcastsContainer");
let leftArrow = document.getElementById("leftArrow");
let rightArrow = document.getElementById("rightArrow");
let wrapper = document.getElementById("Albums-wrapper");

let scrollAmount = 0;

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
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://spotify-music-app.azurewebsites.net/getSongs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    songs = await response.json();
  } catch (err) {
    console.log(err);
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://spotify-music-app.azurewebsites.net/getPodcasts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    podcasts = await response.json();
  } catch (err) {
    console.log(err);
  }
});

for (let i = 0; i < songs.length; i++) {
  createsongs(songs[i]);
}
for (let i = 0; i < songs.length; i++) {
  createsongs(songs[i]);
}
for (let i = 0; i < podcasts.length; i++) {
  createPodcasts(podcasts[i]);
}

async function createsongs(album) {
  albumsContainer.innerHTML += `
  <div class="album-card">
      <div class="album-card-image">
            <img src="${album.album_image}">     
      </div>
      <span class="artist-name">${album.artist_name}</span>
  </div>
  `;
}
async function createPodcasts(podcast) {
  podcastContainer.innerHTML += `
  <div class="podcast-card">
      <div class="podcast-card-image">
            <img src="${podcast.podcast_image}">     
      </div>
      <span class="artist-name">${podcast.podcast_name}</span>
  </div>
  `;
}
leftArrow.addEventListener("click", function () {
  let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
  let scrollStep = cardWidth * 2;
  scrollAmount = Math.max(scrollAmount - scrollStep, 0);
  albumsContainer.style.transform = `translateX(${-scrollAmount}px)`;
});

rightArrow.addEventListener("click", function () {
  let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
  let scrollStep = cardWidth * 2;
  scrollAmount = Math.min(
    scrollAmount + scrollStep,
    albumsContainer.clientWidth - wrapper.clientWidth
  );
  albumsContainer.style.transform = `translateX(${-scrollAmount}px)`;
});
