import glob
import re
import json

all_faqs = []

for f in glob.glob("raw_data/modules/*.mjs"):
    content = open(f, encoding="utf-8", errors="ignore").read()
    # Search for pairs where an object has questions and answers
    # Often like: question_key:`...`, answer_key:`...`
    # Or find all question marks and surrounding text
    q_matches = re.findall(r'([A-Za-z0-9_]+):`([^`]*\?[^`]*)`', content)
    for k, q in q_matches:
        # search for nearby properties
        # find the block around this key
        pos = content.find(f"{k}:`{q}`")
        block = content[max(0, pos-200):min(len(content), pos+800)]
        all_faqs.append({"file": f, "key": k, "question": q, "context": block})

print(f"Found {len(all_faqs)} questions:")
unique_qs = {}
for item in all_faqs:
    q = item["question"].strip()
    if q not in unique_qs:
        unique_qs[q] = item

for q, item in unique_qs.items():
    print(f"\nQ: {q}")
    # extract other string literals in context
    props = re.findall(r'([A-Za-z0-9_]+):`([^`]{15,400})`', item["context"])
    for pk, pv in props:
        if pv != q and not pv.startswith("var(") and not "framer" in pv and not pv.startswith("http"):
            print(f"  -> Prop {pk}: {pv}")
