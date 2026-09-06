"""
Build Script to generate HTML treatise pages for all 5 'new sec/' manuscripts:
1. Navagraha Stotram (navagraha-stotram.html & the-navagraha-stotram.html)
2. Shri Vishnu Sahasranaam (vishnu-sahasranama.html & the-vishnu-sahasranama.html & shri-vishnu-sahasranaam.html)
3. The Sacred Science of Place, Time, Charity and Faith (sacred-science-of-giving.html & the-sacred-science-of-place-time-charity-and-faith.html & desha-kala-patra.html)
4. When God Worships God (when-god-worships-god.html & the-when-god-worships-god.html)
5. Why Vishnu Sahasranama Is Considered a Powerful Remedy for Grahas & Nakshatras (vishnu-sahasranama-grahas-remedy.html & the-vishnu-sahasranama-grahas-remedy.html)
"""

from meta_navagraha_stotram import navagraha_stotram_meta
from meta_vishnu_sahasranama import vishnu_sahasranama_meta
from meta_sacred_charity import sacred_charity_meta
from meta_when_god_worships_god import when_god_worships_god_meta
from meta_vishnu_remedy import vishnu_remedy_meta

def render_treatise_page(meta):
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
        <span class="ticker-item"><span class="ticker-live-dot"></span> <b>SACRED TREATISE:</b> {ticker_text}</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">{symbol} <b>{og_title}:</b> Eternal Wisdom, Stotras &amp; Dharma</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item">🎓 <b>4-5 MONTH MASTERCLASS:</b> Admissions Open for Vedic Astrology Batch</span>
        <span class="ticker-sep">✦</span>
        <span class="ticker-item"><span class="ticker-live-dot"></span> <b>SACRED TREATISE:</b> {ticker_text}</span>
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
          <li class="nav-link-item"><a href="index.html#sacred-treatises">Treatises</a></li>
          <li class="nav-link-item"><a href="index.html#course-offerings">Courses <span
                class="nav-hot-badge">MASTERCLASS</span></a></li>
          <li class="nav-link-item"><a href="index.html#spiritual-features">Meditation</a></li>
          <li class="nav-link-item"><a href="{filename}" class="is-active">Treatise</a></li>
          <li class="nav-link-item"><a href="index.html#contact">Contact</a></li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <a href="{consult_url}"
          class="btn-header-consultation" target="_blank" rel="noopener">
          <span>Book Consultation</span>
        </a>

        <!-- Mobile Navigation Toggle -->
        <button class="mobile-nav-toggle" id="mobileNavToggle" type="button" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="mobileNavDrawer">
          <span class="mobile-toggle-bar"></span>
          <span class="mobile-toggle-bar"></span>
          <span class="mobile-toggle-bar"></span>
        </button>
      </div>
    </div>

    <!-- Master Glassmorphic Mobile Navigation Drawer -->
    <div class="mobile-nav-drawer" id="mobileNavDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      <div class="mobile-drawer-header">
        <a href="index.html" class="mobile-drawer-brand">
          <img src="assets/emblem-circle.png" alt="Shri Moksham Sacred Emblem" width="32" height="32">
          <span class="mobile-drawer-title">SHRI MOKSHAM</span>
        </a>
        <button class="mobile-drawer-close" id="mobileNavClose" type="button" aria-label="Close navigation menu">✕</button>
      </div>

      <div class="mobile-drawer-body">
        <ul class="mobile-links-list">
          <li><a href="index.html#home"><span>Home</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#about-heritage"><span>About Us</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#grahas-explorer"><span>9 Grahas</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#sacred-treatises"><span>Treatises</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#course-offerings"><span>Courses (Masterclass)</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#spiritual-features"><span>Meditation</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="{filename}" class="is-active"><span>Treatise</span> <span class="link-arrow">➔</span></a></li>
          <li><a href="index.html#contact"><span>Contact</span> <span class="link-arrow">➔</span></a></li>
        </ul>

        <div class="mobile-drawer-actions">
          <a href="{consult_url}"
            class="btn-mobile-consult" target="_blank" rel="noopener">
            <span>💬 Book Consultation</span>
          </a>
        </div>
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

        <!-- ESSENTIAL ACTIONS: BACK TO MAIN HUB & WHATSAPP -->
        <div class="article-essential-actions">
          <a href="index.html#sacred-treatises" class="btn-essential-grahas">
            <span>← Back to Treatises</span>
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
  <!-- Scripts -->
  <script src="js/animated-topbar.js"></script>
  <script src="js/app.js"></script>
</body>

</html>'''

if __name__ == '__main__':
    all_treatises = [
        navagraha_stotram_meta,
        vishnu_sahasranama_meta,
        sacred_charity_meta,
        when_god_worships_god_meta,
        vishnu_remedy_meta
    ]

    for meta in all_treatises:
        html_content = render_treatise_page(meta)
        
        # Write primary file
        target_primary = meta['filename']
        with open(target_primary, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated {target_primary} ({len(html_content)} bytes)")
        
        # Write alias 'the-<filename>' if doesn't start with the-
        alias_filename = f"the-{target_primary}"
        with open(alias_filename, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated alias {alias_filename} ({len(html_content)} bytes)")

    # Additional custom aliases
    with open('shri-vishnu-sahasranaam.html', 'w', encoding='utf-8') as f:
        f.write(render_treatise_page(vishnu_sahasranama_meta))
    with open('desha-kala-patra.html', 'w', encoding='utf-8') as f:
        f.write(render_treatise_page(sacred_charity_meta))

    print("\nAll 5 New Treatises HTML files generated successfully!")
