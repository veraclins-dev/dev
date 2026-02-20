#!/usr/bin/env node
/**
 * One-time script: generate favicon.ico from logo-square.svg and write to both template public dirs.
 * Run from repo root: node scripts/generate-favicon-from-svg.mjs
 * Requires: run from packages/image so sharp resolves, e.g.
 *   cd packages/image && node ../../scripts/generate-favicon-from-svg.mjs
 * Or install sharp at root and run: node scripts/generate-favicon-from-svg.mjs
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'packages/starter-templates/templates/base/public/logo-square.svg');

// Resolve sharp from packages/image (when run from repo root, NODE_PATH=packages/image/node_modules or run from packages/image)
const require = createRequire(join(root, 'packages/image/package.json'));
const sharp = require('sharp');
const svg = readFileSync(svgPath);
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();

// ICO format: header (6) + directory entry (16) + PNG data
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4); // 1 image
const entry = Buffer.alloc(16);
entry[0] = 32; // width
entry[1] = 32; // height
entry[2] = 0;  // color palette
entry[3] = 0;  // reserved
entry.writeUInt16LE(1, 4);   // color planes
entry.writeUInt16LE(32, 6);  // bits per pixel
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(22, 12); // offset to image data (6+16)
const ico = Buffer.concat([header, entry, png32]);

const outPaths = [
  join(root, 'packages/starter-templates/templates/base/public/favicon.ico'),
  join(root, 'dist/packages/starter-cli/templates/base/public/favicon.ico'),
];
for (const outPath of outPaths) {
  writeFileSync(outPath, ico);
  console.log('Wrote', outPath);
}
console.log('Done. favicon.ico generated from logo-square.svg.');
