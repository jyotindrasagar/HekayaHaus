import re

content = open("raw_data/WGktsHNSh.DvmAwVsz.mjs", encoding="utf-8").read()
print("WGktsHNSh length:", len(content))
# Find string literals longer than 30 chars
strings = re.findall(r'"([^"\\]{30,})"', content)
print(f"Strings found: {len(strings)}")
for s in strings[:30]:
    print("  -", s)

imports = re.findall(r'from\s*["\'](\./[^"\']+)["\']', content)
print("WGktsHNSh imports:", imports)
