import re

html = open("raw_data/homepage.html", encoding="utf-8").read()
# find "Chosen by leaders"
pos = html.find("Chosen by leaders")
if pos != -1:
    snippet = html[pos:pos+15000]
    # find all img tags inside this section
    imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*alt=[\'"]([^\'"]*)[\'"]', snippet)
    print(f"Chosen by leaders imgs ({len(imgs)}):")
    for src, alt in imgs:
        print(f"  {alt} -> {src}")
