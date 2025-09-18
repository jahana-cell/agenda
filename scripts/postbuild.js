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
const script = `
  <script>
    (function() {
      const redirect = sessionStorage.getItem('redirect');
      sessionStorage.removeItem('redirect');
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>
`;

let content = fs.readFileSync(fourOhFourFile, 'utf-8');
content = content.replace('</head>', `${script}</head>`);
fs.writeFileSync(fourOhFourFile, content);

console.log('GitHub Pages 404 redirect script injected.');
