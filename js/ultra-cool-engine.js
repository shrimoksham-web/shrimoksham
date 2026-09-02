/**
 * SHRI MOKSHAM — Ultra-Cool Interactive Engine
 * Celestial Cursor, Real-Time Mouse Glow Spotlight, 432Hz Ambient Soundscape Synth, & Live Ephemeris
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Celestial Cursor Follower & Magnetic Aura
     -------------------------------------------------------------------------- */
  function initCelestialCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let dot = document.querySelector('.celestial-cursor-dot');
    let aura = document.querySelector('.celestial-cursor-aura');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'celestial-cursor-dot';
      document.body.appendChild(dot);
    }

    if (!aura) {
      aura = document.createElement('div');
      aura.className = 'celestial-cursor-aura';
      document.body.appendChild(aura);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderAura() {
      auraX += (mouseX - auraX) * 0.16;
      auraY += (mouseY - auraY) * 0.16;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
      requestAnimationFrame(renderAura);
    }

    renderAura();

    // Magnetic button expansion
    const interactives = document.querySelectorAll('a, button, .btn, .grand-pathway-card, .glass-panel');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        aura.style.width = '64px';
        aura.style.height = '64px';
        aura.style.borderColor = 'var(--gold-bright)';
      });
      el.addEventListener('mouseleave', () => {
        aura.style.width = '44px';
        aura.style.height = '44px';
        aura.style.borderColor = 'rgba(212, 175, 55, 0.5)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Real-Time Mouse Spotlight Glow on Glass Cards
     -------------------------------------------------------------------------- */
  function initMouseSpotlight() {
    const cards = document.querySelectorAll('.glass-panel, .grand-pathway-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Ambient 432Hz Himalayan Soundscape Synthesizer
     -------------------------------------------------------------------------- */
  function initAmbientSoundscape() {
    const toggleBtn = document.getElementById('soundscapeToggleBtn');
    if (!toggleBtn) return;

    let audioCtx = null;
    let isPlaying = false;
    let masterGain = null;
    let oscList = [];

    function startSoundscape() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 3.0); // Smooth fade in
      masterGain.connect(audioCtx.destination);

      // Sacred Multi-Harmonic Drone (432Hz Fundamental, 108Hz Sub, 528Hz Transformation)
      const freqs = [108, 216, 432, 528, 648];
      oscList = freqs.map((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.2 / (idx + 1), audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return osc;
      });
    }

    function stopSoundscape() {
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.0); // Smooth fade out
        setTimeout(() => {
          oscList.forEach((osc) => {
            try { osc.stop(); } catch (e) {}
          });
          oscList = [];
        }, 2100);
      }
    }

    toggleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        toggleBtn.classList.add('is-playing');
        toggleBtn.querySelector('.soundscape-label').textContent = 'OMM Chants Active';
        startSoundscape();
      } else {
        toggleBtn.classList.remove('is-playing');
        toggleBtn.querySelector('.soundscape-label').textContent = 'Play OMM Chants';
        stopSoundscape();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Dynamic Jyotish Ephemeris Live Clock
     -------------------------------------------------------------------------- */
  function initLiveEphemeris() {
    const ephemerisTime = document.getElementById('ephemerisLiveTime');
    if (!ephemerisTime) return;

    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      ephemerisTime.textContent = `${timeStr} IST`;
    }

    setInterval(updateTime, 1000);
    updateTime();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCelestialCursor();
    initMouseSpotlight();
    initAmbientSoundscape();
    initLiveEphemeris();
  });
})();
