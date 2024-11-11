window.boot.register('page-ready', () => {
    function createGallery() {
        const galleryHeadings = document.querySelectorAll('h1.gallery, h2.gallery, h3.gallery, h4.gallery, h5.gallery, h6.gallery');
        galleryHeadings.forEach(heading => {
            let nextElement = heading.nextElementSibling;
            let images = [];
            while (nextElement && !nextElement.matches('h1, h2, h3, h4, h5, h6')) {
                if (nextElement.tagName === 'P') {
                    nextElement.style.display = 'none';
                    let imgs = nextElement.querySelectorAll('img');
                    imgs.forEach(img => {
                        images.push(img);
                        img.style.display = 'none'; // Hide the original images
                    });
                }
                nextElement = nextElement.nextElementSibling;
            }

            if (images.length > 0 && !heading.dataset.initialized) {
                let galleryMarkup = '<div class="custom-gallery" style="overflow: hidden; position: relative;">';
                images.forEach(image => {
                    galleryMarkup += `<div class="gallery-item" style="display: none;"><img src="${image.src}" alt="${image.alt}"><div class="caption" style="position: absolute; bottom: 0; width: 100%; text-align: center; color: white; background-color: rgba(0, 0, 0, 0.5); padding: 10px;">${image.alt}</div></div>`;
                });
                galleryMarkup += `
                    <button class="prev" onclick="moveSlide(-1)" style="position: absolute; top: 50%; left: 0; transform: translateY(-50%);">Zurück</button>
                    <button class="next" onclick="moveSlide(1)" style="position: absolute; top: 50%; right: 0; transform: translateY(-50%);">Weiter</button>
                </div>`;
                heading.insertAdjacentHTML('afterend', galleryMarkup);
                heading.dataset.initialized = 'true';
            }
        });
        setupGalleries();
    }

    function setupGalleries() {
        document.querySelectorAll('.custom-gallery').forEach(gallery => {
            let currentSlide = 0;
            const items = gallery.querySelectorAll('.gallery-item');
            items[currentSlide].style.display = 'flex'; // Show the first image

            window.moveSlide = function(step) {
                items[currentSlide].style.display = 'none'; // Hide current slide
                currentSlide = (currentSlide + step + items.length) % items.length;
                items[currentSlide].style.display = 'flex'; // Show new slide
            }
        });
    }

    createGallery();
});