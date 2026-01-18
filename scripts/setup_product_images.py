#!/usr/bin/env python3
"""
Helper script to set up product images from Facebook.
This script helps organize images downloaded from AA Wheel's Facebook page.
"""

import os
import json
import shutil
from pathlib import Path

# Product image mappings
PRODUCT_IMAGES = {
    "Suspension": "suspension.jpg",
    "Dressed Axles": "dressed-axles.jpg",
    "Chemicals and Lubricants": "chemicals.jpg",
    "Safety Equipment": "safety.jpg",
    "Cargo Security": "cargo-security.jpg",
    "Trailer Body Parts": "trailer-body.jpg",
    "Air & Hydraulic Components": "air-hydraulic.jpg",
    "Brake Parts": "brake-parts.jpg",
    "Lighting & Electrical": "lighting.jpg",
}

def create_images_directory():
    """Create the images directory if it doesn't exist."""
    images_dir = Path("public/images")
    images_dir.mkdir(parents=True, exist_ok=True)
    return images_dir

def create_instructions():
    """Create instructions file for downloading images."""
    instructions = """
# How to Download Images from AA Wheel Facebook Page

## Method 1: Direct Download (Easiest)

1. Go to https://www.facebook.com/aawheel
2. Browse through their photos/posts
3. Right-click on any product image
4. Select "Copy image address" or "Copy image URL"
5. Paste the URL into a browser and save the image
6. Save it to `public/images/` with the appropriate filename:

### Image Filenames Needed:
- suspension.jpg
- dressed-axles.jpg
- chemicals.jpg
- safety.jpg
- cargo-security.jpg
- trailer-body.jpg
- air-hydraulic.jpg
- brake-parts.jpg
- lighting.jpg

## Method 2: Using Browser Developer Tools

1. Open Facebook page in Chrome/Firefox
2. Press F12 to open Developer Tools
3. Go to Network tab
4. Filter by "Img" or "Image"
5. Browse the Facebook page
6. Find images in the network tab
7. Right-click → "Open in new tab"
8. Save the image

## Method 3: Facebook Photo Albums

1. Go to the Facebook page
2. Click on "Photos" section
3. Browse through albums
4. Click on individual photos
5. Right-click → "Save image as..."
6. Rename and save to `public/images/`

## Notes:
- Images should be at least 800x600 pixels for best quality
- JPG format is preferred
- If you can't find specific product images, use general truck/trailer parts images
- The placeholder will be used until real images are added
"""
    
    with open("IMAGE_DOWNLOAD_INSTRUCTIONS.md", "w") as f:
        f.write(instructions)
    
    print("✓ Created instructions file: IMAGE_DOWNLOAD_INSTRUCTIONS.md")

def check_existing_images():
    """Check which images already exist."""
    images_dir = Path("public/images")
    existing = {}
    missing = []
    
    for category, filename in PRODUCT_IMAGES.items():
        image_path = images_dir / filename
        if image_path.exists():
            size = image_path.stat().st_size
            existing[category] = {
                "filename": filename,
                "size": f"{size / 1024:.1f} KB",
                "path": str(image_path)
            }
        else:
            missing.append((category, filename))
    
    return existing, missing

def create_image_mapping():
    """Create a JSON file mapping products to images."""
    images_dir = Path("public/images")
    mapping = {
        "images_directory": str(images_dir),
        "products": {}
    }
    
    for category, filename in PRODUCT_IMAGES.items():
        image_path = images_dir / filename
        mapping["products"][category] = {
            "filename": filename,
            "path": f"/images/{filename}",
            "exists": image_path.exists(),
            "category_key": category.lower().replace(" ", "-").replace("&", "")
        }
    
    with open("image_mapping.json", "w") as f:
        json.dump(mapping, f, indent=2)
    
    print("✓ Created image mapping: image_mapping.json")

def main():
    """Main function."""
    print("=" * 60)
    print("AA Wheel Product Images Setup")
    print("=" * 60)
    
    # Create images directory
    images_dir = create_images_directory()
    print(f"✓ Images directory: {images_dir}")
    
    # Check existing images
    existing, missing = check_existing_images()
    
    print(f"\n✓ Found {len(existing)} existing images")
    print(f"✗ Missing {len(missing)} images\n")
    
    if existing:
        print("Existing images:")
        for category, info in existing.items():
            print(f"  ✓ {category}: {info['filename']} ({info['size']})")
    
    if missing:
        print("\nMissing images:")
        for category, filename in missing:
            print(f"  ✗ {category}: {filename}")
    
    # Create instructions
    create_instructions()
    
    # Create mapping
    create_image_mapping()
    
    print("\n" + "=" * 60)
    print("Next Steps:")
    print("=" * 60)
    print("1. Read IMAGE_DOWNLOAD_INSTRUCTIONS.md for detailed steps")
    print("2. Download images from Facebook and save to public/images/")
    print("3. Run this script again to verify all images are present")
    print("\nFacebook Page: https://www.facebook.com/aawheel")

if __name__ == "__main__":
    main()

