import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { initBot } from './bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Path to data file
const dataDir = path.join(__dirname, 'data');
const portfolioJsonPath = path.join(dataDir, 'portfolio.json');

// Serve uploaded portfolio images from public/portfolio
app.use('/portfolio', express.static(path.join(__dirname, 'public', 'portfolio')));

function stripEmojis(str) {
  if (!str) return '';
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1F004}-\u{1F0CF}]/gu;
  return str.replace(emojiRegex, '').replace(/  +/g, ' ').trim();
}

function formatMediaUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if ((url.startsWith('http://') || url.startsWith('https://')) && !url.includes('/api/proxy-media')) {
    return `/api/proxy-media?url=${encodeURIComponent(url)}`;
  }
  return url;
}

function processItemMedia(item) {
  if (!item) return item;
  const image = formatMediaUrl(item.image);
  const images = Array.isArray(item.images) ? item.images.map(formatMediaUrl) : item.images;
  const mediaList = Array.isArray(item.mediaList) ? item.mediaList.map(m => ({
    ...m,
    url: formatMediaUrl(m.url)
  })) : item.mediaList;

  return {
    ...item,
    image,
    images,
    mediaList,
    title: stripEmojis(item.title),
    description: stripEmojis(item.description)
  };
}

// Media Proxy Endpoint to fix ERR_HTTP2_PROTOCOL_ERROR on catbox.moe assets with fail-safe fallback
app.get('/api/proxy-media', async (req, res) => {
  let targetUrl = req.query.url;
  try {
    if (!targetUrl || typeof targetUrl !== 'string') {
      return res.status(400).send('Missing url parameter');
    }

    // Unwrap nested proxy URLs if accidentally double wrapped
    while (targetUrl.includes('/api/proxy-media?url=')) {
      const idx = targetUrl.indexOf('/api/proxy-media?url=');
      targetUrl = decodeURIComponent(targetUrl.substring(idx + 21));
    }

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      return res.redirect(targetUrl);
    }

    const mediaRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://catbox.moe/'
      }
    });

    if (!mediaRes.ok) {
      // Fallback: redirect directly to original URL if proxy fetch returns non-200
      return res.redirect(targetUrl);
    }

    const contentType = mediaRes.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const buffer = Buffer.from(await mediaRes.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error('Error in proxy-media:', err);
    if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
      return res.redirect(targetUrl);
    }
    res.status(400).send('Proxy error');
  }
});

// API Endpoint to get all parsed portfolio works for the website
app.get('/api/portfolio', (req, res) => {
 try {
 const backupJsonPath = path.join(dataDir, 'portfolio.backup.json');
 let raw = '[]';
 if (fs.existsSync(portfolioJsonPath)) {
 const primaryRaw = fs.readFileSync(portfolioJsonPath, 'utf8');
 if (primaryRaw && primaryRaw.trim().length > 2) {
 raw = primaryRaw;
 } else if (fs.existsSync(backupJsonPath)) {
 raw = fs.readFileSync(backupJsonPath, 'utf8');
 }
 } else if (fs.existsSync(backupJsonPath)) {
 raw = fs.readFileSync(backupJsonPath, 'utf8');
 }
 const data = JSON.parse(raw);
 const cleanedData = Array.isArray(data) ? data.map(processItemMedia) : [];
    res.json(cleanedData);
 } catch (err) {
 res.status(500).json({ error: 'Failed to read portfolio data' });
 }
});

// API Endpoint to auto-restore/sync portfolio data from client cache if server container was redeployed
app.post('/api/portfolio/sync', (req, res) => {
 try {
 const { works } = req.body;
 if (Array.isArray(works) && works.length > 0) {
 const backupJsonPath = path.join(dataDir, 'portfolio.backup.json');
 let current = [];
 if (fs.existsSync(portfolioJsonPath)) {
 try {
 const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
 if (raw && raw.trim().length > 2) current = JSON.parse(raw);
 } catch (e) {}
 }

 if (current.length < works.length) {
 fs.writeFileSync(portfolioJsonPath, JSON.stringify(works, null, 2), 'utf8');
 fs.writeFileSync(backupJsonPath, JSON.stringify(works, null, 2), 'utf8');
 return res.json({ success: true, restoredCount: works.length });
 }
 }
 res.json({ success: true, status: 'no_change' });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});

// API Endpoint to extract design tokens from a target website URL using dembrandt
app.post('/api/extract-brand', async (req, res) => {
 const { url } = req.body;
 if (!url) {
 return res.status(400).json({ error: 'URL is required' });
 }

 let cleanUrl = url.trim();
 if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
 cleanUrl = 'https://' + cleanUrl;
 }

 try {
 const cmd = `npx dembrandt "${cleanUrl}" --json-only`;
 exec(cmd, { timeout: 25000 }, (error, stdout, stderr) => {
 if (error || !stdout) {
 const urlObj = new URL(cleanUrl);
 const domain = urlObj.hostname.replace('www.', '');
 let hash = 0;
 for (let i = 0; i < domain.length; i++) hash = domain.charCodeAt(i) + ((hash << 5) - hash);
 const hue = Math.abs(hash) % 360;

 return res.json({
 domain: domain,
 colors: [
 `hsl(${hue}, 75%, 45%)`,
 `hsl(${(hue + 40) % 360}, 65%, 55%)`,
 `hsl(${(hue + 180) % 360}, 30%, 95%)`,
 `hsl(${(hue + 210) % 360}, 15%, 15%)`
 ],
 fonts: ['Outfit', 'Inter', 'sans-serif'],
 extractedFrom: cleanUrl,
 mode: 'fallback-demo'
 });
 }

 try {
 const parsed = JSON.parse(stdout);
 return res.json(parsed);
 } catch (parseErr) {
 return res.json({
 rawOutput: stdout,
 extractedFrom: cleanUrl
 });
 }
 });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});

// Serve static frontend files built by Vite
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback for Single Page Application routing
app.use((req, res) => {
 const indexPath = path.join(distPath, 'index.html');
 res.sendFile(indexPath, (err) => {
 if (err) {
 res.status(200).send(`
 <!DOCTYPE html>
 <html>
 <head><title>BELLA CRÈME App</title></head>
 <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #fff;">
 <h1> BELLA CRÈME Application is Building</h1>
 <p>Please run <code>npm run build</code> first to generate the production dist bundle.</p>
 </body>
 </html>
 `);
 }
 });
});

// Start Express server and Telegram Bot
app.listen(PORT, () => {
 console.log(` BELLA CRÈME server running on port ${PORT}`);
 try {
 initBot();
 } catch (err) {
 console.error('Failed to initialize Telegram Bot:', err);
 }
});
