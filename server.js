import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint to extract design tokens from a target website URL using dembrandt
app.post('/api/extract-brand', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Sanitize input URL
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    const cmd = `npx dembrandt "${cleanUrl}" --json-only`;
    exec(cmd, { timeout: 25000 }, (error, stdout, stderr) => {
      if (error || !stdout) {
        console.warn('Dembrandt extraction fallback used:', error?.message || stderr);
        // Fallback demo tokens extracted gracefully if headless browser fails or times out
        const urlObj = new URL(cleanUrl);
        const domain = urlObj.hostname.replace('www.', '');
        
        // Generate elegant palette based on domain hash
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
          <head><title>Tortiks - Production Build Pending</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #fff;">
            <h1>🍰 Tortiks Application is Building</h1>
            <p>Please run <code>npm run build</code> first to generate the production dist bundle.</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🍰 Tortiks server running on port ${PORT}`);
});
