# -*- coding: utf-8 -*-
import json

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

with open('scratch_manuscripts_data.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

p = raw_data['mind']

body_mind = f'''        <!-- PROLOGUE: THE INQUIRY INTO THE 'I' -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            {p[1]}
          </p>

          <p>
            {p[2]}
          </p>

          <div class="highlight-insight-banner">
            If something can be observed, can that which is being observed be the ultimate observer?
          </div>
        </section>

        <!-- SECTION 01: THE ARCHITECTURE OF ANTAHKARAN -->
        <section id="sec-01">
          <h2 class="article-section-header">
            <span class="section-num-badge">01.</span> Antahkaran: The Four Functions of the Inner Instrument
          </h2>

          <p>
            {p[3]}
          </p>

          <div class="perception-card" style="padding:1.4rem 1.8rem; margin:1.6rem 0;">
            <div style="font-family:var(--font-display); font-size:1.05rem; color:var(--gold-dark); margin-bottom:0.8rem; font-weight:700;">
              ✦ The Fourfold Inner Dimensions
            </div>
            <div style="display:flex; flex-direction:column; gap:0.9rem;">
              <div>
                <strong style="color:var(--text-dark);">1. Manas (The Receiving &amp; Wondering Mind):</strong>
                <p style="margin:0.3rem 0 0 0; font-size:0.95rem; line-height:1.65;">{p[4]}</p>
              </div>
              <div>
                <strong style="color:var(--text-dark);">2. Buddhi (The Faculty of Discernment):</strong>
                <p style="margin:0.3rem 0 0 0; font-size:0.95rem; line-height:1.65;">{p[5]}</p>
              </div>
              <div>
                <strong style="color:var(--text-dark);">3. Ahankaar (The Sense of 'I' &amp; Identity):</strong>
                <p style="margin:0.3rem 0 0 0; font-size:0.95rem; line-height:1.65;">{p[6]}</p>
              </div>
              <p style="margin:0; font-size:0.95rem; line-height:1.65;">{p[7]}</p>
              <div>
                <strong style="color:var(--text-dark);">4. Chitta (The Deep Field of Memory &amp; Impressions):</strong>
                <p style="margin:0.3rem 0 0 0; font-size:0.95rem; line-height:1.65;"><strong>{p[8]}</strong> {p[9]}</p>
              </div>
            </div>
          </div>

          <p>
            {p[10]}
          </p>

          <p>
            {p[11]}
          </p>

          <div class="highlight-insight-banner">
            {p[12]}
          </div>

          <p>
            {p[13]}
          </p>
        </section>

        <!-- SECTION 02: WHO IS USING THE INSTRUMENT? -->
        <section id="sec-02">
          <h2 class="article-section-header">
            <span class="section-num-badge">02.</span> {p[14]}
          </h2>

          <p>
            <strong>{p[15]}</strong> {p[16]}
          </p>

          <p>
            {p[17]}
          </p>

          <!-- Instrument list -->
          <div class="perception-card" style="padding:1.2rem 1.6rem; margin:1.4rem 0;">
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; font-family:var(--font-heading); font-size:1.05rem;">
              <li>✦ {p[18]}</li>
              <li>✦ {p[19]}</li>
              <li>✦ {p[20]}</li>
              <li>✦ {p[21]}</li>
              <li style="color:var(--gold-dark); font-weight:700; border-top:1px solid rgba(212,175,55,0.3); padding-top:0.5rem; margin-top:0.3rem;">
                {p[22]}
              </li>
            </ul>
          </div>

          <p>
            {p[23]}
          </p>

          <p>
            {p[24]}
          </p>

          <div class="quote-ornament-card">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text" style="line-height:1.8;">
              {p[25]}<br>
              {p[26]}<br>
              {p[27]}<br>
              <span style="color:var(--gold-dark); font-weight:700;">{p[28]}</span>
            </blockquote>
          </div>

          <p>
            {p[29]}
          </p>
        </section>

        <!-- SECTION 03: THE NIRVANA SHATAKAM -->
        <section id="sec-03">
          <h2 class="article-section-header">
            <span class="section-num-badge">03.</span> The Nirvana Shatakam: The Sacred Negation
          </h2>

          <p>
            {p[30]}
          </p>

          <p>
            {p[31]}
          </p>

          <div class="sacred-shloka-altar-card" style="margin:1.8rem 0;">
            <div class="shloka-om-icon">ॐ</div>
            <div class="shloka-devanagari-verse" style="font-size:1.15rem; line-height:1.9;">
              मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे।<br>
              न च व्योम भूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहम् शिवोऽहम्॥
            </div>
            <div class="shloka-phonetic-trans">
              "{p[32]}"
            </div>
            <p class="shloka-english-meaning">
              <em>“{p[33]}”</em>
            </p>
          </div>

          <p>
            {p[34]} <strong>{p[35]}</strong> {p[36]}
          </p>

          <p>
            {p[37]}
          </p>

          <div class="highlight-insight-banner">
            {p[38]}
          </div>

          <p>
            {p[39]}
          </p>

          <div class="sacred-shloka-altar-card" style="margin:1.8rem 0;">
            <div class="shloka-om-icon">ॐ</div>
            <div class="shloka-devanagari-verse" style="font-size:1.15rem; line-height:1.9;">
              न मे द्वेषरागौ न मे लोभो मोहौ मदो नैव मे नैव मात्सर्यभावः।<br>
              न धर्मो न चार्थो न कामो न मोक्षश्चिदानन्दरूपः शिवोऽहम् शिवोऽहम्॥
            </div>
            <div class="shloka-phonetic-trans">
              "{p[40]}"
            </div>
            <p class="shloka-english-meaning">
              <em>“{p[41]}”</em>
            </p>
          </div>

          <p>
            <strong>{p[42]}</strong> {p[43]} {p[44]}
          </p>

          <p>
            {p[45]}
          </p>

          <p>
            {p[46]}
          </p>

          <div class="quote-ornament-card">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text">
              {p[47]}<br>
              <span style="color:var(--gold-dark); font-weight:700;">{p[48]}</span>
            </blockquote>
          </div>

          <p>
            {p[49]}
          </p>
        </section>

        <!-- SECTION 04: LIGHTER IDENTIFICATION & ASTROLOGY -->
        <section id="sec-04">
          <h2 class="article-section-header">
            <span class="section-num-badge">04.</span> The Shift in Perception: You Are Not the Weather
          </h2>

          <p>
            {p[50]}
          </p>

          <div class="perception-card" style="padding:1.4rem 1.8rem; margin:1.6rem 0;">
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.6rem; line-height:1.7;">
              <li>✦ {p[51]}</li>
              <li>✦ {p[52]}</li>
              <li>✦ {p[53]}</li>
            </ul>
          </div>

          <p>
            {p[54]} {p[55]} <strong>{p[56]}</strong> {p[57]}
          </p>

          <p>
            {p[58]}
          </p>

          <div class="highlight-insight-banner">
            {p[59]}<br>
            <strong>{p[60]}</strong>
          </div>

          <p>
            {p[61]}
          </p>

          <!-- Cosmic Movement vs Witness -->
          <div class="perception-card" style="padding:1.2rem 1.6rem; text-align:center; margin:1.5rem 0;">
            <div style="font-family:var(--font-heading); font-size:1.1rem; line-height:1.9; color:var(--text-dark);">
              {p[62]} • {p[63]} • {p[64]}<br>
              {p[65]} • {p[66]}<br>
              <span style="font-family:var(--font-display); font-size:1.25rem; color:var(--gold-dark); font-weight:700;">
                ✦ {p[67]} ✦
              </span>
            </div>
          </div>

          <p>
            {p[68]}
          </p>

          <p>
            {p[69]} {p[70]}
          </p>
        </section>

        <!-- SECTION 05: CHIDANANDA RUPAH SHIVOHAM -->
        <section id="sec-05">
          <h2 class="article-section-header">
            <span class="section-num-badge">05.</span> {p[71]}
          </h2>

          <p>
            {p[72]}
          </p>

          <p>
            {p[73]}
          </p>

          <div class="perception-card" style="padding:1.4rem 1.8rem; margin:1.6rem 0; background:linear-gradient(135deg, rgba(212,175,55,0.12), rgba(24,34,47,0.03));">
            <div style="font-family:var(--font-heading); font-size:1.1rem; line-height:1.8; color:var(--text-dark); font-style:italic;">
              “{p[74]}”
            </div>
          </div>

          <p>
            {p[75]}
          </p>

          <div class="quote-ornament-card" style="text-align:center; padding:1.8rem 1.5rem;">
            {LOTUS_SVG}
            <div style="font-family:var(--font-heading); font-size:1.5rem; color:var(--gold-dark); font-weight:700; margin-bottom:0.5rem;">
              {p[76]}
            </div>
            <p style="font-size:1.1rem; color:var(--text-dark); margin:0;">
              “{p[77]} {p[78]}”
            </p>
          </div>

          <p>
            {p[79]}
          </p>

          <!-- Instrument summary -->
          <div class="perception-card" style="padding:1.4rem 1.8rem; margin:1.6rem 0;">
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; font-size:1.02rem; line-height:1.7;">
              <li>✦ {p[80]}</li>
              <li>✦ {p[81]}</li>
              <li>✦ {p[82]}</li>
              <li>✦ {p[83]}</li>
              <li>✦ {p[84]}</li>
              <li style="color:var(--gold-dark); font-weight:700; border-top:1px solid rgba(212,175,55,0.3); padding-top:0.6rem; margin-top:0.4rem; font-size:1.15rem;">
                ✦ {p[85]}
              </li>
            </ul>
          </div>

          <p>
            {p[86]}
          </p>

          <div class="highlight-insight-banner" style="font-size:1.15rem; text-align:center; padding:1.4rem;">
            {p[87]}<br>
            <strong style="color:var(--gold-dark);">{p[88]}</strong>
          </div>

          <p style="font-size:1.05rem; font-weight:600; color:var(--text-dark); margin-top:1.5rem; text-align:center;">
            {p[89]}<br>
            <span style="font-family:var(--font-display); font-size:1.25rem; color:var(--gold-dark);">{p[90]}</span>
          </p>
        </section>'''

meta_mind = {
    'filename': 'the-mind-is-not-the-self.html',
    'title': 'The Mind Is Not the Self: Chitta, Antahkaran and the Journey to Atman',
    'meta_desc': 'Explore Manas, Buddhi, Ahankaar, Chitta and Adi Shankaracharya’s Nirvana Shatakam. Discover the eternal Witness beyond mind and planetary karma.',
    'og_title': 'The Mind Is Not the Self: Chitta, Antahkaran & Atman — Shri Moksham',
    'og_desc': 'You are not merely the mind that you observe; you are the awareness in which the mind appears. Dive into the sacred wisdom of Antahkaran and Nirvana Shatakam.',
    'symbol': '👁️',
    'cat_badge': 'VEDANTA &amp; CONSCIOUSNESS • ANTAHKARAN &amp; SAKSHI',
    'master_title_prefix': 'The Mind Is Not the Self:',
    'master_title_shimmer': 'Chitta, Antahkaran &amp; Atman',
    'epigraph': 'The mind is an instrument. Chitta carries impressions, Manas moves, Buddhi discriminates, Ahankaar creates individuality. But the Self is the light by which all of them are known.',
    'ticker_text': 'The Mind Is Not the Self — Chitta, Antahkaran & Adi Shankaracharya\'s Nirvana Shatakam',
    'consult_query': 'Hi Shri Moksham, I read the treatise on The Mind Is Not the Self and would like a personal Vedic consultation on Antahkaran and spiritual meditation.',
    'shloka_devanagari': 'मनोबुद्ध्यहङ्कार चित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे।\nन च व्योम भूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहम् शिवोऽहम्॥',
    'shloka_phonetic': 'Mano-buddhy-ahaṅkāra-cittāni nāhaṁ na ca śrotra-jihve na ca ghrāṇa-netre |\nNa ca vyoma bhūmir na tejo na vāyuś cidānanda-rūpaḥ śivo\'ham śivo\'ham ||',
    'shloka_meaning': 'I am not the mind, intellect, ego or memory; nor am I the ears, tongue, nose or eyes; nor am I sky, earth, light or wind. I am the form of pure consciousness and bliss—I am Shiva, I am Shiva. (Adi Shankaracharya, Nirvana Shatakam Verse 1)',
    'body_html': body_mind
}

with open('meta_the_mind_is_not_the_self.py', 'w', encoding='utf-8') as f:
    f.write('LOTUS_SVG = """' + LOTUS_SVG + '"""\n\n')
    f.write('the_mind_meta = ' + repr(meta_mind) + '\n')

print("Generated meta_the_mind_is_not_the_self.py successfully!")
