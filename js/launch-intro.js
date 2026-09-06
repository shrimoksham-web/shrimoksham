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
    // 0: Absolute Darkness (Initial state)
    // 800: SCENE 02 - The First Breath
    // 1800: SCENE 03 - Awakening
    // 2800: SCENE 04 - The Pull
    // 3300: SCENE 05 - December 2026
    // 4000: SCENE 06 - Shri Moksham (Date fades out)
    // 4700: SCENE 07 - Silence (Fade back to deep darkness)
    // 5000: SCENE 08 - Transition into Existing Clouds

    setTimeout(() => {
      overlay.classList.add('phase-breath');
    }, 800);

    setTimeout(() => {
      overlay.classList.add('phase-awakening');
    }, 1800);

    setTimeout(() => {
      overlay.classList.add('phase-pull');
    }, 2800);

    setTimeout(() => {
      overlay.classList.add('phase-date');
    }, 3300);

    setTimeout(() => {
      overlay.classList.add('phase-brand');
    }, 4000);

    setTimeout(() => {
      overlay.classList.add('phase-silence');
    }, 4700);

    // Final Transition into existing clouds
    setTimeout(() => {
      overlay.classList.add('is-finished');
      
      // Restore scroll just as the overlay begins its fade, for seamless handoff
      document.body.classList.remove('intro-active');
      

      // Remove from DOM safely after the 1.5s CSS opacity transition completes
      setTimeout(() => {
        overlay.remove();
      }, 1500); 

    }, 5000);
  }

  // Initialize once DOM is ready to avoid stalling
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicLaunch);
  } else {
    initCinematicLaunch();
  }
})();
