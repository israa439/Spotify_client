async function getFavSongs() {
  try {
    const response = await fetch(`http://localhost:5000/getFavoriteSongs`, {
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
export { getFavSongs };
