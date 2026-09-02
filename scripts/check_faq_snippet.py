import re

with open("raw_data/homepage.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find where "What services does HekayaHaus offer" appears
pos = html.find("What services does HekayaHaus offer")
if pos != -1:
    print("Found FAQ on homepage! Context:")
    # print 3000 characters around it
    snippet = html[pos:pos+3000]
    # strip HTML tags to read clean text
    clean = re.sub(r'<[^>]+>', ' ', snippet)
    clean = re.sub(r'\s+', ' ', clean)
    print(clean[:1500])
else:
    print("Not found directly as plain string in homepage.html")
