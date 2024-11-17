// api/cors-proxy.js
const https = require('https');

module.exports = async (req, res) => {
  const url = req.query.url;
  
  // Fetch the URL provided in the query
  https.get(url, (apiRes) => {
    let data = '';
    
    apiRes.on('data', (chunk) => {
      data += chunk;
    });
    
    apiRes.on('end', () => {
      res.status(200).json(JSON.parse(data));
    });
  }).on('error', (e) => {
    res.status(500).json({ error: 'Error fetching data', message: e.message });
  });
};
