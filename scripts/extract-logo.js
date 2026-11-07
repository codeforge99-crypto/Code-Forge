import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'public/logo.jpg';
  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function extractRegion(minX, minY, w, h) {
    const outBuf = Buffer.alloc(w * h * 4);

    for (let dy = 0; dy < h; dy++) {
      const srcY = minY + dy;
      for (let dx = 0; dx < w; dx++) {
        const srcX = minX + dx;
        const outIdx = (dy * w + dx) * 4;

        if (srcX < 0 || srcX >= width || srcY < 0 || srcY >= height) {
          outBuf[outIdx + 3] = 0;
          continue;
        }

        const srcIdx = (srcY * width + srcX) * channels;
        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];
        const brightness = (r + g + b) / 3;

        let alpha = 0;
        if (brightness <= 65) {
          alpha = 255;
        } else if (brightness >= 125) {
          alpha = 0;
        } else {
          alpha = Math.round(255 * (1 - (brightness - 65) / 60));
        }

        outBuf[outIdx] = 255;
        outBuf[outIdx + 1] = 255;
        outBuf[outIdx + 2] = 255;
        outBuf[outIdx + 3] = alpha;
      }
    }

    return sharp(outBuf, {
      raw: { width: w, height: h, channels: 4 }
    });
  }

  // 1. Full Logo (CF Monogram + CODEFORGE + BUILD • INNOVATE • GROW)
  const fullLogo = extractRegion(175, 185, 680, 325);
  await fullLogo.png().toFile('public/logo-full-white.png');
  console.log('Saved public/logo-full-white.png');

  // 2. CF Monogram (Exact Emblem)
  // Exact bounds: minX: 357, minY: 192, width: 318, height: 176
  const cfMark = extractRegion(357, 192, 318, 176);
  await cfMark.png().toFile('public/logo-mark-white.png');
  console.log('Saved public/logo-mark-white.png');

  // 3. Square Favicon: Center the 318x176 mark in a 320x320 transparent canvas
  const squareSize = 320;
  const padTop = Math.round((squareSize - 176) / 2);
  const padLeft = Math.round((squareSize - 318) / 2);

  const squareMarkBuffer = await cfMark
    .extend({
      top: padTop,
      bottom: squareSize - 176 - padTop,
      left: padLeft,
      right: squareSize - 318 - padLeft,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  await sharp(squareMarkBuffer).resize(64, 64).png().toFile('public/favicon.png');
  await sharp(squareMarkBuffer).resize(32, 32).png().toFile('public/favicon-32.png');
  await sharp(squareMarkBuffer).resize(192, 192).png().toFile('public/favicon-192.png');
  await sharp(squareMarkBuffer).resize(32, 32).png().toFile('public/favicon.ico');

  const base64Mark = (await sharp(squareMarkBuffer).resize(128, 128).png().toBuffer()).toString('base64');
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <image width="128" height="128" href="data:image/png;base64,${base64Mark}" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgFavicon);
  console.log('Generated all favicons cleanly!');
}

processLogo().catch(console.error);
