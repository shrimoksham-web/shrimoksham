/**
 * SHRI MOKSHAM — Cinematic Launch Experience
 * "The First Breath" (December 2026)
 */

(function () {
  'use strict';

  function initCinematicLaunch() {
    const overlay = document.getElementById('cinematicLaunchOverlay');
    if (!overlay) return;



    // Lock body scroll initially
    document.body.classList.add('intro-active');

    // SCENE TIMELINE (in milliseconds)
    // 0: Absolute Darkness
    // 100: SCENE 02 - The First Breath
    // 600: SCENE 03 - Awakening (Temple Doorway glows)
    // 1200: SCENE 04 - The Pull (Viewer pulled through doorway)
    // 1800: SCENE 05 - December 2026
    // 3400: SCENE 06 - Shri Moksham (Date stays on longer, then fades out)
    // 4400: SCENE 07 - Silence
    // 4800: SCENE 08 - Transition

    setTimeout(() => {
      overlay.classList.add('phase-breath');
    }, 100);

    setTimeout(() => {
      overlay.classList.add('phase-awakening');
    }, 600);

    setTimeout(() => {
      overlay.classList.add('phase-pull');
    }, 1200);

    setTimeout(() => {
      overlay.classList.add('phase-date');
    }, 1800);

    // Keep DECEMBER 2026 longer (1.6 seconds gap)
    setTimeout(() => {
      overlay.classList.add('phase-brand');
    }, 3400);

    setTimeout(() => {
      overlay.classList.add('phase-silence');
    }, 4400);

    // Final Transition into existing clouds
    setTimeout(() => {
      overlay.classList.add('is-finished');
      
      // Restore scroll just as the overlay begins its fade, for seamless handoff
      document.body.classList.remove('intro-active');
      

      // Remove from DOM safely after the 1.5s CSS opacity transition completes
      setTimeout(() => {
        overlay.remove();
      }, 1500); 

    }, 4800);
  }

  // Initialize once DOM is ready to avoid stalling
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicLaunch);
  } else {
    initCinematicLaunch();
  }
})();
