import { createAudioPlayer } from "../audio-player.js";
async function audioPlaying(playedSongs, index) {
  localStorage.setItem("currentSongUrl", playedSongs[index - 1].song_url);
  localStorage.setItem("songID", playedSongs[index - 1].song_id);
  localStorage.setItem("podcastID", undefined);
  localStorage.setItem("currentTime", 0);
  localStorage.setItem("isPlaying", JSON.stringify(true));
  if (index == 1) {
    localStorage.setItem("previousSongUrl", playedSongs[index - 1].song_url);
  } else {
    localStorage.setItem("previousSongUrl", playedSongs[index - 2].song_url);
  }
  if (index == playedSongs.length) {
    localStorage.setItem("nextSongUrl", undefined);
  } else {
    localStorage.setItem("nextSongUrl", playedSongs[index].song_url);
  }

  await createAudioPlayer();
}

export { audioPlaying };
