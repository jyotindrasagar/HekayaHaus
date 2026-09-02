import re

html = open("raw_data/homepage.html", encoding="utf-8").read()
modules = re.findall(r'https://framerusercontent\.com/[^\s"\'\)]+\.mjs', html)
print(f"Modules found: {len(set(modules))}")
for m in sorted(list(set(modules))):
    print(" ", m)
