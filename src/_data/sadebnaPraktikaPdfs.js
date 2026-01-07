const fs = require('fs');
const path = require('path');
const aktualnaPraktikaDocs = require('./aktualnaPraktikaDocs.json');

module.exports = function() {
  const pdfsBasePath = path.join(process.cwd(), 'src/assets/sadebna-praktika');
  const result = {};
  
  // Get all category folders
  const categories = [
    'srednotelezna-povreda',
    'tezhko-postradali',
    'imushtestveni-vredi',
    'naslednitsi-zlopoluki'
  ];
  
  categories.forEach(slug => {
    const categoryPath = path.join(pdfsBasePath, slug);
    const pdfs = [];
    
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath);
      files.forEach(file => {
        if (file.toLowerCase().endsWith('.pdf')) {
          pdfs.push({
            filename: file,
            url: `/assets/sadebna-praktika/${slug}/${file}`,
            name: file.replace('.pdf', '').replace(/-/g, ' ')
          });
        }
      });
      
      // Sort by filename (descending for newest first)
      pdfs.sort((a, b) => b.filename.localeCompare(a.filename));
    }
    
    result[slug] = pdfs;
  });
  
  // Handle aktualna-praktika with year/month mapping
  // Use paths from JSON to reference existing PDFs from any folder
  const aktualnaPdfs = [];
  
  aktualnaPraktikaDocs.documents.forEach(doc => {
    // Path in JSON is relative to src/assets/
    const filePath = path.join(process.cwd(), 'src/assets', doc.path);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Extract filename from path for display
      const filename = path.basename(doc.path);
      
      // Extract year from filename (look for 4-digit year)
      const yearMatch = filename.match(/(\d{4})/);
      const yearFromFilename = yearMatch ? parseInt(yearMatch[1]) : null;
      
      aktualnaPdfs.push({
        filename: filename,
        url: `/assets/${doc.path}`,
        name: doc.title || filename.replace('.pdf', '').replace(/-/g, ' '),
        year: yearFromFilename, // Use year from filename, not from JSON
        month: doc.month
      });
    }
  });
  
  // Sort by year and month (newest first)
  aktualnaPdfs.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.month - a.month;
  });
  
  result['aktualna-praktika'] = aktualnaPdfs;
  
  return result;
};

