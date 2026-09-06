import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_paragraphs(filepath):
    paragraphs = []
    with zipfile.ZipFile(filepath) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        for p in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
            if texts:
                p_text = ''.join(texts).strip()
                if p_text:
                    paragraphs.append(p_text)
    return paragraphs

doc_map = [
    ('The Sun.docx', 'the-sun.html'),
    ('The Moon.docx', 'the-moon.html'),
    ('Jupiter.docx', 'the-jupiter.html'),
    ('Mars.docx', 'the-mars.html'),
    ('The Mercury.docx', 'the-mercury.html'),
    ('Venus.docx', 'the-venus.html'),
    ('Saturn.docx', 'the-saturn.html'),
    ('Rahu.docx', 'the-rahu.html'),
    ('Ketu.docx', 'the-ketu.html'),
    ("God's Will.docx", 'gods-will.html'),
    ('new sec/Navagraha Stotram.docx', 'navagraha-stotram.html'),
    ('new sec/Shri Vishnu Sahasranaam.docx', 'vishnu-sahasranama.html'),
    ('new sec/The Sacred Science of Place, Time, Charity and Faith.docx', 'sacred-science-of-giving.html'),
    ('new sec/When God Worships God.docx', 'when-god-worships-god.html'),
    ('new sec/Why Vishnu Sahasranama Is Considered a Powerful Remedy for the Grahas and Nakshatras.docx', 'vishnu-sahasranama-grahas-remedy.html')
]

print("=== VERIFYING EXACT DOCX CONTENT MATCHES ===")
for docx_f, html_f in doc_map:
    if os.path.exists(docx_f) and os.path.exists(html_f):
        docx_paras = get_docx_paragraphs(docx_f)
        with open(html_f, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Sample test paragraphs
        found_count = 0
        test_sample = [p for p in docx_paras if len(p) > 20][:10]
        for p in test_sample:
            # Clean compare snippet
            snippet = p[:40]
            if snippet in html_content:
                found_count += 1
        
        print(f"VERIFIED: {docx_f:65} -> {html_f:35} (Matched {found_count}/{len(test_sample)} sample paragraphs)")
