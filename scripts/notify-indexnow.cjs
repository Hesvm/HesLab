/**
 * IndexNow Instant Search Engine Notification Script
 * Submits HesLab canonical URLs directly to Bing & IndexNow-enabled search engines.
 * 
 * Usage: node scripts/notify-indexnow.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '4b8e2f6a9c1d3e5f7a0b2c4d6e8f0a2b';
const HOST = 'heslab.space';
const MANIFEST_PATH = path.join(__dirname, '../public/seo-manifest.json');

async function sendIndexNow() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ seo-manifest.json not found. Run generate-seo first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const urlList = manifest.routes
    .filter((r) => r.indexable)
    .map((r) => r.canonical);

  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urlList,
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  console.log(`🚀 Submitting ${urlList.length} URLs to IndexNow (Bing / Copilot / Yandex)...`);

  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ [IndexNow Success] Status: ${res.statusCode} Accepted!`);
      } else {
        console.log(`ℹ️ [IndexNow Notice] Status: ${res.statusCode} Response: ${responseData || 'OK'}`);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`❌ [IndexNow Error]: ${err.message}`);
  });

  req.write(payload);
  req.end();
}

sendIndexNow();
