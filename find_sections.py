with open('index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        l = line.strip()
        if '<section' in l or 'id="god' in l.lower() or 'id="grahas' in l.lower() or 'god\'s will' in l.lower() or 'gods-will' in l.lower():
            print(f"Line {i+1}: {l[:100]}")
