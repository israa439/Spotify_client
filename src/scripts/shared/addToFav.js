// import { getSongs } from "./getSongs.js";
async function addToFav() {
  let songID = localStorage.getItem("songID");
  let podcastID = localStorage.getItem("podcastID");
  console.log(songID, typeof songID);
  console.log(podcastID, typeof podcastID);
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
      return await response.json();
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
      console.log(res);
      
    } catch (err) {
      console.log(err);
    }
  }
}

export { addToFav };
