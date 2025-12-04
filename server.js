const express = require('express');
const path = require('path');

const app = express();
const PORT = 8092;
const HOST = '0.0.0.0';

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://100.95.191.86:${PORT}/`);
});
