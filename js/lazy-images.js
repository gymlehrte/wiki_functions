// Lazy Loading für Bilder, die mit {.lazy} markiert werden.
window.boot.register('page-ready', () => {
    const lazyImages = document.querySelectorAll("img.lazy");
    lazyImages.forEach(img => {
        img.setAttribute("loading", "lazy");
    });
    console.log("Lazy loading added to images with class 'lazy'");
});