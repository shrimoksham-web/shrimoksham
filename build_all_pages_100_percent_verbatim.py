import zipfile
import xml.etree.ElementTree as ET
import os

def extract_docx_paragraphs(filepath):
    paragraphs = []
    with zipfile.ZipFile(filepath) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        for p in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
            if texts:
                p_text = ''.join(texts).strip()
                if p_text:
                    paragraphs.append(p_text)
    return paragraphs

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

def render_html_document(meta, paragraphs):
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
    shloka_devanagari = meta.get('shloka_devanagari', '')
    shloka_phonetic = meta.get('shloka_phonetic', '')
    shloka_meaning = meta.get('shloka_meaning', '')
    consult_query = meta.get('consult_query', f"Hi Shri Moksham, I read the treatise on {title} and would like a personal Vedic consultation.")

    consult_url = "https://wa.me/919997066326?text=" + consult_query.replace(" ", "%20").replace(",", "%2C").replace("(", "%28").replace(")", "%29").replace("'", "%27")

    # Build 100% verbatim body from paragraphs
    body_blocks = []
    sec_count = 0
    current_section_paras = []
    current_section_title = None

    # First paragraph drop cap
    first_para_done = False

    for i, p in enumerate(paragraphs):
        p_str = p.strip()
        if not p_str:
            continue

        # Skip document title if it's the very first paragraph
        if i == 0 and len(p_str) < 80 and not p_str.endswith('.'):
            continue

        # Detect section headings (short lines without terminal period, or specific chapter indicators)
        is_heading = False
        if len(p_str) < 95 and not p_str.endswith('.') and not p_str.startswith('"') and not p_str.startswith('“') and not p_str.startswith('('):
            # If it has a number prefix or dash or title case
            if any(k in p_str for k in ['—', '–', ':', '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.', 'Why', 'The ', 'Shani', 'Rahu', 'Ketu', 'Mangal', 'Budha', 'Guru', 'Shukra', 'Surya', 'Chandra', 'Desh', 'Kala', 'Patra', 'Dana', 'Shiv', 'Vishnu', 'Ram', 'Conclusion', 'Summary', 'Birth', 'Death', 'House', 'Nakshatra', 'Mantra', 'Phala', 'Power', 'Nature']):
                is_heading = True

        if is_heading:
            if current_section_paras:
                sec_count += 1
                header_html = f'<h2 class="article-section-header"><span class="section-num-badge">{sec_count:02d}.</span> {current_section_title}</h2>' if current_section_title else ''
                body_blocks.append(f'''        <!-- SECTION {sec_count:02d} -->
        <section id="sec-{sec_count:02d}">
          {header_html}
          ''' + '\n\n          '.join(current_section_paras) + '''
        </section>''')
                current_section_paras = []
            current_section_title = p_str
        else:
            # Check for Sanskrit verse or quote
            if any(c in p_str for c in ['ॐ', '॥', '।', 'नमः']) and len(p_str) < 300:
                current_section_paras.append(f'''<div class="sacred-shloka-altar-card" style="margin:1.2rem 0;">
            <div class="shloka-devanagari-verse" style="font-size:1.15rem; line-height:1.8;">{p_str}</div>
          </div>''')
            elif (p_str.startswith('"') or p_str.startswith('“')) and len(p_str) < 220 and (p_str.endswith('"') or p_str.endswith('”') or '—' in p_str):
                current_section_paras.append(f'''<div class="article-quote-card">
            {LOTUS_SVG}
            <p class="quote-text">{p_str}</p>
          </div>''')
            elif not first_para_done:
                current_section_paras.append(f'<p class="article-drop-cap">{p_str}</p>')
                first_para_done = True
            else:
                current_section_paras.append(f'<p>{p_str}</p>')

    # Final section flush
    if current_section_paras:
        sec_count += 1
        header_html = f'<h2 class="article-section-header"><span class="section-num-badge">{sec_count:02d}.</span> {current_section_title}</h2>' if current_section_title else ''
        body_blocks.append(f'''        <!-- SECTION {sec_count:02d} -->
        <section id="sec-{sec_count:02d}">
          {header_html}
          ''' + '\n\n          '.join(current_section_paras) + '''
        </section>''')

    body_html = '\n\n'.join(body_blocks)

    # Shloka altar block
    shloka_altar_html = ''
    if shloka_devanagari:
        shloka_altar_html = f'''        <!-- SACRED SANSKRIT SHLOKA ALTAR -->
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
        </section>'''

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

      <!-- ARTICLE PROSE BODY (100% VERBATIM TEXT FROM DOCX) -->
      <article class="article-prose-body">

