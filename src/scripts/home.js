// IMPORTS
import { createAudioPlayer } from "./audio-player.js";
import { navigateTo } from "./shared/change-path.js";
// WHOLE FUNCTIONALITY OF THE HOME PAGE
async function homePage() {
  // CREATING THE BODY
  let mainhtml = `
<h2 class="albums-header wrapper-header">Popular Artists</h2>
<div class="songs-slider outer-slider" id="Albums-wrapper">
  <i class="fa-solid fa-arrow-left leftArrow" id="leftArrow"></i>
  <div class="songs-wrapper inner-wrapper" id="AlbumsContainer"></div>
  <i class="fa-solid fa-arrow-right rightArrow" id="rightArrow"></i>
</div>
<div class="space-div"></div>
<h2 class="podcasts-header wrapper-header">Popular Podcasts</h2>
<div class="podcast-wrapper outer-slider" id="podcast-wrapper">
  <i class="fa-solid fa-arrow-left leftArrow"></i>
  <div class="albums-wrapper inner-wrapper" id="podcastsContainer"></div>
  <i class="fa-solid fa-arrow-right rightArrow"></i>           
</div>
  `;
  let homeMain = document.getElementById("variedMain");

  homeMain.innerHTML = mainhtml;

  // CREATING THE ELEMENTS
  let albumsContainer = document.getElementById("AlbumsContainer");
  let podcastContainer = document.getElementById("podcastsContainer");
  let AlbumsWrapper = document.getElementById("Albums-wrapper");
  let podcastsWrapper = document.getElementById("podcast-wrapper");
  let AlbumscrollAmount = 0;
  let podcastscrollAmount = 0;
  let startX, startTime, endX, endTime, swipeVelocity;

  // FUNCTION TO GET THE ALBUMS FROM BACKEND
  async function getAlbums() {
    try {
      const response = await fetch("http://localhost:5000/getAlbums", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  // FUNCTION TO GET THE PODCASTS FROM BACKEND
  async function getPodcasts() {
    try {
      const response = await fetch("http://localhost:5000/getPodcasts", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
  let Albums = await getAlbums();
  let podcasts = await getPodcasts();

  // CALLING THE FUNCTION TO CREATE THE ALBUMS AND PODCASTS
  for (let i = 0; i < Albums.length; i++) {
    createAlbums(Albums[i]);
  }
  for (let i = 0; i < Albums.length; i++) {
    createAlbums(Albums[i]);
  }
  for (let i = 0; i < Albums.length; i++) {
    createAlbums(Albums[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  // FUNCTION TO CREATE THE ALBUMS
  async function createAlbums(album) {
    albumsContainer.innerHTML += `
  <div class="album-card card" data-album-id="${album.album_id}" >
      <div class="album-card-image card-image">
            <img src="${album.album_image}" class="album-image">  
      </div>
       <i class="fa-solid fa-circle-play songs-player" id="album-play"></i> 
      <span class="artist-name">${album.artist_name}</span>
  </div>
  `;
  }
  // FUNCTION TO CREATE THE PODCASTS
  async function createPodcasts(podcast) {
    podcastContainer.innerHTML += `
  <div class="podcast-card card"  data-podcast-id="${podcast.podcast_id}">
      <div class="podcast-card-image card-image">
            <img src="${podcast.song_image}" class="podcast-image">     
      </div>
      <i class="fa-solid fa-circle-play songs-player podcasts-song-player"></i>
      <span class="artist-name">${podcast.song_name}</span>
  </div>
  `;
  }
  // HANDLING ALL CLICKS ON ALBUMS
  AlbumsWrapper.addEventListener("click", async (event) => {
    let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
    // CHECKING IF THE CLICKED ELEMENT IS LEFT ARROW
    if (event.target.classList.contains("leftArrow")) {
      AlbumscrollAmount = moveLeft(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer,
        handleScreenChangeAlbums(),
        10
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS RIGHT ARROW
    else if (event.target.classList.contains("rightArrow")) {
      AlbumscrollAmount = moveRight(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer,
        AlbumsWrapper,
        handleScreenChangeAlbums(),
        10
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS ALBUM IMAGE
    else if (event.target.classList.contains("album-image")) {
      let albumCard = event.target.closest(".album-card");
      let index = Array.from(albumsContainer.children).indexOf(albumCard);
      if (index > 5) {
        index = index - 6;
      }
      let albumId = albumCard.getAttribute("data-album-id");
      localStorage.setItem("ViewedAlbumId", albumId);
      localStorage.setItem("ViewedArtistName", Albums[index].artist_name);
      navigateTo("/songs");
    }
    // CHECKING IF THE CLICKED ELEMENT IS PLAY ICON
    else if (event.target.classList.contains("songs-player")) {
      let albumCard = event.target.closest(".album-card");
      let index = Array.from(albumsContainer.children).indexOf(albumCard);
      if (index > 5) {
        index = index - 6;
      }
      let albumId = albumCard.getAttribute("data-album-id");
      localStorage.setItem("ActiveArtistName",Albums[index].artist_name)
      localStorage.setItem("ActiveAlbum", albumId);
      localStorage.setItem("songID", Albums[index].songs[0].song_id);
      localStorage.setItem("podcastID", undefined);
      localStorage.setItem("ActiveArtistName", Albums[index].artist_name);
      localStorage.setItem("previousSongUrl", Albums[index].songs[0].song_url);
      localStorage.setItem("currentSongUrl", Albums[index].songs[0].song_url);
      localStorage.setItem("nextSongUrl", Albums[index].songs[1].song_url);
      localStorage.setItem("isPlaying", JSON.stringify(true));
      localStorage.setItem("currentTime", "0");

      await createAudioPlayer();
    }
  });
  // HANDLING ALBUMS WRAPPER TOUCH EVENTS
  albumsContainer.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX; // Get the initial touch position
    startTime = new Date().getTime(); // Get the time of touch start
  });
  albumsContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX; // Get the final touch position
    endTime = new Date().getTime(); // Get the time of touch end

    // Calculate swipe distance and duration
    const swipeDistance = endX - startX;
    const swipeDuration = endTime - startTime;

    // Calculate swipe velocity (distance over time)
    swipeVelocity = swipeDistance / swipeDuration;

    // Apply the swipe effect to the slider
    applySwipeEffect(swipeVelocity, swipeDistance);
  });
  function applySwipeEffect(velocity, distance) {
    const maxSwipeDistance =
      albumsContainer.clientWidth - AlbumsWrapper.clientWidth;

    // Determine the new scroll position based on swipe strength
    let newScrollAmount = Math.min(
      Math.max(-distance * velocity, -maxSwipeDistance),
      0
    );

    // Apply the transition effect based on swipe velocity
    albumsContainer.style.transition = `transform ${Math.abs(
      velocity * 0.3
    )}s ease-out`;
    albumsContainer.style.transform = `translateX(${newScrollAmount}px)`;

    // Reset the transition after the swipe
    setTimeout(() => {
      albumsContainer.style.transition = "";
    }, Math.abs(velocity * 300));
  }
  // HANDLING ALL CLICKS ON PODCASTS
  podcastsWrapper.addEventListener("click", async (event) => {
    let cardWidth = podcastContainer.querySelector(".podcast-card").offsetWidth;
    // CHECKING IF THE CLICKED ELEMENT IS LEFT ARROW
    if (event.target.classList.contains("leftArrow")) {
      podcastscrollAmount = moveLeft(
        cardWidth,
        podcastscrollAmount,
        podcastContainer,
        handleScreenChangePodcasts(),
        10
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS RIGHT ARROW
    else if (event.target.classList.contains("rightArrow")) {
      podcastscrollAmount = moveRight(
        cardWidth,
        podcastscrollAmount,
        podcastContainer,
        podcastsWrapper,
        handleScreenChangePodcasts(),
        10
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS PLAY ICON
    else if (event.target.classList.contains("songs-player")) {
      let podcastCard = event.target.closest(".podcast-card");
      let index = Array.from(podcastContainer.children).indexOf(podcastCard);
      if (index > 5) {
        index = index - 6;
      }
      let podcastId = podcastCard.getAttribute("data-podcast-id");
      localStorage.setItem("ActiveAlbum", podcastId);
      //  podcasts[index].song_name
      localStorage.setItem("podcastID", podcasts[index].podcast_id);
      localStorage.setItem("songID", undefined);
      localStorage.setItem("ActiveArtistName", " ");
      localStorage.setItem("previousSongUrl", undefined);
      localStorage.setItem("currentSongUrl", podcasts[index].song_url);
      localStorage.setItem("nextSongUrl", undefined);
      localStorage.setItem("isPlaying", JSON.stringify(true));
      localStorage.setItem("currentTime", "0");
      localStorage.setItem("podcastImage", podcasts[index].song_image);

      await createAudioPlayer();
    

    }
  });


  // FUNCTION TO MOVE THE SLIDER TO THE LEFT
  function moveLeft(cardWidth, scrollAmount, container, slidesAmount, gap) {
    let scrollStep = (cardWidth + gap) * slidesAmount;
    scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    container.style.transform = `translateX(${-scrollAmount}px)`;

    if (scrollAmount === 0) {
      bounceEffect("left", AlbumsWrapper, container);
    }
    return scrollAmount;
  }
  // FUNCTION TO MOVE THE SLIDER TO THE RIGHT
  function moveRight(
    cardWidth,
    scrollAmount,
    container,
    wrapper,
    slidesAmount,
    gap
  ) {
    let scrollStep = (cardWidth + gap) * slidesAmount;
    let maxScroll = container.clientWidth - wrapper.clientWidth;
    scrollAmount = Math.min(
      scrollAmount + scrollStep,
      container.clientWidth - wrapper.clientWidth
    );
    container.style.transform = `translateX(${-scrollAmount}px)`;
    if (scrollAmount >= maxScroll) {
      bounceEffect("right", podcastsWrapper, container, scrollAmount);
    }
    return scrollAmount;
  }
  // FUNCTION TO HANDLE THE SCREEN CHANGE FOR ALBUMS
  function handleScreenChangeAlbums() {
    const move2 = window.matchMedia("(max-width:720px)");
    const move3 = window.matchMedia("(min-width: 721px) and (max-width:930px)");
    const move4 = window.matchMedia(
      "(min-width: 931px) and (max-width:1130px)"
    );
    const move5 = window.matchMedia("(min-width: 1131px)");
    if (move2.matches) {
      return 2;
    } else if (move3.matches) {
      return 3;
    } else if (move4.matches) {
      return 4;
    } else if (move5.matches) {
      return 5;
    }
  }
  // FUNCTION TO HANDLE THE SCREEN CHANGE FOR PODCASTS
  function handleScreenChangePodcasts() {
    const move2 = window.matchMedia("(max-width:859px)");
    const move3 = window.matchMedia(
      "(min-width: 860px) and (max-width:1114px)"
    );
    const move4 = window.matchMedia(
      "(min-width: 1115px) and (max-width:1380px)"
    );
    const move5 = window.matchMedia("(min-width: 1381px)");
    if (move2.matches) {
      return 2;
    } else if (move3.matches) {
      return 3;
    } else if (move4.matches) {
      return 4;
    } else if (move5.matches) {
      return 5;
    }
  }
  // FUNCTION TO HANDLE THE BOUNCE EFFECT
  function bounceEffect(direction, wrapper, container, scrollAmount) {
    container.style.transition = "transform 1s cubic-bezier(0.25, 1.5, 0.5, 1)";

    if (direction === "left") {
      container.style.transform = `translateX(250px)`;
    } else {
      container.style.transform = `translateX(-${scrollAmount + 250}px)`;
    }

    setTimeout(() => {
      container.style.transition = "transform 0.6s ease-in-out"; // Smooth return
      if (direction === "left") {
        container.style.transform = `translateX(0px)`; // Return to original position
      } else {
        container.style.transform = `translateX(-${scrollAmount}px)`; // Return to max scroll position
      }
    }, 300);
  }
}
await homePage();
export { homePage };
