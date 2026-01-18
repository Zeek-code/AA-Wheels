# AA Wheel & Truck Supply Website

A modern, responsive website rebuilt for AA Wheel & Truck Supply using Next.js 15, React, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 15 (App Router)
- 🎨 Modern design with Tailwind CSS
- 📱 Fully responsive (mobile-first)
- ⚡ Fast and SEO-friendly
- ♿ Accessible
- 📄 Static export ready for GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The site will be available at [http://localhost:8000](http://localhost:8000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out/` directory.

### Static Export

The project is configured for static export, making it perfect for GitHub Pages hosting:

```bash
npm run build
```

The static files will be in the `out/` directory.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── products/        # Products page
│   ├── where-to-buy/    # Locations page
│   ├── forms/           # Forms library
│   ├── testimonials/    # Customer testimonials
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Hero section
│   ├── ProductCard.tsx  # Product card component
│   └── ...
├── public/              # Static assets
├── website_data.json    # Scraped website data
└── scrape_website.py    # Web scraping script
```

## Website Scraping

The original website content was scraped and stored in `website_data.json`. To re-scrape:

```bash
pip install requests beautifulsoup4
python scrape_website.py --url=https://aawheel.com
```

## GitHub Pages Deployment

1. Create a GitHub repository
2. Push your code to the repository
3. Run `npm run build` to generate the `out/` directory
4. Copy contents of `out/` to `docs/` folder (or use GitHub Actions)
5. In repository Settings > Pages:
   - Source: Deploy from a branch
   - Branch: main (or your branch)
   - Folder: /docs (or /root if using root)
6. Add `.nojekyll` file to the docs folder (if using /docs)

### Optional: GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Customization

- **Content**: Edit `website_data.json` to update site content
- **Styling**: Modify `tailwind.config.js` and `app/globals.css`
- **Colors**: Update the primary color in `tailwind.config.js`
- **Base Path**: Uncomment and set `basePath` in `next.config.js` for GitHub Pages subdirectory

## Pages

- **Home** (`/`) - Hero, features, products, testimonials
- **About** (`/about`) - Company information
- **Products** (`/products`) - Product catalog
- **Contact** (`/contact`) - Contact form and information
- **Where to Buy** (`/where-to-buy`) - Location information
- **Forms** (`/forms`) - Forms library
- **Testimonials** (`/testimonials`) - Customer reviews

## License

Copyright © 2025 AA Wheel & Truck Supply, Inc. All Rights Reserved

