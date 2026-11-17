"""
Builds responsive WebP variants of the real HekayaHaus assets.

Usage:  python scripts/optimize_media.py
Output: public/media/img/<name>-<width>.webp
        public/media/logos/<name>.png   (cleaned, transparent client logos)
        src/data/media.generated.ts     (dimensions + tiny blur placeholders)

Source files live in public/assets/ (archived from the original site).
"""
import base64
import io
import json
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "assets", "all")
OUT = os.path.join(ROOT, "public", "media", "img")
LOGO_OUT = os.path.join(ROOT, "public", "media", "logos")
TS_OUT = os.path.join(ROOT, "src", "data", "media.generated.ts")

WIDTHS = [480, 960, 1440, 2200]

# name -> (source file, alt text, optional crop box as fractions l,t,r,b, duotone)
IMAGES = {
    "portrait-lightbulb": ("9S6fbiynb2ReR2u7OlZmg3fE.jpg", "Cinematic portrait of a woman lit by a single tungsten bulb", None, False),
    "portrait-lightbulb-duo": ("9S6fbiynb2ReR2u7OlZmg3fE.jpg", "Cinematic portrait of a woman lit by a single tungsten bulb, cobalt duotone", None, True),
    "portrait-neon": ("H9tY8ZNdkXVDaXK340XBjOJnQs.jpeg", "Night portrait in front of red neon signage", None, False),
    "event-neon-arcade": ("UIg24j4d51tGj6TA1YDJnenodIs.jpeg", "Neon-lit arcade event coverage", None, False),
    "auto-mercedes-dubai": ("VWjjG0mgS5ubSKjEAKf11rioYuc.jpg", "White convertible photographed at golden hour on a Dubai rooftop", None, False),
    "auto-mercedes-dubai-2": ("qe8npATyXJZyfgAcN9WPdCvsRj4.jpg", "Convertible on a rooftop with the Dubai skyline behind", None, False),
    "auto-bmw-x6": ("cLHlfaWh1hOQkXIcZpMxnlfwhus.jpeg", "Studio detail of a BMW X6 kidney grille", None, False),
    "auto-cockpit": ("2laA2Y2QiRE12hACluggVZpR20.jpeg", "In-cabin shot of a driver's hands on the steering wheel at night", None, False),
    "fnb-bartender": ("1wTmtCMSsLmEqvJdzckl1YJx468.jpeg", "Bartender preparing a drink, captured for a hospitality shoot", None, False),
    "film-set-clapper": ("K3FCkUigncv0khpqGopi8dYOFw.jpeg", "Clapperboard marking a take on a HekayaHaus film set", None, False),
    "events-decor": ("cRRyydRI2YbKKWDb1gKGNT4Y.png", "Collage of event décor and stage styling", None, False),
    "brand-kofo": ("eFio3NIOsB0xEit5mcd58fRxYI.jpg", "Kofo brand identity printed on holographic business cards", None, False),
    "poster-campus-map": ("icWWiYCXA9O8LXNszIZKLxJSDA.jpeg", "Illustrated campus map poster in red and black", None, False),
    "poster-teaser": ("obJqxVRTram606lQ7NZ3lnxRBfQ.jpeg", "Official teaser key art for a feature film", None, False),
    "poster-lyrical": ("OpvoH2WF0B1JVQiDMvjrAG44Ug.jpeg", "Key art for a film lyrical video release", None, False),
    "poster-f1-hamilton": ("PD6vohvpAB3ocvLEuRJo3dsc.jpeg", "Formula 1 driver key art poster in red", None, False),
    "poster-f1-verstappen": ("SrQfHZHCsEyp0UtG9xkVtq4GN3E.jpeg", "Formula 1 driver key art poster in navy and red", None, False),
    "poster-mustang": ("UdfZFs5uWS3T1qfTpl20rCcBD8.jpeg", "Editorial poster of a classic Ford Mustang Boss 302", None, False),
    "design-grid": ("ls0yVOSyjR9KPmLQcXz1Kh4LlY4.png", "Grid of HekayaHaus social and campaign designs", None, False),
    "tech-isometric-1": ("ER4U1QCWB5XOEJKavGu97kXoQ.jpg", "Isometric illustration of connected digital products", None, False),
    "tech-isometric-2": ("Ieq0eXXHkLlzsTRbuva81Lkri4c.jpg", "Isometric illustration of a data and payments platform", None, False),
    "web-landing": ("AwkkRatLF9QSMsy45LGWVmAdCUE.jpg", "Full-length landing page design", (0, 0, 1, 0.32), False),
    "web-editorial": ("GyMZslEfnby9bKWhFJCIJXIaPMI.jpg", "Editorial e-commerce website design", (0, 0, 1, 0.55), False),
    "web-portfolio": ("wCGVJR23eVJ3fOUyvtNeViDkQoE.jpg", "Portfolio website design", (0, 0, 1, 0.22), False),
    "web-wireframes": ("FWdjqDv3MlivzguqcgUoSTKxBY.png", "Website wireframes and page system", None, False),
    "social-campaign": ("y8tAkvSdiiDQgNKpPwiUEaD4yg.png", "Social campaign creative shown on a phone screen", (0, 0.04, 1, 0.92), False),
    "showreel-poster": ("../media/showreel_poster.jpg", "HekayaHaus showreel title frames", None, False),
}

