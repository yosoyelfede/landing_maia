/**
 * Enhanced Blog Post Template System
 * Phase 1: Foundation - Improved template generation and metadata extraction
 */

// Date parsing utilities with comprehensive Spanish/English support
const SPANISH_MONTHS = {
  'enero': 'January', 'febrero': 'February', 'marzo': 'March', 'abril': 'April',
  'mayo': 'May', 'junio': 'June', 'julio': 'July', 'agosto': 'August',
  'septiembre': 'September', 'octubre': 'October', 'noviembre': 'November', 'diciembre': 'December'
};

const ENGLISH_MONTHS = {
  'january': 'January', 'february': 'February', 'march': 'March', 'april': 'April',
  'may': 'May', 'june': 'June', 'july': 'July', 'august': 'August',
  'september': 'September', 'october': 'October', 'november': 'November', 'december': 'December'
};

/**
 * Parse and normalize date strings with comprehensive format support
 */
function parseDate(dateString) {
  if (!dateString) {
    return new Date();
  }

  try {
    // Handle various date formats
    let normalizedDate = dateString.trim();
    
    // Convert Spanish months to English
    Object.entries(SPANISH_MONTHS).forEach(([spanish, english]) => {
      normalizedDate = normalizedDate.replace(new RegExp(spanish, 'gi'), english);
    });
    
    // Handle different date patterns
    const patterns = [
      // "12 Agosto 2025" -> "12 August 2025"
      /(\d+)\s+([A-Za-z]+)\s+(\d{4})/,
      // "August 12, 2025" -> "August 12, 2025"
      /([A-Za-z]+)\s+(\d+),\s*(\d{4})/,
      // "2025-08-12" -> ISO format
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
      // "12/08/2025" -> "12/08/2025"
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/
    ];
    
    let parsedDate = null;
    
    for (const pattern of patterns) {
      const match = normalizedDate.match(pattern);
      if (match) {
        if (pattern.source.includes('\\d{4}')) {
          // Handle year-first format
          const [_, year, month, day] = match;
          parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else if (pattern.source.includes('\\d{1,2}\\/\\d{1,2}\\/\\d{4}')) {
          // Handle MM/DD/YYYY format
          const [_, month, day, year] = match;
          parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
          // Handle text month format
          const monthName = match[2] || match[1];
          const day = parseInt(match[1] || match[2]);
          const year = parseInt(match[3]);
          
          const monthIndex = Object.values(ENGLISH_MONTHS).indexOf(monthName);
          if (monthIndex !== -1) {
            parsedDate = new Date(year, monthIndex, day);
          }
        }
        break;
      }
    }
    
    // If no pattern matched, try direct parsing
    if (!parsedDate) {
      parsedDate = new Date(normalizedDate);
    }
    
    // Validate the parsed date
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date format: ${dateString}`);
    }
    
    return parsedDate;
  } catch (error) {
    console.warn(`Date parsing failed for "${dateString}":`, error.message);
    return new Date();
  }
}

/**
 * Clean and escape content for JSX
 */
function cleanContentForJSX(content) {
  if (!content) return '';
  
  return content
    // Escape backticks and template literals
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
    // Escape quotes in JSX attributes
    .replace(/(?<!\\\\)"/g, '\\"')
    // Handle newlines properly
    .replace(/\n/g, '\\n')
    // Remove any remaining problematic characters
    .replace(/\r/g, '')
    .trim();
}

/**
 * Validate JSX content structure
 */
function validateJSXContent(content) {
  if (!content) return { isValid: false, error: 'Content is empty' };
  
  // Check for basic JSX structure
  const hasOpeningTags = /<[^>]+>/.test(content);
  const hasClosingTags = /<\/[^>]+>/.test(content);
  
  if (!hasOpeningTags && !hasClosingTags) {
    return { isValid: false, error: 'Content appears to be plain text, JSX expected' };
  }
  
  // Check for balanced tags (basic validation)
  const openTags = content.match(/<([a-zA-Z][a-zA-Z0-9]*)/g) || [];
  const closeTags = content.match(/<\/([a-zA-Z][a-zA-Z0-9]*)/g) || [];
  
  if (openTags.length !== closeTags.length) {
    return { isValid: false, error: 'Unbalanced JSX tags detected' };
  }
  
  return { isValid: true };
}

/**
 * Generate comprehensive metadata object
 */
function generateMetadata(postData) {
  const { title, excerpt, author, date, slug, imageUrl, language = 'es' } = postData;
  
  // Parse and format date
  const publishedDate = parseDate(date);
  const publishedTime = publishedDate.toISOString();
  
  // Generate formatted date for display
  const displayDate = publishedDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Clean and validate title
  const cleanTitle = title ? title.trim() : 'Untitled Post';
  const cleanExcerpt = excerpt ? excerpt.trim() : '';
  const cleanAuthor = author ? author.trim() : 'Maia';
  
  // Validate image URL
  const cleanImageUrl = imageUrl && imageUrl.startsWith('/') ? imageUrl : '/images/blog/default.jpg';
  
  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      url: `https://maiavr.cl/blog/${slug}`,
      type: 'article',
      publishedTime,
      authors: [cleanAuthor],
      images: [{
        url: `https://maiavr.cl${cleanImageUrl}`,
        width: 1200,
        height: 630,
        alt: cleanTitle,
      }],
    },
    displayDate,
    publishedTime,
    author: cleanAuthor,
    imageUrl: cleanImageUrl,
    language
  };
}

