# Mestar Agricultural Machinery Website - PRD

## Problem Statement
User wanted to replace stock photos (Unsplash/Pexels) in the Mestar agricultural machinery website with actual machine photos from their GitHub repo (https://github.com/blyzze/yeniweb_0).

## Architecture
- **Frontend**: React.js with Tailwind CSS, Framer Motion
- **Backend**: FastAPI with MongoDB
- **Hosting**: Emergent preview environment

## What's Been Implemented (Apr 15, 2026)
- Copied 21 real machine photos from user's GitHub repo to `/app/frontend/public/images/`
- Renamed all files to URL-friendly names (no spaces, lowercase)
- Updated `products.js` - replaced all stock image URLs with local `/images/...` paths
- Changed gallery structure from per-category to per-product for accurate image display
- Updated HeroSlider with real machine photos
- Updated categoryImages for product category cards
- Installed missing dependencies (framer-motion, react-fast-marquee)

## Image Mapping
| Machine | Images |
|---------|--------|
| ALPHA275 | alpha275-1.png, alpha275-2.png |
| ALPHA475 | alpha475-1.png, alpha475-2.png |
| PDO-2N | pdo2n-1.jfif, pdo2n-2.jfif, pdo2n-3.jfif |
| PDO-4N | pdo4n-1.png |
| PSH-2S | psh2s-1.png, psh2s-2.png, psh2s-3.png |
| ULTRA475 | ultra475-1.png, ultra475-2.png, ultra475-3.png |
| Category extras | toprakhazirlama.jpg, patatessokum.jpg, sokum.png |

## Machines Without Specific Photos
- HT475, SPIDER275, SPIDER475 (use toprakhazirlama.jpg)
- PDO-2F (uses PDO-2N images)
- ULTRA275 (uses patatessokum images)
- SSM-1400 (uses sokum.png)

## Testing
- All tests passed (100% success rate)
- Hero slider, products grid, product detail pages, category pages all verified

## Backlog / Next Tasks
- P1: Add specific photos for HT475, SPIDER275, SPIDER475, PDO-2F, ULTRA275, SSM-1400
- P2: Optimize image sizes for web performance (some are >1MB)
- P2: Add lazy loading for product images
