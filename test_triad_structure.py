import urllib.request

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

required_ids = [
    'sriyantra3DCanvas',
    'sacredLotusSphere',
    'sacredLotusLabel',
    'sacredLotusSub',
    'sacredLotusToggle',
    'floatingSohamContainer',
    'floatingSohamLauncher',
    'floatingSohamPod',
    'closeSohamPodBtn',
    'crystalChakraTrack',
    'chakraDetailBox',
    'crystalChakraDevanagari',
    'crystalChakraMantra',
    'crystalChakraTitle',
    'crystalChakraHz',
    'crystalChakraElement',
    'crystalChakraDesc',
    'crystalVoiceChantBtn',
    'crystalVoiceBtnLabel'
]

missing = [i for i in required_ids if f'id="{i}"' not in html]
print('Missing IDs:', missing if missing else 'None! All IDs present!')
print('Has spiritual-duo-grid:', 'spiritual-duo-grid' in html)
print('Has spiritual-features section:', 'id="spiritual-features"' in html)

# Test HTTP request to localhost:8080
try:
    res = urllib.request.urlopen('http://localhost:8080/index.html')
    print(f'HTTP GET index.html: {res.status} OK ({len(res.read())} bytes)')
except Exception as e:
    print('HTTP Error:', e)
