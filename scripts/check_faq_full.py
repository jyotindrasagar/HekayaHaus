with open("raw_data/homepage.html", "r", encoding="utf-8") as f:
    html = f.read()

pos = html.find("What services does HekayaHaus offer")
if pos != -1:
    snippet = html[pos:pos+5000]
    import re
    # find all paragraph tags or spans
    texts = re.findall(r'>([^<]+)<', snippet)
    clean_texts = [t.strip() for t in texts if len(t.strip()) > 3]
    for ct in clean_texts:
        print("FAQ text fragment:", ct)