/**
 * Enhanced blog post data file generator for hybrid CMS approach
 * Generates structured data files that can be consumed by dynamic routes
 */
export function generateBlogPostDataFile(postData) {
  try {
    // Validate input
    if (!postData || typeof postData !== 'object') {
      throw new Error('Invalid post data: must be an object');
    }
    
    const { title, content, slug } = postData;
    
    if (!title || !content || !slug) {
      throw new Error('Missing required fields: title, content, and slug are required');
    }
    
    // Generate metadata
    const metadata = generateMetadata(postData);
    
    // Clean content but keep it as HTML (not JSX)
    const cleanContent = content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
    
    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = cleanContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Generate the data file content
    const fileContent = `/**
 * Generated blog post data file
 * Auto-generated on: ${new Date().toISOString()}
 */

export const postData = {
  // Core metadata
  title: ${JSON.stringify(metadata.title)},
  slug: ${JSON.stringify(slug)},
  excerpt: ${JSON.stringify(metadata.description)},
  author: ${JSON.stringify(metadata.author)},
  date: ${JSON.stringify(metadata.displayDate)},
  publishedTime: ${JSON.stringify(metadata.publishedTime)},
  language: ${JSON.stringify(metadata.language)},
  
  // Content and media
  content: ${JSON.stringify(cleanContent)},
  imageUrl: ${JSON.stringify(metadata.imageUrl)},
  
  // Computed properties
  readingTime: ${readingTime},
  wordCount: ${wordCount},
  
  // SEO metadata
  metadata: {
    title: ${JSON.stringify(metadata.title)},
    description: ${JSON.stringify(metadata.description)},
    openGraph: {
      title: ${JSON.stringify(metadata.title)},
      description: ${JSON.stringify(metadata.description)},
      url: ${JSON.stringify(`https://maiavr.cl/blog/${slug}`)},
      type: 'article',
      publishedTime: ${JSON.stringify(metadata.publishedTime)},
      authors: [${JSON.stringify(metadata.author)}],
      images: [{
        url: ${JSON.stringify(`https://maiavr.cl${metadata.imageUrl}`)},
        width: 1200,
        height: 630,
        alt: ${JSON.stringify(metadata.title)},
      }],
    },
  },
  
  // System metadata
  createdAt: ${JSON.stringify(new Date().toISOString())},
  updatedAt: ${JSON.stringify(new Date().toISOString())},
  fileVersion: "1.0.0",
  generatedBy: "enhanced-cms-v2"
};

// Export individual properties for convenience
export const {
  title,
  slug,
  excerpt,
  author,
  date,
  publishedTime,
  language,
  content,
  imageUrl,
  readingTime,
  wordCount,
  metadata
} = postData;

// Default export for easy importing
export default postData;
`;

    return fileContent;
  } catch (error) {
    console.error('Error generating blog post data file:', error);
    throw new Error(`Failed to generate blog post data file: ${error.message}`);
  }
}

/**
 * Legacy blog post file generator (full component) - kept for backward compatibility
 * @deprecated Use generateBlogPostDataFile for new hybrid approach
 */
export function generateBlogPostFile(postData) {
  try {
    // Validate input
    if (!postData || typeof postData !== 'object') {
      throw new Error('Invalid post data: must be an object');
    }
    
    const { title, content, slug } = postData;
    
    if (!title || !content || !slug) {
      throw new Error('Missing required fields: title, content, and slug are required');
    }
    
    // Validate JSX content
    const contentValidation = validateJSXContent(content);
    if (!contentValidation.isValid) {
      throw new Error(`Content validation failed: ${contentValidation.error}`);
    }
    
    // Generate metadata
    const metadata = generateMetadata(postData);
    
    // Clean content for JSX
    const cleanContent = cleanContentForJSX(content);
    
    // Generate the complete file content using new dynamic layout approach
    const fileContent = `import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: ${JSON.stringify(metadata.title)},
  description: ${JSON.stringify(metadata.description)},
  openGraph: {
    title: ${JSON.stringify(metadata.title)},
    description: ${JSON.stringify(metadata.description)},
    url: ${JSON.stringify(`https://maiavr.cl/blog/${slug}`)},
    type: 'article',
    publishedTime: ${JSON.stringify(metadata.publishedTime)},
    authors: [${JSON.stringify(metadata.author)}],
    images: [{
      url: ${JSON.stringify(`https://maiavr.cl${metadata.imageUrl}`)},
      width: 1200,
      height: 630,
      alt: ${JSON.stringify(metadata.title)},
    }],
  },
};

