import zipfile
import xml.etree.ElementTree as ET
import os
import json

new_sec_dir = 'new sec'
files = [
    'Navagraha Stotram.docx',
    'Shri Vishnu Sahasranaam.docx',
    'The Sacred Science of Place, Time, Charity and Faith.docx',
    'When God Worships God.docx',
    'Why Vishnu Sahasranama Is Considered a Powerful Remedy for the Grahas and Nakshatras.docx'
]

def extract_docx_paragraphs(filepath):
    paragraphs = []
    with zipfile.ZipFile(filepath) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        # XML namespace for WordML
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        for p in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
            if texts:
                p_text = ''.join(texts).strip()
                if p_text:
                    paragraphs.append(p_text)
    return paragraphs

parsed_data = {}

for filename in files:
    filepath = os.path.join(new_sec_dir, filename)
    paragraphs = extract_docx_paragraphs(filepath)
    parsed_data[filename] = {
        'total_paragraphs': len(paragraphs),
        'total_words': sum(len(p.split()) for p in paragraphs),
        'paragraphs': paragraphs
    }

with open('scratch_new_sec.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_data, f, ensure_ascii=False, indent=2)

print("PARSED NEW SEC FILES SUCCESSFULLY:")
for filename, d in parsed_data.items():
    print(f"- {filename}: {d['total_paragraphs']} paragraphs, {d['total_words']} words")
