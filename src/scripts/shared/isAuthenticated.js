import { getFavSongs } from "./getFavSongs.js";
import { getFavPodcasts } from "./getFavPodcasts.js";
async function IsAuth() {
  const response = await fetch(
    "https://spotify-web-app.azurewebsites.net/userInfo",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  getFavPodcasts();
  getFavSongs();
  return response;
}
export { IsAuth };
