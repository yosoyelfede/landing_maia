// Date parsing utility for blog posts
// Handles both ISO dates and Spanish date formats

export const parseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  
  console.log(`parseDate called with: "${dateStr}"`);
  
  // First try to parse as ISO date (for createdAt fields)
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    console.log(`  Parsed as ISO date: ${isoDate.toISOString()}`);
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
    
    console.log(`  Parsing Spanish date: day=${day}, month=${month}, year=${year}`);
    
    // Convert month names to numbers (0-based for JavaScript Date)
    const months = {
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };
    
    const monthNum = months[month];
    if (monthNum !== undefined && !isNaN(day) && !isNaN(year)) {
      const result = new Date(year, monthNum, day);
      console.log(`  Successfully parsed Spanish date: ${result.toISOString()}`);
      return result;
    } else {
      console.log(`  Failed to parse Spanish date: monthNum=${monthNum}, day=${day}, year=${year}`);
    }
  } else {
    console.log(`  Wrong number of parts: ${parts.length} (expected 3)`);
  }
  
  // Fallback to epoch time if parsing fails
  console.log(`  Falling back to epoch time`);
  return new Date(0);
};

export const sortPostsByDate = (posts, newestFirst = true) => {
  console.log(`=== SORTING ${posts.length} POSTS ===`);
  
  return [...posts].sort((a, b) => {
    // ALWAYS use the date field first, fallback to createdAt only if date is missing
    const dateA = parseDate(a.date || a.createdAt);
    const dateB = parseDate(b.date || b.createdAt);
    
    console.log(`Comparing: "${a.title}" (${a.date || a.createdAt}) -> ${dateA.toISOString()}`);
    console.log(`Comparing: "${b.title}" (${b.date || b.createdAt}) -> ${dateB.toISOString()}`);
    
    if (newestFirst) {
      const result = dateB - dateA;
      console.log(`  Result: ${result} (${result > 0 ? 'b before a' : result < 0 ? 'a before b' : 'equal'})`);
      return result;
    } else {
      const result = dateA - dateB;
      console.log(`  Result: ${result} (${result > 0 ? 'a before b' : result < 0 ? 'b before a' : 'equal'})`);
      return result;
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
  
  console.log("=== DATE PARSING TEST RESULTS ===");
  testDates.forEach(dateStr => {
    const parsed = parseDate(dateStr);
    console.log(`${dateStr} -> ${parsed.toISOString()}`);
  });
  
  // Test sorting
  const testPosts = [
    { title: "Post 1", date: "2 Julio 2025" },
    { title: "Post 2", date: "25 Junio 2025" },
    { title: "Post 3", date: "12 Agosto 2025" }
  ];
  
  console.log("=== SORTING TEST ===");
  const sorted = sortPostsByDate(testPosts, true);
  console.log("Sorted posts (newest first):", sorted.map(p => `${p.title}: ${p.date}`));
};
