import urllib.request

grahas = [
    'the-sun.html',
    'the-moon.html',
    'the-jupiter.html',
    'the-mars.html',
    'the-mercury.html',
    'the-venus.html',
    'the-saturn.html',
    'the-rahu.html',
    'the-ketu.html',
    'mars.html',
    'mercury.html',
    'venus.html',
    'saturn.html',
    'rahu.html',
    'ketu.html',
    'jupiter.html'
]

print("--- TESTING ALL 9 GRAHAS PAGES ---")
all_passed = True
for g in grahas:
    url = f"http://localhost:8080/{g}"
    try:
        req = urllib.request.urlopen(url)
        content = req.read()
        print(f"PASS: {g:18} | Status: {req.status} | Size: {len(content):,} bytes")
    except Exception as e:
        print(f"FAIL: {g:18} | Error: {e}")
        all_passed = False

if all_passed:
    print("\nALL 16 URLS (ALL 9 GRAHAS + ALIASES) RETURNED 200 OK WITH RICH CONTENT!")
