export function setTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);
}

export function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-icon');
    const dropdown = document.querySelector('.hamburger-dropdown');

    if (hamburger && dropdown) {
        hamburger.addEventListener('click', function () {
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.hamburger-menu')) {
                dropdown.classList.remove('show');
            }
        });
    }
}