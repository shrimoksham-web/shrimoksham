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

p = raw_data['atmabodh']

body_atmabodh = f'''        <!-- PROLOGUE: THE INWARD QUESTION -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            {p[1]}
          </p>

          <p>
            {p[2]}
          </p>

          <div class="highlight-insight-banner">
            {p[3]}
          </div>

          <p>
            <strong>{p[4]}</strong>
          </p>

          <p>
            {p[5]}
          </p>

          <div class="perception-card" style="padding:1.2rem 1.6rem; margin:1.5rem 0;">
            <div class="perception-body" style="font-size:1.05rem; font-family:var(--font-heading); color:var(--text-dark);">
              “{p[6]} {p[7]}”
            </div>
          </div>
        </section>

        <!-- SECTION 01: SELF-IMPROVEMENT VS SELF-KNOWLEDGE -->
        <section id="sec-01">
          <h2 class="article-section-header">
            <span class="section-num-badge">01.</span> Self-Improvement vs. Self-Knowledge
          </h2>

          <p>
            {p[8]}
          </p>

          <p>
            {p[9]}
          </p>

          <div class="quote-ornament-card" style="margin:1.6rem 0;">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text">
              {p[10]}<br>
              <span style="color:var(--gold-dark); font-weight:700;">{p[11]}</span>
            </blockquote>
          </div>

          <p>
            {p[12]}
          </p>
        </section>

        <!-- SECTION 02: LIFE AS THE MIRROR & JYOTISH LESSONS -->
        <section id="sec-02">
          <h2 class="article-section-header">
            <span class="section-num-badge">02.</span> Life as the Mirror: Planetary Wisdom &amp; Inner Transformation
          </h2>

          <p>
            {p[13]}
          </p>

          <p>
            {p[14]}
          </p>

          <div class="highlight-insight-banner">
            {p[15]}
          </div>

          <p>
            {p[16]}
          </p>

          <!-- 5 Planetary Lessons -->
          <div class="perception-card" style="padding:1.4rem 1.8rem; line-height:1.8; margin:1.5rem 0;">
            <div style="font-family:var(--font-display); font-size:1.05rem; color:var(--gold-dark); margin-bottom:0.8rem; font-weight:700; letter-spacing:0.06em;">
              ✦ The Five Planetary Mirrors of Self-Inquiry
            </div>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.6rem;">
              <li>🪐 <strong>Saturn:</strong> {p[17]}</li>
              <li>🔥 <strong>Mars:</strong> {p[18]}</li>
              <li>🌪️ <strong>Rahu:</strong> {p[19]}</li>
              <li>✨ <strong>Ketu:</strong> {p[20]}</li>
              <li>🌙 <strong>The Moon:</strong> {p[21]}</li>
            </ul>
          </div>

          <p>
            {p[22]}
          </p>

          <p>
            {p[23]}
          </p>

          <div class="highlight-insight-banner">
            {p[24]}
          </div>

          <p>
            {p[25]}
          </p>
        </section>

        <!-- SECTION 03: THE LAMP AND THE SUN -->
        <section id="sec-03">
          <h2 class="article-section-header">
            <span class="section-num-badge">03.</span> The Lamp and the Sun: Removing the Darkness
          </h2>

          <p>
            {p[26]}
          </p>

          <div class="quote-ornament-card">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text">
              “{p[27]}”
            </blockquote>
          </div>

          <p>
            {p[28]}
          </p>

          <p>
            {p[29]}
          </p>

          <p>
            {p[30]}
          </p>

          <p>
            {p[31]}
          </p>

          <p>
            {p[32]}
          </p>

          <div class="highlight-insight-banner">
            {p[33]}
          </div>

          <p>
            {p[34]}
          </p>

          <p>
            {p[35]}
          </p>
        </section>

        <!-- SECTION 04: WHO AM I WHEN I REMOVE WHAT I AM NOT? -->
        <section id="sec-04">
          <h2 class="article-section-header">
            <span class="section-num-badge">04.</span> The Great Inquiry: {p[36]}
          </h2>

          <p>
            {p[37]}
          </p>

          <p>
            {p[38]}
          </p>

          <p>
            {p[39]}
          </p>

          <div class="perception-card" style="padding:1.4rem 1.8rem; text-align:center; margin:1.6rem 0; background:linear-gradient(135deg, rgba(212,175,55,0.12), rgba(24,34,47,0.03));">
            <p style="font-size:0.95rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--gold-dark); margin-bottom:0.4rem; font-weight:700;">
              {p[40]}
            </p>
            <div style="font-family:var(--font-heading); font-size:1.35rem; color:var(--text-dark); font-weight:700; font-style:italic;">
              {p[41]}
            </div>
          </div>

          <p>
            {p[42]}
          </p>

          <p>
            {p[43]}
          </p>

          <p>
            {p[44]}
          </p>

          <p>
            {p[45]}
          </p>

          <div class="highlight-insight-banner" style="font-size:1.3rem; text-align:center; padding:1.2rem; font-family:var(--font-heading);">
            {p[46]}
          </div>

          <p>
            {p[47]}
          </p>

          <div class="quote-ornament-card" style="text-align:center;">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text" style="font-size:1.15rem;">
              {p[48]}<br>
              <span style="color:var(--gold-dark); font-weight:700;">{p[49]}</span>
            </blockquote>
          </div>

          <p style="font-size:1.05rem; font-weight:600; color:var(--text-dark); margin-top:1.5rem;">
            {p[50]}
          </p>
        </section>'''

