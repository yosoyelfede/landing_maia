# Blog Post Upload Process

## Overview
This document outlines the complete process for adding new blog posts to the landing_maia project, ensuring proper organization and updates across all related components.

## Prerequisites
- Ensure you have access to the project repository
- Have the blog post content ready (title, content, featured image)
- Have the blog post slug/URL ready

## Step-by-Step Process

### 1. Manual Folder and Page Creation
**Action Required:** Manual step by developer

Create a new folder in the blog directory with the following structure:
```
app/blog/[blog-post-slug]/
└── page.jsx
```

**Example:**
```
app/blog/mi-nuevo-post/
└── page.jsx
```

**Note:** You'll create both the folder and the initial `page.jsx` file. The assistant will help optimize and ensure consistency with existing posts.

### 2. Blog Post Page Optimization
**Action Required:** Developer/Assistant

Review and optimize the `page.jsx` file to ensure:
- Proper metadata (title, description, keywords)
- Consistent styling with existing posts
- Proper image handling
- SEO best practices

### 3. Blog Index Page Update
**Action Required:** Developer/Assistant

Update `lib/translations.js` in the `blog.posts` array to:
- Add the new blog post to both Spanish (`es`) and English (`en`) sections
- Ensure newest posts appear in top-left position (first in the array)
- Maintain chronological order (newest to oldest)
- Include: slug, title, excerpt, and date

**Example structure:**
```javascript
posts: [
  {
    slug: 'nuevo-post',
    title: 'Título del nuevo post',
    excerpt: 'Descripción corta del post...',
    date: '24 Julio 2025' // Use Spanish format for Spanish, English for English
  },
  // ... existing posts
]
```

### 4. Landing Page Blog Preview Update
**Action Required:** Developer/Assistant

Update `lib/translations.js` in the `blogSection.blogPosts` object to:
- Add the new blog post to both Spanish (`es`) and English (`en`) sections
- The BlogSection component automatically displays the 3 most recent posts
- Include: title and description

**Example structure:**
```javascript
blogPosts: {
  nuevoPost: {
    title: 'Título del nuevo post',
    description: 'Descripción del post para la vista previa...'
  },
  // ... existing posts
}
```

### 5. Blog Post Page Review
**Action Required:** Developer/Assistant

Review the created `page.jsx` file to ensure:
- Proper metadata (title, description, keywords)
- Consistent styling with existing posts
- Proper image handling
- SEO best practices
- Use the same structure as existing blog posts

### 6. Image Assets
**Action Required:** Manual step by developer

Add the blog post featured image to:
```
public/images/blog/[image-name].jpg
```

**Important:** Update the `getBlogImage` function in `app/blog/page.jsx` to include the new image:
```javascript
case 'nuevo-post':
  return "/images/blog/nuevo-post.jpg";
```

### 7. Testing Checklist
- [ ] Blog post page loads correctly
- [ ] Blog post appears in blog index page
- [ ] Blog post appears in landing page preview (if it's one of the 3 newest)
- [ ] Images load properly
- [ ] Responsive design works
- [ ] SEO metadata is correct

## File Structure Reference

### Current Blog Posts
```
app/blog/
├── nadie-quiere-dejar-sus-datos/
├── para-que-sirve-un-recorrido-virtual/
├── recorrido-inteligente/
├── recorridos-que-venden/
├── render-vs-recorrido-virtual/
└── page.jsx (blog index)
```

### Naming Conventions
- **Folder names**: Use kebab-case (e.g., `mi-nuevo-post`)
- **Image names**: Use kebab-case and match the slug (e.g., `mi-nuevo-post.jpg`)
- **Translation keys**: Use camelCase (e.g., `miNuevoPost`)
- **Dates**: Use Spanish format for Spanish content (`24 Julio 2025`), English format for English content (`July 24, 2025`)

### Key Files to Update
- `lib/translations.js` - Blog posts data (both `blog.posts` and `blogSection.blogPosts`)
- `app/blog/page.jsx` - Blog index page (update `getBlogImage` function)
- `app/blog/[slug]/page.jsx` - Individual blog post page
- `components/BlogSection.jsx` - Blog section component (automatically uses translations)

## Important Notes

### Post Ordering
- **Newest posts** should appear in the **top-left** position
- **Oldest posts** should appear in the **bottom-right** position
- Maintain chronological order across all displays

### Image Requirements
- Featured images should be placed in `public/images/blog/`
- Use descriptive filenames
- Optimize images for web (recommended: 1200x630px for featured images)

### SEO Considerations
- Each blog post should have unique meta title and description
- Include relevant keywords
- Ensure proper heading structure (H1, H2, H3)
- Add alt text to all images

## Automation Opportunities
Consider automating parts of this process:
- Script to generate blog post template
- Script to update translations automatically
- Script to update `getBlogImage` function automatically
- Script to validate all required files are updated

## Troubleshooting

### Common Issues
1. **Post not appearing in blog index**: Check if post is added to `translations.js` in both `blog.posts` arrays
2. **Post not appearing in landing page**: Check if post is added to `translations.js` in both `blogSection.blogPosts` objects
3. **Wrong order**: Verify chronological order in `blog.posts` array (newest first)
4. **Images not loading**: Check file path and ensure image exists in public folder, and update `getBlogImage` function
5. **SEO issues**: Verify meta tags are properly set in the blog post page

### Validation Steps
After completing all steps, verify:
- All links work correctly
- Images display properly
- Post appears in correct order
- No console errors
- Mobile responsiveness 