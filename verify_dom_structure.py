# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("=== INDEX.HTML STRUCTURAL CHECK ===")
about_sec = soup.find('section', {'id': 'about-heritage'})
about_link = about_sec.find('a', {'href': 'about-shri-moksham.html'}) if about_sec else None
print("About Section link to about-shri-moksham.html:", "FOUND" if about_link else "NOT FOUND")
if about_link:
    print("  Button text:", about_link.get_text().strip())

swipe_track = soup.find('div', {'id': 'treatisesSwipeTrack'})
cards = swipe_track.find_all('div', class_='treatise-card') if swipe_track else []
print("\nTotal cards in Eternal Wisdom swipe track:", len(cards))
for i, c in enumerate(cards, 1):
    title = c.find(['h3', 'h4'])
    btn = c.find('a')
    t_text = title.get_text().strip() if title else "?"
    b_href = btn['href'] if btn else "?"
    print(f"  Card {i}: {t_text} -> {b_href}")

offerings_grid = soup.find('div', class_='offerings-4grid')
offering_cards = offerings_grid.find_all('article', class_='offering-card') if offerings_grid else []
print("\nTotal cards in Guidance for Every Step of Your Journey:", len(offering_cards))
for i, c in enumerate(offering_cards, 1):
    title = c.find(['h3', 'h4'])
    btn = c.find(['a', 'button'])
    t_text = title.get_text().strip() if title else "?"
    action = btn['href'] if btn and btn.name == 'a' else (btn.get('data-course-track', 'modal') if btn else 'none')
    print(f"  Guidance {i}: {t_text} -> {action}")
