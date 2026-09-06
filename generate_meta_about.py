# -*- coding: utf-8 -*-
import json
import os

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

# ==============================================================================
# 1. ABOUT SHRI MOKSHAM
# ==============================================================================
p_ab = raw_data['about']
# Paras:
# [0] About Shri Moksham
# [1] There is an ancient question...
# [2] Before there was a name...
# [3] Life then becomes a search.
# [4] We search for success...
# [5] “Is this all there is?”
# [6] Shri Moksham was born from this question.
# [7] The word Moksham points toward freedom...
# [8] We believe that this journey begins with knowing.
# [9] Knowing ourselves. Knowing our tendencies...
# [10] From knowing comes transformation.
# [11] The wisdom of Vedanta...
# [12] This is where the journey becomes deeper...
# [13] “Who am I?”
# [14] And perhaps that is the movement from chaos to singularity...
# [15] At Shri Moksham, we want to create a space...
# [16] Our work will bring together Vedic Astrology...
# [17] But our vision does not end with the individual.
# [18] We believe that genuine inner growth eventually moves outward as Seva...
# [19] Because the journey from chaos to peace is not complete when we find peace for ourselves.
# [20] It becomes complete when that peace begins to touch the lives of others.
# [21] This is the purpose of Shri Moksham—to create a pathway...
# [22] We are here to help you understand your journey...
# [23] Know. Transform. Serve.
# [24] Know yourself.Transform your life.Serve something greater than yourself.
# [25] This is Shri Moksham.
# [26] A Note from the Founder
# [27] Dear Seekers,
# [28] Life has a beautiful way of taking us through experiences...
# [29] My own search gradually led me towards the wisdom of Vedic Jyotish...
# [30] Shri Moksham is an expression of that journey.
# [31] It is my humble attempt to create a space...
# [32] I believe that every individual has the right to experience happiness...
# [33] If something here resonates with you, I invite you to explore...
# [34] May Shri Moksham be a space where knowledge becomes awareness...
# [35] May this journey help you know yourself...
# [36] With warmth and शुभेच्छा,
# [37] Sandeep Kumar Shivhare
# [38] Founder, Shri Moksham

body_about = f'''        <!-- PROLOGUE: FROM SINGULARITY TO THE SEARCH -->
        <section id="sec-prologue">
          <p class="article-drop-cap">
            {p_ab[1]}
          </p>

          <p>
            {p_ab[2]}
          </p>

          <div class="highlight-insight-banner">
            {p_ab[3]}
          </div>

          <p>
            {p_ab[4]}
          </p>

          <div class="quote-ornament-card">
            {LOTUS_SVG}
            <blockquote class="quote-sacred-text">
              “{p_ab[5].replace('“','').replace('”','')}”
            </blockquote>
          </div>
        </section>

        <!-- SECTION 01: THE AWAKENING OF SHRI MOKSHAM -->
        <section id="sec-01">
          <h2 class="article-section-header">
            <span class="section-num-badge">01.</span> {p_ab[6]}
          </h2>

          <p>
            {p_ab[7]}
          </p>
        </section>

        <!-- SECTION 02: THE THREE PILLARS: KNOW • TRANSFORM • SERVE -->
        <section id="sec-02">
          <h2 class="article-section-header">
            <span class="section-num-badge">02.</span> The Three Sacred Pillars: Know • Transform • Serve
          </h2>

          <h3 class="article-subheading-gold">I. {p_ab[8]}</h3>
          <p>
            {p_ab[9]}
          </p>

          <h3 class="article-subheading-gold">II. {p_ab[10]}</h3>
          <p>
            {p_ab[11]}
          </p>

          <p>
            {p_ab[12]}
          </p>

          <div class="highlight-insight-banner">
            {p_ab[13]}
          </div>

          <p>
            {p_ab[14]}
          </p>

          <p>
            {p_ab[15]}
          </p>

          <p>
            {p_ab[16]}
          </p>

          <h3 class="article-subheading-gold">III. {p_ab[17]}</h3>
          <p>
            {p_ab[18]}
          </p>

          <div class="perception-card" style="padding:1.2rem 1.6rem; margin:1.5rem 0;">
            <div class="perception-body" style="font-size:1.05rem; font-family:var(--font-heading); color:var(--text-dark);">
              “{p_ab[19]} {p_ab[20]}”
            </div>
          </div>

          <p>
            {p_ab[21]}
          </p>

          <p>
            {p_ab[22]}
          </p>

          <!-- Core Triad Banner -->
          <div class="quote-ornament-card" style="text-align:center; padding:1.8rem 1.5rem; background:radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, rgba(24,34,47,0.02) 100%);">
            <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--gold-dark); letter-spacing:0.18em; font-weight:700; margin-bottom:0.6rem;">
              {p_ab[23]}
            </div>
            <p style="font-family:var(--font-heading); font-size:1.15rem; color:var(--text-dark); margin-bottom:0.6rem; font-style:italic;">
              {p_ab[24]}
            </p>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-muted); letter-spacing:0.12em; text-transform:uppercase;">
              — {p_ab[25]} —
            </div>
          </div>
        </section>

        <!-- SECTION 03: A NOTE FROM THE FOUNDER -->
        <section id="sec-founder">
          <h2 class="article-section-header">
            <span class="section-num-badge">03.</span> {p_ab[26]}
          </h2>

          <div class="perception-card" style="padding:1.8rem 2rem; border-left:4px solid var(--border-gold); background:rgba(255,255,255,0.7); margin-top:1.2rem;">
            <p style="font-family:var(--font-display); font-size:1.08rem; color:var(--gold-dark); font-weight:600; margin-bottom:0.8rem;">
              {p_ab[27]}
            </p>

            <p style="line-height:1.75; margin-bottom:1rem;">
              {p_ab[28]}
            </p>

            <p style="line-height:1.75; margin-bottom:1rem;">
              {p_ab[29]}
            </p>

            <div class="highlight-insight-banner" style="margin:1.2rem 0;">
              {p_ab[30]}
            </div>

            <p style="line-height:1.75; margin-bottom:1rem;">
              {p_ab[31]}
            </p>

            <p style="line-height:1.75; margin-bottom:1rem;">
              {p_ab[32]}
            </p>

            <p style="line-height:1.75; margin-bottom:1rem;">
              {p_ab[33]}
            </p>

            <p style="line-height:1.75; margin-bottom:1rem; font-style:italic;">
              {p_ab[34]}
            </p>

            <p style="line-height:1.75; margin-bottom:1.5rem; font-weight:600; color:var(--text-dark);">
              {p_ab[35]}
            </p>

            <div style="border-top:1px solid rgba(212,175,55,0.3); padding-top:1rem; text-align:right;">
              <div style="font-family:var(--font-heading); font-size:1.05rem; color:var(--text-muted);">{p_ab[36]}</div>
              <div style="font-family:var(--font-display); font-size:1.2rem; font-weight:700; color:var(--text-dark); margin-top:0.2rem;">{p_ab[37]}</div>
              <div style="font-size:0.88rem; color:var(--gold-dark); letter-spacing:0.08em; text-transform:uppercase;">{p_ab[38]}</div>
            </div>
          </div>
        </section>'''

