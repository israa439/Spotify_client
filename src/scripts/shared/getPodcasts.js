async function getpodcasts() {
  try {
    const response = await fetch(
      `https://spotify-web-app.azurewebsites.net/getPodcasts`,
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

export { getpodcasts };
