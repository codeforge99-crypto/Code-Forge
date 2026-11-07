import fs from 'fs';
import zlib from 'zlib';

// Generate a crisp 32x32 RGBA PNG with a glowing cyan border and bold white 'C' and cyan 'F'
const width = 32;
const height = 32;

// RGBA buffer
const buffer = Buffer.alloc(width * height * 4, 0);

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = (y * width + x) * 4;
  buffer[idx] = r;
  buffer[idx + 1] = g;
  buffer[idx + 2] = b;
  buffer[idx + 3] = a;
}

// Background: deep dark squircle #07090e with cyan border #00f2fe
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // Check squircle distance
    const dx = Math.abs(x - 15.5);
    const dy = Math.abs(y - 15.5);
    const r = Math.pow(dx, 3.5) / Math.pow(14.5, 3.5) + Math.pow(dy, 3.5) / Math.pow(14.5, 3.5);
    
    if (r <= 1.0) {
      if (r >= 0.72) {
        // Cyan border
        setPixel(x, y, 0, 242, 254, 255);
      } else {
        // Deep background
        setPixel(x, y, 7, 9, 14, 255);
      }
    }
  }
}

// Draw bold white 'C' on left (x from 7 to 18, y from 7 to 24)
// Draw bold cyan 'F' on right (x from 15 to 25, y from 7 to 24)
// Let's create a 32x32 bitmap pattern:
const cMask = [
  "   ########     ",
  "  ##########    ",
  " ###      ###   ",
  "###        ##   ",
  "###             ",
  "###             ",
  "###             ",
  "###             ",
  "###             ",
  "###        ##   ",
  " ###      ###   ",
  "  ##########    ",
  "   ########     "
];

const fMask = [
  "############    ",
  "############    ",
  "###      ###    ",
  "###       ##    ",
  "###             ",
  "########        ",
  "########        ",
  "###             ",
  "###             ",
  "###             ",
  "###             ",
  "###             ",
  "###             "
];

// Paint C (white: 255, 255, 255)
for (let r = 0; r < cMask.length; r++) {
  for (let c = 0; c < cMask[r].length; c++) {
    if (cMask[r][c] === '#') {
      const px = 6 + c;
      const py = 9 + r;
      setPixel(px, py, 255, 255, 255, 255);
    }
  }
}

// Paint F (electric cyan: 0, 242, 254)
for (let r = 0; r < fMask.length; r++) {
  for (let c = 0; c < fMask[r].length; c++) {
    if (fMask[r][c] === '#') {
      const px = 14 + c;
      const py = 9 + r;
      setPixel(px, py, 0, 242, 254, 255);
    }
  }
}

// Paint energy dot at (25, 23)
setPixel(24, 22, 0, 242, 254, 255);
setPixel(25, 22, 0, 242, 254, 255);
setPixel(24, 23, 0, 242, 254, 255);
setPixel(25, 23, 0, 242, 254, 255);

// Encode as PNG
function createPNG(w, h, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  
  const ihdrChunk = makeChunk('IHDR', ihdr);
  
  // Raw scanlines with filter byte 0
  const scanlines = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y++) {
    scanlines[y * (w * 4 + 1)] = 0; // Filter 0
    rgba.copy(scanlines, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  
  const idatData = zlib.deflateSync(scanlines);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const pngData = createPNG(width, height, buffer);
fs.writeFileSync('./public/favicon.png', pngData);
fs.writeFileSync('./public/favicon.ico', pngData);
console.log('favicon.png and favicon.ico generated successfully! Size:', pngData.length);

