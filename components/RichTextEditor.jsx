'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useState, useEffect, useRef } from 'react';

const MenuBar = ({ editor, onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  if (!editor) {
    return null;
  }

  const addImage = async () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // For client-side CMS, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        editor.chain().focus().setImage({ src: dataUrl }).run();
        
        // Notify parent component about the uploaded image
        if (onImageUpload) {
          onImageUpload(dataUrl, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          "
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-100"
        >
          —
        </button>
        
        <div className="flex items-center gap-2 ml-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm"
          >
            Upload Image
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Or paste image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={addImage}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, onImageUpload }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the link extension from StarterKit to avoid duplicates
        link: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      console.log('🔍 EDITOR DEBUG: Rich text editor content updated:', {
        htmlContent: htmlContent,
        htmlLength: htmlContent.length,
        textContent: editor.getText(),
        textLength: editor.getText().length,
        isEmpty: editor.isEmpty
      });
      onChange(htmlContent);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
    // Fix SSR hydration issues
    immediatelyRender: false,
  });

  // Don't render until client-side
  if (!isMounted) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="p-4 min-h-[400px] bg-gray-50">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <MenuBar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
