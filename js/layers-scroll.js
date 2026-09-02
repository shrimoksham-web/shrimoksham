/**
 * SHRI MOKSHAM — Layered Scroll Observer & Side Tracker Engine
 * Tracks active scroll layer, synchronizes side dot navigator, and controls layer video playback
 */

(function () {
  'use strict';

  function initLayersScroll() {
    const layers = document.querySelectorAll('.scroll-layer-section');
    const dots = document.querySelectorAll('.layer-dot-item');

    if (!layers.length || !dots.length) return;

    // IntersectionObserver to detect which layer is currently in view
    const layerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const video = entry.target.querySelector('video.layer-video-bg');

          if (entry.isIntersecting) {
            // Activate corresponding side dot
            dots.forEach((dot) => {
              const target = dot.getAttribute('data-target');
              if (target === id) {
                dot.classList.add('is-active');
              } else {
                dot.classList.remove('is-active');
              }
            });

            // Play video if present
            if (video && video.paused) {
              video.play().catch(() => {});
            }
          } else {
            // Pause video when scrolled out of view
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    layers.forEach((layer) => layerObserver.observe(layer));

    // Dot click smooth scroll
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayersScroll);
  } else {
    initLayersScroll();
  }
})();