export default function BlogPost() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath(${JSON.stringify(metadata.imageUrl)})} 
              alt={${JSON.stringify(metadata.title)}} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center">
            <div className="mb-4">
              <Link href="/blog" className="text-white hover:text-primary-300 font-semibold">
                ← Volver al blog
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white max-w-4xl mx-auto leading-tight">
              {${JSON.stringify(metadata.title)}}
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>{${JSON.stringify(metadata.displayDate)}}</span>
              <span>·</span>
              <span>6 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(content)} }} />
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres que revisemos tu sitio?</h3>
            <a 
              href="mailto:fede@maiavr.cl"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
            >
              Escríbenos hoy
            </a>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}`;

    return fileContent;
  } catch (error) {
    console.error('Error generating blog post file:', error);
    throw new Error(`Failed to generate blog post file: ${error.message}`);
  }
}

/**
 * Enhanced metadata extraction with multiple pattern support
 */
export function extractMetadataFromFile(fileContent) {
  if (!fileContent || typeof fileContent !== 'string') {
    throw new Error('Invalid file content: must be a string');
  }

  const metadata = {};
  
  // Multiple extraction patterns for each field
  const patterns = {
    title: [
      /title:\s*['"]([^'"]+)['"]/,
      /<h1[^>]*>([^<]+)<\/h1>/,
      /openGraph:\s*{[^}]*title:\s*['"]([^'"]+)['"]/
    ],
    excerpt: [
      /description:\s*['"]([^'"]+)['"]/,
      /<p><strong>Resumen:<\/strong><br \/>\s*([^<]+)<\/p>/,
      /<p[^>]*>([^<]+)<\/p>/
    ],
    publishedTime: [
      /publishedTime:\s*['"]([^'"]+)['"]/,
      /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/
    ],
    author: [
      /authors:\s*\[['"]([^'"]+)['"]\]/,
      /By\s+([^<]+)/,
      /author:\s*['"]([^'"]+)['"]/
    ],
    imageUrl: [
      /getAssetPath\(["']([^"']+)["']\)/,
      /<img[^>]+src={getAssetPath\(["']([^"']+)["']\)}/,
      /images:\s*\[[^\]]*url:\s*['"]https:\/\/maiavr\.cl([^'"]+)['"]/
    ],
    slug: [
      /url:\s*['"]https:\/\/maiavr\.cl\/blog\/([^'"]+)['"]/,
      /\/blog\/([^'"]+)['"]/
    ]
  };
  
  // Extract each field using multiple patterns
  Object.entries(patterns).forEach(([field, fieldPatterns]) => {
    for (const pattern of fieldPatterns) {
      const match = fileContent.match(pattern);
      if (match) {
        metadata[field] = match[1].trim();
        break;
      }
    }
  });
  
  // Convert publishedTime to display date
  if (metadata.publishedTime) {
    try {
      const publishedDate = new Date(metadata.publishedTime);
      metadata.date = publishedDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.warn('Failed to parse publishedTime:', error.message);
    }
  }
  
  // Extract content using multiple patterns
  const contentPatterns = [
    /<div className="prose prose-lg[^>]*>\s*([\s\S]*?)\s*<\/div>/,
    /<article[^>]*>([\s\S]*?)<\/article>/,
    /<div className="prose[^>]*>\s*([\s\S]*?)\s*<\/div>/
  ];
  
  for (const pattern of contentPatterns) {
    const match = fileContent.match(pattern);
    if (match) {
      let content = match[1].trim();
      
      // Remove CTA sections and other non-content elements
      content = content.replace(/<div className="bg-gradient-to-r[^>]*>[\s\S]*?<\/div>/g, '');
      
      // Clean up JSX-specific syntax
      content = content
        .replace(/className=/g, 'class=')
        .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
        .trim();
      
      metadata.content = content;
      break;
    }
  }
  
  // Set defaults for missing fields
  if (!metadata.author) metadata.author = 'Maia';
  if (!metadata.imageUrl) metadata.imageUrl = '/images/blog/default.jpg';
  
  return metadata;
}

/**
 * Validate extracted metadata
 */
export function validateExtractedMetadata(metadata) {
  const errors = [];
  
  if (!metadata.title) errors.push('Title is missing');
  if (!metadata.content) errors.push('Content is missing');
  if (!metadata.slug) errors.push('Slug is missing');
  
  // Validate date format
  if (metadata.publishedTime) {
    try {
      new Date(metadata.publishedTime);
    } catch (error) {
      errors.push('Invalid publishedTime format');
    }
  }
  
  // Validate image URL
  if (metadata.imageUrl && !metadata.imageUrl.startsWith('/')) {
    errors.push('Image URL must be relative path starting with /');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
