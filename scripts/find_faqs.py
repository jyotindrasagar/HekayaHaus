import glob
import re

print("Searching for FAQ answers...")
for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    if "What services does HekayaHaus offer" in content or "Where is Hekaya Haus located" in content:
        print(f"Found FAQ in {f}!")
        # Let's extract questions and text around it
        matches = re.findall(r'"([^"\\]*HekayaHaus[^"\\]*)"', content)
        for m in matches[:10]:
            print("  -", m)

# Let's search for "Hekaya Haus is located" or "offer as a creative"
for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    if "offer as a creative media" in content:
        # Find string literals in this file
        strs = re.findall(r'"([^"\\]{20,500})"', content)
        print(f"\n--- Strings in {f} ({len(strs)}) ---")
        for s in strs:
            if any(w in s.lower() for w in ["dubai", "agency", "service", "pricing", "cost", "located", "production", "faq"]):
                print("  * ", s)
