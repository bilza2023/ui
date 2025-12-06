// generate_sheet.js
// Usage: node generate_sheet.js ayah.csv FONT_PATH SURAH START_AYAH OUT_DIR
//
// Example:
// node generate_sheet.js ayah.csv "./fonts/NotoNaskhArabic-Regular.ttf" 67 1 out

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');
const arabicReshaper = require('arabic-reshaper');
const bidi = require('bidi-js'); // provides bidi.getDisplay or similar
const parse = require('csv-parse/lib/sync');

// -------- CONFIG (edit if needed) ----------
const CELL_W = 2560;
const CELL_H = 1280;
const COLS = 6;
const ROWS = 5;
const SCENES_PER_SHEET = COLS * ROWS;
const SHEET_W = CELL_W * COLS; // 15360
const SHEET_H = CELL_H * ROWS; // 6400

const BG_COLOR = '#EEDFBF';      // beige
const GRID_COLOR = '#1E1E1E';
const GRID_WIDTH = 6;
const TEXT_COLOR = '#0A3C0A';    // dark green
const LABEL_FONT_SIZE = 36;
const AYAH_FONT_SIZE = 64;
const TEXT_MARGIN_TOP = 40;
const TEXT_BOX_HEIGHT = 220;

// -------------------------------------------

function reshapeArabic(text) {
  try {
    const reshaped = arabicReshaper.reshape(text || '');
    // bidi.getDisplay returns visual order string (library name: bidi-js)
    const displayed = bidi.getVisualString ? bidi.getVisualString(reshaped) : bidi.getDisplay(reshaped);
    return displayed;
  } catch (e) {
    return text;
  }
}

function loadCSV(csvPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  // Accept CSV rows like: surah,ayah,arabic_text
  const records = parse(raw, { trim: true, skip_empty_lines: true });
  const out = [];
  for (let r of records) {
    if (!r[0] || isNaN(parseInt(r[0]))) continue;
    const surah = parseInt(r[0]);
    const ayah = parseInt(r[1]);
    const text = r.slice(2).join(',').trim();
    out.push({ surah, ayah, text });
  }
  return out;
}

