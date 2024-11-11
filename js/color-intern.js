document.addEventListener("DOMContentLoaded", function() {
    const rootDiv = document.getElementById('root');
    if (window.location.pathname.includes("/intern")) {
      rootDiv.classList.add('interner-bereich');
    }
});