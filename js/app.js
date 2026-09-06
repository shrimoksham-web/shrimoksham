/**
 * SHRI MOKSHAM — Core Web Application Logic
 * Manages scroll reveals, navigation states, interactive paradigm shifts, and mobile drawer
 */

(function () {
  'use strict';

  function initApp() {
    // 1. Sticky Header & Active Nav on Scroll
    const header = document.getElementById('siteHeader');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item a');

    function onScroll() {
      const scrollY = window.scrollY;

      // Header shadow & blur
      if (header) {
        if (scrollY > 50) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }

      // Active section in nav
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. Mobile Menu Toggle (coordinated with animated-topbar.js)
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-links-list a');

    if (mobileToggle && mobileDrawer && !mobileToggle.dataset.navBound) {
      mobileToggle.dataset.navBound = 'true';
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('is-open');
        if (isOpen) {
          mobileDrawer.classList.remove('is-open');
          mobileToggle.classList.remove('is-open');
          document.body.classList.remove('drawer-open');
        } else {
          mobileDrawer.classList.add('is-open');
          mobileToggle.classList.add('is-open');
          document.body.classList.add('drawer-open');
        }
      });

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('is-open');
          mobileToggle.classList.remove('is-open');
          document.body.classList.remove('drawer-open');
        });
      });
    }

    // 3. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-scale-in, .reveal-stagger');

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    }

    // 4. Testimonial Carousel Slider Logic
    const testimonials = [
      {
        quote: '"The guidance I received was accurate, practical and truly life-changing. It gave me clarity and a new direction."',
        name: 'Anjali Mehta',
        city: 'Mumbai',
        stars: '★★★★★'
      },
      {
        quote: '"The planetary discernment revealed my true career timing. The Satvik remedies and meditation brought immense peace to my home."',
        name: 'Rohit Kulkarni',
        city: 'Pune',
        stars: '★★★★★'
      },
      {
        quote: '"Shri Moksham’s courses transformed my understanding of Vedic philosophy. The masters teach with deep authenticity and grace."',
        name: 'Sunita Raman',
        city: 'Bengaluru',
        stars: '★★★★★'
      },
      {
        quote: '"The OMM Chants meditation suite has become my daily morning ritual. Pure tranquility and inner clarity."',
        name: 'Vikramaditya Rao',
        city: 'New Delhi',
        stars: '★★★★★'
      }
    ];

    let currentTestimonialIdx = 0;
    const tQuote = document.getElementById('testimonialText');
    const tName = document.getElementById('testimonialName');
    const tCity = document.getElementById('testimonialCity');
    const tPrev = document.getElementById('prevTestimonial');
    const tNext = document.getElementById('nextTestimonial');
    const tDots = document.querySelectorAll('.t-dot');

    function updateTestimonial(idx) {
      if (!tQuote || !tName || !tCity) return;
      currentTestimonialIdx = (idx + testimonials.length) % testimonials.length;
      const data = testimonials[currentTestimonialIdx];

      tQuote.style.opacity = '0';
      tQuote.style.transform = 'translateY(6px)';

      setTimeout(() => {
        tQuote.textContent = data.quote;
        tName.textContent = data.name;
        tCity.textContent = data.city;
        tQuote.style.transition = 'all 0.3s ease';
        tQuote.style.opacity = '1';
        tQuote.style.transform = 'translateY(0)';
      }, 150);

      tDots.forEach((dot, dIdx) => {
        if (dIdx === currentTestimonialIdx) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    if (tPrev) {
      tPrev.addEventListener('click', () => updateTestimonial(currentTestimonialIdx - 1));
    }
    if (tNext) {
      tNext.addEventListener('click', () => updateTestimonial(currentTestimonialIdx + 1));
    }
    tDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateTestimonial(idx));
    });

    // 5. Course Enrollment Registration Hover / Click Popover Controller (Non-Fullscreen)
    const courseModal = document.getElementById('courseEnrollModal');
    const courseClose = document.getElementById('courseModalClose');
    const courseForm = document.getElementById('courseEnrollForm');
    const trackSelect = document.getElementById('enrollTrack');

    let hoverTimeout = null;

    function openCourseModal(trackName) {
      if (trackName && trackSelect) {
        for (let i = 0; i < trackSelect.options.length; i++) {
          if (trackSelect.options[i].value.toLowerCase().includes(trackName.toLowerCase()) || 
              trackName.toLowerCase().includes(trackSelect.options[i].value.toLowerCase())) {
            trackSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (courseModal) {
        clearTimeout(hoverTimeout);
        courseModal.classList.add('is-active-modal');
      }
    }

    function closeCourseModal() {
      if (courseModal) {
        courseModal.classList.remove('is-active-modal');
      }
    }

    // Direct event delegation for all modal open triggers (Click & Hover)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-open-course-modal, [data-open-course-modal]');
      if (btn) {
        e.preventDefault();
        const track = btn.getAttribute('data-course-track') || '4-5 Month Comprehensive Masterclass';
        if (courseModal && courseModal.classList.contains('is-active-modal')) {
          closeCourseModal();
        } else {
          openCourseModal(track);
        }
      } else if (courseModal && !e.target.closest('#courseEnrollModal')) {
        // Clicked outside popover
        closeCourseModal();
      }
    });

    // Hover support for course triggers
    document.querySelectorAll('.btn-open-course-modal, [data-open-course-modal]').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        const track = btn.getAttribute('data-course-track') || '4-5 Month Comprehensive Masterclass';
        openCourseModal(track);
      });
    });

    if (courseClose) {
      courseClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeCourseModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && courseModal && courseModal.classList.contains('is-active-modal')) {
        closeCourseModal();
      }
    });

    if (courseForm) {
      courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('enrollName') || {}).value || '';
        const phone = (document.getElementById('enrollPhone') || {}).value || '';
        const age = (document.getElementById('enrollAge') || {}).value || '';
        const gender = (document.getElementById('enrollGender') || {}).value || 'Male';
        const track = (document.getElementById('enrollTrack') || {}).value || '4-5 Month Masterclass';
        const expectations = (document.getElementById('enrollExpectations') || {}).value || '';

        if (!name.trim() || !phone.trim() || !age.trim()) {
          alert('Please enter your Full Name, Phone Number, and Age.');
          return;
        }

        let msg = `Hi Shri Moksham, I would like to join the Vedic Astrology & Spiritual Course.\n\n*Name:* ${name.trim()}\n*Phone Number:* ${phone.trim()}\n*Age:* ${age.trim()}\n*Gender:* ${gender}\n*Course Track:* ${track}`;
        if (expectations.trim()) {
          msg += `\n*Expectations from Course:* ${expectations.trim()}`;
        }
        const waUrl = `https://wa.me/919997066326?text=${encodeURIComponent(msg)}`;

        // Attempt window.open first, fallback to direct location redirect
        const newWin = window.open(waUrl, '_blank');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
          window.location.href = waUrl;
        }

        closeCourseModal();
        courseForm.reset();
      });
    }

    // 6. Grand Pathway Diya Button
    const grandPathDiyaBtn = document.getElementById('grandPathDiyaBtn');
    const diyaModal = document.getElementById('diyaModalOverlay');
    if (grandPathDiyaBtn && diyaModal) {
      grandPathDiyaBtn.addEventListener('click', () => {
        diyaModal.classList.add('is-active');
      });
    }

    // 7. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // 8. Ultra-Smooth High-Velocity Scroll Optimizer
    let isScrollDebounce = null;
    window.addEventListener('scroll', () => {
      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling');
      }
      clearTimeout(isScrollDebounce);
      isScrollDebounce = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 100);
    }, { passive: true });

    console.log('✦ Shri Moksham loaded with auspiciousness & butter-smooth performance ✦');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

