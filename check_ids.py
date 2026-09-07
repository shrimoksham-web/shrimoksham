import re
with open('index.html', 'r', encoding='utf-8') as f: html = f.read()
anchors = re.findall(r'href="(#.*?)"', html)
ids = re.findall(r'id="(.*?)"', html)
missing = [a[1:] for a in anchors if a[1:] not in ids and a != '#']
print('Missing IDs:', set(missing))
