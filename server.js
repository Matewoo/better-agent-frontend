const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use('/static', express.static('public'));

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

https.createServer(options, app).listen(port, () => {
  console.log(`✅ HTTPS-Server läuft auf https://localhost:${port}`);
});
