
const express = require('express');
const path = require('path');
const app = express();

// Helper to get the port from command line arguments
function getPort() {
  const args = process.argv.slice(2);
  const portArgIndex = args.indexOf('--port');
  if (portArgIndex !== -1 && args[portArgIndex + 1]) {
    return parseInt(args[portArgIndex + 1], 10);
  }
  return process.env.PORT || 3000;
}

const port = getPort();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
