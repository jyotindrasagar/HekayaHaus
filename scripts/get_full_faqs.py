import glob
import re
import json

module_faqs = {}

for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    if "rawvYUUzX:`" in content:
        # Find all keys in that Ke / Faq object
        # Let's find the full JSX element call with these props
        m = re.search(r'([A-Za-z0-9_]+),\s*\{([^}]*rawvYUUzX:[^}]+)\}', content)
        if m:
            props_str = m.group(2)
            # extract key: `val` or key: "val"
            props = dict(re.findall(r'([A-Za-z0-9_]+):[`"]([^`"]+)[`"]', props_str))
            
            # Map of known keys
            pairs = []
            if "rawvYUUzX" in props and "KjHOx49kL" in props:
                pairs.append({"q": props["rawvYUUzX"], "a": props["KjHOx49kL"]})
            if "tvNxOx7cw" in props and "oRIOycR3Y" in props:
                pairs.append({"q": props["tvNxOx7cw"], "a": props["oRIOycR3Y"]})
            if "pj8TaM0YQ" in props and "Tiiziaej8" in props:
                pairs.append({"q": props["pj8TaM0YQ"], "a": props["Tiiziaej8"]})
            if "IFjQjdWql" in props and "JuxOgtiro" in props:
                pairs.append({"q": props["IFjQjdWql"], "a": props["JuxOgtiro"]})
            if "mDV6PtA6K" in props and "F6lM4exSR" in props:
                pairs.append({"q": props["mDV6PtA6K"], "a": props["F6lM4exSR"]})
            
            module_faqs[f] = pairs

with open("raw_data/detailed_faqs_by_page.json", "w", encoding="utf-8") as out:
    json.dump(module_faqs, out, indent=2)

for f, pairs in module_faqs.items():
    print(f"\n==========================================")
    print(f"MODULE: {f}")
    for i, p in enumerate(pairs):
        print(f"  Q{i+1}: {p['q']}")
        print(f"  A{i+1}: {p['a']}")
