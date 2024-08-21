// async function getSongs() {
//   try {
//     let AlbumId = localStorage.getItem("albumId");
//     const response = await fetch(
//       `https://spotify-web-app.azurewebsites.net/getSongs/${AlbumId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// }
// let songs = await getSongs();
  let songs = [
    {
      song_id: "S001",
      song_name: "Last Christmas",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWham_%20-%20Last%20Christmas%20(Lyrics)(MP3_160K).mp3?alt=media&token=adb90052-66bb-4648-9e2f-938fef6d6b13",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Flast-christmas.jpeg?alt=media&token=e10a0d38-2d46-4cfe-95a5-eaaa6a401a1f",
      album_id: "A001",
    },
    {
      song_id: "S002",
      song_name: "Wake Me Up",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWake%20Me%20Up%20Before%20You%20Go-Go%20(Official%20Video)(MP3_160K).mp3?alt=media&token=40c0db9d-96d1-41d5-a9d4-c38de0adc1fc",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwake-me-up.jpeg?alt=media&token=e1897bdc-bfd3-48e0-b573-8e2e3c105701",
      album_id: "A001",
    },
    {
      song_id: "S003",
      song_name: "Careless Whisper",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCareless%20Whisper%20(Official%20Video)(MP3_160K).mp3?alt=media&token=844364bb-f065-4905-ad42-594bed909441",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcareless-whisper.jpeg?alt=media&token=3cb00870-108e-4f2c-b2b3-cd09bb9eb230",
      album_id: "A001",
    },
    {
      song_id: "S004",
      song_name: "Everything She Wants",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FEverything%20She%20Wants(MP3_160K).mp3?alt=media&token=97a2c87e-e506-4222-a641-e34b4b68b61f",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Feverything-she-wants.jpeg?alt=media&token=4d3524aa-e189-469a-b3f2-cb13117cb41f",
      album_id: "A001",
    },
    {
      song_id: "S005",
      song_name: "Like a Baby",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FLike%20a%20Baby%20(Official%20Audio)(MP3_160K).mp3?alt=media&token=0ff4a5ec-b4dc-4523-b345-16d579c5b0b1",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Flike-a-baby.jpeg?alt=media&token=378a382a-cd1c-4cd0-9830-f1f7d4543c54",
      album_id: "A001",
    },
    {
      song_id: "S006",
      song_name: "Freedom",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFreedom%20(Official%20Video)(MP3_160K).mp3?alt=media&token=a986b9b7-4a95-408c-9159-421a007ea52d",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ffreedom.jpeg?alt=media&token=653f8b80-db6d-4e49-b51b-c5d58f0d10f5",
      album_id: "A001",
    },
    {
      song_id: "S007",
      song_name: "If You Were There",
      song_url:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FIf%20You%20Were%20There%20(Official%20Audio)(MP3_160K).mp3?alt=media&token=d0348aa5-1c40-4fe1-b863-3629c9a022c7",
      song_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fif-you-where-there.jpeg?alt=media&token=a2e6260a-45a3-41b0-b5e1-bbd4d0e37699",
      album_id: "A001",
    },
  ];
export { songs };
