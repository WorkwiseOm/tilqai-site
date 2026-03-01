// Resize favicon.png to 256x256 using sharp
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '../public/favicon.png');
const out = path.join(__dirname, '../public/favicon.png');

await sharp(src)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(out + '.tmp');

import { renameSync } from 'fs';
renameSync(out + '.tmp', out);
console.log('favicon.png resized and compressed ✓');
