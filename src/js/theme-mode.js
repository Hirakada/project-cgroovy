(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    let theme;
    
    if (savedTheme) {
      theme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    
    root.setAttribute('data-theme', theme);
})();
  
  