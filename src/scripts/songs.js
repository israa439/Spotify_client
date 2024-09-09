import { createAudioPlayer } from "./audio-player.js";
import { getSongs } from "./shared/currentAlbum.js";

async function songsPage() {
  let songs = await getSongs();
  let artist_name = localStorage.getItem("artistName");
  let containerHTML = `
<div class="image-container">
  <img src="${songs[0].song_image}"/>
  <div class="artist-info-container">
    <h1 class="artist-name">${artist_name}</h1>
    <span class="artist-verification">
    
    <img src="https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fverified.png?alt=media&token=7f81498d-b1fb-46e5-8f4c-2be587b5e91f">
    Verified Artist </span>
  </div>
  <div class="songs-container">
    <h2 class="popular-songs">Popular Songs</h2>
  </div>
</div>

`;
  let container = document.getElementById("homeMain");
  container.innerHTML = containerHTML;
  let songsContainer = document.querySelector(".songs-container");
  for (let index = 0; index < songs.length; index++) {
    let song = songs[index];
    let songIndex = index + 1;
    let songHTML = `
<div class="song" data-song-id="${songIndex}">
  <div class="song-left-side">
    <div class="song-player">
      <span class="song-index">${songIndex}</span>
      <i class="fa-solid fa-play player-icon"></i>
    </div>
    <div class="song-image">
      <img src="${song.song_image}" />
    </div>
    <span class="song-name">${song.song_name}</span>
  </div>
  <div class="song-middle-side">
    <span class="song-plays">${generateRandomNumber()}</span>
  </div>
  <div class="song-right-side">
    <i class="fa-regular fa-heart add-to-favorites"></i>
    <span class="song-duration"> ${await getSongDuration(song.song_url)} </span>
    <i class="fa-solid fa-ellipsis-h song-options"></i>
  </div>
</div>
    `;
    songsContainer.innerHTML += songHTML;
  }
  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * (15000000 - 100000) + 100000);
    return randomNumber.toLocaleString();
  }
  async function getSongDuration(url) {
    let audio = new Audio();
    try {
      audio.src = url;
      await new Promise((resolve, reject) => {
        audio.addEventListener("loadedmetadata", resolve);
        audio.addEventListener("error", reject);
      });
      let duration = audio.duration;
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } catch (error) {
      console.error("Error loading audio file:", error);
    }
  }
  songsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("player-icon")) {
      let songCard = event.target.closest(".song");
      let index = songCard.getAttribute("data-song-id");
      localStorage.setItem("currentSongUrl", songs[index - 1].song_url);
      localStorage.setItem("currentTime", 0);
      localStorage.setItem("isPlaying", JSON.stringify(true));
      if (index == 1) {
        localStorage.setItem("previousSongUrl", songs[index - 1].song_url);
      } else {
        localStorage.setItem("previousSongUrl", songs[index - 2].song_url);
      }
      if (index == songs.length) {
        localStorage.setItem("nextSongUrl", undefined);
      } else {
        localStorage.setItem("nextSongUrl", songs[index].song_url);
      }

      await createAudioPlayer();
    }
  });
}

export { songsPage };