function makeDirs(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Main
async function main() {
  if (process.argv.length < 7) {
    console.log('Usage: node generate_sheet.js ayah.csv FONT_PATH SURAH START_AYAH OUT_DIR');
    process.exit(1);
  }

  const csvPath = process.argv[2];
  const fontPath = process.argv[3];
  const surahArg = parseInt(process.argv[4], 10);
  const startAyah = parseInt(process.argv[5], 10); // starting ayah number (within that surah)
  const outDir = process.argv[6];

  const ayahList = loadCSV(csvPath);

  // filter rows for the requested surah and ayah >= startAyah (in-case CSV contains multiple surahs)
  const filtered = ayahList.filter(r => r.surah === surahArg && r.ayah >= startAyah)
    .sort((a,b) => a.ayah - b.ayah)
    .slice(0, SCENES_PER_SHEET); // take 30 only

  if (filtered.length === 0) {
    console.error('No ayahs found for that surah/start ayah combination.');
    process.exit(2);
  }

  // Register font
  registerFont(fontPath, { family: 'AyahFont' });

  makeDirs(outDir);
  makeDirs(path.join(outDir, 'crops'));

  const canvas = createCanvas(SHEET_W, SHEET_H);
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, SHEET_W, SHEET_H);

  // grid lines
  ctx.fillStyle = GRID_COLOR;
  for (let c = 1; c < COLS; c++) {
    const x = c * CELL_W;
    ctx.fillRect(x - GRID_WIDTH/2, 0, GRID_WIDTH, SHEET_H);
  }
  for (let r = 1; r < ROWS; r++) {
    const y = r * CELL_H;
    ctx.fillRect(0, y - GRID_WIDTH/2, SHEET_W, GRID_WIDTH);
  }
  // border
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 4;
  ctx.strokeRect(0.5, 0.5, SHEET_W-1, SHEET_H-1);

  // draw cells
  const manifest = [];
  for (let i = 0; i < SCENES_PER_SHEET; i++) {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const originX = c * CELL_W;
    const originY = r * CELL_H;

    const entry = filtered[i];
    if (!entry) {
      // leave blank
      continue;
    }

    // draw surah:ayah label top-left
    ctx.font = `${LABEL_FONT_SIZE}px AyahFont`;
    ctx.fillStyle = "#333333";
    ctx.textBaseline = 'top';
    ctx.fillText(`${entry.surah}:${entry.ayah}`, originX + 20, originY + 10);

    // prepare Arabic text (reshape + bidi)
    const shaped = reshapeArabic(entry.text);

    // draw Arabic multiline, right-aligned within textbox
    ctx.font = `${AYAH_FONT_SIZE}px AyahFont`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = 'top';

    // simple wrap function for canvas (RTL: handle by measuring and aligning right)
    const maxW = CELL_W - 40;
    const words = shaped.split(' ');
    let lines = [];
    let cur = '';
    for (let w of words) {
      const candidate = (cur === '' ? w : cur + ' ' + w);
      const metrics = ctx.measureText(candidate);
      if (metrics.width <= maxW) {
        cur = candidate;
      } else {
        if (cur === '') {
          lines.push(candidate);
          cur = '';
        } else {
          lines.push(cur);
          cur = w;
        }
      }
    }
    if (cur) lines.push(cur);

    // draw lines (limit to ~6)
    let y = originY + TEXT_MARGIN_TOP;
    const maxLines = 6;
    for (let li = 0; li < Math.min(lines.length, maxLines); li++) {
      const line = lines[li];
      const w = ctx.measureText(line).width;
      // right aligned inside cell (x = originX + CELL_W - 20)
      const x = originX + CELL_W - 20;
      // use fillText with right alignment by adjusting x position
      ctx.fillText(line, x - w, y);
      y += AYAH_FONT_SIZE * 1.2;
    }

    // record manifest
    const sheetName = `sheet_s${surahArg}_start${startAyah}.png`;
    const cropName = `crops/s${entry.surah.toString().padStart(3,'0')}_a${entry.ayah.toString().padStart(3,'0')}.png`;
    manifest.push({
      surah: entry.surah,
      ayah: entry.ayah,
      sheet: sheetName,
      col: c,
      row: r,
      pixel_x: originX,
      pixel_y: originY,
      crop: cropName
    });
  }

  // write sheet
  const sheetOut = path.join(outDir, manifest.length ? manifest[0].sheet : `sheet_s${surahArg}_start${startAyah}.png`);
  const outStream = fs.createWriteStream(sheetOut);
  const stream = canvas.createPNGStream();
  stream.pipe(outStream);
  outStream.on('finish', () => {
    console.log('Sheet saved:', sheetOut);

    // Save crops
    const sheetImageBuffer = canvas.toBuffer('image/png');
    // Use canvas to crop and save each crop
    for (let e of manifest) {
      const cropCanvas = createCanvas(CELL_W, CELL_H);
      const cropCtx = cropCanvas.getContext('2d');
      const img = new Image();
      // Node-canvas: we can draw from sheet buffer by creating an image via loadImage
    }
  });

  // Instead of loading back buffer into Image, do simpler: create crops by copying from main ctx
  // Unfortunately node-canvas doesn't expose direct crop function; but we can create a new canvas and drawImage from main canvas
  // Wait for sheet saved, then perform crop
  outStream.on('close', async () => {
    // load the saved sheet via loadImage
    const img = await loadImage(sheetOut);
    for (let e of manifest) {
      const cropCanvas = createCanvas(CELL_W, CELL_H);
      const cropCtx = cropCanvas.getContext('2d');
      cropCtx.drawImage(img, e.pixel_x, e.pixel_y, CELL_W, CELL_H, 0, 0, CELL_W, CELL_H);
      const cropPath = path.join(outDir, e.crop);
      const out = fs.createWriteStream(cropPath);
      const stream2 = cropCanvas.createPNGStream();
      stream2.pipe(out);
      await new Promise(res => out.on('finish', res));
      console.log('Wrote crop', cropPath);
    }
    // write manifest.json
    const manifestPath = path.join(outDir, `manifest_s${surahArg}_start${startAyah}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Manifest written to', manifestPath);
  });

}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
