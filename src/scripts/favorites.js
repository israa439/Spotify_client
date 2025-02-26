// IMPORTS
import { IsAuth } from "./shared/isAuthenticated.js";
import { displaySong } from "./shared/generatingSong.js";
import { displayPodcast } from "./shared/generatePodcasts.js";
import { audioPlaying } from "./shared/playAudio.js";
import { getFavSongs } from "./shared/getFavSongs.js";
import { isFav } from "./shared/isFavorite.js";
import { removeFromFav } from "./shared/removeFromFav.js";

let isAuth = false;
let favSongContainer;
let favPodcastContainer;
async function favouritesPage() {
  const response = await IsAuth();
  if (response.status === 400) {
    isAuth = false;
  } else {
    isAuth = true;
  }
  let container = document.getElementById("variedMain");
  container.style.height = "auto";
  container.style.minHeight = "initial";

  if (isAuth == false) {
    let containerHTML = `
        <div class="fav-container-unauth">
            <h1 class="display-text">Nothing to display.</h1>
            <h2 class="auth-text">Create an account or sign in to save favorite songs.</h2>
        </div>
        `;
    container.innerHTML = containerHTML;
    return;
  }
  let favSongs = JSON.parse(localStorage.getItem("favSongs"));
  let favPodcasts = JSON.parse(localStorage.getItem("favPodcasts"));

  if (favSongs.length > 0) {
    let containerHTML = `
    <h1 class="fav-song-header">Favorite Songs:</h1>
    <div class="fav-song-container" id="fav-song-container"></div>`;
    container.innerHTML = containerHTML;
    favSongContainer = document.getElementById("fav-song-container");

    await favSongsStructure();
  }
  if (favPodcasts.length > 0) {
    let containerHTML = `
      <h1 class="fav-podcast-header">Favorite Podcasts:</h1>
      <div class="fav-podcast-container" id="fav-podcast-container"></div>`;
    container.innerHTML += containerHTML;
    favPodcastContainer = document.getElementById("fav-podcast-container");
    await favPodcastsStructure();
  }
  container.addEventListener("click", async (event) => {
    if (event.target.closest(".fav-song-container")) {
      if (event.target.closest(".player-icon")) {
        let songCard = event.target.closest(".song");
        let index = songCard.getAttribute("data-song-index");
        localStorage.setItem("ActiveAlbum", null);

        let Favsongs = JSON.parse(localStorage.getItem("favSongs"));
        let Favpodcasts = JSON.parse(localStorage.getItem("favPodcasts"));
        let renamedPodcasts = Favpodcasts.map((podcast) => ({
          song_id: podcast.podcast_id,
          song_image: podcast.podcast_image,
          song_url: podcast.podcast_url,
          song_name: podcast.podcast_name,
        }));

        let playedSongs = Favsongs.concat(renamedPodcasts);

        audioPlaying(playedSongs, index);
      } else if (event.target.classList.contains("heart-icon")) {
        let songCard = event.target.closest(".song");
        let index = songCard.getAttribute("data-song-index");

        let songUrl = favSongs[index - 1].song_url;
        console.log(favSongs[index - 1]);
        let songID = favSongs[index - 1].song_id;

        const pop_up = document.getElementById("favs-pop-up");
        let favSong = await isFav(songID, songUrl, undefined);
        let favDescription = songCard.querySelector(".description");
        let favIcon = songCard.querySelector(".favs-icon");

        if (favSong === null) {
          console.log("you should authenticate first");
          return;
        } else {
          let songCard = event.target.closest(".song");
          let index = songCard.getAttribute("data-song-index");
          let songUrl = favSongs[index - 1].song_url;
          let songID = favSongs[index - 1].song_id;

          const pop_up = document.getElementById("favs-pop-up");
          let favSong = await isFav(songID, songUrl, undefined);
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
        songCard.remove();
      }
    } else if (event.target.closest(".fav-podcast-container")) {
      if (event.target.closest(".player-icon")) {
        let songCard = event.target.closest(".song");
        let index = songCard.getAttribute("data-song-index");
        let Favsongs = JSON.parse(localStorage.getItem("favSongs"));
        let Favpodcasts = JSON.parse(localStorage.getItem("favPodcasts"));
        let podcast_id = Favpodcasts[index - 1].podcast_id;
        localStorage.setItem("ActiveAlbum", podcast_id);

        let renamedPodcasts = Favpodcasts.map((podcast) => ({
          song_id: podcast.podcast_id,
          song_image: podcast.podcast_image,
          song_url: podcast.podcast_url,
          song_name: podcast.podcast_name,
        }));

        let playedSongs = Favsongs.concat(renamedPodcasts);

        audioPlaying(
          playedSongs,
          parseInt(Favsongs.length) + parseInt(index, 10)
        );
      }
    }
  });
}
async function favSongsStructure() {
  let favSongs = JSON.parse(localStorage.getItem("favSongs"));
  for (let i = 0; i < favSongs.length; i++) {
    let song = favSongs[i];
    let songIndex = i + 1;
    let songHTML = await displaySong(song, songIndex);
    favSongContainer.innerHTML += songHTML;
  }
}
async function favPodcastsStructure() {
  let favPodcasts = JSON.parse(localStorage.getItem("favPodcasts"));
  for (let i = 0; i < favPodcasts.length; i++) {
    let podcast = favPodcasts[i];
    let podcastIndex = i + 1;
    let podcastHTML = await displayPodcast(podcast, podcastIndex);
    favPodcastContainer.innerHTML += podcastHTML;
  }
}

export { favouritesPage };
