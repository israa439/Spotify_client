// import { getSongs } from "./getSongs.js";
async function addToFav(songid, podcastid) {
  let songID = songid ?? localStorage.getItem("songID");
  let podcastID = podcastid ?? localStorage.getItem("podcastID");
  if (songID != "undefined") {
    try {
      const formData = {
        song_id: songID,
      };
      const response = await fetch(
        `https://spotify-web-app.azurewebsites.net/addFavoriteSong`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      let res = await response.json();

      if (response.status === 400) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  } else if (podcastID != "undefined") {
    try {
      const formData = {
        podcast_id: podcastID,
      };
      const response = await fetch(
        `https://spotify-web-app.azurewebsites.net/addFavoritePodcast`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      let res = await response.json();

      if (response.status === 400) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

export { addToFav };