LOGOS = {
    "porsche": "porsche.png",
    "lamborghini": "lamborghini.png",
    "nike": "nike.png",
    "redbull": "redbull.svg",
    "ea-sports": "ea_sports.png",
    "global-village": "global_village.png",
    "hero": "hero.jpg",
    "farak": "farak.png",
}

DUO_STOPS = [
    (0.00, (5, 11, 24)),
    (0.22, (8, 21, 47)),
    (0.50, (11, 47, 206)),
    (0.66, (23, 70, 255)),
    (0.86, (220, 229, 255)),
    (1.00, (255, 254, 250)),
]


def duotone(img: Image.Image) -> Image.Image:
    gray = ImageOps.autocontrast(img.convert("L"), cutoff=1)
    lut = {0: [], 1: [], 2: []}
    for i in range(256):
        t = i / 255
        for (p0, c0), (p1, c1) in zip(DUO_STOPS, DUO_STOPS[1:]):
            if p0 <= t <= p1:
                k = (t - p0) / (p1 - p0)
                for ch in range(3):
                    lut[ch].append(round(c0[ch] + (c1[ch] - c0[ch]) * k))
                break
    return Image.merge("RGB", [gray.point(lut[ch]) for ch in range(3)])


def placeholder(img: Image.Image) -> str:
    tiny = img.copy()
    tiny.thumbnail((16, 16))
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(LOGO_OUT, exist_ok=True)
    registry = {}
    for name, (src, alt, crop, duo) in IMAGES.items():
        im = Image.open(os.path.join(SRC, src))
        im = im.convert("RGB")
        if crop:
            w, h = im.size
            im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
        if duo:
            im = duotone(im)
        w, h = im.size
        widths = []
        for target in WIDTHS:
            if target > w and widths:
                continue
            tw = min(target, w)
            th = round(h * tw / w)
            out = im.resize((tw, th), Image.LANCZOS)
            out.save(os.path.join(OUT, f"{name}-{tw}.webp"), "WEBP", quality=78, method=6)
            widths.append(tw)
        registry[name] = {"w": w, "h": h, "widths": widths, "alt": alt, "blur": placeholder(im)}
        print(f"{name}: {w}x{h} -> {widths}")

    logo_src = os.path.join(ROOT, "public", "assets", "logos")
    for name, src in LOGOS.items():
        path = os.path.join(logo_src, src)
        if src.endswith(".svg"):
            with open(path, "rb") as f:
                data = f.read()
            with open(os.path.join(LOGO_OUT, f"{name}.svg"), "wb") as f:
                f.write(data)
            continue
        im = Image.open(path).convert("RGBA")
        px = im.load()
        w, h = im.size
        # Knock out white / light-grey (incl. baked checkerboards) backgrounds.
        for y in range(h):
            for x in range(w):
                r, g, b, a = px[x, y]
                spread = max(r, g, b) - min(r, g, b)
                if a and spread < 18 and min(r, g, b) > 185:
                    px[x, y] = (r, g, b, 0)
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        im.thumbnail((360, 200))
        im.save(os.path.join(LOGO_OUT, f"{name}.png"), optimize=True)
        print("logo", name, im.size)

    with open(TS_OUT, "w", encoding="utf-8") as f:
        f.write("// Generated by scripts/optimize_media.py. Do not edit by hand.\n")
        f.write("export const MEDIA = ")
        f.write(json.dumps(registry, indent=2, ensure_ascii=False))
        f.write(" as const;\n\nexport type MediaName = keyof typeof MEDIA;\n")


if __name__ == "__main__":
    main()
