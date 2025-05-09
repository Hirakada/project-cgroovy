document.addEventListener('DOMContentLoaded', function() {  
  const songsContainer = document.getElementById('songs-container');
  
  if (songs && songs.length > 0) {
    songs.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.classList.add('song-item');
      
      const songImage = document.createElement('img');
      songImage.src = song.image;
      songImage.alt = `${song.title} cover`;
      songImage.classList.add('song-image');

      const songInfo = document.createElement('div');
      songInfo.classList.add('song-info');

      const songTitle = document.createElement('h3');
      songTitle.textContent = song.title;
      songInfo.appendChild(songTitle);

      const songArtist = document.createElement('p');
      songArtist.textContent = `By ${song.artist}`;
      songInfo.appendChild(songArtist);

      songDiv.appendChild(songImage);
      songDiv.appendChild(songInfo);

      songDiv.addEventListener('click', function() {
        window.location.href = song.detailPage;
      });

      songsContainer.appendChild(songDiv);
    });
  } else {
    console.error("No songs found in the data.");
  }

  const songItem = document.getElementById("song-item");
  if (songItem) {
    const songId = new URLSearchParams(window.location.search).get("id");
    const song = songs.find(s => s.id == songId);
    
    if (song) {
      const songTitle = document.getElementById("song-title");
      const songArtist = document.getElementById("song-artist");
      const songLyric = document.getElementById("song-lyric");

      songTitle.textContent = song.title;
      songArtist.textContent = `By ${song.artist}`;
      songLyric.textContent = song.lyric;
    } else {
      console.error("Song not found.");
    }
  }
});
