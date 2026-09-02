/**
 * SHRI MOKSHAM — Masterpiece Animated Topbar Engine
 * Gliding Spring Nav Pill, ScrollSpy Active Tracking, Headroom Physics,
 * and 432Hz Sacred Meditation Soundscape Player
 */

(function () {
  'use strict';

  function initSlidingPillNav() {
    const navList = document.querySelector('.nav-links-list');
    if (!navList) return;

    let pill = navList.querySelector('.nav-sliding-pill');
    if (!pill) {
      pill = document.createElement('div');
      pill.className = 'nav-sliding-pill';
      navList.appendChild(pill);
    }

    const items = navList.querySelectorAll('.nav-link-item a');

    function moveTo(element) {
      if (!element) return;
      const itemRect = element.getBoundingClientRect();
      const listRect = navList.getBoundingClientRect();

      const left = itemRect.left - listRect.left;
      const width = itemRect.width;

      pill.style.left = `${left}px`;
      pill.style.width = `${width}px`;
      pill.style.opacity = '1';
    }

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => moveTo(item));
    });

    navList.addEventListener('mouseleave', () => {
      const activeItem = navList.querySelector('.nav-link-item a.is-active');
      if (activeItem) {
        moveTo(activeItem);
      } else {
        pill.style.opacity = '0';
      }
    });

    // ScrollSpy: auto-highlight link as user scrolls
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute('id');
        }
      });

      if (currentId) {
        items.forEach((item) => {
          const href = item.getAttribute('href').replace('#', '');
          if (href === currentId) {
            items.forEach((i) => i.classList.remove('is-active'));
            item.classList.add('is-active');
          }
        });
      }
    }, { passive: true });
  }

  function initHeadroomPhysics() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      if (currentScrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Hide when scrolling down fast, show when scrolling up
      if (currentScrollY > 250 && currentScrollY > lastScrollY + 8) {
        header.classList.add('is-hidden');
      } else if (currentScrollY < lastScrollY - 6 || currentScrollY < 120) {
        header.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     3. High-Fidelity 432Hz Sacred Meditation Soundscape Player
     -------------------------------------------------------------------------- */
  function initSoundscapeAudio() {
    const toggleBtn = document.getElementById('soundscapeToggleBtn');
    if (!toggleBtn) return;

    let audio = document.getElementById('globalSoundscapeAudio');
    if (!audio) {
      audio = new Audio('assets/audio/432hz.mp3');
      audio.loop = true;
    }
    let isPlaying = false;

    function playAudio() {
      audio.volume = 0.8;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn('Audio play fallback:', err);
          audio.src = '432hz.mp3';
          audio.play().catch((e) => console.error('Audio fallback failed:', e));
        });
      }
    }

    function pauseAudio() {
      if (!audio) return;
      audio.pause();
    }

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isPlaying = !isPlaying;

      const label = toggleBtn.querySelector('.soundscape-label');

      if (isPlaying) {
        toggleBtn.classList.add('is-playing');
        if (label) label.textContent = 'OMM Chants Active';
        playAudio();
      } else {
        toggleBtn.classList.remove('is-playing');
        if (label) label.textContent = 'OMM Chants';
        pauseAudio();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSlidingPillNav();
      initHeadroomPhysics();
      initSoundscapeAudio();
    });
  } else {
    initSlidingPillNav();
    initHeadroomPhysics();
    initSoundscapeAudio();
  }
})();
