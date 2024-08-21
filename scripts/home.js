// IMPORTS
import { createAudioPlayer } from "./shared/audio-player.js";
// WHOLE FUNCTIONALITY OF THE HOME PAGE
document.addEventListener("DOMContentLoaded", async () => {
  // CREATING THE ELEMENTS
  let albumsContainer = document.getElementById("AlbumsContainer");
  let podcastContainer = document.getElementById("podcastsContainer");
  let AlbumsWrapper = document.getElementById("Albums-wrapper");
  let podcastsWrapper = document.getElementById("podcast-wrapper");
  let AlbumscrollAmount = 0;
  let podcastscrollAmount = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  // FUNCTION TO GET THE ALBUMS FROM BACKEND
  // async function getAlbums() {
  //   try {
  //     const response = await fetch(
  //       "https://spotify-web-app.azurewebsites.net/getAlbums",
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
  // FUNCTION TO GET THE PODCASTS FROM BACKEND
  // async function getPodcasts() {
  //   try {
  //     const response = await fetch(
  //       "https://spotify-web-app.azurewebsites.net/getPodcasts",
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
  // let Albums = await getAlbums();
  // let podcasts = await getPodcasts();
  let Albums = [
    {
      album_id: "A001",
      artist_name: "Wham",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwham-album.jpg?alt=media&token=aa7ee0a6-2df3-49f1-b64e-69bb0c7288a7",
      songs: [
        {
          song_id: "S001",
          song_name: "Last Christmas",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWham_%20-%20Last%20Christmas%20(Lyrics)(MP3_160K).mp3?alt=media&token=adb90052-66bb-4648-9e2f-938fef6d6b13",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Flast-christmas.jpeg?alt=media&token=e10a0d38-2d46-4cfe-95a5-eaaa6a401a1f",
        },
        {
          song_id: "S002",
          song_name: "Wake Me Up",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWake%20Me%20Up%20Before%20You%20Go-Go%20(Official%20Video)(MP3_160K).mp3?alt=media&token=40c0db9d-96d1-41d5-a9d4-c38de0adc1fc",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwake-me-up.jpeg?alt=media&token=e1897bdc-bfd3-48e0-b573-8e2e3c105701",
        },
        {
          song_id: "S003",
          song_name: "Careless Whisper",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCareless%20Whisper%20(Official%20Video)(MP3_160K).mp3?alt=media&token=844364bb-f065-4905-ad42-594bed909441",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcareless-whisper.jpeg?alt=media&token=3cb00870-108e-4f2c-b2b3-cd09bb9eb230",
        },
        {
          song_id: "S004",
          song_name: "Everything She Wants",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FEverything%20She%20Wants(MP3_160K).mp3?alt=media&token=97a2c87e-e506-4222-a641-e34b4b68b61f",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Feverything-she-wants.jpeg?alt=media&token=4d3524aa-e189-469a-b3f2-cb13117cb41f",
        },
        {
          song_id: "S005",
          song_name: "Like a Baby",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FLike%20a%20Baby%20(Official%20Audio)(MP3_160K).mp3?alt=media&token=0ff4a5ec-b4dc-4523-b345-16d579c5b0b1",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Flike-a-baby.jpeg?alt=media&token=378a382a-cd1c-4cd0-9830-f1f7d4543c54",
        },
        {
          song_id: "S006",
          song_name: "Freedom",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFreedom%20(Official%20Video)(MP3_160K).mp3?alt=media&token=a986b9b7-4a95-408c-9159-421a007ea52d",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ffreedom.jpeg?alt=media&token=653f8b80-db6d-4e49-b51b-c5d58f0d10f5",
        },
        {
          song_id: "S007",
          song_name: "If You Were There",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FIf%20You%20Were%20There%20(Official%20Audio)(MP3_160K).mp3?alt=media&token=d0348aa5-1c40-4fe1-b863-3629c9a022c7",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fif-you-where-there.jpeg?alt=media&token=a2e6260a-45a3-41b0-b5e1-bbd4d0e37699",
        },
      ],
    },
    {
      album_id: "A002",
      artist_name: "Taylor Swift",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ftaylor-swift-album.jpeg?alt=media&token=b248104d-4e40-4d0f-b96d-444ff689ea71",
      songs: [
        {
          song_id: "S008",
          song_name: "Blank Space",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20Blank%20Space(MP3_160K).mp3?alt=media&token=29a4ae6d-838b-40c7-9dc3-2b36287125cd",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ftaylor_swift.jpg?alt=media&token=0b05c568-a272-4996-b40f-d52493291e91",
        },
        {
          song_id: "S009",
          song_name: "Shake It Off",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20Shake%20It%20Off(MP3_160K).mp3?alt=media&token=3b2752f5-fe67-40c7-977d-e250fc881266",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fshake-it-off.jpeg?alt=media&token=a853da8c-b3fb-4a19-82e2-06fef9fcaea8",
        },
        {
          song_id: "S010",
          song_name: "22",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%2022(MP3_160K).mp3?alt=media&token=428f9825-c3e1-4bf0-8a0f-09201d8cb833",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2F22.jpeg?alt=media&token=970f32b5-e217-461e-965d-d95edcd9938d",
        },
        {
          song_id: "S011",
          song_name: "Love Story",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20Love%20Story%20(Taylor_s%20Version)%20%5BOfficial%20Lyric%20Video%5D(MP3_160K).mp3?alt=media&token=f14889fc-8128-48b6-b123-93eaffba57b2",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fblank-space.jpeg?alt=media&token=40f80291-24e0-4336-a606-66888565a7c2",
        },
        {
          song_id: "S012",
          song_name: "Back to December",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20Back%20To%20December(MP3_160K).mp3?alt=media&token=112bd183-831b-4d63-8168-4806907cb03c",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fback-to-dec.jpeg?alt=media&token=f14169b4-d4ba-470f-8c20-30347aa6ed27",
        },
        {
          song_id: "S013",
          song_name: "The Story of Us",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20The%20Story%20Of%20Us(MP3_160K).mp3?alt=media&token=3344d410-4e9a-49de-921f-d319d7743665",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fthe-story-of-us.jpeg?alt=media&token=ba3014a5-c502-46f9-9e37-161183d5b056",
        },
        {
          song_id: "S014",
          song_name: "Bad Blood",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FTaylor%20Swift%20-%20Bad%20Blood%20ft.%20Kendrick%20Lamar(MP3_160K).mp3?alt=media&token=61fae787-450a-47b4-90a1-f27d837ef4da",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fbad-blood.jpeg?alt=media&token=6ccc6be5-13df-4533-a2e6-11e6ab3fbe94",
        },
      ],
    },
    {
      album_id: "A003",
      artist_name: "Nancy Ajram",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fnancy-ajram-album.jpeg?alt=media&token=b3389f09-7aab-4cd2-ad97-441f9897c74d",
      songs: [
        {
          song_id: "S015",
          song_name: "Einy Alek",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Eini%20Alik%20(Official%20Audio)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D8%B9%D9%8A%D9%86%D9%8A%20%D8%B9%D9%84%D9%8A%D9%83(MP3_160K).mp3?alt=media&token=edaedece-3f4f-421a-8cc1-fe6316339b44",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fnancy_ajram.jpg?alt=media&token=65e8f6c5-58cf-4996-a7ea-bba800b787f7",
        },
        {
          song_id: "S016",
          song_name: "Sheikh El Shabab",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Sheikh%20El%20Shabab%20(Official%20Music%20Video)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D8%B4%D9%8A%D8%AE%20%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8(MP3_160K).mp3?alt=media&token=7200c494-333b-4b99-b08c-ec174642b436",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fsheikh-el-shabab.jpeg?alt=media&token=2a1008a7-4fdd-4683-b2aa-57354a33d941",
        },
        {
          song_id: "S017",
          song_name: "Ya Kether",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Ya%20Kethar%20(Official%20Music%20Video)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D9%8A%D8%A7%20%D9%83%D8%AB%D8%B1(MP3_160K).mp3?alt=media&token=9d736b20-05e6-4de7-a675-627e0e0dbf65",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fya-kether.jpeg?alt=media&token=31ddd417-748f-4ed4-9437-0bae14c0816f",
        },
        {
          song_id: "S018",
          song_name: "El Donya Helwa",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20El%20Donia%20Helwa%20(Live)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D8%A7%D9%84%D8%AF%D9%86%D9%8A%D8%A7%20%D8%AD%D9%84%D9%88%D8%A9(MP3_160K).mp3?alt=media&token=a2581d8d-96f0-4127-b62b-c6af1b5bc3b6",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fel-donya-helwa.jpeg?alt=media&token=f5f35197-6455-40c6-9888-ba529befdd8f",
        },
        {
          song_id: "S019",
          song_name: "Ah W Noss",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Aah%20W%20Noss(MP3_160K).mp3?alt=media&token=422ee731-91bc-4064-a94d-24265bf60cc1",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fah-w-noss.jpeg?alt=media&token=70b3ea47-ecc3-4ded-bb7c-ef1eadd67955",
        },
        {
          song_id: "S020",
          song_name: "Ma Tigi Hena",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Ma%20Tegi%20Hena%20-%20(Official%20Music%20Video)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D9%85%D8%A7%20%D8%AA%D9%8A%D8%AC%D9%8A%20%D9%87%D9%86%D8%A7(MP3_160K).mp3?alt=media&token=61ff690a-992a-472a-b569-6a20e58a990f",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fma-tigi-hena.jpeg?alt=media&token=0ac26fe2-b57e-49a7-840b-c2d2589c988a",
        },
        {
          song_id: "S021",
          song_name: "Akshmak Ah",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FNancy%20Ajram%20-%20Akhasmak%20Ah%20(Official%20Music%20Video)%20_%20%D9%86%D8%A7%D9%86%D8%B3%D9%8A%20%D8%B9%D8%AC%D8%B1%D9%85%20-%20%D8%A3%D8%AE%D8%B5%D9%85%D9%83%20%D8%A2%D9%87(MP3_160K).mp3?alt=media&token=56b1ae2a-b36e-4e1e-a126-06a4157b3c06",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fakhsmak-ah.jpeg?alt=media&token=846970ba-88be-4583-927d-2aeb72e46c7c",
        },
      ],
    },
    {
      album_id: "A004",
      artist_name: "Wael Kfoury",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwael-kfoury-album.jpeg?alt=media&token=9b4a518f-7721-487b-8804-bcc08ae3a28d",
      songs: [
        {
          song_id: "S022",
          song_name: "Kezabeen",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kfoury%20...%20Kezzabeen%20-%20Lyrics%20Video%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20...%20%D9%83%D8%B0%D8%A7%D8%A8%D9%8A%D9%86%20-%20%D8%A8%D8%A7%D9%84%D9%83%D9%84%D9%85%D8%A7%D8%AA(MP3_160K).mp3?alt=media&token=65375d33-eb15-488b-8f21-0664adbc70df",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwael_kfoury.webp?alt=media&token=5ca717f2-ce08-4790-ba25-1893821576b9",
        },
        {
          song_id: "S023",
          song_name: "Ana Albi Meshta2",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FAna%20albi%20meshta2(wael%20kfouri%20)(MP3_160K).mp3?alt=media&token=6d233886-2aeb-4f80-99cb-5d682d162e0b",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fkezabeen.jpeg?alt=media&token=035a0764-eccf-4094-a721-14d844472766",
        },
        {
          song_id: "S024",
          song_name: "Law Hobna Ghalta",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kfoury%20-%20Law%20Hobna%20Ghalta%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20-%20%D9%84%D9%88%20%D8%AD%D8%A8%D9%86%D8%A7%20%D8%BA%D9%84%D8%B7%D8%A9(MP3_160K).mp3?alt=media&token=d07c5d10-9099-443b-93db-9ce8be48e1f6",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Flaw-hobna-ghalta.jpeg?alt=media&token=37ee7707-50de-41d6-8cba-12439b697b1d",
        },
        {
          song_id: "S025",
          song_name: "Mn Alby Habytak",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kfoury%20...%20Min%20Albi%20Habaytak%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20...%20%D9%85%D9%86%20%D9%82%D9%84%D8%A8%D9%8A%20%D8%AD%D8%A8%D9%8A%D8%AA%D9%83(MP3_160K).mp3?alt=media&token=1ad5ad2a-492c-47f8-bb64-c5c255901d39",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fmn-alby-habytak.jpeg?alt=media&token=8d78f630-1dfd-4a85-9265-4d69117f037f",
        },
        {
          song_id: "S026",
          song_name: "Ntafa El Meshwar",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kfoury%20...%20W%20ntafa%20l%20Mishwuar%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20...%20%D9%88%D8%A7%D9%86%D8%B7%D9%81%D9%89%20%D8%A7%D9%84%D9%85%D8%B4%D9%88%D8%A7%D8%B1(MP3_160K).mp3?alt=media&token=a869e2fb-cfc8-4594-a1eb-90dd79b1c447",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fntafa-el-meshwar.jpeg?alt=media&token=63f48b56-2920-414f-a7d7-099cda96407b",
        },
        {
          song_id: "S027",
          song_name: "Maghroura",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kafoury%20-%20Maghrora%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20-%20%D9%85%D8%BA%D8%B1%D9%88%D8%B1%D8%A9(MP3_160K).mp3?alt=media&token=3f9d94f0-25ce-4dbe-ab56-ea5726c2ad3f",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fmaghroura.jpeg?alt=media&token=8c4e6fd0-e8e9-461f-8185-0b9b886191ac",
        },
        {
          song_id: "S028",
          song_name: "Khedny Layk",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWael%20Kfoury%20...%20Khodnie%20Leek%20_%20%D9%88%D8%A7%D8%A6%D9%84%20%D9%83%D9%81%D9%88%D8%B1%D9%8A%20...%20%D8%AE%D8%AF%D9%86%D9%8A%20%D9%84%D9%8A%D9%83(MP3_160K).mp3?alt=media&token=c0a82ceb-1c56-420c-9b1b-b5d907954d3f",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fkhedny-layk.jpeg?alt=media&token=5f3d964a-ce1b-4b91-b46c-4978ecaa5bb7",
        },
      ],
    },
    {
      album_id: "A005",
      artist_name: "Charli Puth",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcharli-puth-album.jpeg?alt=media&token=add6759d-f2b6-4af8-94fb-8ed4bc8561c5",
      songs: [
        {
          song_id: "S029",
          song_name: "Attention",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCharlie%20Puth%20-%20Attention%20%5BOfficial%20Video%5D(MP3_160K).mp3?alt=media&token=73536964-0a50-42a3-87f3-3c554862cc3a",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcharlie_puth.jpg?alt=media&token=1fa475bd-83de-4f29-92ea-f0215c0e8289",
        },
        {
          song_id: "S030",
          song_name: "We Don't Talk Anymore",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCharlie%20Puth%20-%20We%20Don_t%20Talk%20Anymore%20(feat.%20Selena%20Gomez)%20%5BOfficial%20Video%5D(MP3_160K).mp3?alt=media&token=f9f96b71-cce6-4516-a6f9-2cfcc192491e",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fwe-dont-talk-anymore.jpeg?alt=media&token=efadb173-084c-496b-b3af-f63d8ad3e17e",
        },
        {
          song_id: "S031",
          song_name: "Cheating on You",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCharlie%20Puth%20-%20Cheating%20on%20You%20%5BOfficial%20Video%5D(MP3_160K).mp3?alt=media&token=49befad0-3a0d-43b0-b7bd-c5cdd310e451",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcheating-on-you.jpeg?alt=media&token=025fc534-f523-4524-a618-bdb2f22089fe",
        },
        {
          song_id: "S032",
          song_name: "Diamond",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FCharlie%20Puth%20-%20Diamonds%20(Lyrics)(M4A_128K).m4a?alt=media&token=b9e70824-6ef8-441e-8388-a0ed954239ee",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fattention.jpeg?alt=media&token=20ba63ab-aa73-40e0-96d2-4064264b99cf",
        },
        {
          song_id: "S033",
          song_name: "Empty Cups",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FEmpty%20Cups%20-%20Charlie%20Puth%20(Lyrics)%20%F0%9F%8E%B5(M4A_128K).m4a?alt=media&token=e80a93e4-57df-4d70-ad21-aed2ee468f1a",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fempty-cups.jpeg?alt=media&token=ffe574c2-bbcd-4e3f-9837-f7ca9b17c858",
        },
        {
          song_id: "S034",
          song_name: "See You Again",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FWiz%20Khalifa%20-%20See%20You%20Again%20ft.%20Charlie%20Puth%20%5BOfficial%20Video%5D%20Furious%207%20Soundtrack(M4A_128K).m4a?alt=media&token=81d4c8c6-3fcf-4f63-9e8e-927aba426453",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fsee-you-again.jpeg?alt=media&token=e0087ac1-b979-47aa-ba3b-7f5ced949820",
        },
        {
          song_id: "S035",
          song_name: "Titanium",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FDavid%20Guetta%20-%20Titanium%20ft.%20Sia%20(Official%20Video)(M4A_128K).m4a?alt=media&token=4f1a8cfa-0c74-44f8-aa7c-01a14120430b",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ftitanium.jpeg?alt=media&token=223b1962-dde5-4712-b480-75c8226ae9fa",
        },
      ],
    },
    {
      album_id: "A006",
      artist_name: "Fayrouz",
      album_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ffayrouz-album.jpeg?alt=media&token=81f64431-d5e3-4155-8054-e7d2497839cc",
      songs: [
        {
          song_id: "S036",
          song_name: "Bent El Shalabiya",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFairuz_%20Bint%20El%20Shalabiya(MP3_160K).mp3?alt=media&token=ed3844e6-10b5-416a-8435-90a2f9e45886",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ffairouz.avif?alt=media&token=360fd845-2abc-44d6-b518-0cbefede4f33",
        },
        {
          song_id: "S037",
          song_name: "Shayef El Bahr",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFairuz_%20Shayef%20el%20Bahr(MP3_160K).mp3?alt=media&token=4b8b9dc8-702e-441f-8ed7-c3be86b3a10e",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fbnt-el-shalbiya.jpeg?alt=media&token=0367ba00-7a29-4c10-9b22-5a6882c2daa0",
        },
        {
          song_id: "S038",
          song_name: "Shati Ya Denya",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FShatty%20Ya%20Denia%20-%20Fairuz%20_%20%D8%B4%D8%AA%D9%8A%20%D9%8A%D8%A7%20%D8%AF%D9%86%D9%8A%D8%A7%20-%20%D9%81%D9%8A%D8%B1%D9%88%D8%B2(MP3_160K).mp3?alt=media&token=c42e7c8e-4ef9-4108-8638-e1fb8724f2c5",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fshati-ya-denya.jpeg?alt=media&token=7c4c89e3-89ee-4aa9-b7c9-53e7179a3b8e",
        },
        {
          song_id: "S039",
          song_name: "Ya Ana",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2F%D9%8A%D8%A7%20%D8%A7%D9%86%D8%A7%20%D9%8A%D8%A7%20%D8%A7%D9%86%D8%A7%20-%20%D9%81%D9%8A%D8%B1%D9%88%D8%B2%20_%20Ya%20Ana%20Ya%20Ana%20-%20Fairuz(MP3_160K).mp3?alt=media&token=ead1cbee-88b3-4c9e-ae31-161dabaa988c",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fya-ana.jpeg?alt=media&token=9639b109-b4d0-4822-bd3d-453598ac100b",
        },
        {
          song_id: "S040",
          song_name: "Habaitak Bel Saif",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FLebanese_%20Fairuz%20-%20Habbaytak%20Bissayf%20-%20%D9%81%D9%8A%D8%B1%D9%88%D8%B2%20-%20%D8%AD%D8%A8%D9%91%D9%8A%D8%AA%D9%83%20%D8%A8%D8%A7%D9%84%D8%B5%D9%8A%D9%81%20-%20with%20Lyrics%20%20%20Translation(MP3_160K).mp3?alt=media&token=0a5fb606-486d-4dd5-aa49-c4d7e5cdb075",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fhabaitak-bel-saif.jpeg?alt=media&token=ac77649c-0a69-42f4-ad6a-75874f15f41f",
        },
        {
          song_id: "S041",
          song_name: "Akher Ayam El Sayf",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFayrouz%20-%20Akher%20Eyam%20El%20Saifeia%20_%20%D9%81%D9%8A%D8%B1%D9%88%D8%B2%20-%20%D8%A3%D8%AE%D8%B1%20%D8%A3%D9%8A%D8%A7%D9%85%20%D8%A7%D9%84%D8%B5%D9%8A%D9%81%D9%8A%D8%A9(MP3_160K).mp3?alt=media&token=84371e7a-9094-455f-a8c7-916dc8f3cb4d",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fakher-ayam-el-sayf.jpeg?alt=media&token=8721a8cd-a8fe-43dc-8c34-34a41154e690",
        },
        {
          song_id: "S042",
          song_name: "Bhebak Ya Lebnan",
          song_url:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/SONGS%2FFairuz%20-%20Bhebbak%20Ya%20Lebnan%20(Lebanese%20Arabic)%20Lyrics%20%20%20Translation%20-%20%D9%81%D9%8A%D8%B1%D9%88%D8%B2%20-%20%D8%A8%D8%AD%D8%A8%D9%83%20%D9%8A%D8%A7%20%D9%84%D8%A8%D9%86%D8%A7%D9%86%20%D9%83%D9%84%D9%85%D8%A7%D8%AA(MP3_160K).mp3?alt=media&token=1a84b6b1-7487-4330-9bd7-4f001aadfb81",
          song_image:
            "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fbhebak-ya-lebnan.jpeg?alt=media&token=aeced15d-3663-4562-89fb-52e4a3be8099",
        },
      ],
    },
  ];
  let podcasts = [
    {
      podcast_id: 101,
      podcast_url:
        "https://ia601306.us.archive.org/14/items/TransformationEnglish/ChurchOfGod91stGeneralConvention-Kerala-2014-Day2.mp3",
      podcast_name: "transformation",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ftransformation-podcast.png?alt=media&token=1775c8b3-2cb2-43a3-93e0-7bde21c04ede",
    },
    {
      podcast_id: 102,
      podcast_url:
        "https://ia601309.us.archive.org/13/items/TheEnglishDesk-ItsGroundhogDay/Episode65-ItsGroundhogDay.mp3",
      podcast_name: "English desk",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fenglish-desk-podcast.png?alt=media&token=a33d0893-6fa3-48ab-867e-d599bf70a0ae",
    },
    {
      podcast_id: 103,
      podcast_url:
        "https://ia601807.us.archive.org/1/items/english-podcasts/English%20Podcast/y2mate.com%20-%20What%20is%20coronavirus%20and%20how%20do%20germs%20spread_%20%20Brains%20On%21%20podcast.mp3",
      podcast_name: "Corona Virus",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fcorona-virus.webp?alt=media&token=ea8dde54-e68a-4747-876c-ac7f480204e2",
    },
    {
      podcast_id: 104,
      podcast_url:
        "https://ia800905.us.archive.org/6/items/S1e10HomocideIsCyclical/s1e10_homocide_is_cyclical.mp3",
      podcast_name: "Homocide",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fhomocide.jpg?alt=media&token=25c00574-e055-4e6f-a454-0df8f1b35592",
    },
    {
      podcast_id: 105,
      podcast_url:
        "https://ia801706.us.archive.org/1/items/taste-the-rainbow/Taste%20the%20Rainbow.mp3",
      podcast_name: "Taste the rainbow",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Ftaste-the-rainbow.png?alt=media&token=b0665d09-550f-4fbd-b54d-a2e0b6c8b705",
    },
    {
      podcast_id: 106,
      podcast_url:
        "https://dn720307.ca.archive.org/0/items/radiosurvivor-275/radiosurvivor-275.mp3",
      podcast_name: "Making Scholarly Podcasts count",
      podcast_image:
        "https://firebasestorage.googleapis.com/v0/b/spotify-c3754.appspot.com/o/images%2Fradio-survivor%20.png?alt=media&token=f9c26284-b2e5-4fca-a199-169ef2d3b7fd",
    },
  ];
  // CALLING THE FUNCTION TO CREATE THE ALBUMS AND PODCASTS
  for (let i = 0; i < Albums.length; i++) {
    createAlbums(Albums[i]);
  }
  for (let i = 0; i < Albums.length; i++) {
    createAlbums(Albums[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  for (let i = 0; i < podcasts.length; i++) {
    createPodcasts(podcasts[i]);
  }
  // FUNCTION TO CREATE THE ALBUMS
  async function createAlbums(album) {
    albumsContainer.innerHTML += `
  <div class="album-card card" data-album-id="${album.album_id}" >
      <div class="album-card-image">
            <img src="${album.album_image}" class="album-image">  
      </div>
       <i class="fa-solid fa-circle-play songs-player" id="album-play"></i> 
      <span class="artist-name">${album.artist_name}</span>
  </div>
  `;
  }
  // FUNCTION TO CREATE THE PODCASTS
  async function createPodcasts(podcast) {
    podcastContainer.innerHTML += `
  <div class="podcast-card card"  data-podcast-id="${podcast.podcast_id}">
      <div class="podcast-card-image">
            <img src="${podcast.podcast_image}" class="podcast-image">     
      </div>
      <i class="fa-solid fa-circle-play podcasts-player"></i>
      <span class="artist-name">${podcast.podcast_name}</span>
  </div>
  `;
  }
  // HANDLING ALL CLICKS ON ALBUMS
  AlbumsWrapper.addEventListener("click", (event) => {
    let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
    // CHECKING IF THE CLICKED ELEMENT IS LEFT ARROW
    if (event.target.classList.contains("leftArrow")) {
      AlbumscrollAmount = moveLeft(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS RIGHT ARROW
    else if (event.target.classList.contains("rightArrow")) {
      AlbumscrollAmount = moveRight(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer,
        AlbumsWrapper
      );
    }
    // CHECKING IF THE CLICKED ELEMENT IS ALBUM IMAGE
    else if (event.target.classList.contains("album-image")) {
      let albumCard = event.target.closest(".album-card");
      let index = Array.from(albumsContainer.children).indexOf(albumCard);
      if (index > 5) {
        index = index - 6;
      }
      let albumId = albumCard.getAttribute("data-album-id");
      localStorage.setItem("albumId", albumId);
      localStorage.setItem("artistName", Albums[index].artist_name);
      window.location.href = "songs.html";
    }
    // CHECKING IF THE CLICKED ELEMENT IS PLAY ICON
    else if (event.target.classList.contains("songs-player")) {
      let albumCard = event.target.closest(".album-card");
      let index = Array.from(albumsContainer.children).indexOf(albumCard);
      if (index > 5) {
        index = index - 6;
      }
      let albumId = albumCard.getAttribute("data-album-id");
      localStorage.setItem("albumId", albumId);
      localStorage.setItem("artistName", Albums[index].artist_name);
      localStorage.setItem("previousSongUrl", Albums[index].songs[0].song_url);
      localStorage.setItem("currentSongUrl", Albums[index].songs[0].song_url);
      localStorage.setItem("nextSongUrl", Albums[index].songs[1].song_url);
      localStorage.setItem("isPlaying", true);
      createAudioPlayer();
    }
  });
  // HANDLING ALBUMS WRAPPER TOUCH EVENTS
  AlbumsWrapper.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });
  AlbumsWrapper.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });
  // HANDLING SWIPES ON ALBUMS
  function handleSwipe() {
    let cardWidth = albumsContainer.querySelector(".album-card").offsetWidth;
    // SWIPE LEFT (NEXT ALBUMS)
    if (touchEndX < touchStartX) {
      AlbumscrollAmount = moveRight(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer,
        AlbumsWrapper
      );
    }
    // SWIPE RIGHT (PREVIOUS ALBUMS)
    else if (touchEndX > touchStartX) {
      AlbumscrollAmount = moveLeft(
        cardWidth,
        AlbumscrollAmount,
        albumsContainer
      );
    }
  }
  podcastsWrapper.addEventListener("click", (event) => {
    let cardWidth = podcastContainer.querySelector(".podcast-card").offsetWidth;
    if (event.target.classList.contains("leftArrow")) {
      podcastscrollAmount = moveLeft(
        cardWidth,
        podcastscrollAmount,
        podcastContainer
      );
    } else if (event.target.classList.contains("rightArrow")) {
      podcastscrollAmount = moveRight(
        cardWidth,
        podcastscrollAmount,
        podcastContainer,
        podcastsWrapper
      );
    }
  });
  AlbumsWrapper.addEventListener("mouseover", playMusicIcon);
  podcastsWrapper.addEventListener("mouseover", playMusicIcon);

  async function playMusicIcon() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const playIcon = card.querySelector(".fa-circle-play");
      card.addEventListener("mouseover", () => {
        playIcon.style.visibility = "visible";
      });
      card.addEventListener("mouseout", () => {
        playIcon.style.visibility = "hidden";
      });
    });
  }
  function moveLeft(cardWidth, scrollAmount, container) {
    let scrollStep = cardWidth * 2;
    scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    container.style.transform = `translateX(${-scrollAmount}px)`;
    return scrollAmount;
  }
  function moveRight(cardWidth, scrollAmount, container, wrapper) {
    let scrollStep = cardWidth * 2;
    scrollAmount = Math.min(
      scrollAmount + scrollStep,
      container.clientWidth - wrapper.clientWidth
    );
    container.style.transform = `translateX(${-scrollAmount}px)`;
    return scrollAmount;
  }
});
