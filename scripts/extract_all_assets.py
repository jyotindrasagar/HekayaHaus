import glob
import re
import json

all_assets = {
    "assets_urls": set(),
    "images_urls": set(),
    "script_chunks": set(),
    "css_files": set(),
    "youtube_videos": set(),
    "socials": set(),
    "booking": set(),
    "contact": set()
}

for file_path in glob.glob("raw_data/*.html"):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Asset files (mp4, webm, fonts, etc.)
    all_assets["assets_urls"].update(re.findall(r'https://framerusercontent\.com/assets/[a-zA-Z0-9_\-\.]+', content))
    
    # Image files
    all_assets["images_urls"].update(re.findall(r'https://framerusercontent\.com/images/[a-zA-Z0-9_\-\.]+', content))
    
    # Script chunks
    all_assets["script_chunks"].update(re.findall(r'https://framerusercontent\.com/modules/[a-zA-Z0-9_\-\.]+', content))
    
    # YouTube
    all_assets["youtube_videos"].update(re.findall(r'https?://(?:www\.)?(?:youtube\.com|youtu\.be)/[^\s"\'<>)]+', content))
    
    # Socials
    all_assets["socials"].update(re.findall(r'https?://(?:www\.)?(?:instagram\.com|linkedin\.com)/[^\s"\'<>)]+', content))
    
    # Booking
    all_assets["booking"].update(re.findall(r'https?://calendar\.app\.google/[^\s"\'<>)]+', content))
    
    # Email
    all_assets["contact"].update([e for e in re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', content) if 'hekayahaus' in e])

res = {k: sorted(list(v)) for k, v in all_assets.items()}

with open("raw_data/all_discovered_assets.json", "w", encoding="utf-8") as f:
    json.dump(res, f, indent=2)

print(f"Discovered Assets Summary:")
print(f"- Assets (media/fonts/binaries): {len(res['assets_urls'])}")
print(f"- Images: {len(res['images_urls'])}")
print(f"- Script Chunks (Framer modules): {len(res['script_chunks'])}")
print(f"- YouTube: {res['youtube_videos']}")
print(f"- Socials: {res['socials']}")
print(f"- Booking: {res['booking']}")
print(f"- Official Contact: {res['contact']}")

for a in res['assets_urls']:
    print("Asset:", a)
