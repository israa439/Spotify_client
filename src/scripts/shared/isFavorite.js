async function isFav(id, SongUrl, PodcastUrl) {
  let isPodcast;
  let songUrl;
  let podcastUrl;

  if (id) {
    
    isPodcast = String(id)?.startsWith("1");
  
    songUrl = SongUrl;
    podcastUrl = PodcastUrl;
  } else {
    isPodcast = localStorage.getItem("ActiveAlbum")?.startsWith("1");
    songUrl = localStorage.getItem("currentSongUrl");
    podcastUrl = localStorage.getItem("currentSongUrl");
  }

  if (isPodcast) {
    
    let favPodcasts = JSON.parse(localStorage.getItem("favPodcasts"));
   
  
    if (favPodcasts == null) {
      return null;
    }
   
    let song = favPodcasts.find(
      (podcast) => String(podcast.podcast_url) === String(podcastUrl)
    );

    return song;
  } else {
    let favSongs = JSON.parse(localStorage.getItem("favSongs"));

  
  
    if (favSongs == null) {
      return null;
    }
    let song = favSongs.find(
      (song) => String(song.song_url) === String(songUrl)
    );

    return song;
  }
}
export { isFav };
