import re

html = open("raw_data/homepage.html", encoding="utf-8").read()
scripts = re.findall(r'<script[^>]*src=[\'"]([^\'"]+)[\'"]', html)
for s in scripts:
    print(s)

# Also inline scripts
inline = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Inline script count: {len(inline)}")
for i, sc in enumerate(inline):
    if "Question" in sc or "services" in sc or "framer" in sc:
        print(f"Inline {i} sample: {sc[:200]}...")
