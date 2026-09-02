import re
import json

content = open("raw_data/homepage.html", encoding="utf-8").read()
tokens = re.findall(r'(--token-[a-zA-Z0-9_-]+):\s*([^;]+);', content)
token_dict = {}
for name, val in tokens:
    token_dict[name] = val.strip()

print(f"Discovered {len(token_dict)} CSS tokens:")
for k, v in list(token_dict.items())[:20]:
    print(f"  {k}: {v}")

with open("raw_data/theme_tokens.json", "w", encoding="utf-8") as f:
    json.dump(token_dict, f, indent=2)
