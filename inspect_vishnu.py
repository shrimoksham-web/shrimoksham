import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

v = data['Shri Vishnu Sahasranaam.docx']
print(f"Total paragraphs in Vishnu Sahasranaam: {len(v['paragraphs'])}")
for i, p in enumerate(v['paragraphs']):
    safe_p = p[:80].encode('ascii', 'backslashreplace').decode('ascii')
    print(f"[{i:02d}] (len={len(p):04d}) {safe_p}")
