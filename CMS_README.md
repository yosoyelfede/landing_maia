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

- `NEXT_PUBLIC_PUBLISH_URL`: Vercel function URL for publishing (optional, has default)
- `NEXT_PUBLIC_PUBLISH_KEY`: Authentication key for the publish function (REQUIRED)
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Admin login password (REQUIRED - no default for security)

## Usage

1. Access the admin interface
2. Create posts using either rich text or Next.js code
3. Upload images directly in the interface
4. Click "Publish to Live Site" to deploy changes

## Security

### ⚠️ IMPORTANT SECURITY CONSIDERATIONS

**Client-Side Authentication Limitations:**
- This is a static site with client-side authentication
- Environment variables with `NEXT_PUBLIC_` prefix are visible to users in the browser
- Authentication can potentially be bypassed by advanced users
- **This system is suitable for low-security environments only**

**Required Security Measures:**
- Set strong, unique passwords for `NEXT_PUBLIC_ADMIN_PASSWORD`
- Use a strong, unique key for `NEXT_PUBLIC_PUBLISH_KEY`
- Regularly rotate these credentials
- Monitor access logs if possible

**For Higher Security Requirements:**
- Consider implementing server-side authentication
- Use a proper CMS with server-side validation
- Implement rate limiting and access controls

### Current Security Features:
- Admin panel requires password authentication
- Publish function requires authentication
- No hardcoded credentials in the codebase
- All sensitive data is handled via environment variables
