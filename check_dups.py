import re
from collections import Counter
with open('index.html', 'r', encoding='utf-8') as f: html = f.read()
ids = re.findall(r'id="(.*?)"', html)
counts = Counter(ids)
dups = {k: v for k, v in counts.items() if v > 1}
print('Duplicate IDs:', dups)
