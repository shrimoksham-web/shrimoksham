/**
 * SHRI MOKSHAM — Scroll Story & Parallax Clouds Engine
 * Handles smooth cloud drifting on scroll, rotating sacred zodiac dials, and gold underline triggers
 */

(function () {
  'use strict';

  function initScrollEngine() {
    const cloud1 = document.querySelector('.cloud-layer-1');
    const cloud2 = document.querySelector('.cloud-layer-2');
    const zodiac = document.querySelector('.scroll-zodiac-anchor');
    const lotus = document.querySelector('.scroll-lotus-anchor');
    const progressBar = document.getElementById('scrollProgressBar');

    let ticking = false;

    function onScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

      // 1. Top Scroll Progress Line
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // 2. Parallax Drifting Clouds
      if (cloud1) {
        const moveX = -(scrollY * 0.2) % (window.innerWidth);
        const moveY = scrollY * 0.05;
        cloud1.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }

      if (cloud2) {
        const moveX = (scrollY * 0.15) % (window.innerWidth);
        const moveY = scrollY * 0.03;
        cloud2.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }

      // 3. Rotating Celestial Zodiac Wheel
      if (zodiac) {
        const deg = (scrollY * 0.06) % 360;
        zodiac.style.transform = `rotate(${deg}deg)`;
      }

      if (lotus) {
        const deg = -(scrollY * 0.04) % 360;
        lotus.style.transform = `rotate(${deg}deg)`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // 4. Reveal Observer for Gold Sweep Lines & Headlines
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.gold-sweep-line, .reveal-fade-up, .reveal-scale-in, .reveal-stagger').forEach((el) => {
      revealObserver.observe(el);
    });

    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollEngine);
  } else {
    initScrollEngine();
  }
})();
