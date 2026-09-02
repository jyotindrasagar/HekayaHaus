import glob
import re
import json
# clean parser without bs4

assets = {
    "framer_images": set(),
    "framer_videos": set(),
    "youtube_links": set(),
    "social_links": set(),
    "emails": set(),
    "phones": set(),
    "booking_links": set(),
    "fonts": set(),
    "forms": []
}

for file_path in glob.glob("raw_data/*.html"):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Framer images
    imgs = re.findall(r'https://framerusercontent\.com/images/[a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|webp|svg|gif)', content)
    assets["framer_images"].update(imgs)

    # Any other image URLs
    other_imgs = re.findall(r'https://[^\s"\'\)]+\.(?:png|jpg|jpeg|webp|svg|gif)', content)
    for img in other_imgs:
        if "framerusercontent.com" in img:
            assets["framer_images"].add(img)

    # Videos
    vids = re.findall(r'https://[^\s"\'\)]+\.(?:mp4|webm|mov)', content)
    assets["framer_videos"].update(vids)

    # YouTube links
    yt = re.findall(r'https?://(?:www\.)?(?:youtube\.com|youtu\.be)/[^\s"\'<>)]+', content)
    assets["youtube_links"].update(yt)

    # Instagram, LinkedIn, etc.
    socials = re.findall(r'https?://(?:www\.)?(?:instagram\.com|linkedin\.com|tiktok\.com|twitter\.com|x\.com|facebook\.com)/[^\s"\'<>)]+', content)
    assets["social_links"].update(socials)

    # Google calendar / booking links
    cal = re.findall(r'https?://calendar\.app\.google/[^\s"\'<>)]+', content)
    assets["booking_links"].update(cal)

    # Emails
    emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', content)
    assets["emails"].update(emails)

    # Phone numbers
    phones = re.findall(r'\+971[\s0-9-]{7,15}', content)
    assets["phones"].update(phones)

    # Fonts
    fonts = re.findall(r'font-family:\s*([^;]+);', content)
    for font in fonts:
        clean_font = font.replace('"', '').replace("'", "").strip()
        if clean_font:
            assets["fonts"].add(clean_font)

result = {k: sorted(list(v)) if isinstance(v, set) else v for k, v in assets.items()}
with open("raw_data/parsed_assets.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2)

print("Parsed summary:")
print(f"Total Unique Framer Images: {len(result['framer_images'])}")
print(f"Total Unique Framer Videos: {len(result['framer_videos'])}")
print(f"YouTube links: {result['youtube_links']}")
print(f"Social links: {result['social_links']}")
print(f"Booking links: {result['booking_links']}")
print(f"Emails: {result['emails']}")
print(f"Phones: {result['phones']}")
print(f"Fonts detected: {result['fonts']}")
