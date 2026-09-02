/**
 * SHRI MOKSHAM — Bespoke 4-Pathway Interactive Mechanisms
 * 1. Astrolabe Zodiac Planetary Orbit
 * 2. Floating Diya Offering on Ganga with chime
 * 3. Kalpavriksha Seva Interactive Counter
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Floating Diya Offering on Ganga River Mechanism
     -------------------------------------------------------------------------- */
  function initDiyaOffering() {
    const btn = document.getElementById('floatDiyaBtn');
    const stage = document.querySelector('.diya-river-stage');

    if (!btn || !stage) return;

    let diyaCount = 108;
    const countEl = document.getElementById('diyaCounterVal');

    btn.addEventListener('click', () => {
      diyaCount++;
      if (countEl) countEl.textContent = `${diyaCount} Offerings Floated`;

      // Spawn floating glowing diya element
      const diya = document.createElement('div');
      diya.style.position = 'absolute';
      diya.style.bottom = '10px';
      diya.style.left = `${Math.random() * 60 + 20}%`;
      diya.style.width = '24px';
      diya.style.height = '24px';
      diya.style.borderRadius = '50%';
      diya.style.background = 'radial-gradient(circle, #FFE082 0%, #FFB300 60%, #FF6F00 100%)';
      diya.style.boxShadow = '0 0 20px #FFD54F, 0 0 40px #FFA000';
      diya.style.transition = 'all 4s cubic-bezier(0.25, 1, 0.5, 1)';
      diya.style.zIndex = '10';
      diya.style.pointerEvents = 'none';

      stage.appendChild(diya);

      // Animate floating up the sacred river
      setTimeout(() => {
        diya.style.transform = 'translateY(-140px) scale(0.6)';
        diya.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        if (diya.parentElement) diya.remove();
      }, 4100);

      btn.textContent = '✨ Offering Floated In Grace ✨';
      setTimeout(() => {
        btn.textContent = '🪔 Float A Sacred Diya Offering';
      }, 2500);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDiyaOffering();
  });
})();
