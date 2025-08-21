#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBlogPostFile } from '../lib/blogPostTemplate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migratePosts() {
  try {
    console.log('🚀 Starting migration of JSON posts to file structure...');
    
    // Read the existing JSON file
    const jsonPath = path.join(__dirname, '..', 'public', 'data', 'blog-posts.json');
    const jsonContent = await fs.readFile(jsonPath, 'utf8');
    const posts = JSON.parse(jsonContent);
    
    console.log(`📄 Found ${posts.length} posts to migrate`);
    
    for (const post of posts) {
      if (!post.slug) {
        console.log(`⚠️ Skipping post without slug: ${post.title}`);
        continue;
      }
      
      const blogDir = path.join(__dirname, '..', 'app', 'blog', post.slug);
      const filePath = path.join(blogDir, 'page.jsx');
      
      // Check if directory already exists
      try {
        await fs.access(blogDir);
        console.log(`⏭️ Directory already exists for: ${post.slug}`);
        continue;
      } catch {
        // Directory doesn't exist, create it
      }
      
      // Create directory
      await fs.mkdir(blogDir, { recursive: true });
      
      // Generate and write the file
      const fileContent = generateBlogPostFile(post);
      await fs.writeFile(filePath, fileContent);
      
      console.log(`✅ Migrated: ${post.title} -> ${post.slug}`);
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log('💡 You can now delete the JSON file if you want:');
    console.log(`   rm ${jsonPath}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migratePosts();
