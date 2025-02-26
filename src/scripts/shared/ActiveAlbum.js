async function getSongs() {
  try {
    let AlbumId = localStorage.getItem("ActiveAlbum");
    if (!AlbumId) {
      return;
    }
    const response = await fetch(
      `https://spotify-web-app.azurewebsites.net/getSongs/${AlbumId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export { getSongs };
