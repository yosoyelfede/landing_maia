# Maia Dual-Mode CMS - Rich Text + Next.js Code

I've created a **dual-mode CMS** that gives you the best of both worlds! You can now choose between a rich text editor OR paste pure Next.js component code directly.

## 🚀 **Two Editor Modes**

### ✅ **Rich Text Editor**
- **Visual editing** with formatting toolbar
- **Image upload** and embedding
- **Real-time preview** of formatting
- **Perfect for** content-focused posts

### ✅ **Next.js Code Editor**
- **Self-contained components** with all metadata included
- **Automatic metadata extraction** from component code
- **Full Next.js syntax** support
- **Tailwind CSS** classes
- **React hooks** and components
- **Perfect for** custom layouts and functionality

## 🛠️ **How to Use**

### 1. Access the Admin Panel
- **URL**: `http://localhost:3000/admin-simple`
- **Password**: `maia2024`

### 2. Create a New Post
1. Click "Create New Post"
2. Fill in basic info (title, author, etc.)
3. **Choose your editor mode**:
   - **Rich Text Editor**: Visual editing with formatting
   - **Next.js Code Editor**: Paste custom component code

### 3. Rich Text Mode
- Use the formatting toolbar
- Upload images or paste URLs
- See real-time formatting
- Perfect for articles and content

### 4. Code Mode
- Write a complete Next.js component with metadata included
- Include title, author, excerpt, and other metadata in your component
- Use any React components and hooks
- Apply Tailwind CSS classes
- Create custom layouts and functionality

## 📝 **Code Editor Examples**

### Complete Blog Post Component with Metadata
```jsx
// Blog Post Component - All metadata included
export default function BlogPost() {
  // Metadata - this will be extracted automatically
  const metadata = {
    title: "My Amazing Blog Post",
    excerpt: "This is a brief description of the post that will appear in previews.",
    author: "Your Name",
    date: "17 Julio 2025",
    language: "es",
    imageUrl: "/images/blog/default.jpg",
    slug: "my-amazing-blog-post"
  };

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span>By {metadata.author}</span>
          <span>{metadata.date}</span>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">
          {metadata.excerpt}
        </p>
      </header>

      {/* Your content here */}
      <div className="space-y-6">
        <p>This is your main content. You can use any Next.js components and Tailwind CSS classes.</p>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Section</h2>
          <p>You can create any layout you want with full Next.js functionality!</p>
        </div>

        <h2>Features</h2>
        <ul>
          <li>Full Next.js component support</li>
          <li>React hooks and state management</li>
          <li>Tailwind CSS styling</li>
          <li>Custom layouts and components</li>
        </ul>
      </div>
    </article>
  );
}
```

### Interactive Component
```jsx
'use client';

import { useState } from 'react';

export default function InteractivePost() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-6">
      <h1>Interactive Blog Post</h1>
      <p>This post has interactive elements!</p>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <p>Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
```

### Custom Layout with Images
```jsx
export default function CustomLayout() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Custom Layout Post
        </h1>
        <p className="text-xl text-gray-600">
          This shows how flexible the code editor can be
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2>Left Column</h2>
          <p>Your content here...</p>
        </div>
        <div>
          <h2>Right Column</h2>
          <p>More content here...</p>
        </div>
      </div>
      
      <footer className="border-t pt-8 text-center text-gray-500">
        <p>Custom footer content</p>
      </footer>
    </div>
  );
}
```

## 🎯 **When to Use Each Mode**

### Use Rich Text Editor When:
- ✅ Writing articles and blog posts
- ✅ Need quick formatting (bold, italic, lists)
- ✅ Want to upload images easily
- ✅ Focus on content over code
- ✅ Need a familiar editing experience

### Use Code Editor When:
- ✅ Creating custom layouts
- ✅ Need interactive components
- ✅ Want to use React hooks
- ✅ Building complex UI elements
- ✅ Need full control over styling
- ✅ Creating reusable components

## 🔧 **Features**

### ✅ **Dual Mode Support**
- **Toggle between** rich text and code editors
- **Automatic detection** of content type
- **Visual indicators** in post list
- **Seamless switching** between modes

### ✅ **Rich Text Features**
- **Full formatting** toolbar
- **Image upload** and embedding
- **Real-time preview**
- **Clean HTML output**

### ✅ **Code Editor Features**
- **Syntax highlighting** (monospace font)
- **Sample code** templates
- **Full Next.js support**
- **React hooks** and components
- **Tailwind CSS** classes

### ✅ **Post Management**
- **Create, edit, delete** posts
- **Auto-sorting** by newest first
- **Export/import** data
- **Multi-language** support

## 🚀 **Production Ready**

### ✅ **Static Export Compatible**
- Works with `output: 'export'`
- No server dependencies
- Perfect for GitHub Pages
- Client-side data storage

### ✅ **Data Persistence**
- **localStorage** for data storage
- **Export/import** functionality
- **Backup** your posts easily
- **Migration** to server-side later

## 📁 **File Structure**

```
app/
├── admin-simple/
│   └── page.jsx                    # Dual-mode admin dashboard
└── blog/
    └── [slug]/page.jsx             # Dynamic blog posts

components/
├── RichTextEditor.jsx              # TipTap rich text editor
└── BlogPreview.jsx                 # Blog preview component

lib/
└── clientDb.js                     # Client-side database
```

## 🎉 **Benefits**

### ✅ **Flexibility**
- **Choose the right tool** for each post
- **Rich text** for content-focused posts
- **Code editor** for custom layouts
- **Best of both worlds**

### ✅ **Developer Friendly**
- **Full Next.js support** in code mode
- **React hooks** and components
- **Tailwind CSS** classes
- **Custom layouts** and functionality

### ✅ **Content Creator Friendly**
- **Visual editing** in rich text mode
- **Easy formatting** with toolbar
- **Image upload** and embedding
- **Familiar interface**

## 🚀 **You're Ready to Go!**

Your dual-mode CMS is **fully functional** and gives you maximum flexibility:

1. **Visit**: `http://localhost:3000/admin-simple`
2. **Login**: Enter password `maia2024`
3. **Create Post**: Choose your preferred editor mode
4. **Rich Text**: Use visual editor for content
5. **Code Editor**: Paste Next.js components for custom layouts
6. **Publish**: See your posts live on your site

The system automatically detects content type and displays posts appropriately. You now have the ultimate flexibility for creating both content-focused posts and custom interactive components! 🎉
