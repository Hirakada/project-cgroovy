export function loadSongDetails(songs) {
  const songId = new URLSearchParams(window.location.search).get("id");

  if (songId) {
    const currentSong = songs.find(s => s.id == songId);

    if (currentSong) {
      const songTitle = document.getElementById("song-title");
      const songDescription = document.getElementById("song-description");
      const songArtist = document.getElementById("song-artist");
      const songLyric = document.getElementById("song-lyric");
      const songImage = document.getElementById("song-image");
      const audioPlayer = document.getElementById("audio-player");

      songTitle.textContent = currentSong.title;
      songDescription.textContent = currentSong.description;
      songImage.src = currentSong.image;
      songImage.alt = `${currentSong.title} cover`;
      songArtist.textContent = `${currentSong.artist}`;
      songLyric.textContent = currentSong.lyric;
      audioPlayer.src = currentSong.audio;

      let playedSongs = JSON.parse(localStorage.getItem("playedSongs")) || [];

      if (!playedSongs.includes(currentSong.id)) {
        playedSongs.push(currentSong.id);
        localStorage.setItem("playedSongs", JSON.stringify(playedSongs));
      }

      let filteredSongs = songs.filter(s => s.id !== currentSong.id && !playedSongs.includes(s.id));
      let sameGenreSongs = filteredSongs.filter(s => s.genre === currentSong.genre);

      let nextSong = null;

      if (sameGenreSongs.length > 0) {
        nextSong = sameGenreSongs[Math.floor(Math.random() * sameGenreSongs.length)];
      } else if (filteredSongs.length > 0) {
        nextSong = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
      }

      if (!nextSong) {
        localStorage.removeItem("playedSongs");
        playedSongs = [];

        const remainingSongs = songs.filter(s => s.id !== currentSong.id);
        const sameGenreSongsReset = remainingSongs.filter(s => s.genre === currentSong.genre);

        if (sameGenreSongsReset.length > 0) {
          nextSong = sameGenreSongsReset[Math.floor(Math.random() * sameGenreSongsReset.length)];
        } else if (remainingSongs.length > 0) {
          nextSong = remainingSongs[Math.floor(Math.random() * remainingSongs.length)];
        }
      }

      if (nextSong) {
        const nextSongTitle = document.getElementById("next-song-title");
        const nextSongArtist = document.getElementById("next-song-artist");
        const nextSongImage = document.getElementById("next-song-image");
        const nextSongPlayButton = document.getElementById("next-song-play-button");

        nextSongTitle.textContent = nextSong.title;
        nextSongArtist.textContent = `${nextSong.artist}`;
        nextSongImage.src = nextSong.image;
        nextSongImage.alt = `${nextSong.title} cover`;

        nextSongPlayButton.addEventListener("click", function () {
          window.location.href = `song-detail.html?id=${nextSong.id}`;
        });

        audioPlayer.addEventListener("ended", () => {
          window.location.href = `song-detail.html?id=${nextSong.id}`;
        });
      } else {
        console.error("No next song found.");
      }

    } else {
      console.error("Song not found.");
    }
  } else {
    console.error("Song ID not found in the URL.");
  }
}
