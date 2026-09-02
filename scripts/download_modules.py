import glob
import re
import urllib.request
import os

os.makedirs("raw_data/modules", exist_ok=True)
all_module_urls = set()

for f in glob.glob("raw_data/*.html"):
    content = open(f, encoding="utf-8").read()
    mods = re.findall(r'https://framerusercontent\.com/sites/5QynPxwSyHGrBg8sPJZcxK/[a-zA-Z0-9_\-\.]+\.mjs', content)
    all_module_urls.update(mods)

print(f"Total modules to fetch: {len(all_module_urls)}")

for url in all_module_urls:
    fname = url.split("/")[-1]
    dest = os.path.join("raw_data/modules", fname)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req) as resp:
                with open(dest, "wb") as out:
                    out.write(resp.read())
            print(f"Fetched {fname}")
        except Exception as e:
            print(f"Failed {url}: {e}")

# Now inspect strings in downloaded modules
print("\n--- EXTRACTING ALL TEXT STRINGS FROM MODULES ---")
extracted_texts = set()
for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    # Find string literals longer than 25 characters
    strings = re.findall(r'"([^"\\]{25,})"', content)
    strings += re.findall(r'`([^`\\]{25,})`', content)
    for s in strings:
        clean = s.strip()
        if not clean.startswith("http") and not clean.startswith("./") and not clean.startswith("var(") and not "framer" in clean and not "display:" in clean:
            extracted_texts.add(clean)

with open("raw_data/extracted_module_strings.txt", "w", encoding="utf-8") as out:
    for t in sorted(list(extracted_texts)):
        out.write(t + "\n")

print(f"Saved {len(extracted_texts)} rich text strings to raw_data/extracted_module_strings.txt")
