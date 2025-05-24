export function displaySong(songList) {
  const songsContainer = document.getElementById('songs-container');
  songsContainer.innerHTML = "";

  if (songList && songList.length > 0) {
    songList.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.classList.add('song-item');

      const songImage = document.createElement('img');
      songImage.src = song.image;
      songImage.alt = `${song.title} cover`;
      songImage.classList.add('song-image');

      const songInfo = document.createElement('div');
      songInfo.classList.add('song-info');

      // Create a horizontal flex container for title and artist
      const songTitleArtistContainer = document.createElement('div');
      songTitleArtistContainer.classList.add('song-title-artist');

      const songTitle = document.createElement('p');
      songTitle.textContent = song.title;
      songTitle.classList.add('song-title');

      const songArtist = document.createElement('p');
      songArtist.textContent = song.artist;
      songArtist.classList.add('song-artist');

      songTitleArtistContainer.appendChild(songTitle);
      songTitleArtistContainer.appendChild(songArtist);

      const songDescription = document.createElement('p');
      songDescription.textContent = song.description;
      songDescription.classList.add('song-description');


      songInfo.appendChild(songTitleArtistContainer);
      songInfo.appendChild(songDescription);

      songDiv.appendChild(songImage);
      songDiv.appendChild(songInfo);

      songDiv.addEventListener('click', function () {
        window.location.href = `song-detail.html?id=${song.id}`;
      });

      songsContainer.appendChild(songDiv);
    });
  } else {
    songsContainer.innerHTML = "<p style='text-align: center;'>No songs found.</p>";
  }
}

// document.addEventListener('DOMContentLoaded', function() {  
//   const songItem = document.getElementById("song-item");
//   if (songItem) {
//     const songId = new URLSearchParams(window.location.search).get("id");
//     const song = songs.find(s => s.id == songId);
    
//     if (song) {
//       const songTitle = document.getElementById("song-title");
//       const songArtist = document.getElementById("song-artist");
//       const songLyric = document.getElementById("song-lyric");

//       songTitle.textContent = song.title;
//       songArtist.textContent = `By ${song.artist}`;
//       songLyric.textContent = song.lyric;
//     } else {
//       console.error("There is no song.");
//     }
//   }
// });
