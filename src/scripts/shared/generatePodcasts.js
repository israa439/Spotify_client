import { isFav } from "./isFavorite.js";
let description = "Add to favorites";
let favHtml = `<i class="fa-regular fa-heart fa-xl" style="color: #978686;"></i>`;
async function displayPodcast(podcast, podcastIndex) {
  await isFavoriteSong(podcast);
  let songHTML = `
<div class="song" data-song-index="${podcastIndex}">
  <div class="song-left-side">
    <div class="song-player">
      <span class="song-index">${podcastIndex}</span>
      <i class="fa-solid fa-play player-icon"></i>
    </div>
    <div class="song-image">
      <img src="${podcast.podcast_image}" />
    </div>
    <span class="song-name">${podcast.podcast_name}</span>
  </div>
  <div class="song-middle-side">
    <span class="song-plays">${generateRandomNumber()}</span>
  </div>
  <div class="song-right-side">
        <div class="description" id="fav-description">${description}</div>
        <div class="favs-icon" id="fav-icon">
          ${favHtml}
        </div>
    <span class="song-duration"> ${await getSongDuration(
      podcast.podcast_url
    )} </span>
   
  </div>
</div>
    `;
  return songHTML;
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
async function isFavoriteSong(Song) {
  let res = await isFav(Song.podcast_id,undefined,Song.podcast_url);

  if (res) {
    description = "Remove from favorites";
    favHtml = `<i class="fa-solid fa-heart fa-xl" style="color: #dd0e0e;"></i>`;
  }
}

export { displayPodcast };
