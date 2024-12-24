import { getSongs } from "./shared/ActiveAlbum.js";
import { getpodcasts } from "./shared/getPodcasts.js";
import { addToFav } from "./shared/addToFav.js";
let updateInterval;
let songs;
let songUrl = localStorage.getItem("currentSongUrl");
const nextMusic = document.getElementById("next-music");
const previousMusic = document.getElementById("previous-music");
const repeatMusic = document.getElementById("repeat-music");
const autoplayer = document.getElementById("switch");
const audioImage = document.querySelector(".audio-image-container img");
const songName = document.getElementById("current-song-name");
const exitAudioPlayer = document.getElementById("exit-audio-player");
const artistName = document.getElementById("Artist-name");
const home = document.getElementById("audioPlayerContainer");
const audioPlayer = document.getElementById("audio");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

const addSong = document.getElementById("add-to-favorites");
// ADD SONG FUNCTIONALITY
addSong.addEventListener("click", async () => {
  addToFav();
});
//SETTING ISPLAYING TO FALSE WHEN USER REFRESHES THE PAGE
window.addEventListener("beforeunload", () => {
  localStorage.setItem("isPlaying", JSON.stringify(false));
});
// PLAY MUSIC
function playMusic(songUrl) {
  localStorage.setItem("isPlaying", JSON.stringify(true));
  audioPlayer.load();
  audioPlayer.play();
  audioPlayer.currentTime = parseFloat(localStorage.getItem("currentTime"));
  playButton.style.display = "none";
  pauseButton.style.display = "block";
  audioImage.src = getImage(songUrl);
  songName.innerHTML = getSongName(songUrl);
}
// GET IMAGE OF CURRENT SONG
function getImage(songUrl) {
  let song = songs.find((song) => song.song_url === songUrl);
  return song.song_image;
}
// GET SONG NAME OF CURRENT SONG
function getSongName(songUrl) {
  let song = songs.find((song) => song.song_url === songUrl);
  return song.song_name;
}
// GET IMAGE OF CURRENT PODCAST
function getPodcastImage(songUrl) {
  const index = songs.findIndex((song) => song.song_url === songUrl);
  return songs[index].song_image;
}
// GET SONG NAME OF CURRENT PODCAST
function getPodcastName(songUrl) {
  const index = songs.findIndex((song) => song.song_url === songUrl);
  return songs[index].song_name;
}
// PLAY NEXT MUSIC
function playNextMusic() {
  let songID = localStorage.getItem("songID");
  let currentSongUrl = localStorage.getItem("currentSongUrl");
  let currentSongIndex = -1;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].song_id === songID) {
      currentSongIndex = i;
      break;
    }
  }

  if (currentSongIndex + 1 >= songs.length) {
    localStorage.setItem("nextSongUrl", undefined);
    console.log("No more songs in the queue");
    return;
  }
  let nextSongUrl = songs[currentSongIndex + 1].song_url;
  localStorage.setItem("previousSongUrl", currentSongUrl);
  localStorage.setItem("currentSongUrl", nextSongUrl);
  localStorage.setItem("songID", songs[currentSongIndex + 1].song_id);
  localStorage.setItem("currentTime", 0);

  localStorage.setItem(
    "nextSongUrl",
    currentSongIndex + 2 < songs.length
      ? songs[currentSongIndex + 2].song_url
      : undefined
  );

  audioPlayer.src = localStorage.getItem("currentSongUrl");

  playMusic(localStorage.getItem("currentSongUrl"));
}
// PLAY BUTTON FUNCTIONALITY
playButton.addEventListener("click", () => {
  playMusic(localStorage.getItem("currentSongUrl"));
});

