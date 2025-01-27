// import { getSongs } from "./getSongs.js";
async function addToFav() {
  let songID = localStorage.getItem("songID");
  let podcastID = localStorage.getItem("podcastID");
  if (songID != "undefined") {
    try {
      const formData = {
        song_id: songID,
      };
      const response = await fetch(`http://localhost:5000/addFavoriteSong`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
      const response = await fetch(`http://localhost:5000/addFavoritePodcast`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
