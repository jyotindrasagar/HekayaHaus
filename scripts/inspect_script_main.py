import re

content = open("raw_data/script_main.mjs", encoding="utf-8").read()
# Find all imports
imports = re.findall(r'from\s*["\'](\./[^"\']+)["\']', content)
print("Imported modules:", imports)

# Find route mapping
routes = re.findall(r'["\'](/[^"\']*)["\']:\s*\{', content)
print("Route keys found:", routes)

# Find any strings that look like questions, answers, texts
text_matches = re.findall(r'"([^"\\]{20,})"', content)
print(f"Long string literals in script_main: {len(text_matches)}")
for t in text_matches[:10]:
    print("  *", t)
