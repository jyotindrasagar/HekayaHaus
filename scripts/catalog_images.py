import glob
import re
import json

image_map = {}

for f in glob.glob("raw_data/*.html"):
    content = open(f, encoding="utf-8").read()
    page_name = f.replace("raw_data\\", "").replace(".html", "")
    
    # Search for img tags with src and alt
    imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*alt=[\'"]([^\'"]*)[\'"]', content)
    for src, alt in imgs:
        if src not in image_map:
            image_map[src] = {"alt": alt, "pages": set()}
        image_map[src]["pages"].add(page_name)
    
    # Also background images
    bg_imgs = re.findall(r'url\([\'"]?(https://framerusercontent\.com/images/[^\'"\)]+)[\'"]?\)', content)
    for bg in bg_imgs:
        if bg not in image_map:
            image_map[bg] = {"alt": "background-image", "pages": set()}
        image_map[bg]["pages"].add(page_name)

output = []
for src, meta in image_map.items():
    output.append({
        "url": src,
        "alt": meta["alt"],
        "pages": sorted(list(meta["pages"]))
    })

with open("raw_data/image_catalog.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

print(f"Total cataloged images: {len(output)}")
for item in output[:20]:
    print(f"  [{item['alt'] or 'no-alt'}] -> {item['url'][:70]}... on {item['pages']}")
