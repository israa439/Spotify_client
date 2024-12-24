// IMPORTS
import { navigateTo } from "./shared/change-path.js";
let isAuth = false;
async function isAuthenticated() {
  try {
    const response = await fetch("http://localhost:5000/getFavoriteSongs", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (response.status === 400) {
      isAuth = false;
      return;
    }
    isAuth = true;
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function favouritesPage() {
  let container = document.getElementById("variedMain");
  let data = await isAuthenticated();
  console.log(data);

  if (isAuth == false) {
    let containerHTML = `
        <div class="fav-container-unauth">
            <h1 class="display-text">Nothing to display.</h1>
            <h2 class="auth-text">Create account or sign in to save favorite songs.</h2>
        </div>
 
        `;
    container.innerHTML = containerHTML;
    return;
  }



  let containerHTML = `
        <div class="fav-container-auth">
            <h1 class="fav-song-header">Favorite Songs:</h1>
            <div class="fav-song-container"></div>
            <h1 class="fav-podcast-header">Favorite Podcasts:</h1>
            <div class="fav-podcast-container"></div>
        </div>
 
        `;
  container.innerHTML = containerHTML;
}

export { favouritesPage };
