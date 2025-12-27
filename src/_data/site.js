const config = require("./site.config.json");

module.exports = {
  ...config,
  currentYear: new Date().getFullYear()
};

