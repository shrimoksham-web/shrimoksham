from check_docx_verbatim import get_docx_paragraphs

rahu_docx = get_docx_paragraphs('Rahu.docx')
with open('the-rahu.html', 'r', encoding='utf-8') as f:
    rahu_html = f.read()

print(f"Rahu docx paragraphs: {len(rahu_docx)}")
for i, p in enumerate(rahu_docx[:10]):
    safe_p = p.encode('ascii', 'backslashreplace').decode('ascii')
    print(f"P{i:02d}: {safe_p}")
    snippet = p[:30]
    print(f"  Snippet in HTML? {snippet in rahu_html}")
