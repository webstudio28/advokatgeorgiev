const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
dotenv.config();
 
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Root favicon logo (lives in src/logo.png so it outputs to /logo.png)
  eleventyConfig.addPassthroughCopy({ "src/logo.png": "logo.png" });
  // Copy logo.png as favicon.ico for browsers that auto-check /favicon.ico
  eleventyConfig.addPassthroughCopy({ "src/logo.png": "favicon.ico" });
  eleventyConfig.addPassthroughCopy(".htaccess");

  // Initialize markdown-it
  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  // Filter to read file contents
  eleventyConfig.addFilter("readFile", function(filePath) {
    try {
      if (!filePath) return '';
      const fullPath = path.join(process.cwd(), filePath);
      return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return '';
    }
  });

  // Filter to render markdown
  eleventyConfig.addFilter("markdown", function(content) {
    if (!content) return '';
    return md.render(content);
  });

  // Filter to format dates (expects YYYY-MM-DD or Date)
  eleventyConfig.addFilter("formatDate", function(value) {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return new Intl.DateTimeFormat("bg-BG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(d);
  });
 
  // Expose env vars if needed in templates (keep debug optional)
  if (process.env.MAIL_KEY) {
    console.log("Loaded API key:", process.env.MAIL_KEY);
  }
  eleventyConfig.addGlobalData("mailKey", process.env.MAIL_KEY || "");
 
  // Determine pathPrefix: use explicit env or default to root
  const pathPrefix = process.env.PATH_PREFIX || process.env.ELEVENTY_PATH_PREFIX || "/";
 
  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};