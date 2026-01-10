/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Generates optimized copies of the biggest images (keeps originals intact).
// Output naming: <name>-optimized.<ext>
//
// Run:
//   node scripts/optimize-images.js

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "src", "assets", "images");

/** @type {Array<{file:string, kind:'jpg'|'png', maxWidth?:number, quality?:number}>} */
const TARGETS = [
  { file: "hero-bg.jpg", kind: "jpg", maxWidth: 1920, quality: 70 },
  { file: "example-post.jpg", kind: "jpg", maxWidth: 1400, quality: 75 },
  { file: "article1.jpg", kind: "jpg", maxWidth: 1400, quality: 75 },
  { file: "article2.jpg", kind: "jpg", maxWidth: 1400, quality: 75 },
  // PNGs
  { file: "about-me.png", kind: "png", maxWidth: 900 },
  { file: "hero-img.png", kind: "png", maxWidth: 900 },
];

function formatKB(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function optimizeOne(target) {
  const input = path.join(IMAGES_DIR, target.file);
  if (!fs.existsSync(input)) {
    console.warn(`Skip (missing): ${target.file}`);
    return;
  }

  const before = fs.statSync(input).size;
  const ext = path.extname(target.file);
  const base = target.file.slice(0, -ext.length);
  const output = path.join(IMAGES_DIR, `${base}-optimized${ext}`);

  const img = sharp(input, { failOn: "none" });
  const meta = await img.metadata();

  let pipeline = sharp(input, { failOn: "none" });
  if (target.maxWidth && meta.width && meta.width > target.maxWidth) {
    pipeline = pipeline.resize({ width: target.maxWidth, withoutEnlargement: true });
  }

  if (target.kind === "jpg") {
    const quality = typeof target.quality === "number" ? target.quality : 75;
    await pipeline
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(output);
  } else {
    // Keep PNG, but compress strongly. palette=true can reduce size a lot for UI-ish PNGs.
    await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
      .toFile(output);
  }
  const after = fs.statSync(output).size;
  const delta = before - after;

  console.log(
    `${target.file} -> ${path.basename(output)}: ${formatKB(before)} → ${formatKB(after)} (${delta >= 0 ? "-" : "+"}${formatKB(Math.abs(delta))})`
  );
}

async function main() {
  console.log(`Optimizing images in: ${IMAGES_DIR}`);
  for (const t of TARGETS) {
    // eslint-disable-next-line no-await-in-loop
    await optimizeOne(t);
  }
  console.log("Done.");
  console.log("Note: originals were not modified; new files were created as *-optimized.*");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


