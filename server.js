const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
// Keep this import for the proxy functionality
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use('/static', express.static('public'));

// Add proxy endpoint for chat requests
app.post('/proxy/chat', express.json(), async (req, res) => {
  try {
    console.log('Proxying request to backend:', req.body);
    
    const response = await fetch('http://localhost:4000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: 'Backend server error', 
        status: response.status 
      });
    }
    
    const data = await response.json();
    console.log('Backend response:', data);
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed', 
      message: error.message 
    });
  }
});

// HTTPS configuration
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`✅ HTTPS-Server läuft auf https://localhost:${port}`);
  console.log(`✅ Proxy-Endpoint verfügbar unter https://localhost:${port}/proxy/chat`);
});
