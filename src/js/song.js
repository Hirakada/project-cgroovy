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
  
        const songLink = document.createElement('a');
        songLink.href = song.detailPage;
        songLink.textContent = 'View Details';
        songInfo.appendChild(songLink);
  
        songDiv.appendChild(songImage);
        songDiv.appendChild(songInfo);
  
        songsContainer.appendChild(songDiv);
      });
    } else {
      console.error("No songs found in the data.");
    }
  });
  