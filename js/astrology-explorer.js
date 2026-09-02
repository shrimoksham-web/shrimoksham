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
      consultAction: 'CONSULT ABOUT SUN (SURYA)'
    },
    moon: {
      symbol: '☽',
      name: 'Moon (Chandra)',
      archetype: 'Mind, Emotions, Perception, Inner Peace & Intuition',
      lens: 'Practice conscious breath to stabilize turbulent emotional waves and cultivate serene clarity.',
      consultAction: 'CONSULT ABOUT MOON (CHANDRA)'
    },
    jupiter: {
      symbol: '♃',
      name: 'Jupiter (Guru)',
      archetype: 'Wisdom, Expansion, Higher Dharma, Grace & Mentorship',
      lens: 'Seek truthful wisdom, cultivate generous higher learning, and trust divine timing.',
      consultAction: 'CONSULT ABOUT JUPITER (GURU)'
    },
    venus: {
      symbol: '♀',
      name: 'Venus (Shukra)',
      archetype: 'Harmony, Beauty, Devotion, Sacred Love & Aesthetic Grace',
      lens: 'Express pure artistic aesthetic and cultivate compassionate, uplifting relationships.',
      consultAction: 'CONSULT ABOUT VENUS (SHUKRA)'
    },
    mercury: {
      symbol: '☿',
      name: 'Mercury (Budha)',
      archetype: 'Intellect, Discernment, Speech, Commerce & Adaptability',
      lens: 'Master conscious communication, active listening, and sharp analytical clarity.',
      consultAction: 'CONSULT ABOUT MERCURY (BUDHA)'
    },
    mars: {
      symbol: '♂',
      name: 'Mars (Mangala)',
      archetype: 'Courage, Vital Energy, Discipline, Righteous Action & Strength',
      lens: 'Channel vital life force into protective, purposeful, and disciplined action.',
      consultAction: 'CONSULT ABOUT MARS (MANGALA)'
    },
    saturn: {
      symbol: '♄',
      name: 'Saturn (Shani)',
      archetype: 'Karma, Patience, Mastery, Spiritual Detachment & Duty',
      lens: 'Embrace patient discipline, humility, and steady selfless service without anxiety.',
      consultAction: 'CONSULT ABOUT SATURN (SHANI)'
    },
    rahu: {
      symbol: '☊',
      name: 'Rahu (North Node)',
      archetype: 'Soul Desires, Innovation, Material Expansion & Karmic Frontier',
      lens: 'Navigate worldly ambition with mindful awareness, spiritual grounding, and ethics.',
      consultAction: 'CONSULT ABOUT RAHU (NORTH NODE)'
    },
    ketu: {
      symbol: '☋',
      name: 'Ketu (South Node)',
      archetype: 'Moksha, Spiritual Liberation, Intuition & Inner Mastery',
      lens: 'Release past karmic attachments to realize timeless inner freedom and higher consciousness.',
      consultAction: 'CONSULT ABOUT KETU (SOUTH NODE)'
    }
  };

  function initGrahasExplorer() {
    const cells = document.querySelectorAll('.graha-cell-card');
    const titleEl = document.getElementById('selectedGrahaTitle');
    const symbolEl = document.getElementById('selectedGrahaSymbol');
    const archetypeEl = document.getElementById('selectedGrahaArchetype');
    const lensEl = document.getElementById('selectedGrahaLens');
    const consultBtn = document.getElementById('selectedGrahaConsultBtn');

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
          consultBtn.href = `https://wa.me/919997066326?text=${encodeURIComponent('Hi Shri Moksham, I would like a consultation on ' + data.name + ' in my birth chart.')}`;
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

        const isOpen = body.style.display === 'block';

        // Close all
        document.querySelectorAll('.curriculum-body-content').forEach((b) => b.style.display = 'none');
        document.querySelectorAll('.module-toggle-icon').forEach((i) => i.textContent = '+');

        if (!isOpen) {
          body.style.display = 'block';
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGrahasExplorer();
    initCurriculumAccordion();
  });
})();
