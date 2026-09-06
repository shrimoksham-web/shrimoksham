import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for fname, d in data.items():
    print("=" * 80)
    print(f"FILE: {fname} (Paragraphs: {len(d['paragraphs'])})")
    print("-" * 80)
    for i, p in enumerate(d['paragraphs'][:10]):
        safe_p = p.encode('ascii', 'backslashreplace').decode('ascii')
        print(f"[{i:02d}] {safe_p}")
