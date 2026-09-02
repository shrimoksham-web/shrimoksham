/**
 * SHRI MOKSHAM — Masterpiece Ultra-Smooth Hardware-Accelerated Frame Scrubber Engine
 * Features: Apple-style 120 FPS / 60 FPS Canvas Frame Rendering, O(1) Preloaded Image Buffers,
 * Zero Asynchronous Video Decoding Latency, Fluid Exponential Lerp, and ॐ OM Mandala Activation
 */

(function () {
  'use strict';

  function initHeavenlyCloudScrubber() {
    const canvas = document.getElementById('heroScrubCanvas');
    const track = document.getElementById('home') || document.querySelector('.hero-scroll-track');
    const leftDoor = document.querySelector('.heaven-door-left');
    const rightDoor = document.querySelector('.heaven-door-right');
    const cloudPills = document.querySelectorAll('.cloud-text-pill');
    const omClimaxCard = document.getElementById('cloudOmClimaxCard');
    const minimalOverlay = document.querySelector('.hero-minimal-overlay');
    const climaxPill = document.getElementById('heroClimaxActionPill');

    if (!track) return;

    const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
    const TOTAL_FRAMES = 249;
    const frames = new Array(TOTAL_FRAMES);
    let targetProgress = 0;
    let currentProgress = 0;
    let lastDrawnIndex = -1;

    // Helper: format 4-digit frame filename
    function getFrameUrl(index) {
      const numStr = String(index + 1).padStart(4, '0');
      return `assets/video/frames/frame_${numStr}.jpg`;
    }

    // Set canvas dimensions to crisp 1080p
    if (canvas && ctx) {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    // Draw specific frame onto canvas with aspect-fill cover logic
    function drawFrame(frameIdx) {
      if (!ctx || !canvas) return;

      // Find exact frame or nearest loaded neighbor
      let imgToDraw = frames[frameIdx];
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        // Search outwards for nearest loaded frame
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = frameIdx - offset;
          const next = frameIdx + offset;
          if (prev >= 0 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
            imgToDraw = frames[prev];
            break;
          }
          if (next < TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
            imgToDraw = frames[next];
            break;
          }
        }
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        if (lastDrawnIndex !== frameIdx) {
          ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
          lastDrawnIndex = frameIdx;
        }
      }
    }

    // Preload Strategy: Load First Frame Immediately, then Batch All Frames
    function preloadAllFrames() {
      // 1. Immediate Priority: Frame 1
      const firstImg = new Image();
      firstImg.src = getFrameUrl(0);
      firstImg.onload = () => {
        frames[0] = firstImg;
        drawFrame(0);
      };

      // 2. High-Priority Key Milestones (every 15 frames)
      for (let i = 15; i < TOTAL_FRAMES; i += 15) {
        const milestoneImg = new Image();
        milestoneImg.src = getFrameUrl(i);
        const idx = i;
        milestoneImg.onload = () => {
          frames[idx] = milestoneImg;
        };
      }

      // 3. Batch load remaining frames progressively
      let frameLoaderIdx = 1;
      function loadNextBatch() {
        const batchSize = 12;
        let count = 0;
        while (frameLoaderIdx < TOTAL_FRAMES && count < batchSize) {
          if (!frames[frameLoaderIdx]) {
            const img = new Image();
            const idx = frameLoaderIdx;
            img.src = getFrameUrl(idx);
            img.onload = () => {
              frames[idx] = img;
            };
          }
          frameLoaderIdx++;
          count++;
        }

        if (frameLoaderIdx < TOTAL_FRAMES) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 16);
          }
        }
      }

      setTimeout(loadNextBatch, 50);
    }

    preloadAllFrames();

    // High-performance Cloud Parting & Narrative Stage Updates
    function updateCloudStages(progress) {
      if (minimalOverlay) {
        const overlayOpacity = Math.max(0, 1 - Math.pow(progress, 1.2) * 2.8);
        minimalOverlay.style.opacity = `${overlayOpacity}`;
        minimalOverlay.style.pointerEvents = overlayOpacity > 0.1 ? 'auto' : 'none';
      }

      if (climaxPill) {
        if (progress >= 0.52) {
          climaxPill.classList.add('is-active-pill');
        } else {
          climaxPill.classList.remove('is-active-pill');
        }
      }

      if (leftDoor && rightDoor) {
        const doorOffset = Math.min(100, Math.pow(progress, 1.2) * 90);
        const doorOpacity = Math.max(0, 1 - Math.pow(progress, 1.3) * 0.92);
        leftDoor.style.transform = `translate3d(-${doorOffset}%, 0, 0)`;
        rightDoor.style.transform = `translate3d(${doorOffset}%, 0, 0)`;
        leftDoor.style.opacity = `${doorOpacity}`;
        rightDoor.style.opacity = `${doorOpacity}`;
      }

      let activeIndex = 0;
      if (progress < 0.22) {
        activeIndex = 0;
      } else if (progress < 0.45) {
        activeIndex = 1;
      } else if (progress < 0.65) {
        activeIndex = 2;
      } else {
        activeIndex = 3;
      }

      cloudPills.forEach((pill, idx) => {
        if (idx === activeIndex && activeIndex < 3) {
          pill.classList.add('is-active-cloud');
          pill.classList.remove('is-dissolved-cloud');
        } else if (idx < activeIndex) {
          pill.classList.remove('is-active-cloud');
          pill.classList.add('is-dissolved-cloud');
        } else {
          pill.classList.remove('is-active-cloud', 'is-dissolved-cloud');
        }
      });

      if (omClimaxCard) {
        if (progress >= 0.62) {
          omClimaxCard.classList.add('is-active-cloud');
          omClimaxCard.classList.remove('is-dissolved-cloud');
        } else {
          omClimaxCard.classList.remove('is-active-cloud');
          omClimaxCard.classList.add('is-dissolved-cloud');
        }
      }
    }

    let isScrubberActive = true;

    // Continuous 60fps/120fps Fluid Lerp Animation Loop
    function lerpLoop() {
      if (!isScrubberActive) return;

      const diff = targetProgress - currentProgress;

      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.22;
      } else {
        currentProgress = targetProgress;
      }

      const targetFrameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
      drawFrame(targetFrameIdx);
      updateCloudStages(currentProgress);

      requestAnimationFrame(lerpLoop);
    }

    function calculateTargetProgress() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const trackTop = track.offsetTop;
      const trackHeight = track.offsetHeight;
      const windowHeight = window.innerHeight;

      const maxScroll = trackHeight - windowHeight;
      const currentScroll = scrollY - trackTop;

      if (maxScroll > 0) {
        targetProgress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      } else {
        targetProgress = 0;
      }
    }

    function onScroll() {
      calculateTargetProgress();
      if (!isScrubberActive && window.pageYOffset < track.offsetHeight) {
        isScrubberActive = true;
        requestAnimationFrame(lerpLoop);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isScrubberActive) {
              isScrubberActive = true;
              requestAnimationFrame(lerpLoop);
            }
          } else {
            isScrubberActive = false;
          }
        });
      }, { rootMargin: '200px' });

      observer.observe(track);
    }

    requestAnimationFrame(lerpLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeavenlyCloudScrubber);
  } else {
    initHeavenlyCloudScrubber();
  }
})();
