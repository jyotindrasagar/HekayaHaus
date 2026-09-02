import glob
import re

for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    if "rawvYUUzX:`" in content:
        print(f"\n============================\nMODULE: {f}")
        # Find where rawvYUUzX is and print 1500 chars
        pos = content.find("rawvYUUzX:`")
        chunk = content[max(0, pos-200):min(len(content), pos+1200)]
        # find all key:`val` pairs
        pairs = re.findall(r'([A-Za-z0-9_]+):`([^`]+)`', chunk)
        for k, v in pairs:
            if not k.startswith("style") and not k.startswith("variant") and not k.startswith("layout") and not "token" in v:
                print(f"  {k} -> {v}")
