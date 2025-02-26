async function removeFromFav(songid, podcastid) {
  let songID = songid ?? localStorage.getItem("songID");
  let podcastID = podcastid ?? localStorage.getItem("podcastID");
  if (songID != "undefined") {
    try {
      const formData = {
        song_id: songID,
      };
      const response = await fetch(
        `https://spotify-web-app.azurewebsites.net/deleteFavSong`,
        {
          method: "DELETE",
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
        `https://spotify-web-app.azurewebsites.net/deleteFavPodcast`,
        {
          method: "DELETE",
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

export { removeFromFav };
