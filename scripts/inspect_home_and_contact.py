import json

data = json.load(open("raw_data/full_site_extracted.json", encoding="utf-8"))

for route in ["/", "/contact-us", "/allserviceshekayahaus"]:
    info = data[route]
    print(f"\n==========================================")
    print(f"ROUTE: {route}")
    print(f"TITLE: {info.get('title')}")
    print(f"DESCRIPTION: {info.get('description')}")
    print("--- TEXT DUMP ---")
    seen = set()
    for t in info.get("text", []):
        if t not in seen and len(t) > 2:
            seen.add(t)
            print("  *", t)
