/**
 * SHRI MOKSHAM — Live Ganga Diya Offering Sanctuary Engine
 * Personal Prayer Intention Modal, Animated River Stream & Real-Time Counters
 */

(function () {
  'use strict';

  function initDiyaSanctuary() {
    const floatBtn = document.getElementById('grandPathDiyaBtn'); // Fixed ID
    const modal = document.getElementById('diyaModalOverlay');
    const closeBtn = document.getElementById('diyaModalClose');
    const form = document.getElementById('diyaIntentionForm');
    
    // Some pages might not have the counter, so we don't strictly require it
    const counterEl = document.getElementById('diyaCounterVal');

    if (!floatBtn || !modal || !form) return;

    // Inject CSS for creative animations
    const style = document.createElement('style');
    style.textContent = `
      .diya-river-stage {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
      }
      .sacred-diya-float {
        position: absolute;
        bottom: -50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        pointer-events: none;
        animation: floatUp 8s cubic-bezier(0.4, 0, 0.2, 1) forwards, sway 3s ease-in-out infinite alternate;
      }
      .sacred-diya-icon {
        font-size: 2.2rem;
        filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 69, 0, 0.6));
        animation: flicker 0.5s ease-in-out infinite alternate;
      }
      .sacred-diya-text {
        background: rgba(18, 26, 36, 0.85);
        color: #FACC15;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        border: 1px solid rgba(250, 204, 21, 0.4);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(4px);
        white-space: nowrap;
        opacity: 0;
        animation: fadeInOutText 8s ease-in-out forwards;
      }
      @keyframes floatUp {
        0% { bottom: -50px; transform: scale(0.8); opacity: 0; }
        10% { opacity: 1; transform: scale(1.1); }
        80% { opacity: 1; }
        100% { bottom: 80vh; transform: scale(0.6); opacity: 0; }
      }
      @keyframes sway {
        0% { margin-left: -20px; }
        100% { margin-left: 20px; }
      }
      @keyframes flicker {
        0% { filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 69, 0, 0.6)); }
        100% { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 1)) drop-shadow(0 0 45px rgba(255, 140, 0, 0.8)); }
      }
      @keyframes fadeInOutText {
        0% { opacity: 0; transform: translateY(10px); }
        15% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; }
        100% { opacity: 0; }
      }
      .diya-success-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, rgba(20,20,20,0.95), rgba(40,40,40,0.95));
        border: 1px solid #D4AF37;
        color: #fff;
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        z-index: 10000;
        font-family: var(--font-display, sans-serif);
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
      }
      .diya-success-toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    // Create stage dynamically if it doesn't exist
    let stage = document.querySelector('.diya-river-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.className = 'diya-river-stage';
      document.body.appendChild(stage);
    }

    // Create success toast
    const toast = document.createElement('div');
    toast.className = 'diya-success-toast';
    toast.innerHTML = '✨ Your sacred intention is floating on the Ganga...';
    document.body.appendChild(toast);

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

      const nameInput = document.getElementById('diyaSeekerName');
      const prayerInput = document.getElementById('diyaPrayerText');
      
      const name = nameInput?.value.trim() || 'Seeker';
      const prayer = prayerInput?.value.trim() || 'Peace & Light';

      modal.classList.remove('is-active');
      
      // Reset form
      if (nameInput) nameInput.value = '';
      if (prayerInput) prayerInput.value = '';

      // Increment count if counter element exists
      count++;
      if (counterEl) {
        counterEl.textContent = `${count} Offerings Floated In Grace`;
      }

      // Show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);

      // Spawn floating glowing diya on stage
      const diyaWrap = document.createElement('div');
      diyaWrap.className = 'sacred-diya-float';
      
      // Randomize horizontal position (between 10% and 90% of screen width)
      const randomLeft = Math.floor(Math.random() * 80) + 10;
      diyaWrap.style.left = `${randomLeft}%`;
      
      // Randomize animation duration slightly for natural feel
      const durationFloat = 7 + Math.random() * 3; // 7s to 10s
      const durationSway = 2 + Math.random() * 2; // 2s to 4s
      diyaWrap.style.animation = `floatUp ${durationFloat}s cubic-bezier(0.4, 0, 0.2, 1) forwards, sway ${durationSway}s ease-in-out infinite alternate`;

      const diyaIcon = document.createElement('div');
      diyaIcon.className = 'sacred-diya-icon';
      diyaIcon.innerHTML = '🪔';

      const diyaText = document.createElement('div');
      diyaText.className = 'sacred-diya-text';
      diyaText.style.animationDuration = `${durationFloat}s`;
      
      const shortPrayer = prayer.length > 25 ? prayer.substring(0, 25) + '...' : prayer;
      diyaText.innerHTML = `<span>${name}</span> <span style="opacity:0.7; font-weight:400; margin-left:4px;">${shortPrayer}</span>`;

      diyaWrap.appendChild(diyaIcon);
      diyaWrap.appendChild(diyaText);
      stage.appendChild(diyaWrap);

      // Clean up DOM after animation completes
      setTimeout(() => {
        if (diyaWrap.parentNode) {
          diyaWrap.remove();
        }
      }, durationFloat * 1000 + 500);
    });
  }

  document.addEventListener('DOMContentLoaded', initDiyaSanctuary);
})();
