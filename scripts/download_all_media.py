import os
import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

base_dir = "public/assets"
os.makedirs(f"{base_dir}/logos", exist_ok=True)
os.makedirs(f"{base_dir}/showcase", exist_ok=True)
os.makedirs(f"{base_dir}/brand", exist_ok=True)
os.makedirs(f"{base_dir}/media", exist_ok=True)
os.makedirs(f"{base_dir}/textures", exist_ok=True)
os.makedirs(f"{base_dir}/all", exist_ok=True)

named_assets = {
    "logos/global_village.png": "https://framerusercontent.com/images/eDwNeOPvnYDWCofKrvJJRlBZO8.png",
    "logos/porsche.png": "https://framerusercontent.com/images/uApR4npXCw83PjLEEYFmPp7GKU.png",
    "logos/nike.png": "https://framerusercontent.com/images/3cNzWf21SF0ctWsto2VaaPsKQ.png",
    "logos/ea_sports.png": "https://framerusercontent.com/images/HSxNPVEdxYEIDB9mXjnWwI.png",
    "logos/hero.jpg": "https://framerusercontent.com/images/JFmdUitmWqJk5PlFXoNuLp5E.jpg",
    "logos/farak.png": "https://framerusercontent.com/images/T4H7zNNV4KCkP3t2eoGTIg9muA.png",
    "logos/redbull.svg": "https://framerusercontent.com/images/tNmxXKexmeB8tuU49599Voa2YNk.svg",
    "logos/lamborghini.png": "https://framerusercontent.com/images/tMFKQsjTgDycYV3x9iYKzKZ8OU.png",
    "brand/hekayahaus_logo.png": "https://framerusercontent.com/images/CGeI5eOLbZIuK5WnN16QRd0U18.png",
    "textures/noise.png": "https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png",
    "textures/glow.png": "https://framerusercontent.com/images/ls0yVOSyjR9KPmLQcXz1Kh4LlY4.png",
    "media/showreel_poster.jpg": "https://framerusercontent.com/assets/wIl1P7FfmSglt9U8OSBU9jtLNbY.jpg",
    "showcase/billboard.png": "https://framerusercontent.com/images/FWdjqDv3MlivzguqcgUoSTKxBY.png",
    "showcase/media_1.jpg": "https://framerusercontent.com/images/cLHlfaWh1hOQkXIcZpMxnlfwhus.jpeg",
    "showcase/media_2.jpg": "https://framerusercontent.com/images/2laA2Y2QiRE12hACluggVZpR20.jpeg",
    "showcase/media_3.jpg": "https://framerusercontent.com/images/wf3Igy09U4ZTKsEvQUTML2gF0.jpeg",
    "showcase/drone.png": "https://framerusercontent.com/images/cRRyydRI2YbKKWDb1gKGNT4Y.png",
    "showcase/cgi_artwork.jpg": "https://framerusercontent.com/images/icWWiYCXA9O8LXNszIZKLxJSDA.jpeg",
    "showcase/tech.jpg": "https://framerusercontent.com/images/GyMZslEfnby9bKWhFJCIJXIaPMI.jpg",
    "showcase/audio.jpg": "https://framerusercontent.com/images/K3FCkUigncv0khpqGopi8dYOFw.jpeg",
    "showcase/content_1.jpg": "https://framerusercontent.com/images/UdfZFs5uWS3T1qfTpl20rCcBD8.jpeg",
    "showcase/content_2.jpg": "https://framerusercontent.com/images/SrQfHZHCsEyp0UtG9xkVtq4GN3E.jpeg",
    "showcase/content_3.jpg": "https://framerusercontent.com/images/PD6vohvpAB3ocvLEuRJo3dsc.jpeg",
    "showcase/marketing.png": "https://framerusercontent.com/images/y8tAkvSdiiDQgNKpPwiUEaD4yg.png",
    "showcase/contact_render.png": "https://framerusercontent.com/images/K8GosFzci8RT3BtVszYzmMKyZE.png",
}

print(f"Downloading {len(named_assets)} critical assets...")
downloaded = {}
headers = {'User-Agent': 'Mozilla/5.0'}

for rel_path, url in named_assets.items():
    dest = os.path.join(base_dir, rel_path)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            with open(dest, "wb") as f:
                f.write(data)
            downloaded[rel_path] = len(data)
            print(f"  [OK] {rel_path} ({len(data)} bytes)")
    except Exception as e:
        print(f"  [ERR] Failed {rel_path}: {e}")

# Now also download any remaining images from all_discovered_assets.json into public/assets/all/
with open("raw_data/all_discovered_assets.json", "r", encoding="utf-8") as f:
    disco = json.load(f)

for img_url in disco.get("images_urls", []):
    filename = img_url.split("/")[-1]
    dest = os.path.join(base_dir, "all", filename)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                data = resp.read()
                with open(dest, "wb") as f:
                    f.write(data)
                print(f"  [OK-ALL] {filename} ({len(data)} bytes)")
        except Exception as e:
            print(f"  [SKIP-ALL] {filename}: {e}")

with open(f"{base_dir}/manifest.json", "w", encoding="utf-8") as f:
    json.dump(downloaded, f, indent=2)

print("Asset downloading complete!")
