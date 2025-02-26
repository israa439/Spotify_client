import { removeFromFav } from "./shared/removeFromFav.js";
import { getSongs } from "./shared/currentAlbum.js";
import { getSongs as activeSongs } from "./shared/ActiveAlbum.js";
import { displaySong } from "./shared/generatingSong.js";
import { audioPlaying } from "./shared/playAudio.js";
import { isFav } from "./shared/isFavorite.js";
import { getFavSongs } from "./shared/getFavSongs.js";
import { addToFav } from "./shared/addToFav.js";

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
  container.style.minHeight = "100vh";
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

      audioPlaying(playedSongs, index);
    } else if (event.target.classList.contains("heart-icon")) {

      let songCard = event.target.closest(".song");
      let index = songCard.getAttribute("data-song-index");
      let songUrl = displayedSongs[index - 1].song_url;
      let songID = displayedSongs[index - 1].song_id;

      const pop_up = document.getElementById("favs-pop-up");
      let favSongs = await isFav(songID, songUrl, undefined);
      let favDescription = songCard.querySelector(".description");
      let favIcon = songCard.querySelector(".favs-icon");

      if (favSongs === null) {
         pop_up.innerHTML = `You should sign in first.`;
    
      } else if (favSongs === undefined) {
        console.log("ADDING SONG TO FAVORITES");
        let res = await addToFav(songID, undefined);
        if (res == false) {
          alert("song already added to favorites");
          return;
        }
        pop_up.innerHTML = `Song added to favorites`;
        favDescription.innerHTML = "Remove from favorites";
        favIcon.innerHTML = `<i class="fa-solid fa-heart fa-xl" style="color: #dd0e0e;"></i>`;
        // getFavPodcasts();
        await getFavSongs();
      } else {
        let songCard = event.target.closest(".song");
        let index = songCard.getAttribute("data-song-index");
        let songUrl = displayedSongs[index - 1].song_url;
        let songID = displayedSongs[index - 1].song_id;

        const pop_up = document.getElementById("favs-pop-up");
        let favSongs = await isFav(songID, songUrl, undefined);
        let favDescription = songCard.querySelector(".description");
        let favIcon = songCard.querySelector(".favs-icon");

        let res = await removeFromFav(songID, undefined);
        if (res == false) {
          alert("error adding song to favorites");
          return;
        }

        pop_up.innerHTML = `Song removed from favorites`;
        favDescription.innerHTML = "Add to favorites";
        favIcon.innerHTML = `<i class="fa-regular fa-heart fa-xl" style="color: #978686;"></i>`;
        // getFavPodcasts();
        getFavSongs();
      }

      pop_up.classList.add("active");
      setTimeout(() => {
        pop_up.classList.remove("active");
      }, 5000);
    }
  });
}

export { songsPage };
