/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Generates responsive image variants into src/assets/images with the pattern:
//   <name>-w<width>.<ext>
//
// Example:
//   hero-bg.jpg -> hero-bg-w640.jpg, hero-bg-w1024.jpg, ...
//
// Run:
//   node scripts/generate-responsive-images.js

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "src", "assets", "images");

/** @type {Array<{file:string, widths:number[], kind:'jpg'|'png', quality?:number}>} */
const JOBS = [
  { file: "hero-bg.jpg", kind: "jpg", quality: 70, widths: [640, 1024, 1600, 1920] },

  // Article hero / card images (already optimized, now make smaller variants)
  { file: "example-post-optimized.jpg", kind: "jpg", quality: 75, widths: [480, 768, 1024, 1400] },
  { file: "article1-optimized.jpg", kind: "jpg", quality: 75, widths: [480, 768, 1024, 1400] },
  { file: "article2-optimized.jpg", kind: "jpg", quality: 75, widths: [480, 768, 1024, 1400] },

  // Other key images
  { file: "home-about.jpg", kind: "jpg", quality: 80, widths: [640, 960, 1200] },
  { file: "hero-img-optimized.png", kind: "png", widths: [480, 720, 900] },
  { file: "about-me-optimized.png", kind: "png", widths: [350, 700] },
];

function outPathFor(file, width) {
  const ext = path.extname(file);
  const base = file.slice(0, -ext.length);
  return path.join(IMAGES_DIR, `${base}-w${width}${ext}`);
}

async function generateVariant(inputPath, outputPath, width, kind, quality) {
  const img = sharp(inputPath, { failOn: "none" });
  const meta = await img.metadata();
  const sourceWidth = meta.width || 0;

  // Don't upscale
  const targetWidth = sourceWidth && sourceWidth < width ? sourceWidth : width;
  let pipeline = sharp(inputPath, { failOn: "none" }).resize({
    width: targetWidth,
    withoutEnlargement: true,
  });

  if (kind === "jpg") {
    const q = typeof quality === "number" ? quality : 75;
    await pipeline.jpeg({ quality: q, mozjpeg: true, progressive: true }).toFile(outputPath);
  } else {
    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true }).toFile(outputPath);
  }
}

async function main() {
  console.log(`Generating responsive variants in: ${IMAGES_DIR}`);

  for (const job of JOBS) {
    const input = path.join(IMAGES_DIR, job.file);
    if (!fs.existsSync(input)) {
      console.warn(`Skip (missing): ${job.file}`);
      continue;
    }

    for (const w of job.widths) {
      const output = outPathFor(job.file, w);
      if (fs.existsSync(output)) {
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      await generateVariant(input, output, w, job.kind, job.quality);
      console.log(`+ ${path.basename(output)}`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


