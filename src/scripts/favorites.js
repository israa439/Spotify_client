// IMPORTS
import { navigateTo } from "./shared/change-path.js";
import { displaySong } from "./shared/generatingSong.js";
import { getFavSongs } from "./shared/getFavSongs.js";
import { getFavPodcasts } from "./shared/getFavPodcasts.js";
import { displayPodcast } from "./shared/generatePodcasts.js";
let song_options;
let isAuth = false;
async function isAuthenticated() {
  try {
    const response = await fetch("http://localhost:5000/getFavoriteSongs", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (response.status === 400) {
      isAuth = false;
      return;
    }
    isAuth = true;
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function favouritesPage() {
  let container = document.getElementById("variedMain");
  let data = await isAuthenticated();

  if (isAuth == false) {
    let containerHTML = `
        <div class="fav-container-unauth">
            <h1 class="display-text">Nothing to display.</h1>
            <h2 class="auth-text">Create account or sign in to save favorite songs.</h2>
        </div>
 
        `;
    container.innerHTML = containerHTML;
    return;
  }
  let favSongs = await getFavSongs();
  let favPodcasts = await getFavPodcasts();
  if (favSongs.length > 0) {
    let containerHTML = `
    <h1 class="fav-song-header">Favorite Songs:</h1>
    <div class="fav-song-container" id="fav-song-container"></div>`;
    container.innerHTML = containerHTML;
    await favSongsStructure();
  }
  if (favPodcasts.length > 0) {
    let containerHTML = `
      <h1 class="fav-podcast-header">Favorite Podcasts:</h1>
      <div class="fav-podcast-container" id="fav-podcast-container"></div>`;
    container.innerHTML += containerHTML;
    await favPodcastsStructure();
  }
  song_options = document.querySelectorAll(".song-options");
  song_options.forEach((option) => {
    option.addEventListener("click", () => {
      console.log(option);
      const songIndex = option.getAttribute("data-song-id");
      console.log(songIndex);
    });
  });
}
async function favSongsStructure() {
  let favSongContainer = document.getElementById("fav-song-container");
  let favSongs = await getFavSongs();
  for (let i = 0; i < favSongs.length; i++) {
    let song = favSongs[i];
    let songIndex = i + 1;
    let songHTML = await displaySong(song, songIndex);
    favSongContainer.innerHTML += songHTML;
  }
}
async function favPodcastsStructure() {
  let favPodcastContainer = document.getElementById("fav-podcast-container");
  let favPodcasts = await getFavPodcasts();
  for (let i = 0; i < favPodcasts.length; i++) {
    let podcast = favPodcasts[i];
    let podcastIndex = i + 1;
    let podcastHTML = await displayPodcast(podcast, podcastIndex);
    favPodcastContainer.innerHTML += podcastHTML;
  }
}
// song_options.addEventListener("click", () => {
//   console.log("clicked");
// });
export { favouritesPage };
