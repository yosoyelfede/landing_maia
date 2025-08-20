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
  // Handle both "12 Agosto 2025" and "13 de agosto de 2025" formats
  let parts = dateStr.split(' ');
  
  // Remove "de" if present
  parts = parts.filter(part => part !== 'de');
  
  if (parts.length === 3) {
    // Format: "12 Agosto 2025" or "13 agosto 2025"
    const day = parseInt(parts[0]);
    const month = parts[1];
    const year = parseInt(parts[2]);
    
    // Convert month names to numbers (0-based for JavaScript Date)
    const months = {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };
    
    const monthNum = months[month.toLowerCase()]; // Convert input month to lowercase
    if (monthNum !== undefined && !isNaN(day) && !isNaN(year)) {
      return new Date(year, monthNum, day);
    }
  }
  
  // Fallback to epoch time if parsing fails
  return new Date(0);
};

export const sortPostsByDate = (posts, newestFirst = true) => {
  return [...posts].sort((a, b) => {
    // ALWAYS use the date field first, fallback to createdAt only if date is missing
    const dateA = parseDate(a.date || a.createdAt);
    const dateB = parseDate(b.date || b.createdAt);
    
    if (newestFirst) {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
};


