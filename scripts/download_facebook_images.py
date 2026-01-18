#!/usr/bin/env python3
"""
Script to download images from AA Wheel Facebook page for use as temporary product images.
This script can work with direct image URLs or Facebook post URLs.
"""

import requests
import os
import json
from pathlib import Path
from urllib.parse import urlparse
import re

# Facebook page URL
FACEBOOK_PAGE = "https://www.facebook.com/aawheel"

# Product categories and their image mappings
PRODUCT_IMAGES = {
    "suspension": "suspension.jpg",
    "dressed-axles": "dressed-axles.jpg",
    "chemicals": "chemicals.jpg",
    "safety": "safety.jpg",
    "cargo-security": "cargo-security.jpg",
    "trailer-body": "trailer-body.jpg",
    "air-hydraulic": "air-hydraulic.jpg",
    "brake-parts": "brake-parts.jpg",
    "lighting": "lighting.jpg",
}

def download_image(url, output_path):
    """Download an image from a URL."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✓ Downloaded: {output_path}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
        return False

def extract_facebook_image_url(facebook_url):
    """
    Attempt to extract image URL from Facebook post/page.
    Note: Facebook's structure changes frequently, so this may need updates.
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(facebook_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Try to find image URLs in the HTML
        # Facebook uses various patterns, this is a basic attempt
        img_patterns = [
            r'https://[^"]*\.fbcdn\.net[^"]*\.(jpg|jpeg|png)',
            r'https://[^"]*\.facebook\.com[^"]*\.(jpg|jpeg|png)',
            r'data-image-url="([^"]+)"',
        ]
        
        for pattern in img_patterns:
            matches = re.findall(pattern, response.text, re.IGNORECASE)
            if matches:
                return matches[0] if isinstance(matches[0], str) else matches[0][0]
    except Exception as e:
        print(f"Could not extract image from Facebook URL: {e}")
    
    return None

def main():
    """Main function to download images."""
    # Create images directory
    images_dir = Path("public/images")
    images_dir.mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("AA Wheel Facebook Image Downloader")
    print("=" * 60)
    print(f"\nFacebook Page: {FACEBOOK_PAGE}")
    print(f"Output Directory: {images_dir}")
    print("\n" + "=" * 60)
    
    # Option 1: Manual URL input
    print("\nOption 1: Enter direct image URLs manually")
    print("You can right-click images on Facebook and 'Copy image address'")
    print("Then paste the URLs here (one per line, or 'done' to finish):\n")
    
    image_urls = []
    while True:
        url = input("Image URL (or 'done' to finish): ").strip()
        if url.lower() == 'done':
            break
        if url:
            image_urls.append(url)
    
    # Option 2: Download from provided URLs
    if image_urls:
        print(f"\nDownloading {len(image_urls)} images...")
        for i, url in enumerate(image_urls, 1):
            # Determine filename based on product category
            if i <= len(PRODUCT_IMAGES):
                category_key = list(PRODUCT_IMAGES.keys())[i-1]
                filename = PRODUCT_IMAGES[category_key]
            else:
                # Generic filename
                parsed = urlparse(url)
                filename = os.path.basename(parsed.path) or f"product-{i}.jpg"
                if not filename.endswith(('.jpg', '.jpeg', '.png')):
                    filename += '.jpg'
            
            output_path = images_dir / filename
            download_image(url, output_path)
    
    # Option 3: Create a mapping file for manual assignment
    print("\n" + "=" * 60)
    print("Creating image mapping file...")
    
    mapping = {
        "instructions": "Map downloaded images to product categories",
        "images_dir": str(images_dir),
        "mappings": {}
    }
    
    # Check which images exist
    for category, filename in PRODUCT_IMAGES.items():
        image_path = images_dir / filename
        mapping["mappings"][category] = {
            "filename": filename,
            "exists": image_path.exists(),
            "path": f"/images/{filename}"
        }
    
    mapping_file = Path("image_mapping.json")
    with open(mapping_file, 'w') as f:
        json.dump(mapping, f, indent=2)
    
    print(f"✓ Created mapping file: {mapping_file}")
    print("\nNext steps:")
    print("1. Download images from Facebook manually")
    print("2. Save them to public/images/ with the correct filenames")
    print("3. Or update image_mapping.json with your image URLs")
    
    print("\n" + "=" * 60)
    print("Alternative: Use Facebook Graph API")
    print("=" * 60)
    print("For automated access, you'll need:")
    print("1. Facebook App ID and Secret")
    print("2. Access Token with appropriate permissions")
    print("3. Use Facebook Graph API to fetch page photos")
    print("\nSee: https://developers.facebook.com/docs/graph-api")

if __name__ == "__main__":
    main()