// PAUSE BUTTON FUNCTIONALITY
pauseButton.addEventListener("click", () => {
  localStorage.setItem("isPlaying", JSON.stringify(false));
  audioPlayer.pause();
  playButton.style.display = "block";
  pauseButton.style.display = "none";
});
// SKIP TO NEXT SONG FUNCTIONALITY
nextMusic.addEventListener("click", playNextMusic);
// GO BACK TO PREVIOUS SONG FUNCTIONALITY
previousMusic.addEventListener("click", () => {
  let songID = localStorage.getItem("songID");
  let currentSongUrl = localStorage.getItem("currentSongUrl");
  let currentSongIndex = -1;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].song_id === songID) {
      currentSongIndex = i;
      break;
    }
  }
  console.log(currentSongIndex);

  if (currentSongIndex - 1 < 0) {
    localStorage.setItem("previousSongUrl", songs[0].song_url);
    audioPlayer.src = localStorage.getItem("currentSongUrl");
    playMusic(localStorage.getItem("currentSongUrl"));
    console.log("No more songs in the queue");
    return;
  }
  let previousSongUrl = songs[currentSongIndex - 1].song_url;
  localStorage.setItem("nextSongUrl", currentSongUrl);
  localStorage.setItem("currentSongUrl", previousSongUrl);
  localStorage.setItem("currentTime", 0);
  localStorage.setItem("songID", songs[currentSongIndex - 1].song_id);
  localStorage.setItem(
    "previousSongUrl",
    currentSongIndex - 2 >= 0
      ? songs[currentSongIndex - 2].song_url
      : songs[0].song_url
  );
  audioPlayer.src = localStorage.getItem("currentSongUrl");
  playMusic(localStorage.getItem("currentSongUrl"));
});
// LOOP SONG FUNCTIONALITY
repeatMusic.addEventListener("click", () => {
  let isLooping = audioPlayer.loop;
  audioPlayer.loop = !isLooping;
  localStorage.setItem("isLooping", !isLooping);
  let storedLoopStatus = localStorage.getItem("isLooping") === "true";
  audioPlayer.loop = storedLoopStatus;
  if (storedLoopStatus) {
    repeatMusic.querySelector("i").style.color = "white";
    audioPlayer.autoplay = false;
    autoplayer.checked = false;
  } else {
    repeatMusic.querySelector("i").style.color = "rgba(151, 134, 134, 0.454)";
  }
});
// AUTOPLAY SONGS FUNCTIONALITY
autoplayer.addEventListener("click", () => {
  let isAutoplaying = audioPlayer.autoplay;
  audioPlayer.autoplay = !isAutoplaying;
  localStorage.setItem("isAutoplaying", !isAutoplaying);
  let storedAutoplayStatus = localStorage.getItem("isAutoplaying") === "true";
  audioPlayer.autoplay = storedAutoplayStatus;
  if (storedAutoplayStatus) {
    repeatMusic.querySelector("i").style.color = "rgba(151, 134, 134, 0.454)";
    audioPlayer.loop = false;
  }
});
audioPlayer.addEventListener("ended", () => {
  if (audioPlayer.autoplay) {
    playNextMusic();
  }
});
// START PLAYING SONG FUNCTIONALITY
audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  if (!isNaN(duration)) {
    const value = (currentTime / duration) * 100;

    progressBar.style.setProperty("--value", value);
    progressBar.value = value;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeElement.textContent = `${currentMinutes}:${
      currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
    }`;
    durationElement.textContent = `${durationMinutes}:${
      durationSeconds < 10 ? "0" + durationSeconds : durationSeconds
    }`;
  }
});
// EXIT AUDIO PLAYER FUNCTIONALITY
exitAudioPlayer.addEventListener("click", () => {
  localStorage.removeItem("currentTime");
  localStorage.removeItem("currentSongUrl");
  localStorage.removeItem("nextSongUrl");
  localStorage.removeItem("previousSongUrl");
  home.style.display = "none";
  audioPlayer.pause();
});

// PROGRESS BAR FUNCTIONALITY
progressBar.addEventListener("input", () => {
  const value = progressBar.value;
  progressBar.style.setProperty("--value", value);
  audio.currentTime = (value / 100) * audio.duration;
});
// FOR LAPTOPS AND DESKTOPS
progressBar.addEventListener("mousedown", () => {
  progressBar.classList.add("thumb-active");
});

progressBar.addEventListener("mouseup", () => {
  progressBar.classList.remove("thumb-active");
});

// FOR TOUCH DEVICES
progressBar.addEventListener("touchstart", () => {
  progressBar.classList.add("thumb-active");
});

progressBar.addEventListener("touchend", () => {
  progressBar.classList.remove("thumb-active");
});

// END OF AUDIO FUNCTIONALITY
audio.addEventListener("ended", () => {
  artistName.innerHTML = localStorage.getItem("artistName");
});

async function createAudioPlayer() {
  clearInterval(updateInterval);
  let isPodcast = localStorage.getItem("ActiveAlbum")?.startsWith("1");
  songs = isPodcast ? await getpodcasts() : await getSongs();
  songUrl = localStorage.getItem("currentSongUrl");
  home.style.display = "flex";
  let isPlaying = JSON.parse(localStorage.getItem("isPlaying"));
  let podcastid = localStorage.getItem("ActiveAlbum");
  isPodcast = podcastid.startsWith("1");

  nextMusic.disabled = isPodcast;
  previousMusic.disabled = isPodcast;
  autoplayer.disabled = isPodcast;
  autoplayer.checked = !isPodcast;
  if (isPodcast) {
    autoplayer.classList.add("not-Active");
    nextMusic.querySelector("i").style.color = "rgba(197, 192, 192, 0.731)";
    previousMusic.querySelector("i").style.color = "rgba(197, 192, 192, 0.731)";
  } else {
    autoplayer.classList.remove("not-Active");
    nextMusic.querySelector("i").style.color = "#fff";
    previousMusic.querySelector("i").style.color = "#fff";
  }
  nextMusic.style.cursor = isPodcast ? "not-allowed" : "pointer";
  previousMusic.style.cursor = isPodcast ? "not-allowed" : "pointer";
  autoplayer.style.cursor = isPodcast ? "not-allowed" : "pointer";

  audioPlayer.src = songUrl;
  audioImage.src = isPodcast ? getPodcastImage(songUrl) : getImage(songUrl);
  songName.innerHTML = isPodcast
    ? getPodcastName(songUrl)
    : getSongName(songUrl);
  artistName.innerHTML = isPodcast
    ? " "
    : localStorage.getItem("ActiveArtistName");

  audioPlayer.src = songUrl;
  audioImage.src = getImage(songUrl);
  songName.innerHTML = getSongName(songUrl);
  artistName.innerHTML = localStorage.getItem("ActiveArtistName");

  if (isPlaying) {
    audioPlayer.play();
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    audioPlayer.autoplay = true;
    audioPlayer.loop = false;
    audioPlayer.currentTime = parseFloat(localStorage.getItem("currentTime"));
  } else {
    audioPlayer.pause();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  }

  // UPDATE PROGRESS BAR IN LOCAL STORAGE FUNCTIONALITY
  updateInterval = setInterval(() => {
    const audioPlayer = document.getElementById("audio");
    if (audioPlayer && !audioPlayer.paused) {
      localStorage.setItem("currentTime", audioPlayer.currentTime);
    }
  }, 1000);
}
if (localStorage.getItem("currentSongUrl")) {
  createAudioPlayer();
}
export { createAudioPlayer };
