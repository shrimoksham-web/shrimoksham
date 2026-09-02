/**
 * SHRI MOKSHAM — Live Ganga Diya Offering Sanctuary Engine
 * Personal Prayer Intention Modal, Animated River Stream & Real-Time Counters
 */

(function () {
  'use strict';

  function initDiyaSanctuary() {
    const floatBtn = document.getElementById('floatDiyaBtn');
    const modal = document.getElementById('diyaModalOverlay');
    const closeBtn = document.getElementById('diyaModalClose');
    const form = document.getElementById('diyaIntentionForm');
    const counterEl = document.getElementById('diyaCounterVal');
    const stage = document.querySelector('.diya-river-stage');

    if (!floatBtn || !modal || !form) return;

    let count = 108;

    floatBtn.addEventListener('click', () => {
      modal.classList.add('is-active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-active');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('diyaSeekerName')?.value || 'Seeker';
      const prayer = document.getElementById('diyaPrayerText')?.value || 'Peace & Light';

      modal.classList.remove('is-active');

      // Increment count
      count++;
      if (counterEl) {
        counterEl.textContent = `${count} Offerings Floated In Grace`;
      }

      // Spawn floating glowing diya on stage
      if (stage) {
        const diya = document.createElement('div');
        diya.style.position = 'absolute';
        diya.style.bottom = '20px';
        diya.style.left = `${Math.random() * 60 + 20}%`;
        diya.style.zIndex = '15';
        diya.style.padding = '0.35rem 0.75rem';
        diya.style.background = 'rgba(255, 255, 255, 0.9)';
        diya.style.border = '1px solid #D4AF37';
        diya.style.borderRadius = '20px';
        diya.style.boxShadow = '0 0 16px rgba(212, 175, 55, 0.8)';
        diya.style.fontSize = '0.72rem';
        diya.style.fontWeight = '700';
        diya.style.color = '#121A24';
        diya.style.display = 'flex';
        diya.style.alignItems = 'center';
        diya.style.gap = '0.3rem';
        diya.style.pointerEvents = 'none';
        diya.style.transition = 'all 4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        diya.innerHTML = `🪔 <span>${name}: ${prayer.substring(0, 20)}...</span>`;

        stage.appendChild(diya);

        requestAnimationFrame(() => {
          diya.style.transform = 'translateY(-140px)';
          diya.style.opacity = '0';
        });

        setTimeout(() => diya.remove(), 4200);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initDiyaSanctuary);
})();
