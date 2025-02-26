async function getFavSongs() {
  try {
    const response = await fetch(
      `https://spotify-web-app.azurewebsites.net/getFavoriteSongs`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let favSongs = await response.json();
    if (response.status === 400) {
      localStorage.setItem("favSongs", "null");
      return;
    }
    localStorage.setItem("favSongs", JSON.stringify(favSongs));
  } catch (err) {
    console.log(err);
  }
}
export { getFavSongs };
