# Mestar Agricultural Machinery Website - PRD

## Problem Statement
User wanted to replace stock photos with real machine photos, add social media integration, and improve image viewing experience.

## Architecture
- **Frontend**: React.js with Tailwind CSS, Framer Motion
- **Backend**: FastAPI with MongoDB
- **Hosting**: Emergent preview environment

## What's Been Implemented

### Session 1 (Apr 15, 2026) - Image Replacement
- Copied 21 real machine photos from user's GitHub repo
- Updated products.js with local image paths
- Changed gallery from per-category to per-product

### Session 2 (Apr 15, 2026) - Optimization, Lightbox, Fitting
- Image compression: 21MB -> ~3MB (85% reduction)
- Lightbox: fullscreen viewer with navigation, thumbnails, keyboard support
- object-contain for proper image fitting

### Session 3 (Apr 16, 2026) - New Photos + Social Media
- Added HT475 machine photos (2 images from uploaded assets)
- Added SPIDER475 machine photos (2 images from uploaded assets)
- **Social Media Bar**: Fixed top bar with Facebook, Instagram, TikTok links + WhatsApp number
  - Facebook: https://www.facebook.com/mestaragro/?locale=tr_TR
  - Instagram: https://www.instagram.com/mestaragro/
  - TikTok: https://www.tiktok.com/@mestaragro?lang=tr-TR
  - WhatsApp: +90 332 251 20 97
- **WhatsApp Floating Button**: Green floating button at bottom-right corner, links to wa.me/903322512097

## Testing
- Iteration 1: 100% - Image replacement
- Iteration 2: 98% - Compression, lightbox, fitting
- Iteration 3: 100% - HT475/SPIDER475 photos, social media, WhatsApp

## Backlog / Next Tasks
- P1: Add photos for SPIDER275, PDO-2F, ULTRA275, SSM-1400
- P2: WebP format for even better compression
- P3: Mobile swipe support for lightbox
