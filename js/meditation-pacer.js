/**
 * SHRI MOKSHAM — Interactive Meditation & Conscious Breathing Pacer
 * Provides visual breath expansion, cycle timing, and subtle sound harmonics
 */

(function () {
  'use strict';

  function initMeditationPacer() {
    const circle = document.getElementById('breathCircleMain');
    const stateLabel = document.getElementById('breathStateLabel');
    const timerDisplay = document.getElementById('breathTimerDisplay');
    const toggleBtn = document.getElementById('toggleBreathingBtn');
    const soundToggleBtn = document.getElementById('toggleSoundBtn');
    const patternSelect = document.getElementById('breathingPatternSelect');

    if (!circle || !stateLabel || !timerDisplay || !toggleBtn) return;

    let isRunning = false;
    let isSoundOn = false;
    let audioCtx = null;
    let pacerInterval = null;

    // Breathing patterns in seconds
    const patterns = {
      box: [
        { name: 'INHALE', duration: 4, action: 'inhale', text: 'Slowly breathe in through your nose, filling your lower abdomen.' },
        { name: 'HOLD', duration: 4, action: 'hold', text: 'Gently retain the breath with a quiet and relaxed mind.' },
        { name: 'EXHALE', duration: 4, action: 'exhale', text: 'Softly release the breath, letting go of all tension.' },
        { name: 'STILLNESS', duration: 4, action: 'hold', text: 'Rest in natural stillness before the next conscious breath.' }
      ],
      calm: [
        { name: 'INHALE', duration: 4, action: 'inhale', text: 'Breathe in deeply and peacefully.' },
        { name: 'HOLD', duration: 7, action: 'hold', text: 'Hold with full awareness at the heart center.' },
        { name: 'EXHALE', duration: 8, action: 'exhale', text: 'Exhale completely, releasing all effort.' }
      ],
      pranayama: [
        { name: 'INHALE', duration: 5, action: 'inhale', text: 'Deep diaphragmatic inhalation of prana.' },
        { name: 'EXHALE', duration: 5, action: 'exhale', text: 'Smooth, conscious exhalation.' }
      ]
    };

    let currentPatternKey = 'box';
    let currentPhaseIndex = 0;
    let secondsLeftInPhase = 4;
    let cycleCount = 0;

    // Web Audio Harmonic Tone (432 Hz Root frequency for peacefulness)
    function playHarmonicTone(freq = 432, duration = 1.2) {
      if (!isSoundOn) return;
      try {
        if (!audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        console.warn('Audio tone could not play:', e);
      }
    }

    function updatePacerUI() {
      const pattern = patterns[currentPatternKey];
      const phase = pattern[currentPhaseIndex];

      circle.classList.remove('is-inhaling', 'is-holding', 'is-exhaling');

      if (phase.action === 'inhale') {
        circle.classList.add('is-inhaling');
        circle.style.transitionDuration = `${phase.duration}s`;
        playHarmonicTone(432, 1.5);
      } else if (phase.action === 'hold') {
        circle.classList.add('is-holding');
        circle.style.transitionDuration = '0.5s';
        playHarmonicTone(540, 0.8);
      } else if (phase.action === 'exhale') {
        circle.classList.add('is-exhaling');
        circle.style.transitionDuration = `${phase.duration}s`;
        playHarmonicTone(324, 1.5);
      }

      stateLabel.textContent = phase.name;
      timerDisplay.textContent = `${secondsLeftInPhase}s`;

      const instructionEl = document.getElementById('breathInstructionText');
      if (instructionEl) {
        instructionEl.textContent = phase.text;
      }
    }

    function tick() {
      secondsLeftInPhase--;
      timerDisplay.textContent = `${secondsLeftInPhase}s`;

      if (secondsLeftInPhase <= 0) {
        const pattern = patterns[currentPatternKey];
        currentPhaseIndex = (currentPhaseIndex + 1) % pattern.length;
        if (currentPhaseIndex === 0) {
          cycleCount++;
          const countEl = document.getElementById('breathCycleCounter');
          if (countEl) countEl.textContent = `Completed: ${cycleCount} ${cycleCount === 1 ? 'cycle' : 'cycles'}`;
        }
        secondsLeftInPhase = pattern[currentPhaseIndex].duration;
        updatePacerUI();
      }
    }

    function startPacer() {
      isRunning = true;
      toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        Pause Practice
      `;
      toggleBtn.classList.remove('btn-gold-primary');
      toggleBtn.classList.add('btn-gold-outline');

      const pattern = patterns[currentPatternKey];
      secondsLeftInPhase = pattern[currentPhaseIndex].duration;
      updatePacerUI();

      clearInterval(pacerInterval);
      pacerInterval = setInterval(tick, 1000);
    }

    function pausePacer() {
      isRunning = false;
      toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Begin Breathing Practice
      `;
      toggleBtn.classList.remove('btn-gold-outline');
      toggleBtn.classList.add('btn-gold-primary');
      clearInterval(pacerInterval);

      circle.classList.remove('is-inhaling', 'is-holding', 'is-exhaling');
      stateLabel.textContent = 'REST';
      timerDisplay.textContent = '--';
    }

    toggleBtn.addEventListener('click', () => {
      if (isRunning) {
        pausePacer();
      } else {
        startPacer();
      }
    });

    if (patternSelect) {
      patternSelect.addEventListener('change', (e) => {
        currentPatternKey = e.target.value;
        currentPhaseIndex = 0;
        if (isRunning) {
          pausePacer();
          startPacer();
        }
      });
    }

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
          soundToggleBtn.classList.add('is-active');
          soundToggleBtn.style.color = 'var(--gold-bright)';
          soundToggleBtn.style.borderColor = 'var(--gold-primary)';
          playHarmonicTone(432, 1);
        } else {
          soundToggleBtn.classList.remove('is-active');
          soundToggleBtn.style.color = 'var(--text-muted)';
          soundToggleBtn.style.borderColor = 'var(--border-gold-subtle)';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMeditationPacer);
  } else {
    initMeditationPacer();
  }
})();