meta_about = {
    'filename': 'about-shri-moksham.html',
    'title': 'About Shri Moksham: Path to Inner Transformation',
    'meta_desc': 'Discover the sacred journey, founding philosophy, and core triad of Shri Moksham: Know yourself, Transform your life, Serve something greater.',
    'og_title': 'About Shri Moksham — Path to Inner Transformation',
    'og_desc': 'From Singularity to Search: Exploring the origins, core pillars of Jyotish and Seva, and Founder’s note from Sandeep Kumar Shivhare.',
    'symbol': '🪷',
    'cat_badge': 'SACRED MISSION • FOUNDING PHILOSOPHY &amp; SEVA',
    'master_title_prefix': 'About Shri Moksham:',
    'master_title_shimmer': 'Path to Inner Transformation',
    'epigraph': 'There is an ancient question that has echoed through the spiritual traditions of India for thousands of years: If everything came from One, why do we experience ourselves as separate?',
    'ticker_text': 'About Shri Moksham — From Singularity to Self-Realisation and Seva',
    'consult_query': 'Hi Shri Moksham, I read about the founding journey and philosophy of Shri Moksham and would like to connect for personal spiritual guidance.',
    'shloka_devanagari': 'ॐ असतो मा सद्गमय।\nतमसो मा ज्योतिर्गमय।\nमृत्योर्माऽमृतं गमय॥\nॐ शान्तिः शान्तिः शान्तिः॥',
    'shloka_phonetic': 'Oṁ asato mā sadgamaya |\ntamaso mā jyotirgamaya |\nmṛtyormā\'mṛtaṁ gamaya ||\nOṁ śāntiḥ śāntiḥ śāntiḥ ||',
    'shloka_meaning': 'Lead me from the unreal to the real; Lead me from darkness unto light; Lead me from death to immortality. Om Peace, Peace, Peace. (Brihadaranyaka Upanishad 1.3.28)',
    'body_html': body_about
}

with open('meta_about_shri_moksham.py', 'w', encoding='utf-8') as f:
    f.write('LOTUS_SVG = """' + LOTUS_SVG + '"""\n\n')
    f.write('about_shri_moksham_meta = ' + repr(meta_about) + '\n')

print("Generated meta_about_shri_moksham.py successfully!")
