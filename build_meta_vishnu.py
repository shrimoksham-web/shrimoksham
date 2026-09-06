import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

paragraphs = raw_data['Shri Vishnu Sahasranaam.docx']['paragraphs']

LOTUS_SVG = '''<div class="quote-ornament-lotus">
              <svg class="sacred-lotus-vector" viewBox="0 0 32 32" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldLotusGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#D4AF37"/>
                    <stop offset="50%" stop-color="#F5D061"/>
                    <stop offset="100%" stop-color="#8C6615"/>
                  </linearGradient>
                </defs>
                <path d="M16 4C14.2 8.5 12.8 13.2 12.8 17.5C12.8 21.8 14.5 24.5 16 26C17.5 24.5 19.2 21.8 19.2 17.5C19.2 13.2 17.8 8.5 16 4Z" fill="url(#goldLotusGlow)" fill-opacity="0.32" stroke="url(#goldLotusGlow)" stroke-width="1.4" stroke-linejoin="round"/>
                <path d="M16 26C12 24.5 8 19.5 7 14C10.5 14.5 14 17 16 21" stroke="url(#goldLotusGlow)" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M16 26C20 24.5 24 19.5 25 14C21.5 14.5 18 17 16 21" stroke="url(#goldLotusGlow)" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M16 26C13.5 27 10 27.5 6 25C7.8 21.5 10.8 19 14.5 19.5" stroke="url(#goldLotusGlow)" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M16 26C18.5 27 22 27.5 26 25C24.2 21.5 21.2 19 17.5 19.5" stroke="url(#goldLotusGlow)" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="16" cy="18" r="1.5" fill="url(#goldLotusGlow)"/>
              </svg>
            </div>'''

body_parts = []
body_parts.append('''        <!-- PROLOGUE: THE THOUSAND NAMES OF VISHNU -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            The <strong>Shri Vishnu Sahasranama</strong> (the Thousand Names of Lord Vishnu) is one of the most sacred and widely recited stotras in Vedic literature. Found in the <em>Anushasana Parva</em> of the <em>Mahabharata</em> (Chapter 149), it was imparted by the venerable grandsire <strong>Bhishma Pitamaha</strong> to King <strong>Yudhishthira</strong> on the battlefield of Kurukshetra while lying upon the bed of arrows.
          </p>

          <p>
            When Yudhishthira asked who is the supreme refuge of all beings, and by praising whom a mortal reaches freedom from bondage, Bhishma replied that meditating upon and chanting the thousand names of <strong>Pundarikaksha</strong> (the Lotus-eyed Lord) is the highest Dharma and supreme remedy for all sorrows.
          </p>

          <div class="highlight-insight-banner">
            “Kimekam daivatam loke kim vaapyekam paraayanam...” — Who is the One Divine Being in this world, who is the Supreme Refuge?
          </div>
        </section>''')

# Format the names in organized sections
current_section_items = []
sec_num = 1

for p in paragraphs:
    if p.startswith("Shri Vishnu Sahasranaam") or p.startswith("The 1,000 Holy Names") or "Bhishma" in p[:40] and len(p) < 150:
        continue
    elif any(p.startswith(f"{x}.") for x in range(1, 1001, 10)) or (len(p) > 200 and ("—" in p or "–" in p)):
        current_section_items.append(p)
    elif len(p) < 100 and ("Section" in p or "Dhyanam" in p or "Namavali" in p or "Phala" in p):
        if current_section_items:
            body_parts.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> Sacred Names Chant
          </h2>
          <div class="sacred-names-grid" style="display:grid; grid-template-columns:1fr; gap:0.9rem; margin:1.2rem 0;">
            ''' + '\n'.join([f'<div class="perception-card" style="padding:1rem 1.4rem; line-height:1.75;"><div class="perception-body">{item}</div></div>' for item in current_section_items]) + '''
          </div>
        </section>''')
            current_section_items = []
            sec_num += 1
        body_parts.append(f'<h3 style="font-family:\'Cinzel\', serif; color:var(--gold-dark); margin:1.8rem 0 0.8rem 0;">{p}</h3>')
    else:
        current_section_items.append(p)

if current_section_items:
    body_parts.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> The Thousand Holy Names (Sahasranama)
          </h2>
          <div class="sacred-names-grid" style="display:grid; grid-template-columns:1fr; gap:0.9rem; margin:1.2rem 0;">
            ''' + '\n'.join([f'<div class="perception-card" style="padding:1rem 1.4rem; line-height:1.75;"><div class="perception-body">{item}</div></div>' for item in current_section_items]) + '''
          </div>
        </section>''')

body_html = '\n\n'.join(body_parts)

meta_code = f'''LOTUS_SVG = \'\'\'{LOTUS_SVG}\'\'\'

vishnu_sahasranama_meta = {{
    'filename': 'vishnu-sahasranama.html',
    'title': 'Shri Vishnu Sahasranaam: The 1,000 Holy Names of the Supreme',
    'meta_desc': 'The complete Shri Vishnu Sahasranaam from the Mahabharata with Sanskrit verses, English transliteration, word meanings, and commentary by Bhishma Pitamaha.',
    'og_title': 'Shri Vishnu Sahasranaam — The Thousand Divine Names',
    'og_desc': 'Immerse in the complete 1,000 Holy Names of Lord Vishnu taught by Bhishma Pitamaha to Yudhishthira for supreme peace, spiritual liberation, and karma harmony.',
    'symbol': '🪷',
    'cat_badge': 'VEDIC MAHABHARATA • 1,000 SACRED NAMES',
    'master_title_prefix': 'Shri Vishnu Sahasranaam:',
    'master_title_shimmer': 'The 1,000 Holy Names of the Supreme',
    'epigraph': 'By reciting and meditating upon the thousand names of the All-Pervading Lord, one transcends all fear, purifies the soul, and attains the highest peace.',
    'ticker_text': 'Shri Vishnu Sahasranaam — The 1,000 Holy Names of the Supreme Lord',
    'consult_query': 'Hi Shri Moksham, I read the Shri Vishnu Sahasranaam treatise and would like a personal Vedic Consultation on Stotra remedies and spiritual practice.',
    'shloka_devanagari': 'वनमाली गदी शार्ङ्गी शङ्खी चक्री च नन्दकी।\\nश्रीमान् नारायणो विष्णुर्वासुदेवोऽभिरक्षतु॥',
    'shloka_phonetic': 'Vanamālī Gadī Śārṅgī Śaṅkhī Cakrī Ca Nandakī |\\nŚrīmān Nārāyaṇo Viṣṇur Vāsudevo\'bhirakṣatu ||',
    'shloka_meaning': 'May Shriman Narayana, Vishnu, Vasudeva—wearer of the forest garland, wielder of the mace, bow, conch, discus, and sword—protect and bless us always.',
    'body_html': \'\'\'{body_html}\'\'\'
}}
'''

with open('meta_vishnu_sahasranama.py', 'w', encoding='utf-8') as f:
    f.write(meta_code)

print("Generated meta_vishnu_sahasranama.py successfully!")
