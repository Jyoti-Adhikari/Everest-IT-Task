import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getServerTime = (req, res) => {
    res.json({ serverTime: new Date().toLocaleTimeString() });
};

export const downloadFile = (req, res) => {
    // Traverse up out of controllers/ to find the root file workspace
    const sampleFile = path.join(__dirname, '../../sample.txt');
    if (!fs.existsSync(sampleFile)) {
        fs.writeFileSync(sampleFile, 'This file was dynamically served via structured architecture.');
    }
    res.download(sampleFile, 'api-download.txt');
};

export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully!', file: req.file });
};