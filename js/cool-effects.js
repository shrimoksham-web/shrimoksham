/**
 * SHRI MOKSHAM — Cool Interactive Effects Engine
 * Celestial Cursor with Lerp Physics, 3D Tilt Cards with Dynamic Glare, and Video Depth Scaling
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Celestial Cursor Follower (Disabled for clean native cursor)
     -------------------------------------------------------------------------- */
  function initCelestialCursor() {
    // Disabled per user request for standard clean cursor without zoom circle
    return;
  }

  /* --------------------------------------------------------------------------
     2. 3D Card Tilt with Specular Glare
     -------------------------------------------------------------------------- */
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.parallax-card, .path-chapter-card, .about-narrative-box, .course-feature-card, .breath-sphere-card, .chakra-tuner-card');

    cards.forEach((card) => {
      card.classList.add('tilt-card-3d');

      // Create glare overlay
      let glare = card.querySelector('.tilt-card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'tilt-card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Move glare
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Active Layer Video Depth Trigger
     -------------------------------------------------------------------------- */
  function initLayerDepthObserver() {
    const layers = document.querySelectorAll('.scroll-layer-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active-layer');
        } else {
          entry.target.classList.remove('is-active-layer');
        }
      });
    }, { threshold: 0.25 });

    layers.forEach((layer) => observer.observe(layer));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCelestialCursor();
    init3DCardTilt();
    initLayerDepthObserver();
  });
})();
