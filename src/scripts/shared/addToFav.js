// import { getSongs } from "./getSongs.js";
async function addToFav() {
  let songID = localStorage.getItem("songID");
  let podcastID = localStorage.getItem("podcastID");
  let id = songID || podcastID;
  console.log(id);
}

export { addToFav };
