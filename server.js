import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other routes to ensure SPA routing (About, Admin, etc.) works correctly upon page refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production Node.js server running on port ${PORT}`);
});
