import json

data = json.load(open("raw_data/full_site_extracted.json", encoding="utf-8"))

for route in [
    "/media-production-dubai",
    "/content-marketing-dubai",
    "/graphics-dubai",
    "/event-organise-dubai",
    "/web-development-dubai",
    "/audio-direction-dubai"
]:
    info = data[route]
    print(f"\n==========================================")
    print(f"ROUTE: {route}")
    print(f"TITLE: {info.get('title')}")
    print("--- TEXT UNIQUE LIST ---")
    seen = set()
    cleaned_list = []
    for t in info.get("text", []):
        t_clean = t.strip()
        if len(t_clean) > 2 and t_clean not in seen and not t_clean.startswith("{") and not t_clean.endswith(".jpg\">"):
            seen.add(t_clean)
            cleaned_list.append(t_clean)
    for t in cleaned_list:
        print("  -", t)
