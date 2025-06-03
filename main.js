import { signUp, signIn, handleAuthButton, getUser } from './src/js/auth.js';
import { songs } from './src/js/data.js';
import { displaySong } from './src/js/song.js';
import { loadSongDetails } from './src/js/song-detail.js';

function loadUsers() {
    const users = localStorage.getItem("users");
    if (users) {
        console.log("Loaded users:", JSON.parse(users));
        return JSON.parse(users);
    } else {
        return [];
    }
}

function setTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);
}

function searchSongs() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `../../collection.html?search=${encodeURIComponent(query)}`;
                } else {
                    alert("Please enter a song name to search.");
                }
            }
        });
    }
}

function hamburgerMenu() {
    console.log("hamburgerMenu function is running!");
    const hamburger = document.getElementById('hamburger-icon');
    const dropdown = document.querySelector('.hamburger-dropdown');

    hamburger.addEventListener('click', function () {
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.hamburger-menu')) {
        dropdown.classList.remove('show');
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    setTheme();

    const loadHTMLContent = (containerId, fileName) => {
        const container = document.getElementById(containerId);
        if (container) {
            fetch(fileName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    container.innerHTML = data;
                    if (containerId === 'header-container') {
                        hamburgerMenu();
                        handleAuthButton();
                        searchSongs();
                    }
                })
                .catch(error => {
                    console.error(`Failed to load ${fileName}:`, error);
                    alert(`Failed to load ${fileName}. Please try again later.`);
                });
        } else {
            console.error(`Container with ID ${containerId} not found.`);
        }
    };

    if (!window.location.pathname.includes('sign-up') && !window.location.pathname.includes('sign-in')) {
        loadHTMLContent("header-container", "./src/component/header.html");
        loadHTMLContent("footer-container", "./src/component/footer.html");
    }
    
    const user = getUser();

    if (user) {
        console.log('Current User:', user);
    } else {
        console.log('No user logged in.');
    }

    const signUpForm = document.getElementById("sign-up");
    if (signUpForm) {
        signUpForm.addEventListener("submit", function (event) {
            event.preventDefault(); 
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const dob = document.getElementById("age").value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
            const result = signUp(name, email, password, dob, gender);
    
            if (result.success) {
                alert(result.message);
                window.location.href = "../../sign-in.html"; 
            } else {
                alert(result.message);
            }
        });
    }
    
    const signInForm = document.getElementById("sign-in");
    if (signInForm) {
        signInForm.addEventListener("submit", function (event) {
            event.preventDefault();
        
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
    
            const result = signIn(email, password);
        
            if (result.success) {
                alert(result.message);
                window.location.href = "../../index.html";
            } else {
                alert(result.message);
            }
        });
    }

    if (window.location.pathname.includes("collection.html")) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("search")?.toLowerCase();

        let filteredSongs = songs;

        if (query) {
            filteredSongs = songs.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.artist.toLowerCase().includes(query)
            );
        }

        displaySong(filteredSongs);

        const observer = new MutationObserver(() => {
            const genreButtons = document.querySelectorAll('.filter-btn');
            genreButtons.forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelector('.filter-btn.active')?.classList.remove('active');
                    button.classList.add('active');

                    const genre = button.getAttribute('data-genre');
                    const genreFiltered = genre === "all"
                        ? filteredSongs
                        : filteredSongs.filter(song => song.genre.toLowerCase() === genre);

                    displaySong(genreFiltered);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (window.location.pathname.includes("song-detail.html")) {
        loadSongDetails(songs);
    }
});

