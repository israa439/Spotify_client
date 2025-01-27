import { createAudioPlayer } from "./audio-player.js";
import { getSongs } from "./shared/currentAlbum.js";
import { getSongs as activeSongs } from "./shared/ActiveAlbum.js";
import { displaySong } from "./shared/generatingSong.js";

async function songsPage() {
  let displayedSongs = await getSongs();
  let playedSongs = await activeSongs();
  let artist_name = localStorage.getItem("ViewedArtistName");
  let containerHTML = `
<div class="image-container">
  <img src="${displayedSongs[0].song_image}"/>
  <div class="artist-info-container">
    <h1 class="artist-name-header">${artist_name}</h1>
    <span class="artist-verification">
    <img src="https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fverified.png?alt=media&token=7f81498d-b1fb-46e5-8f4c-2be587b5e91f">
    Verified Artist </span>
  </div>
  <div class="songs-container">
    <h2 class="popular-songs">Popular Songs</h2>
  </div>
</div>

`;

  let container = document.getElementById("variedMain");
  container.innerHTML = containerHTML;
  let songsContainer = document.querySelector(".songs-container");
  for (let index = 0; index < displayedSongs.length; index++) {
    let song = displayedSongs[index];
    let songIndex = index + 1;
    let songHTML = await displaySong(song, songIndex);
    songsContainer.innerHTML += songHTML;
  }
  songsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("player-icon")) {
      let songCard = event.target.closest(".song");
      let index = songCard.getAttribute("data-song-index");

      localStorage.setItem(
        "ActiveAlbum",
        localStorage.getItem("ViewedAlbumId")
      );
      localStorage.setItem(
        "ActiveArtistName",
        localStorage.getItem("ViewedArtistName")
      );

      playedSongs = await activeSongs();

      localStorage.setItem("currentSongUrl", playedSongs[index - 1].song_url);
      localStorage.setItem("songID", playedSongs[index - 1].song_id);
      localStorage.setItem("podcastID", undefined);
      localStorage.setItem("currentTime", 0);
      localStorage.setItem("isPlaying", JSON.stringify(true));
      if (index == 1) {
        localStorage.setItem(
          "previousSongUrl",
          playedSongs[index - 1].song_url
        );
        console.log(playedSongs[index - 1].song_url);
      } else {
        localStorage.setItem(
          "previousSongUrl",
          playedSongs[index - 2].song_url
        );
      }
      if (index == playedSongs.length) {
        localStorage.setItem("nextSongUrl", undefined);
      } else {
        localStorage.setItem("nextSongUrl", playedSongs[index].song_url);
      }

      await createAudioPlayer();
    }
  });
}

export { songsPage };
