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

all_docs = [
    'The Sun.docx',
    'The Moon.docx',
    'Jupiter.docx',
    'Mars.docx',
    'The Mercury.docx',
    'Venus.docx',
    'Saturn.docx',
    'Rahu.docx',
    'Ketu.docx',
    "God's Will.docx",
    'new sec/Navagraha Stotram.docx',
    'new sec/Shri Vishnu Sahasranaam.docx',
    'new sec/The Sacred Science of Place, Time, Charity and Faith.docx',
    'new sec/When God Worships God.docx',
    'new sec/Why Vishnu Sahasranama Is Considered a Powerful Remedy for the Grahas and Nakshatras.docx'
]

print("=== RAW DOCX PARAGRAPH SAMPLES ===")
for doc_path in all_docs:
    if os.path.exists(doc_path):
        paras = get_docx_paragraphs(doc_path)
        print(f"\n[{doc_path}] Total Paragraphs: {len(paras)}")
        for i in range(min(4, len(paras))):
            safe = paras[i][:100].encode('ascii', 'backslashreplace').decode('ascii')
            print(f"  P{i}: {safe}")
