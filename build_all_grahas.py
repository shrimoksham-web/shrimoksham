"""
Build Script to generate HTML treatise pages for all 6 remaining Grahas:
- Mars (the-mars.html & mars.html)
- Mercury (the-mercury.html & mercury.html)
- Venus (the-venus.html & venus.html)
- Saturn (the-saturn.html & saturn.html)
- Rahu (the-rahu.html & rahu.html)
- Ketu (the-ketu.html & ketu.html)

Imports metadata definitions from individual modular data files.
"""

from data_mars import mars_meta
from data_mercury import mercury_meta
from data_venus import venus_meta
from data_saturn import saturn_meta
from data_rahu import rahu_meta
from data_ketu import ketu_meta

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

def render_html_page(meta):
    filename = meta['filename']
    title = meta['title']
    meta_desc = meta['meta_desc']
    og_title = meta['og_title']
    og_desc = meta['og_desc']
    symbol = meta['symbol']
    cat_badge = meta['cat_badge']
    master_title_prefix = meta['master_title_prefix']
    master_title_shimmer = meta['master_title_shimmer']
    epigraph = meta['epigraph']
    ticker_text = meta['ticker_text']
    body_html = meta['body_html']
    shloka_devanagari = meta['shloka_devanagari']
    shloka_phonetic = meta['shloka_phonetic']
    shloka_meaning = meta['shloka_meaning']
    consult_query = meta['consult_query']

    consult_url = "https://wa.me/919997066326?text=" + consult_query.replace(" ", "%20").replace(",", "%2C").replace("(", "%28").replace(")", "%29").replace("'", "%27")

    return f'''<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Shri Moksham Vedic Wisdom</title>
  <meta name="description"
    content="{meta_desc}">

  <!-- Open Graph / Meta -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="{og_title} — Shri Moksham">
  <meta property="og:description"
    content="{og_desc}">
  <meta property="og:image" content="assets/brand-reference.jpg">
  <meta property="og:url" content="https://shrimoksham.org/{filename}">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/emblem-circle.png">

  <!-- Google Fonts: Cinzel, Cormorant Garamond, Plus Jakarta Sans, Noto Serif Devanagari -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Serif+Devanagari:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet">

  <!-- Core Stylesheets -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/glassmorphic-luxury.css">
  <link rel="stylesheet" href="css/astrology-explorer.css">
  <link rel="stylesheet" href="css/animated-topbar.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="stylesheet" href="css/blog-article.css?v=6.0">
</head>

<body class="blog-article-page">

  <!-- ==========================================================================
       SITE NAVIGATION HEADER
       ========================================================================== -->
  <header class="site-header" id="siteHeader">
    <!-- Live Energetic Ticker -->
    <div class="energetic-top-ticker" aria-label="Live Sacred Announcements">
      <div class="ticker-content-track">
        <span class="ticker-item"><span class="ticker-live-dot"></span> <b>VEDIC TREATISE:</b> {ticker_text}</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">{symbol} <b>{og_title}:</b> Consciousness, Wisdom &amp; Dharma</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">🎓 <b>4-5 MONTH MASTERCLASS:</b> Admissions Open for Vedic Astrology Batch</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item"><span class="ticker-live-dot"></span> <b>VEDIC TREATISE:</b> {ticker_text}</span>
      </div>
    </div>

    <div class="header-container">
      <!-- Brand Logo -->
      <a href="index.html" class="brand-logo" id="brandLogoLink">
        <div class="brand-emblem-wrap">
          <img src="assets/emblem-circle.png" alt="Shri Moksham Sacred Emblem" width="38" height="38">
        </div>
        <div class="brand-text-block">
          <span class="brand-name">SHRI MOKSHAM</span>
          <span class="brand-tagline-micro">— Path to inner transformation —</span>
        </div>
      </a>

      <!-- Navigation Links -->
      <nav class="desktop-nav" aria-label="Main Navigation">
        <ul class="nav-links-list">
          <li class="nav-link-item"><a href="index.html#home">Home</a></li>
          <li class="nav-link-item"><a href="index.html#about-heritage">About Us</a></li>
          <li class="nav-link-item"><a href="index.html#grahas-explorer">9 Grahas</a></li>
          <li class="nav-link-item"><a href="index.html#course-offerings">Courses <span
                class="nav-hot-badge">MASTERCLASS</span></a></li>
          <li class="nav-link-item"><a href="index.html#spiritual-features">Meditation</a></li>
          <li class="nav-link-item"><a href="{filename}" class="is-active">Blog</a></li>
          <li class="nav-link-item"><a href="index.html#contact">Contact</a></li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <a href="{consult_url}"
          class="btn-header-consultation" target="_blank" rel="noopener">
          <span>Book Consultation</span>
        </a>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       MAIN READING CANVAS (WIDE BOX FOR BALANCED HEIGHT & OPTIMAL READABILITY)
       ========================================================================== -->
  <main class="article-compact-stage" id="mainContent">
    <div class="article-compact-card">

      <!-- ARTICLE HEADER BLOCK -->
      <header class="article-header-block">
        <div class="article-category-badge">
          <span>{symbol}</span> {cat_badge}
        </div>

        <h1 class="article-master-title">
          {master_title_prefix} <span class="gold-shimmer">{master_title_shimmer}</span>
        </h1>

        <div class="article-epigraph-box">
          <p class="epigraph-text">
            “{epigraph}”
          </p>
        </div>
      </header>

      <!-- ARTICLE PROSE BODY (100% VERBATIM TEXT) -->
      <article class="article-prose-body">

{body_html}

        <!-- SACRED SANSKRIT SHLOKA ALTAR -->
        <section id="sec-shloka">
          <div class="sacred-shloka-altar-card">
            <div class="shloka-om-icon">ॐ</div>

            <div class="shloka-devanagari-verse">
              {shloka_devanagari}
            </div>

            <div class="shloka-phonetic-trans">
              "{shloka_phonetic}"
            </div>

            <p class="shloka-english-meaning">
              <em>“{shloka_meaning}”</em>
            </p>
          </div>
        </section>

        <!-- ESSENTIAL ACTIONS: BACK TO 9 GRAHAS & WHATSAPP -->
        <div class="article-essential-actions">
          <a href="index.html#grahas-explorer" class="btn-essential-grahas">
            <span>← Back to 9 Grahas</span>
          </a>

          <a href="{consult_url}"
            class="btn-essential-whatsapp" target="_blank" rel="noopener">
            <span>💬 Consult on WhatsApp ➔</span>
          </a>
        </div>

      </article>

    </div>
  </main>

  <!-- ==========================================================================
       MINIMALIST CLEAN SIGNATURE FOOTER (LOGO & NAME ONLY)
       ========================================================================== -->
  <footer class="simple-article-footer" id="footerSection">
    <div class="simple-footer-container">
      <a href="index.html" class="simple-footer-brand">
        <img src="assets/emblem-circle.png" alt="Shri Moksham Sacred Emblem" width="38" height="38">
        <div class="simple-footer-text">
          <span class="simple-footer-name">SHRI MOKSHAM</span>
          <span class="simple-footer-tagline">Path to Inner Transformation • shrimoksham.org</span>
        </div>
      </a>
      <div class="simple-footer-copyright">
        © 2026 SHRI MOKSHAM. All Sacred Rights Reserved.
      </div>
    </div>
  </footer>

</body>

</html>'''


if __name__ == '__main__':
    all_graha_metas = [
        mars_meta,
        mercury_meta,
        venus_meta,
        saturn_meta,
        rahu_meta,
        ketu_meta
    ]

    for meta in all_graha_metas:
        html_content = render_html_page(meta)
        
        # Write the main 'the-<graha>.html' file
        target_primary = meta['filename']
        with open(target_primary, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated {target_primary} ({len(html_content)} bytes)")
        
        # Write the alias '<graha>.html' file
        alias_filename = meta['filename'].replace('the-', '')
        with open(alias_filename, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated {alias_filename} ({len(html_content)} bytes)")

    print("\nAll 6 Grahas HTML pages generated successfully!")
