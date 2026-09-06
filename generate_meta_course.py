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

p = raw_data['course']

body_course = f'''        <!-- PROLOGUE: HARDWARE & SINCERITY PREREQUISITES -->
        <section id="sec-prerequisites">
          <div class="perception-card" style="padding:1.8rem 2rem; border-left:4px solid var(--border-gold); background:rgba(255,255,255,0.85); margin-bottom:2rem;">
            <div style="font-family:var(--font-display); font-size:1.15rem; color:var(--gold-dark); font-weight:700; margin-bottom:0.6rem; letter-spacing:0.06em;">
              💻 Prerequisites &amp; System Setup
            </div>
            <p style="font-size:1.02rem; line-height:1.75; color:var(--text-dark); margin:0;">
              {p[0]}
            </p>
          </div>
        </section>

        <!-- SECTION 01: WHAT TO EXPECT FROM THE COURSE -->
        <section id="sec-expectations">
          <h2 class="article-section-header">
            <span class="section-num-badge">01.</span> {p[1]}
          </h2>

          <p class="article-drop-cap">
            {p[2]}
          </p>

          <!-- Curriculum Pillars Grid -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.2rem; margin:1.8rem 0;">
            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">📜</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Kundli Interpretation</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[3]}</p>
            </div>

            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">🪐</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Core Vedic Framework</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[4]}</p>
            </div>

            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">✨</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Advanced Precision</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[5]}</p>
            </div>

            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">🧭</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Directional Science</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[6]}</p>
            </div>

            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">⚖️</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Karma &amp; Self-Understanding</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[7]}</p>
            </div>

            <div class="perception-card" style="padding:1.2rem 1.4rem;">
              <div style="font-size:1.3rem; margin-bottom:0.4rem;">🪔</div>
              <strong style="color:var(--text-dark); display:block; margin-bottom:0.3rem;">Theory &amp; Sacred Mythology</strong>
              <p style="margin:0; font-size:0.92rem; line-height:1.6;">{p[8]}</p>
            </div>
          </div>

          <div class="highlight-insight-banner" style="font-size:1.05rem; line-height:1.7;">
            {p[9]}
          </div>
        </section>

        <!-- SECTION 02: WHAT THIS COURSE IS NOT -->
        <section id="sec-what-not">
          <h2 class="article-section-header">
            <span class="section-num-badge">02.</span> {p[10]}
          </h2>

          <div class="quote-ornament-card" style="margin:1.5rem 0;">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text" style="color:#C53030; font-size:1.15rem;">
              “{p[11]}”
            </blockquote>
          </div>

          <p style="font-size:1.02rem; line-height:1.8; color:var(--text-dark);">
            {p[12]}
          </p>
        </section>

        <!-- SECTION 03: AFTER COMPLETING THE COURSE -->
        <section id="sec-outcomes">
          <h2 class="article-section-header">
            <span class="section-num-badge">03.</span> {p[13]}
          </h2>

          <div class="perception-card" style="padding:1.8rem 2rem; background:linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(255,255,255,0.9) 100%); border:1.5px solid var(--border-gold); margin-top:1.2rem;">
            <div style="font-family:var(--font-display); font-size:1.2rem; color:var(--gold-dark); font-weight:700; margin-bottom:0.8rem;">
              🎓 Graduate Competencies &amp; Transformative Mastery
            </div>
            <p style="font-size:1.08rem; line-height:1.85; color:var(--text-dark); margin:0; font-weight:500;">
              {p[14]}
            </p>
          </div>
        </section>'''

meta_course = {
    'filename': 'course-requirements-and-outcomes.html',
    'title': 'Vedic Astrology Masterclass: Course Requirements & Outcomes',
    'meta_desc': 'Discover the official prerequisites, comprehensive 4-5 month curriculum, authentic methodology, and professional outcomes of the Shri Moksham Masterclass.',
    'og_title': 'Course Requirements & Outcomes — Shri Moksham Vedic Masterclass',
    'og_desc': 'From Kundli interpretation to directional decision-making: Explore syllabus expectations, essential prerequisites, and graduate outcomes.',
    'symbol': '🎓',
    'cat_badge': 'MASTERCLASS CURRICULUM • PREREQUISITES &amp; OUTCOMES',
    'master_title_prefix': 'Vedic Astrology Masterclass:',
    'master_title_shimmer': 'Requirements &amp; Outcomes',
    'epigraph': 'Build a strong foundation in the principles of Vedic Astrology rather than simply learning predictions. Jyotish is approached as a science of observation, timing, tendencies and guidance.',
    'ticker_text': 'Vedic Astrology Masterclass — Prerequisites, Syllabus Foundations & Graduate Outcomes',
    'consult_query': 'Hi Shri Moksham, I would like to know more about the 4-5 Month Certified Jyotish Course requirements, syllabus, and enrollment.',
    'shloka_devanagari': 'ज्योतिषामयनं चक्षुस्तस्मादेतद्द्विजातिभिः।\nध्येयं सर्वप्रयत्नेन यज्ज्ञात्वा मोक्षमश्नुते॥',
    'shloka_phonetic': 'Jyotiṣāmayanaṁ cakṣus tasmād etad dvijātibhiḥ |\nDhyeyaṁ sarva-prayatnena yaj jñātvā mokṣam aśnute ||',
    'shloka_meaning': 'Jyotish is the sacred eye of the Vedas. Therefore, sincere seekers should study it with earnest devotion, for by truly understanding it, one attains wisdom and spiritual liberation.',
    'body_html': body_course
}

with open('meta_course_requirements.py', 'w', encoding='utf-8') as f:
    f.write('LOTUS_SVG = """' + LOTUS_SVG + '"""\n\n')
    f.write('course_requirements_meta = ' + repr(meta_course) + '\n')

print("Generated meta_course_requirements.py successfully!")
