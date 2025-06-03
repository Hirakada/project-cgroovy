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

      // Card
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
        window.location.href = `../song/song-detail.html?id=${song.id}`;
      });

      songsContainer.appendChild(songDiv);
    });
  } else {
    songsContainer.innerHTML = "<p style='text-align: center;'>No songs found.</p>";
  }
}