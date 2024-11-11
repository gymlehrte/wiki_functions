// Ändert die Farbe des Wikis im gewählten Ordnerbereich
document.addEventListener("DOMContentLoaded", function() {
    const rootDiv = document.getElementById('root');
    if (window.location.pathname.includes("/intern")) { // Dies ist bei uns der interne Bereich. 
      rootDiv.classList.add('interner-bereich');
    }
});