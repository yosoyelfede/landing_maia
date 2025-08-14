// Date parsing utility for blog posts
// Handles both ISO dates and Spanish date formats

export const parseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  
  // First try to parse as ISO date (for createdAt fields)
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }
  
  // If that fails, try to parse Spanish date format
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    // Format: "12 Agosto 2025" or "2 Julio 2025"
    const day = parseInt(parts[0]);
    const month = parts[1];
    const year = parseInt(parts[2]);
    
    // Convert month names to numbers (0-based for JavaScript Date)
    const months = {
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };
    
    const monthNum = months[month];
    if (monthNum !== undefined && !isNaN(day) && !isNaN(year)) {
      return new Date(year, monthNum, day);
    }
  }
  
  // Fallback to epoch time if parsing fails
  return new Date(0);
};

export const sortPostsByDate = (posts, newestFirst = true) => {
  return [...posts].sort((a, b) => {
    const dateA = parseDate(a.createdAt || a.date);
    const dateB = parseDate(b.createdAt || b.date);
    
    if (newestFirst) {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });
};

// Test function to verify date parsing
export const testDateParsing = () => {
  const testDates = [
    "2025-08-14T03:02:35.924Z",
    "12 Agosto 2025",
    "2 Julio 2025",
    "25 Junio 2025",
    "30 Julio 2025"
  ];
  
  console.log("Date parsing test results:");
  testDates.forEach(dateStr => {
    const parsed = parseDate(dateStr);
    console.log(`${dateStr} -> ${parsed.toISOString()}`);
  });
};
