const dotenv = require('dotenv');
dotenv.config();
 
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy(".htaccess");

 
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