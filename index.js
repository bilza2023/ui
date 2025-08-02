// index.js — Wrap SvelteKit and expose static/images + static/sounds live

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handler } from './build/handler.js';

// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mount static/images and static/sounds as /media/*
const IMAGES_DIR = path.join(__dirname, 'static/images');
const SOUNDS_DIR = path.join(__dirname, 'static/sounds');
const MD_DIR = path.join(__dirname, 'static/md');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve raw files live — no rebuild needed
app.use('/images', express.static(IMAGES_DIR));
app.use('/sounds', express.static(SOUNDS_DIR));
app.use('/md-files', express.static(MD_DIR));

// ✅ Mount SvelteKit app
app.use(handler);

app.listen(PORT, () => {
  console.log('');
  console.log('📦 Server running on http://localhost:' + PORT);
  console.log('🖼️  /images →', IMAGES_DIR);
  console.log('🔊  /sounds →', SOUNDS_DIR);
  console.log('🔊  /md →', MD_DIR);
});
