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
     3. High-Fidelity 432Hz Sacred Meditation Soundscape Player & OMM Launcher
     -------------------------------------------------------------------------- */
  function initSoundscapeAudio() {
    const ommLauncher = document.getElementById('floatingOmmLauncher');
    const mobileSoundscapeBtn = document.getElementById('mobileSoundscapeBtn');

    let audio = document.getElementById('globalSoundscapeAudio');
    if (!audio) {
      audio = new Audio('assets/audio/432hz.mp3');
      audio.loop = true;
    }
    let isPlaying = false;

    // Harmonic Sacred Tibetan Singing Bowl Chime on click (Web Audio API)
    function playHarmonicBowlChime() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz Sacred tuning
        osc.frequency.exponentialRampToValueAtTime(864, ctx.currentTime + 0.6);
        osc.frequency.exponentialRampToValueAtTime(432, ctx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);
      } catch (err) {
        // Fallback gracefully
      }
    }

    function playAudio() {
      audio.volume = 0.85;
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

    function toggleOmmChants(e) {
      if (e) e.preventDefault();
      isPlaying = !isPlaying;

      playHarmonicBowlChime();

      if (isPlaying) {
        if (ommLauncher) {
          ommLauncher.classList.add('is-playing');
          ommLauncher.setAttribute('aria-pressed', 'true');
        }
        if (mobileSoundscapeBtn) {
          mobileSoundscapeBtn.classList.add('is-playing');
          mobileSoundscapeBtn.innerHTML = '<span>🔊 OMM Chants Active</span>';
        }
        playAudio();
      } else {
        if (ommLauncher) {
          ommLauncher.classList.remove('is-playing');
          ommLauncher.setAttribute('aria-pressed', 'false');
        }
        if (mobileSoundscapeBtn) {
          mobileSoundscapeBtn.classList.remove('is-playing');
          mobileSoundscapeBtn.innerHTML = '<span>🎵 OMM Chants (432Hz)</span>';
        }
        pauseAudio();
      }
    }

    if (ommLauncher) {
      ommLauncher.addEventListener('click', toggleOmmChants);
    }

    if (mobileSoundscapeBtn) {
      mobileSoundscapeBtn.addEventListener('click', toggleOmmChants);
    }
  }

  /* --------------------------------------------------------------------------
     4. Responsive Luxury Mobile Navigation Drawer Controller
     -------------------------------------------------------------------------- */
  function initMobileNavigation() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const closeBtn = document.getElementById('mobileNavClose');
    const mobileLinks = document.querySelectorAll('.mobile-links-list a');
    const mobileSoundscapeBtn = document.getElementById('mobileSoundscapeBtn');
    const topbarSoundscapeBtn = document.getElementById('soundscapeToggleBtn');

    if (!toggleBtn || !drawer) return;
    if (toggleBtn.dataset.navBound) return;
    toggleBtn.dataset.navBound = 'true';

    function openDrawer() {
      drawer.classList.add('is-open');
      toggleBtn.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Sync mobile soundscape button with topbar soundscape button
    if (mobileSoundscapeBtn && topbarSoundscapeBtn) {
      mobileSoundscapeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        topbarSoundscapeBtn.click();
        const isPlaying = topbarSoundscapeBtn.classList.contains('is-playing');
        if (isPlaying) {
          mobileSoundscapeBtn.classList.add('is-playing');
          mobileSoundscapeBtn.innerHTML = '<span>🔊 OMM Chants Active</span>';
        } else {
          mobileSoundscapeBtn.classList.remove('is-playing');
          mobileSoundscapeBtn.innerHTML = '<span>🎵 OMM Chants (432Hz)</span>';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSlidingPillNav();
      initHeadroomPhysics();
      initSoundscapeAudio();
      initMobileNavigation();
    });
  } else {
    initSlidingPillNav();
    initHeadroomPhysics();
    initSoundscapeAudio();
    initMobileNavigation();
  }
})();
