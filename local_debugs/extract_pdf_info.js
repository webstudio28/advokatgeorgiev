const fs = require('fs');
const path = require('path');

const pdfsBasePath = path.join(__dirname, '../src/assets/sadebna-praktika');
const result = [];

// Month names in Bulgarian (various forms)
const monthMap = {
  'януари': 1, 'ян': 1, '01': 1, '1.': 1,
  'февруари': 2, 'фев': 2, '02': 2, '2.': 2,
  'март': 3, 'мар': 3, '03': 3, '3.': 3,
  'април': 4, 'апр': 4, '04': 4, '4.': 4,
  'май': 5, '05': 5, '5.': 5,
  'юни': 6, 'юн': 6, '06': 6, '6.': 6,
  'юли': 7, 'юл': 7, '07': 7, '7.': 7,
  'август': 8, 'авг': 8, '08': 8, '8.': 8,
  'септември': 9, 'сеп': 9, '09': 9, '9.': 9,
  'октомври': 10, 'окт': 10, '10': 10, '10.': 10,
  'ноември': 11, 'ное': 11, '11': 11, '11.': 11,
  'декември': 12, 'дек': 12, '12': 12, '12.': 12
};

function extractYearFromFilename(filename) {
  const yearMatch = filename.match(/(\d{4})/);
  return yearMatch ? parseInt(yearMatch[1]) : null;
}

function findMonthInText(text) {
  if (!text) return 1;
  
  const lowerText = text.toLowerCase();
  
  // First try Bulgarian month names
  for (const [monthName, monthNum] of Object.entries(monthMap)) {
    if (lowerText.includes(monthName)) {
      return monthNum;
    }
  }
  
  // Try date patterns: DD.MM.YYYY or DD/MM/YYYY
  const datePatterns = [
    /(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})/,  // DD.MM.YYYY
    /(\d{4})[.\/](\d{1,2})[.\/](\d{1,2})/,  // YYYY.MM.DD
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      // For DD.MM.YYYY, month is match[2]
      // For YYYY.MM.DD, month is match[2]
      const month = parseInt(match[2]);
      if (month >= 1 && month <= 12) {
        return month;
      }
    }
  }
  
  return 1; // Default to January if not found
}

// Get all PDF files
const categories = ['srednotelezna-povreda', 'tezhko-postradali', 'imushtestveni-vredi', 'naslednitsi-zlopoluki', 'aktualna-praktika'];

categories.forEach(category => {
  const categoryPath = path.join(pdfsBasePath, category);
  if (fs.existsSync(categoryPath)) {
    const files = fs.readdirSync(categoryPath).filter(f => f.toLowerCase().endsWith('.pdf'));
    
    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const relativePath = `sadebna-praktika/${category}/${file}`;
      
      // Extract year from filename
      const year = extractYearFromFilename(file);
      
      // Try to read PDF text (read larger portion to find dates)
      let month = 1; // Default
      try {
        const buffer = fs.readFileSync(filePath);
        // Read first 20KB of PDF and convert to text (PDFs have text embedded)
        // Look for readable text patterns
        const textStart = buffer.toString('utf8', 0, Math.min(20000, buffer.length));
        // Also try latin1 encoding which sometimes works better for PDFs
        const textStart2 = buffer.toString('latin1', 0, Math.min(20000, buffer.length));
        
        // Combine both attempts
        const combinedText = textStart + ' ' + textStart2;
        month = findMonthInText(combinedText);
        
        // If still default, try filename
        if (month === 1) {
          month = findMonthInText(file);
        }
      } catch (err) {
        // Try filename as fallback
        month = findMonthInText(file);
      }
      
      result.push({
        path: relativePath,
        year: year || new Date().getFullYear(),
        month: month,
        title: file.replace('.pdf', '').replace(/-/g, ' ')
      });
    });
  }
});

// Sort by year and month (newest first)
result.sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  return b.month - a.month;
});

console.log(JSON.stringify({ documents: result }, null, 2));

