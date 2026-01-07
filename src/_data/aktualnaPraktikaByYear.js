const sadebnaPraktikaPdfs = require('./sadebnaPraktikaPdfs.js');

module.exports = function() {
  const allPdfs = sadebnaPraktikaPdfs();
  const aktualnaPdfs = allPdfs['aktualna-praktika'] || [];
  
  // Group by year
  const groupedByYear = {};
  const years = [];
  
  aktualnaPdfs.forEach(pdf => {
    // Use year extracted from filename
    if (pdf.year) {
      if (!groupedByYear[pdf.year]) {
        groupedByYear[pdf.year] = [];
        years.push(pdf.year);
      }
      groupedByYear[pdf.year].push(pdf);
    }
  });
  
  // Sort years descending
  years.sort((a, b) => b - a);
  
  // Sort documents within each year by filename (descending)
  Object.keys(groupedByYear).forEach(year => {
    groupedByYear[year].sort((a, b) => {
      return b.filename.localeCompare(a.filename);
    });
  });
  
  return {
    years: years,
    documentsByYear: groupedByYear
  };
};

