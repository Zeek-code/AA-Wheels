/**
 * Helper script to set up product images from Facebook.
 * Run with: node scripts/setup-images.js
 */

const fs = require('fs');
const path = require('path');

const PRODUCT_IMAGES = {
  "Suspension": "suspension.jpg",
  "Dressed Axles": "dressed-axles.jpg",
  "Chemicals and Lubricants": "chemicals.jpg",
  "Safety Equipment": "safety.jpg",
  "Cargo Security": "cargo-security.jpg",
  "Trailer Body Parts": "trailer-body.jpg",
  "Air & Hydraulic Components": "air-hydraulic.jpg",
  "Brake Parts": "brake-parts.jpg",
  "Lighting & Electrical": "lighting.jpg",
};

function createImagesDirectory() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  return imagesDir;
}

function checkExistingImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const existing = {};
  const missing = [];

  for (const [category, filename] of Object.entries(PRODUCT_IMAGES)) {
    const imagePath = path.join(imagesDir, filename);
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath);
      existing[category] = {
        filename,
        size: `${(stats.size / 1024).toFixed(1)} KB`,
        path: imagePath
      };
    } else {
      missing.push([category, filename]);
    }
  }

  return { existing, missing };
}

function main() {
  console.log('='.repeat(60));
  console.log('AA Wheel Product Images Setup');
  console.log('='.repeat(60));

  const imagesDir = createImagesDirectory();
  console.log(`✓ Images directory: ${imagesDir}`);

  const { existing, missing } = checkExistingImages();

  console.log(`\n✓ Found ${Object.keys(existing).length} existing images`);
  console.log(`✗ Missing ${missing.length} images\n`);

  if (Object.keys(existing).length > 0) {
    console.log('Existing images:');
    for (const [category, info] of Object.entries(existing)) {
      console.log(`  ✓ ${category}: ${info.filename} (${info.size})`);
    }
  }

  if (missing.length > 0) {
    console.log('\nMissing images:');
    for (const [category, filename] of missing) {
      console.log(`  ✗ ${category}: ${filename}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('How to Download Images from Facebook:');
  console.log('='.repeat(60));
  console.log('1. Go to https://www.facebook.com/aawheel');
  console.log('2. Browse their photos/posts');
  console.log('3. Right-click on product images → "Copy image address"');
  console.log('4. Open the URL in a new tab and save the image');
  console.log('5. Save to public/images/ with the correct filename');
  console.log('\nFacebook Page: https://www.facebook.com/aawheel');
}

main();

