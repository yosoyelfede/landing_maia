import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getBlogPosts, createBlogPost } from '../../../lib/db';

export async function GET() {
  try {
    const posts = getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, content, author, imageUrl, slug, language } = body;

    if (!title || !excerpt || !content || !author || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = createBlogPost({
      title,
      excerpt,
      content,
      author,
      imageUrl: imageUrl || '/images/blog/default.jpg',
      slug,
      language: language || 'es',
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });

    if (!newPost) {
      return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
