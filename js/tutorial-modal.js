// Selbsterstellte Modal-Lösung für Tutorials von einem dritten Server des Gym Lehrte.

window.boot.register('page-ready', () => {
  attachModalListeners();
});
  
  
function generateUrl (title) {
  // Check if the last character is a "/"
  if (title.endsWith('/')) {
      // Remove the last character
      title = title.slice(0, -1);
  }
  
  let lastPart = title.substring(title.lastIndexOf('/') + 1);
  let encodedUrl = encodeURIComponent(lastPart); // unnötig, aber egal
  
  let hostUrl = "https://tutorials.gym-lehrte-server.de/";
  let completeUrl = hostUrl + encodedUrl;
	return completeUrl;
};

  
function attachModalListeners() {
  	var links = document.querySelectorAll('a.tutorial'); // Select all links with the class 'tutorial'
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            var myUrl = generateUrl(this.href)
            showModal(myUrl);
        });
    });
};

  
function createModal() {
    // Create the modal container
    var modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.zIndex = "50";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.6)"; // Black w/ opacity

    // Create the modal content container
    var modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#eee";
    modalContent.style.margin = "5vh auto";
    modalContent.style.padding = "1.2rem 1.5rem";
    modalContent.style.borderRadius = "2rem";
    modalContent.style.width = "90%";

    // Create the close button
    var closeButton = document.createElement("span");
  	closeButton.id = "closeButton";
    closeButton.innerHTML = "&times;";
    closeButton.style.color = "#aaa";
    closeButton.style.float = "right";
    closeButton.style.fontSize = "2rem";
    closeButton.style.fontWeight = "bold";
    closeButton.style.cursor = "pointer";
  	closeButton.style.borderRadius = "2rem";
  	closeButton.style.width = "2.3rem";
  	closeButton.style.textAlign = "center";
  
    // Add hover effect
    closeButton.addEventListener("mouseover", function() {
        closeButton.style.color = "#000"; // Change to the color you want on hover
      	closeButton.style.background = "#ccc";
      
    });

    closeButton.addEventListener("mouseout", function() {
        closeButton.style.color = "#aaa"; // Revert to the original color
      	closeButton.style.background = "#eee";
    });

    // Append close button to modal content
    modalContent.appendChild(closeButton);

    // Create the iframe
    var iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "75vh"; // 75% of the viewport height
    iframe.style.border = "none";

    // Append iframe to modal content
    modalContent.appendChild(iframe);

    // Append content container to modal
    modal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modal);

    // Add event to close button
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal if clicked outside of modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    return modal;
};
  
 
function showModal(url) {
    var existingModal = document.getElementById("myModal");
    
    if (!existingModal) {
        existingModal = createModal();
    }
    var iframe = existingModal.querySelector("iframe");
    iframe.src = url; // Set the source of the iframe to the URL
    existingModal.style.display = "block";
};