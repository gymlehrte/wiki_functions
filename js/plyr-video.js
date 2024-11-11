window.boot.register('page-ready', () => {
    // Check if there are any <video> elements on the page
    if (document.querySelector("video")) {
      
      // Add preload="metadata" to all video elements to ensure the first frame is loaded
     
  document.querySelectorAll("video").forEach(video => {
        video.setAttribute("preload", "metadata");
      });
      // Load Plyr's CSS from CDN
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.plyr.io/3.7.8/plyr.css";
      document.head.appendChild(link);
  
      // Load Plyr's JS from CDN
      var script = document.createElement("script");
      script.src = "https://cdn.plyr.io/3.7.8/plyr.js";
      script.onload = function() {
        // Initialize Plyr on all video elements once the script is loaded
        const players = Array.from(document.querySelectorAll("video")).map(video => {
          // Extract video source URL and replace file extension with .jpg
          let videoSource = video.querySelector("source").src;
          let posterImage = videoSource.replace(/\.mp4$/i, ".jpg");  // Assuming the video files are in .mp4 format
  
          // Set the poster attribute
          video.setAttribute("poster", posterImage);
  
          // Initialize Plyr with the video element
          return new Plyr(video, {
            controls: [
              'play-large', // The large play button in the center
              'play', // Play/pause button
              'progress', // The progress bar and scrubber for playback
              'current-time', // Current time display
              'duration', // Total duration display
              'mute', // Mute button
              'volume', // Volume control
              'captions', // Captions toggle
              'settings', // Settings menu
              'fullscreen', // Fullscreen button
              'download' // Download button
            ]
          });
        });
      };
      document.body.appendChild(script);
    }
  });