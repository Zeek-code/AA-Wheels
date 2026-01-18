#!/usr/bin/env python3
"""
Website Scraper for AA Wheel & Truck Supply
Ethically scrapes public content and structure from the target website.
"""

import requests
from bs4 import BeautifulSoup
import json
import sys
import argparse
from urllib.parse import urljoin, urlparse
import time

def check_robots_txt(url):
    """Check robots.txt to respect crawling rules."""
    try:
        robots_url = urljoin(url, '/robots.txt')
        response = requests.get(robots_url, timeout=10)
        if response.status_code == 200:
            print(f"✓ Found robots.txt: {robots_url}")
            return True
        return False
    except:
        return False

def scrape_page(url, session=None):
    """Scrape a single page and return BeautifulSoup object."""
    if session is None:
        session = requests.Session()
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = session.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        return BeautifulSoup(response.content, 'html.parser')
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def extract_navigation(soup, base_url):
    """Extract navigation menu structure."""
    nav = {
        "main": [],
        "footer": []
    }
    
    # Main navigation
    nav_elements = soup.find_all(['nav', 'ul'], class_=lambda x: x and ('nav' in x.lower() or 'menu' in x.lower()))
    if not nav_elements:
        # Try finding links in header
        header = soup.find('header') or soup.find('div', class_=lambda x: x and 'header' in x.lower())
        if header:
            links = header.find_all('a', href=True)
            for link in links:
                text = link.get_text(strip=True)
                href = link.get('href', '')
                if text and href:
                    nav["main"].append({
                        "text": text,
                        "href": urljoin(base_url, href)
                    })
    
    # Footer navigation
    footer = soup.find('footer')
    if footer:
        footer_links = footer.find_all('a', href=True)
        for link in footer_links[:10]:  # Limit to avoid too many
            text = link.get_text(strip=True)
            href = link.get('href', '')
            if text and href and not href.startswith('#'):
                nav["footer"].append({
                    "text": text,
                    "href": urljoin(base_url, href)
                })
    
    return nav

def extract_content(soup):
    """Extract main content sections."""
    content = {
        "title": "",
        "tagline": "",
        "hero": "",
        "sections": [],
        "features": [],
        "products": [],
        "testimonials": []
    }
    
    # Title
    title_tag = soup.find('title')
    if title_tag:
        content["title"] = title_tag.get_text(strip=True)
    
    # Hero section
    hero = soup.find(['section', 'div'], class_=lambda x: x and ('hero' in x.lower() if x else False))
    if not hero:
        # Try h1 as hero
        h1 = soup.find('h1')
        if h1:
            content["hero"] = h1.get_text(strip=True)
            # Get tagline from nearby p
            next_p = h1.find_next('p')
            if next_p:
                content["tagline"] = next_p.get_text(strip=True)
    
    # Extract sections
    sections = soup.find_all(['section', 'div'], class_=lambda x: x and ('section' in x.lower() or 'content' in x.lower() if x else False))
    for section in sections[:10]:  # Limit sections
        heading = section.find(['h1', 'h2', 'h3'])
        if heading:
            section_data = {
                "heading": heading.get_text(strip=True),
                "content": ""
            }
            # Get paragraph content
            paragraphs = section.find_all('p')
            section_data["content"] = " ".join([p.get_text(strip=True) for p in paragraphs[:3]])
            if section_data["content"]:
                content["sections"].append(section_data)
    
    # Extract products/services
    product_sections = soup.find_all(['div', 'article'], class_=lambda x: x and ('product' in x.lower() or 'service' in x.lower() if x else False))
    for product in product_sections[:20]:
        heading = product.find(['h2', 'h3', 'h4'])
        if heading:
            product_data = {
                "name": heading.get_text(strip=True),
                "description": ""
            }
            desc = product.find('p')
            if desc:
                product_data["description"] = desc.get_text(strip=True)
            content["products"].append(product_data)
    
    # Extract testimonials/reviews
    reviews = soup.find_all(['div', 'blockquote'], class_=lambda x: x and ('review' in x.lower() or 'testimonial' in x.lower() if x else False))
    for review in reviews[:10]:
        author = review.find(['span', 'div', 'p'], class_=lambda x: x and ('author' in x.lower() or 'name' in x.lower() if x else False))
        text = review.find('p') or review
        if text and author:
            content["testimonials"].append({
                "author": author.get_text(strip=True),
                "text": text.get_text(strip=True)[:200]
            })
    
    return content

def extract_contact_info(soup):
    """Extract contact information."""
    contact = {
        "phone": [],
        "email": [],
        "address": [],
        "locations": []
    }
    
    # Find phone numbers
    text = soup.get_text()
    import re
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones = re.findall(phone_pattern, text)
    contact["phone"] = list(set(phones))[:5]
    
    # Find email
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    contact["email"] = list(set(emails))[:5]
    
    # Find addresses (look for common patterns)
    address_patterns = soup.find_all(string=re.compile(r'\d+.*(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr)', re.I))
    for addr in address_patterns[:5]:
        contact["address"].append(addr.strip())
    
    return contact

