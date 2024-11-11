// Überschriften, Tabellenzeilen oder Elemente mit {.sensitive} werden nur eingeloggten Nutzern gezeigt.

function applyClassUntilHeading() {
    const sensitiveElements = document.querySelectorAll('.sensitive');

    sensitiveElements.forEach(element => {

        // Stop if element is not a heading.
        if (!element.matches('h1, h2, h3, h4, h5, h6')) {
            return;
        }
        // Start with the next sibling element
        let sibling = element.nextElementSibling;

        // Loop through following siblings until heading
        while (sibling) {
            
            if (sibling.matches('h1, h2, h3, h4, h5, h6')) {
                break;
            }

            sibling.classList.add('sensitive');

            // Move to the next sibling
            sibling = sibling.nextElementSibling;
        }
    });
}

function unhideSensitive() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .sensitive {
            display: revert !important;
        }
    `;
    document.head.appendChild(style);
}

function removeAllSensitiveElements() {
    var sensitiveElements = document.querySelectorAll('.sensitive');
    sensitiveElements.forEach(function(element) {
        element.remove();
    });
}

function replaceAuthorName() {
    // Select the div element with the class .page-author-card-name
    var authorNameDiv = document.querySelector('.page-author-card-name');
    
    // Check if the element exists
    if (authorNameDiv) {
        // Replace the content of the div
        authorNameDiv.textContent = 'Lehrperson';
    } else {
        // Optionally handle the case where the element is not found
        console.error('Element with class .page-author-card-name not found.');
    }
}


window.boot.register('page-ready', () => {

    applyClassUntilHeading();
    let isLoggedIn = !!WIKI.$store.get('user/name');
    
    if (!isLoggedIn) {
        console.log("User is not logged in.");
        removeAllSensitiveElements();
        replaceAuthorName();
        return;
    }
    
    console.log("User is logged in. Showing content.");
    unhideSensitive();
});