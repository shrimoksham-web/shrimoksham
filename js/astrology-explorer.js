/**
 * SHRI MOKSHAM — Interactive 9 Grahas Explorer & Curriculum Accordion
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Interactive 9 Grahas Planetary Archetypes
     -------------------------------------------------------------------------- */
  const grahasData = {
    sun: {
      symbol: '☉',
      name: 'Sun (Surya)',
      archetype: 'Soul, Vitality, Authority, Divine Will & Self-Realization',
      lens: 'Align with your soul purpose and lead with righteous warmth and dignified integrity.',
      consultAction: 'READ ESSAY: THE LIGHT WITHIN',
      isBlog: true,
      href: 'the-sun.html',
      subtext: 'Special Vedic Treatise on Atman, Dharma & The 12 Adityas • 9 Min Read',
      btnClass: 'btn btn-blog-solar'
    },
    moon: {
      symbol: '☽',
      name: 'Moon (Chandra)',
      archetype: 'Mind, Emotions, Perception, Inner Peace & Intuition',
      lens: 'Practice conscious breath to stabilize turbulent emotional waves and cultivate serene clarity.',
      consultAction: 'READ ESSAY: THE MIRROR OF THE MIND',
      isBlog: true,
      href: 'the-moon.html',
      subtext: 'Special Vedic Essay & Philosophical Treatise • 8 Min Read',
      btnClass: 'btn btn-blog-lunar'
    },
    jupiter: {
      symbol: '♃',
      name: 'Jupiter (Guru)',
      archetype: 'Wisdom, Expansion, Higher Dharma, Grace & Mentorship',
      lens: 'Seek truthful wisdom, cultivate generous higher learning, and trust divine timing.',
      consultAction: 'READ ESSAY: THE WISDOM OF GURU',
      isBlog: true,
      href: 'the-jupiter.html',
      subtext: 'Special Vedic Treatise on Wisdom, Dharma & Higher Meaning • 9 Min Read',
      btnClass: 'btn btn-blog-jupiter'
    },
    venus: {
      symbol: '♀',
      name: 'Venus (Shukra)',
      archetype: 'Harmony, Beauty, Devotion, Sacred Love & Aesthetic Grace',
      lens: 'Express pure artistic aesthetic and cultivate compassionate, uplifting relationships.',
      consultAction: 'READ ESSAY: THE WISDOM OF DESIRE',
      isBlog: true,
      href: 'the-venus.html',
      subtext: 'Special Vedic Treatise on Shukra, Love & Divine Devotion • 8 Min Read',
      btnClass: 'btn btn-blog-venus'
    },
    mercury: {
      symbol: '☿',
      name: 'Mercury (Budha)',
      archetype: 'Intellect, Discernment, Speech, Commerce & Adaptability',
      lens: 'Master conscious communication, active listening, and sharp analytical clarity.',
      consultAction: 'READ ESSAY: THE INTELLIGENCE OF BUDHA',
      isBlog: true,
      href: 'the-mercury.html',
      subtext: 'Special Vedic Treatise on Intellect, Discernment & Mind • 8 Min Read',
      btnClass: 'btn btn-blog-mercury'
    },
    mars: {
      symbol: '♂',
      name: 'Mars (Mangala)',
      archetype: 'Courage, Vital Energy, Discipline, Righteous Action & Strength',
      lens: 'Channel vital life force into protective, purposeful, and disciplined action.',
      consultAction: 'READ ESSAY: THE FIRE OF MANGAL',
      isBlog: true,
      href: 'the-mars.html',
      subtext: 'Special Vedic Treatise on Courage, Will & Righteous Action • 8 Min Read',
      btnClass: 'btn btn-blog-mars'
    },
    saturn: {
      symbol: '♄',
      name: 'Saturn (Shani)',
      archetype: 'Karma, Patience, Mastery, Spiritual Detachment & Duty',
      lens: 'Embrace patient discipline, humility, and steady selfless service without anxiety.',
      consultAction: 'READ ESSAY: THE TEACHER OF TIME',
      isBlog: true,
      href: 'the-saturn.html',
      subtext: 'Special Vedic Treatise on Karma, Patience & Liberation • 9 Min Read',
      btnClass: 'btn btn-blog-saturn'
    },
    rahu: {
      symbol: '☊',
      name: 'Rahu (North Node)',
      archetype: 'Soul Desires, Innovation, Material Expansion & Karmic Frontier',
      lens: 'Navigate worldly ambition with mindful awareness, spiritual grounding, and ethics.',
      consultAction: 'READ ESSAY: THE HUNGER OF RAHU',
      isBlog: true,
      href: 'the-rahu.html',
      subtext: 'Special Vedic Treatise on Desires, Maya & Soul Expansion • 8 Min Read',
      btnClass: 'btn btn-blog-rahu'
    },
    ketu: {
      symbol: '☋',
      name: 'Ketu (South Node)',
      archetype: 'Moksha, Spiritual Liberation, Intuition & Inner Mastery',
      lens: 'Release past karmic attachments to realize timeless inner freedom and higher consciousness.',
      consultAction: 'READ ESSAY: THE WISDOM OF DETACHMENT',
      isBlog: true,
      href: 'the-ketu.html',
      subtext: 'Special Vedic Treatise on Moksha Karaka & Spiritual Awakening • 8 Min Read',
      btnClass: 'btn btn-blog-ketu'
    }
  };

  function initGrahasExplorer() {
    const cells = document.querySelectorAll('.graha-cell-card');
    const titleEl = document.getElementById('selectedGrahaTitle');
    const symbolEl = document.getElementById('selectedGrahaSymbol');
    const archetypeEl = document.getElementById('selectedGrahaArchetype');
    const lensEl = document.getElementById('selectedGrahaLens');
    const consultBtn = document.getElementById('selectedGrahaConsultBtn');
    const subtextEl = document.getElementById('selectedGrahaSubtext');

    if (!cells.length || !titleEl) return;

    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        cells.forEach((c) => c.classList.remove('is-selected'));
        cell.classList.add('is-selected');

        const key = cell.getAttribute('data-graha');
        const data = grahasData[key] || grahasData.moon;

        if (symbolEl) symbolEl.textContent = data.symbol;
        if (titleEl) titleEl.textContent = `${data.symbol} ${data.name}`;
        if (archetypeEl) archetypeEl.textContent = `Archetype: ${data.archetype}`;
        if (lensEl) lensEl.textContent = data.lens;
        
        if (consultBtn) {
          consultBtn.textContent = `${data.consultAction} ➔`;
          consultBtn.href = data.href;
          consultBtn.className = data.btnClass;
          
          if (data.isBlog) {
            consultBtn.removeAttribute('target');
            consultBtn.removeAttribute('rel');
          } else {
            consultBtn.setAttribute('target', '_blank');
            consultBtn.setAttribute('rel', 'noopener');
          }
        }

        if (subtextEl) {
          subtextEl.textContent = data.subtext;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Curriculum Modules Accordion
     -------------------------------------------------------------------------- */
  function initCurriculumAccordion() {
    const headers = document.querySelectorAll('.curriculum-header-row');

    headers.forEach((header) => {
      header.addEventListener('click', () => {
        const parent = header.closest('.curriculum-module-card');
        const body = parent.querySelector('.curriculum-body-content');
        const icon = header.querySelector('.module-toggle-icon');

        if (!isOpen) {
          body.style.display = 'block';
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Sacred Treatises Swipe Carousel Navigation & Drag-to-Scroll
     -------------------------------------------------------------------------- */
  function initTreatisesCarousel() {
    const track = document.getElementById('treatisesSwipeTrack');
    const prevBtn = document.getElementById('treatiseSwipePrev');
    const nextBtn = document.getElementById('treatiseSwipeNext');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -360, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }

    // Drag-to-scroll for desktop mouse users
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      track.style.userSelect = 'none';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  /* --------------------------------------------------------------------------
     4. Upcoming Seva Drops Horizontal Swipe Carousel Controller
     -------------------------------------------------------------------------- */
  function initSevaCarousel() {
    const track = document.getElementById('sevaSwipeTrack');
    const prevBtn = document.getElementById('sevaSwipePrev');
    const nextBtn = document.getElementById('sevaSwipeNext');
    const dotsContainer = document.getElementById('sevaPaginationDots');
    const counterPill = document.getElementById('sevaCounterPill');
    const progressBar = document.getElementById('sevaProgressBar');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.seva-drop-card'));
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.seva-dot')) : [];

    function getScrollStep() {
      if (cards.length > 0) {
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return cards[0].offsetWidth + gap;
      }
      return 360;
    }

    function scrollToCard(index) {
      if (index < 0 || index >= cards.length) return;
      const targetCard = cards[index];
      const trackPaddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
      const targetLeft = targetCard.offsetLeft - track.offsetLeft - trackPaddingLeft;
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Interactive pagination dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        scrollToCard(index);
      });
    });

    // Update active index, dots, counter, buttons, and progress line on scroll
    let isTicking = false;
    function updateCarouselState() {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const trackPaddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;

      // Find closest card to viewport start
      let activeIndex = 0;
      let minDistance = Infinity;
      const trackLeftEdge = track.getBoundingClientRect().left + trackPaddingLeft;

      cards.forEach((card, idx) => {
        const cardLeft = card.getBoundingClientRect().left;
        const distance = Math.abs(cardLeft - trackLeftEdge);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = idx;
        }
      });

      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });

      // Update counter pill
      if (counterPill) {
        counterPill.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      }

      // Update progress bar
      if (progressBar) {
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) : 0;
        const widthPercent = Math.max(20, Math.min(100, 20 + progress * 80));
        progressBar.style.width = `${widthPercent}%`;
      }

      // Update arrow button disabled state
      if (prevBtn) {
        const isAtStart = scrollLeft <= 5;
        prevBtn.style.opacity = isAtStart ? '0.35' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        prevBtn.setAttribute('aria-disabled', isAtStart ? 'true' : 'false');
      }
      if (nextBtn) {
        const isAtEnd = scrollLeft >= maxScroll - 5;
        nextBtn.style.opacity = isAtEnd ? '0.35' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        nextBtn.setAttribute('aria-disabled', isAtEnd ? 'true' : 'false');
      }

      isTicking = false;
    }

    track.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateCarouselState);
        isTicking = true;
      }
    }, { passive: true });

    // Initial state call
    updateCarouselState();

    // Resize observer to re-calculate state on viewport change
    window.addEventListener('resize', () => {
      updateCarouselState();
    }, { passive: true });

    // Mouse drag-to-scroll for desktop users
    let isDown = false;
    let startX;
    let initialScrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      track.style.userSelect = 'none';
      startX = e.pageX - track.offsetLeft;
      initialScrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = initialScrollLeft - walk;
    });

    // Keyboard navigation when track is focused
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGrahasExplorer();
    initCurriculumAccordion();
    initTreatisesCarousel();
    initSevaCarousel();
  });
})();

