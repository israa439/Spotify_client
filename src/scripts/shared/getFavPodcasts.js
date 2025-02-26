async function getFavPodcasts() {
  try {
    const response = await fetch(
      `https://spotify-web-app.azurewebsites.net/getFavoritePodcasts`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let favPodcasts = await response.json();
    if (response.status === 400) {
      localStorage.setItem("favPodcasts", "null");
      return;
    }
    localStorage.setItem("favPodcasts", JSON.stringify(favPodcasts));
  } catch (err) {
    console.log(err);
  }
}
export { getFavPodcasts };
