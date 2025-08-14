# Maia CMS - Content Management System

## Overview

This project includes a built-in CMS for managing blog posts with one-click publishing to the live site.

## Features

- **Dual-Mode Editor**: Rich text editor or pure Next.js code input
- **Image Upload**: Direct image upload with automatic conversion to data URLs
- **One-Click Publishing**: Publish directly to live site via Vercel function
- **Client-Side Storage**: Uses localStorage for development, JSON files for production
- **Self-Contained Code**: Metadata embedded directly in Next.js components

## Admin Access

The admin interface is available at `/admin-simple` and requires authentication.

## Environment Variables

For production deployment, set these environment variables:

- `NEXT_PUBLIC_PUBLISH_URL`: Vercel function URL for publishing
- `NEXT_PUBLIC_PUBLISH_KEY`: Authentication key for the publish function
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Admin login password (optional, defaults to 'maia2024')

## Usage

1. Access the admin interface
2. Create posts using either rich text or Next.js code
3. Upload images directly in the interface
4. Click "Publish to Live Site" to deploy changes

## Security

- Admin credentials are stored locally
- Publish function requires authentication
- All sensitive data is handled via environment variables
