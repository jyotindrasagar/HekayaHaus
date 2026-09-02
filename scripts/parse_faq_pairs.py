import glob
import re
import json

faq_components = []

for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    # Framer FAQ accordion components typically have:
    # rawvYUUzX (Q1), KjHOx49kL (A1)
    # tvNxOx7cw (Q2), oRIOycR3Y (A2)
    # pj8TaM0YQ (Q3), Tiiziaej8 (A3)
    # IFjQjdWql (Q4), JuxOgtiro (A4)
    # mDV6PtA6K (Q5), F6lM4exSR (A5)
    
    # Let's search for blocks with rawvYUUzX
    matches = re.finditer(r'rawvYUUzX:`([^`]+)`', content)
    for m in matches:
        start = max(0, m.start() - 100)
        end = min(len(content), m.end() + 1500)
        snippet = content[start:end]
        
        q1 = re.search(r'rawvYUUzX:`([^`]+)`', snippet)
        a1 = re.search(r'KjHOx49kL:`([^`]+)`', snippet)
        q2 = re.search(r'tvNxOx7cw:`([^`]+)`', snippet)
        a2 = re.search(r'oRIOycR3Y:`([^`]+)`', snippet)
        q3 = re.search(r'pj8TaM0YQ:`([^`]+)`', snippet)
        a3 = re.search(r'Tiiziaej8:`([^`]+)`', snippet)
        q4 = re.search(r'IFjQjdWql:`([^`]+)`', snippet)
        a4 = re.search(r'JuxOgtiro:`([^`]+)`', snippet)
        q5 = re.search(r'mDV6PtA6K:`([^`]+)`', snippet)
        a5 = re.search(r'F6lM4exSR:`([^`]+)`', snippet)
        
        group = {
            "source_module": f,
            "items": []
        }
        if q1 and a1: group["items"].append({"q": q1.group(1), "a": a1.group(1)})
        if q2 and a2: group["items"].append({"q": q2.group(1), "a": a2.group(1)})
        if q3 and a3: group["items"].append({"q": q3.group(1), "a": a3.group(1)})
        if q4 and a4: group["items"].append({"q": q4.group(1), "a": a4.group(1)})
        if q5 and a5: group["items"].append({"q": q5.group(1), "a": a5.group(1)})
        
        if group["items"] and group not in faq_components:
            faq_components.append(group)

with open("raw_data/all_faqs_parsed.json", "w", encoding="utf-8") as f:
    json.dump(faq_components, f, indent=2)

print(f"Discovered {len(faq_components)} FAQ component groups:")
for i, g in enumerate(faq_components):
    print(f"\nGroup {i+1} (from {g['source_module']}):")
    for item in g["items"]:
        print(f"  Q: {item['q']}")
        print(f"  A: {item['a']}")
