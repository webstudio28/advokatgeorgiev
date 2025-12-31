const sadebnaPraktikaPdfs = require('./sadebnaPraktikaPdfs.js');

module.exports = function() {
  const allPdfs = sadebnaPraktikaPdfs();
  const aktualnaPdfs = allPdfs['aktualna-praktika'] || [];
  
  // Group by year
  const groupedByYear = {};
  const years = [];
  
  aktualnaPdfs.forEach(pdf => {
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
  
  // Sort documents within each year by month (descending)
  Object.keys(groupedByYear).forEach(year => {
    groupedByYear[year].sort((a, b) => {
      if (b.month !== a.month) return b.month - a.month;
      return 0;
    });
  });
  
  return {
    years: years,
    documentsByYear: groupedByYear
  };
};

