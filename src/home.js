document.addEventListener("DOMContentLoaded", async () => {
  let albumsContainer = document.getElementById("AlbumsContainer");
  let podcastContainer = document.getElementById("podcastsContainer");
  let leftArrow = document.querySelectorAll(".leftArrow");
  let rightArrow = document.querySelectorAll(".rightArrow");
  let AlbumsWrapper = document.getElementById("Albums-wrapper");
  let podcastsWrapper = document.getElementById("podcast-wrapper");
  let AlbumscrollAmount = 0;
  let podcastscrollAmount = 0;

  async function getAlbums() {
    try {
      const response = await fetch(
        "https://spotify-web-app.azurewebsites.net/getAlbums",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  async function getPodcasts() {
    try {
      const response = await fetch(
        "https://spotify-web-app.azurewebsites.net/getPodcasts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
    let songs = await getAlbums();
    let podcasts = await getPodcasts();

  for (let i = 0; i < songs.length; i++) {
    createAlbums(songs[i]);
  }
  for (let i = 0; i < songs.length; i++) {
    createAlbums(songs[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  async function createAlbums(album) {
    albumsContainer.innerHTML += `
  <div class="album-card card" data-album-id="${album.album_id}" >
      <div class="album-card-image">
            <img src="${album.album_image}" class="album-image">  
      </div>
       <i class="fa-solid fa-circle-play songs-player"></i> 
      <span class="artist-name">${album.artist_name}</span>
  </div>
  `;
  }
  async function createPodcasts(podcast) {
    podcastContainer.innerHTML += `
  <div class="podcast-card card"  data-podcast-id="${podcast.podcast_id}">
      <div class="podcast-card-image">
            <img src="${podcast.podcast_image}" class="podcast-image">     
      </div>
      <i class="fa-solid fa-circle-play podcasts-player"></i>
      <span class="artist-name">${podcast.podcast_name}</span>
  </div>
  `;
  }

  AlbumsWrapper.addEventListener("click", (event) => {
    let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
    if (event.target.classList.contains("leftArrow")) {
      AlbumscrollAmount = moveLeft(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer
      );
    } else if (event.target.classList.contains("rightArrow")) {
      AlbumscrollAmount = moveRight(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer,
        AlbumsWrapper
      );
    } else if (event.target.classList.contains("album-image")) {
      let albumCard = event.target.closest(".album-card");
      let albumId = albumCard.getAttribute("data-album-id");
      sessionStorage.setItem("albumId", albumId);
      window.location.href = "songs.html";
    }
  });
  podcastsWrapper.addEventListener("click", (event) => {
    let cardWidth = podcastContainer.querySelector(".podcast-card").offsetWidth;
    if (event.target.classList.contains("leftArrow")) {
      podcastscrollAmount = moveLeft(
        cardWidth,
        podcastscrollAmount,
        podcastContainer
      );
    } else if (event.target.classList.contains("rightArrow")) {
      podcastscrollAmount = moveRight(
        cardWidth,
        podcastscrollAmount,
        podcastContainer,
        podcastsWrapper
      );
    }
  });
  AlbumsWrapper.addEventListener("mouseover", playMusic);
  podcastsWrapper.addEventListener("mouseover", playMusic);

  async function playMusic() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const playIcon = card.querySelector(".fa-circle-play");
      card.addEventListener("mouseover", () => {
        playIcon.style.visibility = "visible";
      });
      card.addEventListener("mouseout", () => {
        playIcon.style.visibility = "hidden";
      });
    });
  }
  function moveLeft(cardWidth, scrollAmount, container) {
    let scrollStep = cardWidth * 2;
    scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    container.style.transform = `translateX(${-scrollAmount}px)`;
    return scrollAmount;
  }
  function moveRight(cardWidth, scrollAmount, container, wrapper) {
    let scrollStep = cardWidth * 2;
    scrollAmount = Math.min(
      scrollAmount + scrollStep,
      container.clientWidth - wrapper.clientWidth
    );
    container.style.transform = `translateX(${-scrollAmount}px)`;
    return scrollAmount;
  }
});
