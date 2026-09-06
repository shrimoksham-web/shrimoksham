import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for filename, info in data.items():
    print("=" * 80)
    print(f"FILE: {filename}")
    print(f"Total Paragraphs: {info['total_paragraphs']}, Total Words: {info['total_words']}")
    print("-" * 80)
    for i, p in enumerate(info['paragraphs']):
        # If it looks like a heading, title, or short verse
        if len(p) < 90 or i < 5:
            safe_p = p.encode('ascii', 'backslashreplace').decode('ascii')
            print(f"[{i:02d}] {safe_p}")