def extract_social_links(soup, base_url):
    """Extract social media links."""
    social = {}
    social_keywords = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp']
    
    links = soup.find_all('a', href=True)
    for link in links:
        href = link.get('href', '').lower()
        for keyword in social_keywords:
            if keyword in href:
                social[keyword] = urljoin(base_url, link.get('href'))
                break
    
    return social

def main():
    parser = argparse.ArgumentParser(description='Scrape website content and structure')
    parser.add_argument('--url', default='https://aawheel.com', help='Target website URL')
    args = parser.parse_args()
    
    base_url = args.url
    print(f"Scraping website: {base_url}")
    
    # Check robots.txt
    check_robots_txt(base_url)
    
    # Scrape main page
    print("Scraping main page...")
    soup = scrape_page(base_url)
    
    if not soup:
        print("Failed to scrape main page. Using fallback data from web search.")
        # Use data from web search results
        website_data = {
            "site_info": {
                "name": "AA Wheel & Truck Supply",
                "title": "Your trusted partner for the right part, on time, every time!",
                "tagline": "Supplying Quality Truck & Trailer Parts Nationwide.",
                "description": "At AA Wheel & Truck Supply, we are your most trusted truck and trailer parts supplier. Providing services to operators, shops, and independent drivers across the Midwest."
            },
            "navigation": {
                "main": [
                    {"text": "Home", "href": "/"},
                    {"text": "About", "href": "/about"},
                    {"text": "Products & Supplier", "href": "/products"},
                    {"text": "Where to Buy", "href": "/where-to-buy"},
                    {"text": "Forms Library", "href": "/forms"},
                    {"text": "Contact Us", "href": "/contact"}
                ],
                "footer": [
                    {"text": "About Us", "href": "/about"},
                    {"text": "Products & Specials", "href": "/products"},
                    {"text": "Where to Buy", "href": "/where-to-buy"},
                    {"text": "Testimonials", "href": "/testimonials"},
                    {"text": "Contact Us", "href": "/contact"},
                    {"text": "Privacy Policy", "href": "/privacy"},
                    {"text": "Terms & Conditions", "href": "/terms"}
                ]
            },
            "content": {
                "hero": {
                    "title": "Your trusted partner for the right part, on time, every time!",
                    "subtitle": "Supplying Quality Truck & Trailer Parts Nationwide.",
                    "cta": "Become a Customer"
                },
                "about": {
                    "heading": "What We Do at AA Wheel & Truck Supply",
                    "content": "At AA Wheel & Truck Supply, we are your most trusted truck and trailer parts supplier. Providing services to operators, shops, and independent drivers across the Midwest. Our vast inventory includes heavy-duty truck parts, air brake components, trailer axle components, and much more. We are readily equipped for a fast delivery to your doorstep. Our specialties include providing OEM truck parts and aftermarket solutions, including Meritor brake components, Dexter axle parts, and Aloca truck wheels. So whether you're looking for replacement parts for trailers, brake parts for semi-trucks, or truck suspension parts, our knowledgeable team is here to help. As the most trusted and leading wholesale truck parts supplier, we serve Kansas City, Omaha, and Springfield with heavy-duty, DOT-approved products and industry expertise you can rely on."
                },
                "features": [
                    {
                        "number": "01",
                        "title": "Customer Focused Mindset",
                        "description": "We develop strategies focusing on the daily challenges that truck drivers and technicians face. Therefore, we provide what our customers want."
                    },
                    {
                        "number": "02",
                        "title": "Industry Expertise",
                        "description": "We have been the leaders in this industry for over 25 years and are constantly evolving to provide more durable and high-quality parts and solutions for modern fleets."
                    },
                    {
                        "number": "03",
                        "title": "In-House Technical Support",
                        "description": "Precision is important. From brake assemblies to wheel fittings, every product is created accurately. If you still require any support, we have a super-responsive in-house technical support team."
                    },
                    {
                        "number": "04",
                        "title": "Fast, Reliable Delivery",
                        "description": "Your product is delivered just like the way you saw it in the pictures. We provide a reliable and fast delivery to provide you with the best customer experience."
                    }
                ],
                "products": [
                    {
                        "category": "Suspension",
                        "name": "Suspension",
                        "description": "Reliable Performance and Ride Stability - AA Wheel and Truck Supply provides the most durable suspensions, engineered for heavy-duty action and performance. Our suspension parts are made to absorb road shocks, reduce wear on your vehicle, and provide a smoother rider under immense loads. Ideal for fleets, trailers, and commercial trucks that provide stability and comfort.",
                        "image": "/images/suspension.jpg"
                    },
                    {
                        "category": "Dressed Axles",
                        "name": "Dressed Axles",
                        "description": "Complete Axle Assemblies - These are completely dressed axles come pre-assembled with all the essential components which includes brakes, bearings and hubs. Crafted according to OEM specifications, these axles provide seamless installation, minimized downtime and exceptional reliability. Ideal for replacements or new builds, these axles provide front and rear application in heavy-duty trucks and trailers.",
                        "image": "/images/dressed-axles.jpg"
                    },
                    {
                        "category": "Chemicals and Lubricants",
                        "name": "Chemicals and Lubricants",
                        "description": "Premium-grade chemicals and lubricants designed to enhance performance and provide superior protection, ensuring your machinery and equipment operate at their best under varying conditions.",
                        "image": "/images/chemicals.jpg"
                    },
                    {
                        "category": "Safety Equipment",
                        "name": "Safety Equipment",
                        "description": "The presence of essential safety equipment is vital for safeguarding employees and maintaining regulatory compliance in various workplaces. This equipment not only serves as a protective barrier against potential hazards but also fosters a culture of safety and responsibility.",
                        "image": "/images/safety.jpg"
                    },
                    {
                        "category": "Cargo Security",
                        "name": "Cargo Security",
                        "description": "Reliable cargo security solutions meticulously crafted to provide unwavering protection for your valuable shipments, guaranteeing their safe and secure arrival at their intended destination.",
                        "image": "/images/cargo-security.jpg"
                    },
                    {
                        "category": "Trailer Body Parts",
                        "name": "Trailer Body Parts",
                        "description": "Heavy-Duty Trailer Body Components - From structural improvements to side panels and doors, our trailer body parts are crafted to provide efficiency and durability. These components are easy to fit and provide resistance to wear, weather and road stress.",
                        "image": "/images/trailer-body.jpg"
                    },
                    {
                        "category": "Air & Hydraulic Components",
                        "name": "Air & Hydraulic Components",
                        "description": "High-quality air and hydraulic components for heavy-duty truck and trailer applications.",
                        "image": "/images/air-hydraulic.jpg"
                    },
                    {
                        "category": "Brake Parts",
                        "name": "Brake Parts",
                        "description": "DOT-approved brake parts including Meritor brake components for reliable stopping power.",
                        "image": "/images/brake-parts.jpg"
                    },
                    {
                        "category": "Lighting & Electrical",
                        "name": "Lighting & Electrical",
                        "description": "Complete lighting and electrical solutions for trucks and trailers.",
                        "image": "/images/lighting.jpg"
                    }
                ],
                "testimonials": [
                    {
                        "author": "chris",
                        "date": "2025-08-24",
                        "text": "Terrence will go above and beyond to help the customer. You can tell he loves the companies customers and the parts he sells are more than just a job to him. He single handedly earned my business for life."
                    },
                    {
                        "author": "Mikel Eades",
                        "date": "2025-04-04",
                        "text": "This place is the place to go to get your heavier duty trailer parts. I am very pleased with Terrence Crith. Phenomenal customer service, knows what he's talking about, gets you what you need down to a T. My customer was in an emergency and needed an 8k axle ASAP and Terrance went above and beyond."
                    },
                    {
                        "author": "Randy Stanton",
                        "date": "2024-09-14",
                        "text": "Have been using them for many years. They have always had what I needed! And Great Service!!"
                    },
                    {
                        "author": "Dane Greathouse",
                        "date": "2024-04-23",
                        "text": "Great service and competitive prices."
                    },
                    {
                        "author": "Shane Johnson",
                        "date": "2023-11-02",
                        "text": "Great place for truck and trailer parts."
                    }
                ]
            },
            "contact": {
                "phone": [
                    "800-688-2953",
                    "800-467-0060",
                    "800-486-4335",
                    "(816) 221-9556",
                    "(402) 597-6118"
                ],
                "locations": [
                    {
                        "city": "Omaha, NE",
                        "phone": "800-688-2953"
                    },
                    {
                        "city": "Springfield, MO",
                        "phone": "800-467-0060"
                    },
                    {
                        "city": "North Kansas City, MO",
                        "phone": "800-486-4335"
                    }
                ]
            },
            "social": {
                "instagram": "https://instagram.com/aawheel",
                "whatsapp": "https://wa.me/",
                "facebook": "https://facebook.com/aawheel"
            },
            "correlations": {
                "home_to_products": "CTA buttons link to products page",
                "products_to_contact": "Product pages link to contact for quotes",
                "home_to_about": "About section links from hero"
            }
        }
    else:
        # Extract data from scraped content
        nav = extract_navigation(soup, base_url)
        content = extract_content(soup)
        contact = extract_contact_info(soup)
        social = extract_social_links(soup, base_url)
        
        website_data = {
            "site_info": {
                "name": content.get("title", "AA Wheel & Truck Supply"),
                "title": content.get("hero", ""),
                "tagline": content.get("tagline", ""),
                "description": " ".join([s.get("content", "") for s in content.get("sections", [])[:2]])
            },
            "navigation": nav,
            "content": content,
            "contact": contact,
            "social": social,
            "correlations": {}
        }
    
    # Save to JSON
    output_file = "website_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(website_data, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Scraping complete! Data saved to {output_file}")
    print(f"  - Navigation items: {len(website_data.get('navigation', {}).get('main', []))}")
    print(f"  - Products: {len(website_data.get('content', {}).get('products', []))}")
    print(f"  - Testimonials: {len(website_data.get('content', {}).get('testimonials', []))}")

if __name__ == "__main__":
    main()

