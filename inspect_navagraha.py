import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for fname in ['Navagraha Stotram.docx']:
    d = data[fname]
    print(f"=== {fname} ===")
    for i, p in enumerate(d['paragraphs']):
        safe_p = p.encode('ascii', 'backslashreplace').decode('ascii')
        print(f"[{i:02d}] {safe_p}")
