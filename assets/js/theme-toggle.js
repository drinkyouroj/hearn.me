document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Helper to set theme and toggle state
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      themeToggle.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      themeToggle.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');

  // Toggle on click
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Keyboard accessibility (Enter/Space)
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      themeToggle.click();
    }
  });
});