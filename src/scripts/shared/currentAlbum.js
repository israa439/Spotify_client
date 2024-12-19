async function getSongs() {
  try {
    let AlbumId = localStorage.getItem("ViewedAlbumId");
    if (!AlbumId) {
      return;
    }
    const response = await fetch(`http://localhost:5000/getSongs/${AlbumId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export { getSongs };
