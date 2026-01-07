const fs = require("fs");
const path = require("path");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copy(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function main() {
  const root = process.cwd();
  const vendorDir = path.join(root, "src", "assets", "vendor", "pdfjs");

  const pdfjsDist = path.join(root, "node_modules", "pdfjs-dist", "build");
  const pdfSrc = path.join(pdfjsDist, "pdf.min.mjs");
  const workerSrc = path.join(pdfjsDist, "pdf.worker.min.mjs");

  if (!fs.existsSync(pdfSrc) || !fs.existsSync(workerSrc)) {
    console.error("[copy-pdfjs] Missing pdfjs-dist build files. Did you run npm install?");
    process.exit(1);
  }

  ensureDir(vendorDir);
  copy(pdfSrc, path.join(vendorDir, "pdf.min.mjs"));
  copy(workerSrc, path.join(vendorDir, "pdf.worker.min.mjs"));

  console.log("[copy-pdfjs] Copied PDF.js to src/assets/vendor/pdfjs/");
}

main();


