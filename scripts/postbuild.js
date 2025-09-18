
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const fourOhFourFile = path.join(outDir, '404.html');

// Create a 404.html file if it doesn't exist
if (!fs.existsSync(fourOhFourFile)) {
  const indexFile = path.join(outDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    fs.copyFileSync(indexFile, fourOhFourFile);
  } else {
    // A fallback if index.html doesn't exist for some reason
    fs.writeFileSync(fourOhFourFile, '404 - Page Not Found');
  }
}

// Add the redirect script to the 404.html file
// This handles SPA routing on GitHub Pages
const script = `
  <script>
    (function() {
      // The base path for the project, which is the repository name
      const basePath = '/agenda';
      
      const redirect = sessionStorage.getItem('redirect');
      sessionStorage.removeItem('redirect');

      // If there's a redirect stored in session storage, use it
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
        return;
      }

      // If we are on the root of the GitHub Pages site, redirect to the base path
      if (location.pathname === '/' || location.pathname === '') {
        location.pathname = basePath;
        return;
      }

      // For any other 404, construct the correct path and redirect
      const path = location.pathname.startsWith(basePath) 
        ? location.pathname 
        : basePath + location.pathname;
      
      // Store the intended path in session storage and redirect to the 404 page,
      // which will then read it and correct the URL.
      if (location.pathname !== path) {
        sessionStorage.setItem('redirect', path + location.search + location.hash);
        location.replace(basePath);
      }
    })();
  </script>
`;

let content = fs.readFileSync(fourOhFourFile, 'utf-8');
if (!content.includes('sessionStorage.getItem(\'redirect\')')) {
    content = content.replace('</head>', `${script}</head>`);
    fs.writeFileSync(fourOhFourFile, content);
    console.log('GitHub Pages 404 redirect script injected.');
} else {
    console.log('GitHub Pages 404 redirect script already exists.');
}