{body_html}

{shloka_altar_html}

        <!-- ESSENTIAL ACTIONS: BACK TO HUB & WHATSAPP -->
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
  </footer>

  <!-- Scripts -->
  <script src="js/animated-topbar.js"></script>
  <script src="js/app.js"></script>
</body>

</html>'''

# Document metadata configurations mapping 1-to-1 to each docx
documents_config = [
    {
        'docx': 'The Sun.docx',
        'meta': {
            'filename': 'the-sun.html',
            'title': 'The Sun: The Light Within',
            'meta_desc': 'The Moon tells us how we experience the world. The Sun asks us who we are beneath that experience. Discover the profound Vedic philosophy of Surya and the 12 Adityas.',
            'og_title': 'The Sun: The Light Within',
            'og_desc': 'Discover the light within. The Sun represents the Atman (Soul), vitality, and the 12 Adityas in Vedic Jyotish.',
            'symbol': '☉',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • SURYA TREATISE',
            'master_title_prefix': 'The Sun:',
            'master_title_shimmer': 'The Light Within',
            'epigraph': 'The Moon tells us how we experience the world. The Sun asks us who we are beneath that experience.',
            'ticker_text': 'The Sun (Surya) — The Light Within',
            'consult_query': 'Hi Shri Moksham, I read your treatise on The Sun and would like a personal Vedic Astrology Consultation regarding my Surya, Atman, and Dharma.',
            'shloka_devanagari': 'ॐ ह्रीं ह्रीं सूर्याय नमः॥',
            'shloka_phonetic': 'Om Hrīṁ Hrīṁ Sūryāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Surya, the divine illuminator of all worlds, the soul of the cosmos, and the remover of all inner darkness.'
        },
        'aliases': []
    },
    {
        'docx': 'The Moon.docx',
        'meta': {
            'filename': 'the-moon.html',
            'title': 'The Moon: The Mirror of the Mind',
            'meta_desc': 'The Moon does not produce its own light; it reflects the light of the Sun. Discover the Vedic psychology of Chandra, Manas, and Inner Peace.',
            'og_title': 'The Moon: The Mirror of the Mind',
            'og_desc': 'Explore the Vedic wisdom of the Moon (Chandra) — the mirror of the mind, emotional fluctuations, and the path to serene consciousness.',
            'symbol': '☽',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • CHANDRA ESSAY',
            'master_title_prefix': 'The Moon:',
            'master_title_shimmer': 'The Mirror of the Mind',
            'epigraph': 'The Moon does not produce its own light; it reflects the light of the Sun. In the same way, the mind does not have consciousness of its own; it reflects the light of the Self.',
            'ticker_text': 'The Moon (Chandra) — The Mirror of the Mind',
            'consult_query': 'Hi Shri Moksham, I read your treatise on The Moon and would like a personal Vedic Astrology Consultation regarding my Moon, Mind, and Emotions.',
            'shloka_devanagari': 'ॐ सों सोमाय नमः॥',
            'shloka_phonetic': 'Om Soṁ Somāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Soma, the radiant Moon, the Lord of nectar, mind, emotional serenity, and inner illumination.'
        },
        'aliases': []
    },
    {
        'docx': 'Jupiter.docx',
        'meta': {
            'filename': 'the-jupiter.html',
            'title': 'Guru: The Wisdom That Gives Meaning to Life',
            'meta_desc': 'In Vedic Jyotish, Guru represents wisdom, faith, Dharma, and the ability to find meaning in experience. Discover the profound philosophy of Brihaspati.',
            'og_title': 'Guru: The Wisdom That Gives Meaning to Life',
            'og_desc': 'Knowledge gathers information; wisdom understands what to do with it. Explore the Vedic treatise on Guru (Jupiter).',
            'symbol': '♃',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • GURU TREATISE',
            'master_title_prefix': 'Guru:',
            'master_title_shimmer': 'The Wisdom That Gives Meaning to Life',
            'epigraph': 'Knowledge gathers information; wisdom understands what to do with it. Knowledge tells us what is possible; wisdom asks whether it is right.',
            'ticker_text': 'Jupiter (Guru) — The Wisdom That Gives Meaning to Life',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Guru (Jupiter) and would like a personal Vedic Astrology Consultation regarding my Jupiter, Dharma, and Higher Wisdom.',
            'shloka_devanagari': 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
            'shloka_phonetic': 'Om Grāṁ Grīṁ Grauṁ Saḥ Gurave Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Brihaspati (Guru), the dispeller of ignorance, embodiment of sacred knowledge, and supreme guide of the cosmic order.'
        },
        'aliases': ['jupiter.html']
    },
    {
        'docx': 'Mars.docx',
        'meta': {
            'filename': 'the-mars.html',
            'title': 'Mangal: The Fire That Makes Us Act',
            'meta_desc': 'In Vedic Jyotish, Mangal represents the force that moves us from intention to action. Explore Bhumiputra, Skanda, Exaltation in Capricorn, and Courage guided by Dharma.',
            'og_title': 'Mangal: The Fire That Makes Us Act',
            'og_desc': 'While the Moon experiences and Mercury thinks, Mars gives us the courage to act. Discover the Vedic psychology and philosophy of Mangal.',
            'symbol': '♂',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • MARS ESSAY',
            'master_title_prefix': 'Mangal:',
            'master_title_shimmer': 'The Fire That Makes Us Act',
            'epigraph': 'While the Moon experiences and Mercury thinks, Mars gives us the courage to act. Energy without purpose burns; energy with purpose transforms.',
            'ticker_text': 'Mars (Mangal) — The Fire That Makes Us Act',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Mars (Mangal) and would like a personal Vedic Astrology Consultation regarding my Mars, Energy, and Righteous Action.',
            'shloka_devanagari': 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
            'shloka_phonetic': 'Om Krāṁ Krīṁ Krauṁ Saḥ Bhaumāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Bhauma (Mars), the celestial warrior of righteous action, vital discipline, and transformative power.'
        },
        'aliases': ['mars.html']
    },
    {
        'docx': 'The Mercury.docx',
        'meta': {
            'filename': 'the-mercury.html',
            'title': 'Budha: The Intelligence That Learns, Connects and Adapts',
            'meta_desc': 'Explore the Vedic psychology of Budha (Mercury) in Jyotish. Discover the child of Chandra & Tara, discernment (Buddhi), and the bridge from cleverness to wisdom.',
            'og_title': 'Budha: The Intelligence That Learns, Connects & Adapts',
            'og_desc': 'Information is what the world provides; intelligence is how we interpret it; wisdom is knowing what truly matters. Discover Budha (Mercury).',
            'symbol': '☿',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • MERCURY ESSAY',
            'master_title_prefix': 'Budha:',
            'master_title_shimmer': 'The Intelligence That Learns, Connects &amp; Adapts',
            'epigraph': 'Information is what the world provides; intelligence is how we interpret it; wisdom is knowing what truly matters.',
            'ticker_text': 'Mercury (Budha) — The Intelligence That Learns, Connects & Adapts',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Mercury (Budha) and would like a personal Vedic Astrology Consultation regarding my Mercury, Intellect, and Discernment.',
            'shloka_devanagari': 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
            'shloka_phonetic': 'Om Brāṁ Brīṁ Brauṁ Saḥ Budhāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Budha, the gentle planet of sharp analytical intellect, conscious discernment (Viveka), and harmonious communication.'
        },
        'aliases': ['mercury.html']
    },
    {
        'docx': 'Venus.docx',
        'meta': {
            'filename': 'the-venus.html',
            'title': 'Shukra: The Wisdom of Desire, Beauty and Renewal',
            'meta_desc': 'Explore the deeper Vedic philosophy of Shukracharya, Mritasanjivani Vidya, Mahalakshmi, Exaltation in Pisces, and the Journey from Desire to Devotion and Moksha.',
            'og_title': 'Shukra: The Wisdom of Desire, Beauty & Renewal',
            'og_desc': 'Shukra teaches us how to experience the world without becoming enslaved by it. Discover the Vedic psychology and sacred mythology of Shukra (Venus).',
            'symbol': '♀',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • VENUS ESSAY',
            'master_title_prefix': 'Shukra:',
            'master_title_shimmer': 'The Wisdom of Desire, Beauty &amp; Renewal',
            'epigraph': 'Shukra teaches us one of life’s most important lessons: how to experience the world without becoming enslaved by it.',
            'ticker_text': 'Venus (Shukra) — The Wisdom of Desire, Beauty & Renewal',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Venus (Shukra) and would like a personal Vedic Astrology Consultation regarding my Venus, Relationships, and Abundance.',
            'shloka_devanagari': 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
            'shloka_phonetic': 'Om Drāṁ Drīṁ Drauṁ Saḥ Śukrāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Shukracharya, the master of sacred beauty, devotion (Bhakti), refinement, and the Mritasanjivani power of life renewal.'
        },
        'aliases': ['venus.html']
    },
    {
        'docx': 'Saturn.docx',
        'meta': {
            'filename': 'the-saturn.html',
            'title': 'Shani: The Teacher of Time, Karma and Responsibility',
            'meta_desc': 'Explore the profound Vedic philosophy of Shani (Saturn), Kaal, Karma, Chhaya-Surya, and why Saturn is not a punisher, but the greatest teacher of consciousness.',
            'og_title': 'Shani: The Teacher of Time, Karma & Responsibility',
            'og_desc': 'Shani does not teach through enthusiasm; he teaches through reality. Discover the sacred Vedic philosophy of Saturn.',
            'symbol': '♄',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • SATURN ESSAY',
            'master_title_prefix': 'Shani:',
            'master_title_shimmer': 'The Teacher of Time, Karma &amp; Responsibility',
            'epigraph': 'Shani does not teach through enthusiasm; he teaches through reality. He takes away the illusion of control and asks us to face what is real.',
            'ticker_text': 'Saturn (Shani) — The Teacher of Time, Karma & Responsibility',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Saturn (Shani) and would like a personal Vedic Astrology Consultation regarding my Saturn, Karma, and Life Lessons.',
            'shloka_devanagari': 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
            'shloka_phonetic': 'Om Prāṁ Prīṁ Prauṁ Saḥ Śanaiścarāya Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Shani, the lord of patience, divine justice, and steady spiritual purification through Time (Kaal).'
        },
        'aliases': ['saturn.html']
    },
    {
        'docx': 'Rahu.docx',
        'meta': {
            'filename': 'the-rahu.html',
            'title': 'Rahu: The Hunger That Never Says Enough',
            'meta_desc': 'Explore the Vedic psychology of Rahu (North Node), the Samudra Manthan, Digital Media & Algorithms, Shani-Vat Rahu, Maa Durga, and Directing Ambition toward Moksha.',
            'og_title': 'Rahu: The Hunger That Never Says Enough',
            'og_desc': 'Rahu represents the hunger to experience. Discover the profound Vedic philosophy and psychological shadow of Rahu (North Node).',
            'symbol': '☊',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • RAHU ESSAY',
            'master_title_prefix': 'Rahu:',
            'master_title_shimmer': 'The Hunger That Never Says Enough',
            'epigraph': 'Rahu represents the hunger to experience. The spiritual journey begins when a person eventually asks: ‘How much is enough?’',
            'ticker_text': 'Rahu (North Node) — The Hunger That Never Says Enough',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Rahu and would like a personal Vedic Astrology Consultation regarding my Rahu, Desires, and Karmic Axis.',
            'shloka_devanagari': 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः॥',
            'shloka_phonetic': 'Om Bhrāṁ Bhrīṁ Bhrauṁ Saḥ Rāhave Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Rahu, the cosmic shadow node of intense ambition, evolutionary innovation, and the journey from illusion to awakening.'
        },
        'aliases': ['rahu.html']
    },
    {
        'docx': 'Ketu.docx',
        'meta': {
            'filename': 'the-ketu.html',
            'title': 'Ketu: The Wisdom of Detachment and the Path to Moksha',
            'meta_desc': 'Explore the profound Vedic philosophy of Ketu (South Node), the Samudra Manthan, the 8th House, Death of Identity, Moksha Karaka, Guru & Ketu, and Spiritual Liberation.',
            'og_title': 'Ketu: The Wisdom of Detachment & The Path to Moksha',
            'og_desc': 'Ketu represents the part of our consciousness that has already experienced deeply and extracts essence. Discover the mystery of the Moksha Karaka.',
            'symbol': '☋',
            'cat_badge': 'VEDIC JYOTISH &amp; PHILOSOPHY • KETU ESSAY',
            'master_title_prefix': 'Ketu:',
            'master_title_shimmer': 'The Wisdom of Detachment &amp; The Path to Moksha',
            'epigraph': 'Rahu gathers experiences; Ketu extracts their essence. What we seek outside may give us experience, but what we truly are does not need to be acquired.',
            'ticker_text': 'Ketu (South Node) — The Wisdom of Detachment & The Path to Moksha',
            'consult_query': 'Hi Shri Moksham, I read your treatise on Ketu and would like a personal Vedic Astrology Consultation regarding my Ketu, Moksha Houses, and Spiritual Journey.',
            'shloka_devanagari': 'ॐ स्रां स्रीं स्रौं सः केतवे नमः॥',
            'shloka_phonetic': 'Om Srāṁ Srīṁ Srauṁ Saḥ Ketave Namaḥ॥',
            'shloka_meaning': 'Om, salutations to Ketu, the cosmic headless sage of inner detachment, deep mystical intuition, and the ultimate liberation of consciousness into Moksha.'
        },
        'aliases': ['ketu.html']
    },
    {
        'docx': "God's Will.docx",
        'meta': {
            'filename': 'gods-will.html',
            'title': "What is God's Will? — Karma & Free Will",
            'meta_desc': "If Everything Happens by God's Will, Why Is a Sinner Held Responsible? Explore the timeless philosophical teachings of Sanatana Dharma and the Bhagavad Gita.",
            'og_title': "What is God's Will? — Karma & Free Will",
            'og_desc': "Discover the subtle reconciliation of God's Will, personal Karma, human Free Will, and the Cosmic Law in the Bhagavad Gita.",
            'symbol': '🦚',
            'cat_badge': 'VEDIC PHILOSOPHY • BHAGAVAD GITA TREATISE',
            'master_title_prefix': 'What is',
            'master_title_shimmer': "God's Will?",
            'epigraph': "If everything happens by God's will, why is a sinner held responsible? Explore the subtle reconciliation of divine will, karma, and free will.",
            'ticker_text': "What is God's Will? — Karma, Free Will & Divine Cosmic Law",
            'consult_query': "Hi Shri Moksham, I read your treatise on God's Will and would like a personal Vedic Consultation on Karma and Spiritual Guidance.",
            'shloka_devanagari': 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
            'shloka_phonetic': 'Karmaṇy Evādhikāras Te Mā Phaleṣu Kadācana |\nMā Karma-Phala-Heturbhūr Mā Te Saṅgo\'stvakarmaṇi ||',
            'shloka_meaning': 'You have a right to perform your prescribed duties, but never to the fruits of actions. Never consider yourself the cause of the results of your activities, nor be attached to inaction (Bhagavad Gita 2.47).'
        },
        'aliases': ['the-gods-will.html']
    },
    {
        'docx': 'new sec/Navagraha Stotram.docx',
        'meta': {
            'filename': 'navagraha-stotram.html',
            'title': 'Navagraha Stotram: Sage Vyasa’s Cosmic 9 Grahas Hymn',
            'meta_desc': 'The complete Navagraha Stotram composed by Sage Veda Vyasa with Sanskrit verses, English transliterations, word meanings, and spiritual benefits for all 9 planets.',
            'og_title': 'Navagraha Stotram: Sage Vyasa’s Cosmic Hymn',
            'og_desc': 'Recite the sacred Navagraha Stotram to harmonize the nine planetary energies, dispel afflictions, and cultivate radiant peace and prosperity.',
            'symbol': '✨',
            'cat_badge': 'VEDIC HYMNS &amp; STOTRAS • SAGE VYASA DISCOURSE',
            'master_title_prefix': 'Navagraha Stotram:',
            'master_title_shimmer': 'Sage Vyasa’s Cosmic 9 Grahas Hymn',
            'epigraph': 'Whoever recites this hymn composed by Sage Vyasa with a focused mind, by day or by night, will receive relief from all obstacles. — Phala Shruti',
            'ticker_text': 'Navagraha Stotram — Sage Vyasa’s 9 Cosmic Mantras & Planetary Harmony',
            'consult_query': 'Hi Shri Moksham, I read the Navagraha Stotram treatise and would like a personal Vedic Astrology Consultation regarding planetary remedies in my birth chart.',
            'shloka_devanagari': 'ब्रह्मामुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च।\nगुरुश्च शुक्रः शनिराहुकेतवः कुर्वन्तु सर्वे मम सुप्रभातम्॥',
            'shloka_phonetic': 'Brahmā Murāris Tripurāntakārī Bhānuḥ Śaśī Bhūmisuto Budhaśca |\nGuruśca Śukraḥ Śani Rāhu Ketavaḥ Kurvantu Sarve Mama Suprabhātam ||',
            'shloka_meaning': 'May Brahma, Vishnu, Shiva, the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu make this dawn auspicious and blessed for me.'
        },
        'aliases': ['the-navagraha-stotram.html']
    },
    {
        'docx': 'new sec/Shri Vishnu Sahasranaam.docx',
        'meta': {
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
            'shloka_devanagari': 'वनमाली गदी शार्ङ्गी शङ्खी चक्री च नन्दकी।\nश्रीमान् नारायणो विष्णुर्वासुदेवोऽभिरक्षतु॥',
            'shloka_phonetic': "Vanamālī Gadī Śārṅgī Śaṅkhī Cakrī Ca Nandakī |\nŚrīmān Nārāyaṇo Viṣṇur Vāsudevo'bhirakṣatu ||",
            'shloka_meaning': 'May Shriman Narayana, Vishnu, Vasudeva—wearer of the forest garland, wielder of the mace, bow, conch, discus, and sword—protect and bless us always.'
        },
        'aliases': ['the-vishnu-sahasranama.html', 'shri-vishnu-sahasranaam.html']
    },
    {
        'docx': 'new sec/The Sacred Science of Place, Time, Charity and Faith.docx',
        'meta': {
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
            'shloka_devanagari': 'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे।\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥',
            'shloka_phonetic': "Dātavyam Iti Yad Dānaṁ Dīyate'nupakāriṇe |\nDeśe Kāle Ca Pātre Ca Tad Dānaṁ Sāttvikaṁ Smṛtam ||",
            'shloka_meaning': 'Charity given simply out of duty, without expectation of return, at an auspicious place and time to a worthy recipient—that giving is declared to be purely Sattvic (Bhagavad Gita 17.20).'
        },
        'aliases': ['the-sacred-science-of-giving.html', 'desha-kala-patra.html']
    },
    {
        'docx': 'new sec/When God Worships God.docx',
        'meta': {
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
            'shloka_devanagari': 'शिवाय विष्णुस्वरूपाय शिवरूपाय विष्णवे।\nशिवस्य हृदयं विष्णुर्विष्णोश्च हृदयं शिवः॥',
            'shloka_phonetic': 'Śivāya Viṣṇu-rūpāya Śiva-rūpāya Viṣṇave |\nŚivasya Hṛdayaṁ Viṣṇur Viṣṇośca Hṛdayaṁ Śivaḥ ||',
            'shloka_meaning': 'Salutations to Shiva who is in the form of Vishnu, and to Vishnu who is in the form of Shiva. Vishnu is the sacred heart of Shiva, and Shiva is the sacred heart of Vishnu (Skanda Upanishad).'
        },
        'aliases': ['the-when-god-worships-god.html']
    },
    {
        'docx': 'new sec/Why Vishnu Sahasranama Is Considered a Powerful Remedy for the Grahas and Nakshatras.docx',
        'meta': {
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
            'shloka_devanagari': 'न वासुदेवभक्तानामशुभं विद्यते क्वचित्।\nजन्ममृत्युजराव्याधिभयं नैवोपजायते॥',
            'shloka_phonetic': 'Na Vāsudeva Bhaktānām Aśubhaṁ Vidyate Kvacit |\nJanma Mṛtyu Jarā Vyādhi Bhayaṁ Naivopajāyate ||',
            'shloka_meaning': 'For the devotees of Vasudeva, no inauspiciousness exists anywhere. They are liberated from the fears of birth, death, old age, and disease (Vishnu Sahasranama Phala Shruti).'
        },
        'aliases': ['the-vishnu-sahasranama-grahas-remedy.html']
    }
]

print("=== BUILDING ALL PAGES 100% VERBATIM FROM DOCX ===")
for item in documents_config:
    docx_path = item['docx']
    if not os.path.exists(docx_path):
        print(f"Skipping {docx_path} (not found)")
        continue
    
    paras = extract_docx_paragraphs(docx_path)
    html_code = render_html_document(item['meta'], paras)
    
    # Primary file
    primary_target = item['meta']['filename']
    with open(primary_target, 'w', encoding='utf-8') as f:
        f.write(html_code)
    print(f"Wrote {primary_target} ({len(html_code):,} bytes, {len(paras)} docx paras)")
    
    # Aliases
    for alias in item['aliases']:
        with open(alias, 'w', encoding='utf-8') as f:
            f.write(html_code)
        print(f"  -> Wrote alias {alias}")

print("\nALL DOCUMENTS PROCESSED 100% VERBATIM!")
