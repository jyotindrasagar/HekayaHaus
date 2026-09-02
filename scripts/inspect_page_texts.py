import json

data = json.load(open("raw_data/full_site_extracted.json", encoding="utf-8"))

for route, info in data.items():
    print(f"\n==========================================")
    print(f"ROUTE: {route}")
    print(f"TITLE: {info.get('title')}")
    print(f"DESCRIPTION: {info.get('description')}")
    print(f"TEXT COUNT: {len(info.get('text', []))}")
    print("--- SAMPLE TEXT EXCERPT (first 25 parts) ---")
    for t in info.get("text", [])[:25]:
        print("  -", t)