meta_atmabodh = {
    'filename': 'atmabodh.html',
    'title': 'Atmabodh: Why Self-Knowledge Is the Beginning of Spiritual Growth',
    'meta_desc': 'Discover Adi Shankaracharya’s Atmabodh: The journey from self-improvement to Self-knowledge, understanding planetary mirrors, and awakening to the eternal Witness.',
    'og_title': 'Atmabodh: The Awakening to Self-Knowledge — Shri Moksham',
    'og_desc': 'A lamp does not need to create the sun; it only removes darkness. Contemplate the profound inquiry into the Self beyond mind and karma.',
    'symbol': '🪞',
    'cat_badge': 'ADVAITA VEDANTA • SELF-KNOWLEDGE &amp; INNER WITNESS',
    'master_title_prefix': 'Why Atmabodh Is the Beginning',
    'master_title_shimmer': 'of Spiritual Growth',
    'epigraph': 'Atmabodh does not mean collecting more information about the Self. It is a gradual recognition that the person we have been calling “I” may be much more than the body, mind, personality, and roles.',
    'ticker_text': 'Atmabodh — Moving from Self-Improvement to Self-Knowledge & Inner Freedom',
    'consult_query': 'Hi Shri Moksham, I read the treatise on Atmabodh and would like a personal Vedic consultation on Self-knowledge and inner transformation.',
    'shloka_devanagari': 'बोधोऽन्यसाधनेभ्यो हि साक्षात् मोक्षैकसाधनम्।\nपाकस्य वह्निवज्ज्ञानं विना मोक्षो न सिध्यति॥',
    'shloka_phonetic': 'Bodho\'nya-sādhanebhyo hi sākṣāt mokṣaika-sādhanam |\nPākasya vahnivaj-jñānaṁ vinā mokṣo na sidhyati ||',
    'shloka_meaning': 'Just as fire is the direct and indispensable means to cooking, so too Self-knowledge (Jñāna) is the direct and indispensable means to liberation. Without knowledge, liberation cannot be attained. (Adi Shankaracharya, Atmabodha Verse 2)',
    'body_html': body_atmabodh
}

with open('meta_atmabodh.py', 'w', encoding='utf-8') as f:
    f.write('LOTUS_SVG = """' + LOTUS_SVG + '"""\n\n')
    f.write('atmabodh_meta = ' + repr(meta_atmabodh) + '\n')

print("Generated meta_atmabodh.py successfully!")
