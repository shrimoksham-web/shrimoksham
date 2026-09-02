/**
 * SHRI MOKSHAM — Interactive Jyotish 6-Step Discernment Workflow
 * Coordinates step navigation and detailed wisdom reveals
 */

(function () {
  'use strict';

  const jyotishStepsData = [
    {
      num: '01',
      title: 'UNDERSTAND',
      subtitle: 'The Soul Blueprint',
      desc: 'Birth details (exact time, date, and location) are cast into the traditional Vedic birth chart. Rather than a rigid destiny, this chart is approached as a sacred energetic map of tendencies, temperament, and spiritual potential.'
    },
    {
      num: '02',
      title: 'OBSERVE',
      subtitle: 'Planets, Houses & Nakshatras',
      desc: 'Careful examination of the 12 Bhavas (houses), Rashis (signs), Grahas (planets), and the 27 Nakshatras (lunar mansions). We identify the planetary relationships, strengths, and primary focal points of the soul’s focus.'
    },
    {
      num: '03',
      title: 'INTERPRET',
      subtitle: 'Timing & Karmic Patterns',
      desc: 'Through Vimshottari Dashas and planetary transits (Gochara), we decipher the unfolding timing of life chapters, recognizing periods suited for patience, consolidation, active enterprise, or deep spiritual practice.'
    },
    {
      num: '04',
      title: 'REFLECT',
      subtitle: 'Real-Life Context & Inward Inquiry',
      desc: 'Connecting scriptural chart insights directly with real-life circumstances, relationships, career choices, and recurring life questions: “Why do certain patterns repeat? What lessons does this phase carry?”'
    },
    {
      num: '05',
      title: 'DISCERN',
      subtitle: 'Free Will & Conscious Awareness',
      desc: 'Distinguishing between what is given by circumstance (Prarabdha Karma) and where conscious human volition (Kriyaman Karma) can be exercised. Gaining wisdom to act with calm clarity rather than fear or impulsiveness.'
    },
    {
      num: '06',
      title: 'ACT',
      subtitle: 'Right Action & Transformation',
      desc: 'Translating Jyotish awareness into righteous living (Dharma), mindful choices, remedies, and service (Seva). Jyotish does not take away your free will — it helps you understand the road before you choose how to walk it.'
    }
  ];

  function initJyotishJourney() {
    const navButtons = document.querySelectorAll('.step-nav-btn');
    const badgeEl = document.getElementById('stepBadgeActive');
    const titleEl = document.getElementById('stepTitleActive');
    const subtitleEl = document.getElementById('stepSubtitleActive');
    const descEl = document.getElementById('stepDescActive');

    if (!navButtons.length || !badgeEl || !titleEl || !descEl) return;

    function renderStep(index) {
      const data = jyotishStepsData[index];
      if (!data) return;

      navButtons.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });

      // Animate card content transition
      const card = document.querySelector('.jyotish-step-details-card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          badgeEl.textContent = data.num;
          titleEl.textContent = data.title;
          if (subtitleEl) subtitleEl.textContent = data.subtitle;
          descEl.textContent = data.desc;
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 150);
      }
    }

    navButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        renderStep(index);
      });
    });

    // Auto-advance demonstration every 8 seconds if not interacted
    let currentStep = 0;
    let autoInterval = null;
    let userInteracted = false;

    function startAutoCycle() {
      autoInterval = setInterval(() => {
        if (userInteracted) {
          clearInterval(autoInterval);
          return;
        }
        currentStep = (currentStep + 1) % jyotishStepsData.length;
        renderStep(currentStep);
      }, 7000);
    }

    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        userInteracted = true;
        clearInterval(autoInterval);
      });
    });

    startAutoCycle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJyotishJourney);
  } else {
    initJyotishJourney();
  }
})();
