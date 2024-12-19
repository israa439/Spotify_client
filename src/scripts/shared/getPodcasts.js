async function getpodcasts() {
  try {
    const response = await fetch(`http://localhost:5000/getPodcasts`, {
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

export { getpodcasts };