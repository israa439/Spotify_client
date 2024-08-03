let AlbumId = sessionStorage.getItem("albumId");
async function getSongs() {
  try {
    const response = await fetch(
      "https://spotify-web-app.azurewebsites.net/getSongs/${AlbumId}",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    songs = await response.json();
  } catch (err) {
    console.log(err);
  }
}
let songs = await getSongs();
let containerHTML = `
<div class="image-container">
    <img src="${songs[0].song_image}"/>
</div>
`;
let container = document.getElementById("homeMain");
container.innerHTML = containerHTML;
