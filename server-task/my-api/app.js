const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(express.json());

// ─── 1. Return Server Time ─────────────────────────────────
app.get('/time', (req, res) => {
  const now = new Date();
  res.json({
    timestamp: now.toISOString(),
    utc: now.toUTCString(),
    unix: Math.floor(now.getTime() / 1000),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
});

// ─── 2. Return a File from the Server ─────────────────────
// Serves any file inside the /uploads folder by filename
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
});

// ─── 3. Upload a File to the Server ───────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(201).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    downloadUrl: `/file/${req.file.filename}`
  });
});

// ─── Start the Server ──────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`  GET  /time`);
  console.log(`  GET  /file/:filename`);
  console.log(`  POST /upload`);
});