/**
 * Converts the high-resolution source artwork in /art-source into
 * web-optimised WebP files in /src/assets/illustrations.
 *
 * Usage: npm run images
 */
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('art-source');
const OUT = path.resolve('src/assets/illustrations');

/** name -> output width (px). Widths are ~2x the largest rendered size. */
const jobs = [
  { name: 'ganesha', width: 520, quality: 82 },
  { name: 'floral-corner', width: 560, quality: 80 },
  { name: 'mehendi', width: 760, quality: 78 },
  { name: 'mandap', width: 760, quality: 78 },
  { name: 'vidaai', width: 760, quality: 78 },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = path.join(SRC, `${job.name}.png`);
  const output = path.join(OUT, `${job.name}.webp`);
  await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(output);
  const { size } = await stat(output);
  console.log(`✔ ${job.name}.webp  ${(size / 1024).toFixed(1)} KB`);
}
