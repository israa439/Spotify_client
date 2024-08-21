import { songs } from "./currentAlbum.js";

function createAudioPlayer() {
  let home = document.getElementById("audioPlayerContainer");
  const audioPlayerHTML = ` 
<audio id="audio" controls style="display: none"></audio>
<div class="audio-info-container">
  <div class="audio-image-container">
    <img src="" />
  </div>
  <div class="audio-details">
    <span class="Artist-name">${localStorage.getItem("artistName")}</span>
    <span class="Song-name" id="current-song-name">Artist Name</span>
    <img
      class="add-icon"
      src="https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fadd-icon.png?alt=media&token=30d583f5-8a50-4ca3-a1f5-d67dd062d106"
    />
  </div>
  <div class="playlist-features" id="playlist-features">
    <div class="create-playlist list" id="create-playlist">
      <i class="fa-solid fa-plus"></i>Create Playlist
    </div>
  </div>
  <div class="adding-features" id="adding-features">
    <div class="adding-to-playlist feature" id="add-to-playlist">
      <i class="fa-solid fa-list-ul"></i>Add To your list
    </div>
    <div class="adding-to-favorites feature" id="add-to-favorites">
      <i class="fa-regular fa-heart"></i>Add To Favorites
    </div>
  </div>
</div>
<div class="wrapper">
  <div class="audio-playing">
    <div class="controls">
      <div class="song-control-container toggle-container">
        <span class="autoplay" id="autoplay">
          <description class="description">Autoplay</description>
          <input class="switch" type="checkbox" id="switch" checked/>
        </span>
      </div>
      <div class="song-control-container">
        <span class="previous-song" id="previous-music">
          <description class="description">Previous</description>
          <i class="fa-solid fa-backward-step"></i>
        </span>
      </div>
      <div class="song-control-container">
        <span class="play-music" id="play">
          <description class="description">Play</description>
          <i class="fa-solid fa-circle-play"></i>
        </span>

        <span class="pause-music" id="pause">
          <description class="description">Pause</description>
          <i class="fa-solid fa-pause"></i>
        </span>
      </div>
      <div class="song-control-container">
        <span class="next-song" id="next-music">
          <description class="description">Next</description>
          <i class="fa-solid fa-forward-step"></i>
        </span>
      </div>
      <div class="song-control-container loop-song">
        <span class="repeat-song" id="repeat-music">
          <description class="description">Repeat</description>
          <i class="fa-solid fa-repeat"></i>
        </span>
      </div>
    </div>
    <div class="progress-container">
      <span id="current-time">0:00</span>
      <input
        class="progress-bar"
        type="range"
        id="progress-bar"
        min="0"
        max="100"
        value="0"
      />
      <span id="duration">0:00</span>
    </div>
  </div>
</div>
<div class="exit-audio-player" id="exit-audio-player">
    <i class="fa-regular fa-circle-xmark"></i>
    
</div>

    `;
  home.innerHTML = audioPlayerHTML;

  const audioPlayer = document.getElementById("audio");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeElement = document.getElementById("current-time");
  const durationElement = document.getElementById("duration");
  const songUrl = localStorage.getItem("currentSongUrl");
  const currentTime = localStorage.getItem("currentTime");
  const nextMusic = document.getElementById("next-music");
  const previousMusic = document.getElementById("previous-music");
  const repeatMusic = document.getElementById("repeat-music");
  const autoplayer = document.getElementById("switch");
  const audioImage = document.querySelector(".audio-image-container img");
  const songName = document.getElementById("current-song-name");
  const addToPlaylist = document.getElementById("add-to-playlist");
  const exitAudioPlayer = document.getElementById("exit-audio-player");

  if (songUrl) {
    home.style.display = "flex";
    let isPlaying = JSON.parse(localStorage.getItem("isPlaying"));
    audioPlayer.src = songUrl;
    audioImage.src = getImage(songUrl);
    songName.innerHTML = getSongName(songUrl);
    if (currentTime) {
      audioPlayer.currentTime = parseFloat(currentTime);
    }
    if (isPlaying) {
      audioPlayer.play();
      playButton.style.display = "none";
      pauseButton.style.display = "block";
      audioPlayer.autoplay = true;
      audioPlayer.loop = false;
    } else {
      audioPlayer.pause();
      playButton.style.display = "block";
      pauseButton.style.display = "none";
    }
  }
  // PLAY MUSIC
  function playMusic(songUrl) {
    localStorage.setItem("isPlaying", true);
    audioPlayer.play();
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
  // PLAY NEXT MUSIC
  function playNextMusic() {
    let currentSongUrl = localStorage.getItem("currentSongUrl");
    let currentSongIndex = songs.findIndex(
      (song) => song.song_url === currentSongUrl
    );

    if (currentSongIndex + 1 >= songs.length) {
      localStorage.setItem("nextSongUrl", undefined);
      console.log("No more songs in the queue");
      return;
    }

    let nextSongUrl = songs[currentSongIndex + 1].song_url;
    localStorage.setItem("previousSongUrl", currentSongUrl);
    localStorage.setItem("currentSongUrl", nextSongUrl);
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
    localStorage.setItem("isPlaying", false);
    audioPlayer.pause();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  });
  // SKIP TO NEXT SONG FUNCTIONALITY
  nextMusic.addEventListener("click", playNextMusic);
  // GO BACK TO PREVIOUS SONG FUNCTIONALITY
  previousMusic.addEventListener("click", () => {
    let currentSongUrl = localStorage.getItem("currentSongUrl");
    let currentSongIndex = songs.findIndex(
      (song) => song.song_url === currentSongUrl
    );
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
  // ADD TO PLAYLIST FUNCTIONALITY
  addToPlaylist.addEventListener("mouseover", () => {
    const playlistFeatures = document.getElementById("playlist-features");
    playlistFeatures.style.display = "block";
    playlistFeatures.addEventListener("mouseover", () => {
      playlistFeatures.style.display = "block";
    });
    playlistFeatures.addEventListener("mouseout", () => {
      playlistFeatures.style.display = "none";
    });
  });
  addToPlaylist.addEventListener("mouseout", () => {
    document.getElementById("playlist-features").style.display = "none";
  });
  // UPDATE PROGRESS BAR IN LOCAL STORAGE FUNCTIONALITY
  setInterval(() => {
    const audioPlayer = document.getElementById("audio");
    if (audioPlayer && !audioPlayer.paused) {
      localStorage.setItem("currentTime", audioPlayer.currentTime);
    }
  }, 1000);
}
createAudioPlayer();
export { createAudioPlayer };
