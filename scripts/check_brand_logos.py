import re

html = open("raw_data/homepage.html", encoding="utf-8").read()

# Look for client logos or SVGs or image tags around "Porsche" or "Nike"
for brand in ["Porsche", "Nike", "Lamborgini", "Redbull", "Global Village", "EA Sports", "Hero", "Farak"]:
    pos = html.find(brand)
    if pos != -1:
        snippet = html[max(0, pos-400):min(len(html), pos+400)]
        imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\'\)]+', snippet)
        print(f"Brand '{brand}' nearby images: {imgs}")
    else:
        print(f"Brand '{brand}' not found directly in text")
