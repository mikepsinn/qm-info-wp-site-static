# Dark Website - 11ty Conversion

This site has been converted to use 11ty (Eleventy) with reusable includes.

## Structure

```
├── _includes/
│   ├── head.njk          # <head> section with metadata
│   ├── nav.njk           # Navigation/header
│   └── footer.njk        # Footer
├── _site/                # Built output (gitignore)
├── blog/                 # Blog posts
├── .eleventy.js          # 11ty configuration
└── *.html                # Page templates with frontmatter
```

## Page Metadata

Each page should have frontmatter at the top to pass metadata to the includes:

```njk
---
title: "Page Title"
description: "Page description for SEO"
ogImage: "https://example.com/image.png"
canonicalUrl: "https://example.com/page"
siteName: "QUANTIMODO"
---
{% include "head.njk" %}
{% include "nav.njk" %}

<!-- Page content here -->

{% include "footer.njk" %}
```

## Available Metadata Fields

- `title` - Page title (required)
- `description` - Meta description for SEO (required)
- `ogImage` - Open Graph image URL (optional, defaults to logo)
- `canonicalUrl` - Canonical URL (optional)
- `siteName` - Site name shown in header (optional, defaults to "QUANTIMODO")
- `pageId` - Page identifier (optional)
- `siteId` - Site identifier (optional)
- `domain` - Domain for data attributes (optional, defaults to QuAnTiMo.Do)

## Commands

```bash
# Install dependencies
npm install

# Build site
npx @11ty/eleventy

# Serve with live reload (port 8082)
npx @11ty/eleventy --serve

# Watch for changes
npx @11ty/eleventy --watch
```

## Files

- `convert-to-11ty.js` - Script that extracted header/footer
- `replace-headers.js` - Script that replaced headers in all HTML files
- `*.backup` - Backup files of original HTML

## Next Steps

1. Add frontmatter to all HTML files
2. Update content to QuantiModo branding
3. Customize navigation links in `_includes/nav.njk`
4. Update footer in `_includes/footer.njk`
