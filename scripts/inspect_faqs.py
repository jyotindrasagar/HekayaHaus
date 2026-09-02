import glob
import re
from html.parser import HTMLParser

for f in glob.glob("raw_data/*.html"):
    content = open(f, encoding="utf-8").read()
    # Search for FAQ questions or answers
    faqs = re.findall(r'<div[^>]*class="[^"]*framer-[^"]*"[^>]*>([^<]*(?:\?|HekayaHaus|Dubai|cost|service)[^<]*)</div>', content, re.I)
    clean_faqs = [q.strip() for q in faqs if len(q.strip()) > 20]
    if clean_faqs:
        print(f"=== {f} FAQ / Q&A fragments ({len(clean_faqs)}) ===")
        for q in clean_faqs[:10]:
            print("  >", q)
