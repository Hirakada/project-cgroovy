document.addEventListener('DOMContentLoaded', function() {
    const songId = new URLSearchParams(window.location.search).get("id");
  
    if (songId) {
      const song = songs.find(s => s.id == songId);
  
      if (song) {
        const songTitle = document.getElementById("song-title");
        const songArtist = document.getElementById("song-artist");
        const songLyric = document.getElementById("song-lyric");
        const audioPlayer = document.getElementById("audio-player");
  
        songTitle.textContent = song.title;
        songArtist.textContent = `By ${song.artist}`;
        songLyric.textContent = song.lyric;
  
        audioPlayer.src = song.audio;
  
        const songImage = document.createElement('img');
        songImage.src = song.image;
        songImage.alt = `${song.title} cover`;
        songImage.classList.add('song-image');
        document.getElementById("song-item").appendChild(songImage);
  
      } else {
        console.error("Song not found.");
      }
    } else {
      console.error("Song ID not found in the URL.");
    }
  });
  