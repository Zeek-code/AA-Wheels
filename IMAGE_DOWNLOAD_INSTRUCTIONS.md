# How to Download Images from AA Wheel Facebook Page

## Quick Steps

1. **Go to Facebook Page**: https://www.facebook.com/aawheel
2. **Browse Photos**: Click on "Photos" section or browse through posts
3. **Copy Image URL**: Right-click on any product image → "Copy image address"
4. **Download Image**: Paste URL in browser, right-click → "Save image as..."
5. **Save to Project**: Save to `public/images/` folder with correct filename

## Required Image Filenames

Save images with these exact names in `public/images/`:

- `suspension.jpg` - For Suspension products
- `dressed-axles.jpg` - For Dressed Axles
- `chemicals.jpg` - For Chemicals and Lubricants
- `safety.jpg` - For Safety Equipment
- `cargo-security.jpg` - For Cargo Security
- `trailer-body.jpg` - For Trailer Body Parts
- `air-hydraulic.jpg` - For Air & Hydraulic Components
- `brake-parts.jpg` - For Brake Parts
- `lighting.jpg` - For Lighting & Electrical

## Detailed Methods

### Method 1: Direct Download (Easiest)

1. Open https://www.facebook.com/aawheel in your browser
2. Navigate to Photos section
3. Click on any photo album or individual photo
4. Right-click on the image
5. Select "Copy image address" or "Copy image URL"
6. Open the URL in a new tab
7. Right-click the image → "Save image as..."
8. Rename it to match one of the required filenames above
9. Save to `public/images/` folder

### Method 2: Browser Developer Tools

1. Open Facebook page in Chrome/Firefox
2. Press `F12` to open Developer Tools
3. Go to **Network** tab
4. Filter by "Img" or type "image" in filter
5. Browse the Facebook page (scroll, click photos)
6. Find images in the Network tab
7. Right-click on image request → "Open in new tab"
8. Save the image with correct filename

### Method 3: Facebook Photo Albums

1. Go to the Facebook page
2. Click on **"Photos"** section
3. Browse through albums (Products, Inventory, etc.)
4. Click on individual photos
5. Right-click on the full-size image
6. Select "Save image as..."
7. Rename and save to `public/images/`

## Image Requirements

- **Format**: JPG or PNG (JPG preferred)
- **Size**: At least 800x600 pixels for best quality
- **Aspect Ratio**: 4:3 or 16:9 works well
- **File Size**: Keep under 500KB if possible

## Tips

- If you can't find specific product images, use general truck/trailer parts images
- The placeholder (`placeholder-product.svg`) will be used until real images are added
- You can use the same image for multiple categories if needed temporarily
- Make sure images are clear and show the product well

## Verify Images

After downloading, run:
```bash
node scripts/setup-images.js
```

This will show which images are present and which are still missing.

