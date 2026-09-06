import json

with open('scratch_new_sec.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

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

# --------------------------------------------------------------------------
# 3. SACRED SCIENCE OF CHARITY (SHIVA PURANA)
# --------------------------------------------------------------------------
charity_paras = raw_data['The Sacred Science of Place, Time, Charity and Faith.docx']['paragraphs']
charity_body = []
charity_body.append('''        <!-- PROLOGUE: TIMELESS WISDOM FROM SHIVA PURANA -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            The ancient scriptures of <em>Sanatana Dharma</em> do not merely prescribe rituals; they reveal the deeper metaphysical principles that determine the spiritual potency of every conscious action. In a profound discourse found in the <strong>Shiva Purana</strong>, the sages ask <strong>Sutji Maharaj</strong> to explain the significance of place (<em>Desha</em>), time (<em>Kala</em>), worthy recipients (<em>Patra</em>), charity (<em>Dana</em>), and unwavering faith (<em>Astikya / Shraddha</em>).
          </p>

          <p>
            The answer unfolds as a practical guide for spiritual seekers, teaching how ordinary worldly actions can become extraordinary vehicles for inner purification, karmic liberation, and Moksha.
          </p>

          <div class="highlight-insight-banner">
            “Above all sacred places is that place where the mind naturally becomes peaceful and absorbed in the Divine.” — Shiva Purana
          </div>
        </section>''')

sec_num = 1
curr_paras = []
for p in charity_paras[3:]:
    if len(p) < 80 and not p.endswith('.') and not p.startswith('"') and ("Power" in p or "Gradation" in p or "Recipient" in p or "Charity" in p or "Faith" in p or "Nature" in p or "Conclusion" in p or "Summary" in p or "Moksha" in p):
        if curr_paras:
            charity_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> {p}
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')
            curr_paras = []
            sec_num += 1
        else:
            charity_body.append(f'<h3 style="font-family:\'Cinzel\', serif; color:var(--gold-dark); margin:1.5rem 0 0.8rem 0;">{p}</h3>')
    elif "—" in p and len(p) < 150:
        curr_paras.append(f'<strong>{p}</strong>')
    else:
        curr_paras.append(p)

if curr_paras:
    charity_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> The Ultimate Synthesis of Desha, Kala &amp; Dana
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')

charity_html = '\n\n'.join(charity_body)

meta_charity_code = f'''LOTUS_SVG = \'\'\'{LOTUS_SVG}\'\'\'

sacred_charity_meta = {{
    'filename': 'sacred-science-of-giving.html',
    'title': 'The Sacred Science of Place, Time, Charity & Faith: Shiva Purana',
    'meta_desc': 'Explore the timeless wisdom of the Shiva Purana on Desha (Place), Kala (Time), Patra (Worthy Recipient), Dana (Charity), and Shraddha (Faith).',
    'og_title': 'The Sacred Science of Place, Time, Charity & Faith',
    'og_desc': 'Discover how ordinary actions become extraordinary spiritual power through the sacred wisdom of Desha, Kala, Patra, Dana, and Shraddha from the Shiva Purana.',
    'symbol': '⚖️',
    'cat_badge': 'SHIVA PURANA • SACRED METAPHYSICS &amp; CHARITY',
    'master_title_prefix': 'Desha, Kala &amp; Patra:',
    'master_title_shimmer': 'The Sacred Science of Place, Time &amp; Charity',
    'epigraph': 'Above all sacred places is that place where the mind naturally becomes peaceful and absorbed in the Divine. — Shiva Purana',
    'ticker_text': 'The Sacred Science of Place, Time, Charity & Faith — Shiva Purana Treatise',
    'consult_query': 'Hi Shri Moksham, I read the treatise on The Sacred Science of Place, Time & Charity and would like a personal Vedic consultation on auspicious Muhurta and Karma.',
    'shloka_devanagari': 'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे।\\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥',
    'shloka_phonetic': 'Dātavyam Iti Yad Dānaṁ Dīyate\'nupakāriṇe |\\nDeśe Kāle Ca Pātre Ca Tad Dānaṁ Sāttvikaṁ Smṛtam ||',
    'shloka_meaning': 'Charity given simply out of duty, without expectation of return, at an auspicious place and time to a worthy recipient—that giving is declared to be purely Sattvic (Bhagavad Gita 17.20).',
    'body_html': \'\'\'{charity_html}\'\'\'
}}
'''

with open('meta_sacred_charity.py', 'w', encoding='utf-8') as f:
    f.write(meta_charity_code)

# --------------------------------------------------------------------------
# 4. WHEN GOD WORSHIPS GOD (SHIVA & VISHNU)
# --------------------------------------------------------------------------
god_paras = raw_data['When God Worships God.docx']['paragraphs']
god_body = []
god_body.append('''        <!-- PROLOGUE: THE MYSTERY OF SHIV, VISHNU AND SHRI RAM -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            There is a beautiful mystery at the heart of <em>Sanatan Dharm</em> that becomes difficult to understand if we look at the Divine only through the human idea of identity and hierarchy. <strong>Shiv worships Shri Ram, and Shri Ram worships Shiv.</strong>
          </p>

          <p>
            Vishnu and Shiv are described as distinct forms, with different names, attributes and stories, yet again and again our scriptures and traditions bring them together. This raises a natural question: if Shri Ram is an incarnation of Vishnu and Shiv is the great Lord himself, why would one worship the other?
          </p>

          <div class="highlight-insight-banner">
            Devotion is not about hierarchy. The Divine can become the devotee of the Divine.
          </div>
        </section>''')

sec_num = 1
curr_paras = []
for p in god_paras[1:]:
    if len(p) < 80 and not p.endswith('.') and not p.startswith('"') and any(k in p for k in ["Hierarchy", "Sustenance", "Devotee", "Rameshwaram", "Dharm", "Jyotish", "Question", "Discovery", "Moksham"]):
        if curr_paras:
            god_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> {p}
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')
            curr_paras = []
            sec_num += 1
        else:
            god_body.append(f'<h3 style="font-family:\'Cinzel\', serif; color:var(--gold-dark); margin:1.5rem 0 0.8rem 0;">{p}</h3>')
    elif len(p) > 200:
        curr_paras.append(p)
    elif "Ekam sat" in p or "Ram" in p or "Shiv" in p:
        curr_paras.append(p)
    else:
        curr_paras.append(p)

if curr_paras:
    god_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> The Unity of Consciousness &amp; Moksha
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')

god_html = '\n\n'.join(god_body)

meta_god_code = f'''LOTUS_SVG = \'\'\'{LOTUS_SVG}\'\'\'

when_god_worships_god_meta = {{
    'filename': 'when-god-worships-god.html',
    'title': 'When God Worships God: The Divine Unity of Shiva & Vishnu',
    'meta_desc': 'Explore the profound Vedic mystery of why Shiva worships Shri Ram and Shri Ram worships Shiva—the dissolution of spiritual hierarchy into pure Advaita love.',
    'og_title': 'When God Worships God: The Mystery of Shiva, Vishnu & Ram',
    'og_desc': 'The Divine can become the devotee of the Divine. Discover the sacred Advaita harmony and non-dual love between Lord Shiva and Lord Vishnu.',
    'symbol': '🔱',
    'cat_badge': 'VEDIC ADVAITA • SACRED PHILOSOPHY &amp; DEVOTION',
    'master_title_prefix': 'When God Worships God:',
    'master_title_shimmer': 'The Mystery of Shiva, Vishnu &amp; Shri Ram',
    'epigraph': 'Truth is One; the wise speak of it in many ways (Ekam Sat Vipra Bahudha Vadanti). When Shiva bows to Shri Ram and Shri Ram bows to Shiva, love needs no superiority.',
    'ticker_text': 'When God Worships God — The Divine Non-Dual Unity of Shiva & Vishnu',
    'consult_query': 'Hi Shri Moksham, I read the treatise on When God Worships God and would like a personal Vedic consultation on Ishta Devata and Spiritual Sadhana.',
    'shloka_devanagari': 'शिवाय विष्णुस्वरूपाय शिवरूपाय विष्णवे।\\nशिवस्य हृदयं विष्णुर्विष्णोश्च हृदयं शिवः॥',
    'shloka_phonetic': 'Śivāya Viṣṇu-rūpāya Śiva-rūpāya Viṣṇave |\\nŚivasya Hṛdayaṁ Viṣṇur Viṣṇośca Hṛdayaṁ Śivaḥ ||',
    'shloka_meaning': 'Salutations to Shiva who is in the form of Vishnu, and to Vishnu who is in the form of Shiva. Vishnu is the sacred heart of Shiva, and Shiva is the sacred heart of Vishnu (Skanda Upanishad).',
    'body_html': \'\'\'{god_html}\'\'\'
}}
'''

with open('meta_when_god_worships_god.py', 'w', encoding='utf-8') as f:
    f.write(meta_god_code)

# --------------------------------------------------------------------------
# 5. VISHNU SAHASRANAMA GRAHA REMEDY
# --------------------------------------------------------------------------
remedy_paras = raw_data['Why Vishnu Sahasranama Is Considered a Powerful Remedy for the Grahas and Nakshatras.docx']['paragraphs']
remedy_body = []
remedy_body.append('''        <!-- PROLOGUE: BEYOND MECHANICAL REMEDIES -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            In Jyotish, we often look at a horoscope and immediately begin searching for remedies. Saturn is troubling a house, Rahu is creating confusion, Mars is causing conflict, the Moon is disturbed, a particular Nakshatra is under pressure—and naturally, we ask: <em>What should I do to correct it?</em>
          </p>

          <p>
            But there is a much deeper question: <strong>What if, instead of trying to remedy every planet separately, we connect ourselves with the consciousness that exists beyond all the planets?</strong>
          </p>

          <div class="highlight-insight-banner">
            We are not merely asking Saturn to become kind or Rahu to disappear; we are cultivating the consciousness that allows us to experience planetary Karma with wisdom.
          </div>
        </section>''')

sec_num = 1
curr_paras = []
for p in remedy_paras[1:]:
    if len(p) < 80 and not p.endswith('.') and not p.startswith('"') and any(k in p for k in ["Grahas", "Stotra", "Saturn", "Rahu", "Ketu", "Nakshatras", "remedy", "thousand names", "spiritual remedy"]):
        if curr_paras:
            remedy_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> {p}
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')
            curr_paras = []
            sec_num += 1
        else:
            remedy_body.append(f'<h3 style="font-family:\'Cinzel\', serif; color:var(--gold-dark); margin:1.5rem 0 0.8rem 0;">{p}</h3>')
    else:
        curr_paras.append(p)

if curr_paras:
    remedy_body.append(f'''        <!-- SECTION {sec_num:02d} -->
        <section id="sec-{sec_num:02d}">
          <h2 class="article-section-header">
            <span class="section-num-badge">{sec_num:02d}.</span> Complete Transformation of Consciousness
          </h2>
          ''' + '\n\n          '.join([f'<p>{cp}</p>' for cp in curr_paras]) + '''
        </section>''')

remedy_html = '\n\n'.join(remedy_body)

meta_remedy_code = f'''LOTUS_SVG = \'\'\'{LOTUS_SVG}\'\'\'

vishnu_remedy_meta = {{
    'filename': 'vishnu-sahasranama-grahas-remedy.html',
    'title': 'Vishnu Sahasranama: The Supreme Remedy for Grahas & Nakshatras',
    'meta_desc': 'Discover why chanting Shri Vishnu Sahasranaam is the ultimate holistic Vedic remedy to harmonize Saturn, Rahu, Ketu, and all 27 Nakshatras.',
    'og_title': 'Vishnu Sahasranama: The Supreme Remedy for Grahas & Nakshatras',
    'og_desc': 'Connect with the consciousness beyond all planets. How Vishnu Sahasranama transforms Saturn time fear, Rahu desires, Ketu detachment, and Nakshatra karmas.',
    'symbol': '☸️',
    'cat_badge': 'VEDIC JYOTISH &amp; REMEDIES • HIGHER CONSCIOUSNESS',
    'master_title_prefix': 'Vishnu Sahasranama:',
    'master_title_shimmer': 'The Supreme Remedy for Grahas &amp; Nakshatras',
    'epigraph': 'Instead of asking how to escape Saturn, we begin asking: How can I become worthy of the wisdom Saturn is trying to give me? That is the essence of true remedy.',
    'ticker_text': 'Vishnu Sahasranama — The Supreme Holistic Remedy for Grahas & Nakshatras',
    'consult_query': 'Hi Shri Moksham, I read the treatise on Vishnu Sahasranama as a Planetary Remedy and would like a personal Vedic Astrology Consultation regarding my chart remedies.',
    'shloka_devanagari': 'न वासुदेवभक्तानामशुभं विद्यते क्वचित्।\\nजन्ममृत्युजराव्याधिभयं नैवोपजायते॥',
    'shloka_phonetic': 'Na Vāsudeva Bhaktānām Aśubhaṁ Vidyate Kvacit |\\nJanma Mṛtyu Jarā Vyādhi Bhayaṁ Naivopajāyate ||',
    'shloka_meaning': 'For the devotees of Vasudeva, no inauspiciousness exists anywhere. They are liberated from the fears of birth, death, old age, and disease (Vishnu Sahasranama Phala Shruti).',
    'body_html': \'\'\'{remedy_html}\'\'\'
}}
'''

with open('meta_vishnu_remedy.py', 'w', encoding='utf-8') as f:
    f.write(meta_remedy_code)

print("Created meta_sacred_charity.py, meta_when_god_worships_god.py, and meta_vishnu_remedy.py successfully!")
