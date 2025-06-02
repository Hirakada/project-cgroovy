export function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `song.html?search=${encodeURIComponent(query)}`;
                } else {
                    alert("Please enter a song name to search.");
                }
            }
        });
    }
}