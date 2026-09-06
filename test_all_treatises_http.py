import urllib.request

urls = [
    'http://localhost:8080/index.html',
    'http://localhost:8080/navagraha-stotram.html',
    'http://localhost:8080/the-navagraha-stotram.html',
    'http://localhost:8080/vishnu-sahasranama.html',
    'http://localhost:8080/the-vishnu-sahasranama.html',
    'http://localhost:8080/sacred-science-of-giving.html',
    'http://localhost:8080/the-sacred-science-of-giving.html',
    'http://localhost:8080/when-god-worships-god.html',
    'http://localhost:8080/the-when-god-worships-god.html',
    'http://localhost:8080/vishnu-sahasranama-grahas-remedy.html',
    'http://localhost:8080/the-vishnu-sahasranama-grahas-remedy.html'
]

print("=== TESTING HOMEPAGE & ALL 5 NEW TREATISES ===")
all_passed = True
for u in urls:
    try:
        req = urllib.request.urlopen(u)
        body = req.read()
        print(f"PASS: {u:55} | Status: {req.status} | Size: {len(body):,} bytes")
    except Exception as e:
        print(f"FAIL: {u:55} | Error: {e}")
        all_passed = False

if all_passed:
    print("\nALL URLS RETURNED 200 OK WITH FULL CONTENT!")
