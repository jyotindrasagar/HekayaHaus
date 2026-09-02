import urllib.request
import re
import json
import os
from html.parser import HTMLParser

routes = [
    "/",
    "/contact-us",
    "/allserviceshekayahaus",
    "/media-production-dubai",
    "/content-marketing-dubai",
    "/graphics-dubai",
    "/event-organise-dubai",
    "/web-development-dubai",
    "/audio-direction-dubai",
    "/blogs"
]

base_url = "https://www.hekayahaus.com"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

os.makedirs("raw_data", exist_ok=True)

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.links = []
        self.images = []
        self.ignore_tags = {"script", "style", "noscript"}
        self.current_ignore = False

    def handle_starttag(self, tag, attrs):
        if tag in self.ignore_tags:
            self.current_ignore = True
        attr_dict = dict(attrs)
        if tag == "a" and "href" in attr_dict:
            self.links.append({"href": attr_dict["href"], "title": attr_dict.get("title", "")})
        if tag == "img":
            self.images.append({
                "src": attr_dict.get("src", ""),
                "alt": attr_dict.get("alt", ""),
                "srcset": attr_dict.get("srcset", "")
            })

    def handle_endtag(self, tag):
        if tag in self.ignore_tags:
            self.current_ignore = False

    def handle_data(self, data):
        if not self.current_ignore:
            cleaned = data.strip()
            if cleaned:
                self.text_parts.append(cleaned)

site_data = {}

for route in routes:
    full_url = base_url + route if route != "/" else base_url + "/"
    print(f"Fetching {full_url}...")
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        
        # Save raw HTML
        filename_safe = "homepage" if route == "/" else route.replace("/", "").replace("-", "_")
        with open(f"raw_data/{filename_safe}.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        parser = TextExtractor()
        parser.feed(html)

        # Look for additional blog posts or links
        additional_links = [l["href"] for l in parser.links if l["href"].startswith("/blogs/")]
        
        # Look for videos/iframes
        videos = re.findall(r'<video[^>]*src=[\'"]([^\'"]+)[\'"]', html, re.I)
        video_sources = re.findall(r'<source[^>]*src=[\'"]([^\'"]+)[\'"]', html, re.I)
        iframes = re.findall(r'<iframe[^>]*src=[\'"]([^\'"]+)[\'"]', html, re.I)
        
        # Extract title and meta description
        title_m = re.search(r'<title>([^<]+)</title>', html, re.I)
        desc_m = re.search(r'<meta[^>]*name=[\'"]description[\'"][^>]*content=[\'"]([^\'"]*)[\'"]', html, re.I)
        
        site_data[route] = {
            "url": full_url,
            "title": title_m.group(1).strip() if title_m else "",
            "description": desc_m.group(1).strip() if desc_m else "",
            "text": parser.text_parts,
            "links": parser.links,
            "images": parser.images,
            "videos": list(set(videos + video_sources)),
            "iframes": list(set(iframes)),
            "additional_blog_links": list(set(additional_links))
        }
    except Exception as e:
        print(f"Error fetching {route}: {e}")

# Check any discovered blog links
all_blog_links = set()
for r, d in site_data.items():
    for bl in d.get("additional_blog_links", []):
        all_blog_links.add(bl)

print(f"Discovered {len(all_blog_links)} specific blog links: {all_blog_links}")

for bl in all_blog_links:
    full_url = base_url + bl
    print(f"Fetching blog article {full_url}...")
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        filename_safe = bl.replace("/", "_").strip("_")
        with open(f"raw_data/{filename_safe}.html", "w", encoding="utf-8") as f:
            f.write(html)
        parser = TextExtractor()
        parser.feed(html)
        title_m = re.search(r'<title>([^<]+)</title>', html, re.I)
        site_data[bl] = {
            "url": full_url,
            "title": title_m.group(1).strip() if title_m else "",
            "text": parser.text_parts,
            "links": parser.links,
            "images": parser.images,
            "videos": [],
            "iframes": []
        }
    except Exception as e:
        print(f"Error fetching {bl}: {e}")

with open("raw_data/full_site_extracted.json", "w", encoding="utf-8") as f:
    json.dump(site_data, f, indent=2, ensure_ascii=False)

print("Extraction complete. Saved to raw_data/full_site_extracted.json")
