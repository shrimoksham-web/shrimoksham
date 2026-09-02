/**
 * SHRI MOKSHAM — Interactive Meditation Suite & Chakra Energy Tuner
 * Includes Breath Ripple Sphere, 7-Chakra Solfeggio Harmonic Synthesizer, and 1-Minute Stillness Sanctuary
 */

(function () {
  'use strict';

  // Web Audio Context for synthesized Himalayan singing bowl tones
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPureTone(freq = 432, duration = 2.0, type = 'sine') {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone could not play:', e);
    }
  }

  /* --------------------------------------------------------------------------
     1. Interactive Sacred Breath Ripple Sphere
     -------------------------------------------------------------------------- */
  function initBreathSphere() {
    const circle = document.getElementById('breathSphereCircle');
    const label = document.getElementById('breathSphereLabel');
    const timer = document.getElementById('breathTimerNum');
    const toggleBtn = document.getElementById('toggleBreathSphereBtn');
    const patternSelect = document.getElementById('breathPatternSelect');
    const soundToggle = document.getElementById('toggleBreathSoundBtn');

    if (!circle || !label || !timer || !toggleBtn) return;

    let isRunning = false;
    let isSoundOn = false;
    let timerInterval = null;

    const patterns = {
      box: [
        { name: 'INHALE', duration: 4, action: 'inhale', text: 'Inhale gently into your lower abdomen.' },
        { name: 'HOLD', duration: 4, action: 'hold', text: 'Retain in calm, still awareness.' },
        { name: 'EXHALE', duration: 4, action: 'exhale', text: 'Smoothly release and let go.' },
        { name: 'STILLNESS', duration: 4, action: 'hold', text: 'Rest in natural space.' }
      ],
      calm: [
        { name: 'INHALE', duration: 4, action: 'inhale', text: 'Breathe in peace.' },
        { name: 'HOLD', duration: 7, action: 'hold', text: 'Hold with full awareness.' },
        { name: 'EXHALE', duration: 8, action: 'exhale', text: 'Exhale completely.' }
      ]
    };

    let currentPatternKey = 'box';
    let phaseIndex = 0;
    let secondsLeft = 4;
    let cyclesDone = 0;

    function updateUI() {
      const pattern = patterns[currentPatternKey];
      const phase = pattern[phaseIndex];

      circle.classList.remove('is-inhaling', 'is-holding', 'is-exhaling');

      if (phase.action === 'inhale') {
        circle.classList.add('is-inhaling');
        circle.style.transitionDuration = `${phase.duration}s`;
        if (isSoundOn) playPureTone(432, 1.8);
      } else if (phase.action === 'hold') {
        circle.classList.add('is-holding');
        circle.style.transitionDuration = '0.5s';
        if (isSoundOn) playPureTone(540, 1.0);
      } else if (phase.action === 'exhale') {
        circle.classList.add('is-exhaling');
        circle.style.transitionDuration = `${phase.duration}s`;
        if (isSoundOn) playPureTone(324, 1.8);
      }

      label.textContent = phase.name;
      timer.textContent = `${secondsLeft}s`;

      const instr = document.getElementById('breathSphereInstruction');
      if (instr) instr.textContent = phase.text;
    }

    function tick() {
      secondsLeft--;
      timer.textContent = `${secondsLeft}s`;

      if (secondsLeft <= 0) {
        const pattern = patterns[currentPatternKey];
        phaseIndex = (phaseIndex + 1) % pattern.length;
        if (phaseIndex === 0) {
          cyclesDone++;
          const countEl = document.getElementById('breathCyclesCount');
          if (countEl) countEl.textContent = `Completed: ${cyclesDone} ${cyclesDone === 1 ? 'cycle' : 'cycles'}`;
        }
        secondsLeft = pattern[phaseIndex].duration;
        updateUI();
      }
    }

    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      if (isRunning) {
        toggleBtn.textContent = 'Pause Practice';
        toggleBtn.classList.remove('btn-gold-primary');
        toggleBtn.classList.add('btn-gold-outline');
        const pattern = patterns[currentPatternKey];
        secondsLeft = pattern[phaseIndex].duration;
        updateUI();
        clearInterval(timerInterval);
        timerInterval = setInterval(tick, 1000);
      } else {
        toggleBtn.textContent = 'Begin Breath Practice';
        toggleBtn.classList.remove('btn-gold-outline');
        toggleBtn.classList.add('btn-gold-primary');
        clearInterval(timerInterval);
        circle.classList.remove('is-inhaling', 'is-holding', 'is-exhaling');
        label.textContent = 'REST';
        timer.textContent = '--';
      }
    });

    if (patternSelect) {
      patternSelect.addEventListener('change', (e) => {
        currentPatternKey = e.target.value;
        phaseIndex = 0;
        if (isRunning) {
          clearInterval(timerInterval);
          const pattern = patterns[currentPatternKey];
          secondsLeft = pattern[phaseIndex].duration;
          updateUI();
          timerInterval = setInterval(tick, 1000);
        }
      });
    }

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        soundToggle.style.color = isSoundOn ? 'var(--gold-primary)' : 'var(--text-muted)';
        if (isSoundOn) playPureTone(432, 1.2);
      });
    }
  }

  /* --------------------------------------------------------------------------
     2. 7-Chakra Energy Tuner
     -------------------------------------------------------------------------- */
  const chakraData = [
    { name: 'Root (Muladhara)', hz: '396 Hz • Grounding & Stability', desc: 'Grounds your energetic foundation, dissolving fear and connecting you with the earth.', tone: 396 },
    { name: 'Sacral (Svadhisthana)', hz: '417 Hz • Creativity & Flow', desc: 'Restores harmonious emotional flow, emotional ease, and creative vital energy.', tone: 417 },
    { name: 'Solar Plexus (Manipura)', hz: '528 Hz • Transformation & Will', desc: 'Ignites inner courage, righteous action (Dharma), and spiritual clarity.', tone: 528 },
    { name: 'Heart (Anahata)', hz: '639 Hz • Compassion & Seva', desc: 'Awakens selfless love, inner forgiveness, and devotion to collective wellbeing.', tone: 639 },
    { name: 'Throat (Vishuddha)', hz: '741 Hz • Truth & Discernment', desc: 'Purifies expression, aligning conscious speech with timeless Vedic truth.', tone: 741 },
    { name: 'Third Eye (Ajna)', hz: '852 Hz • Intuition & Wisdom', desc: 'Unlocks inward perception, transcending duality to perceive the soul’s road.', tone: 852 },
    { name: 'Crown (Sahasrara)', hz: '963 Hz • Pure Moksha & Surrender', desc: 'Connects the individual soul with universal cosmic grace and inner freedom.', tone: 963 }
  ];

  function initChakraTuner() {
    const tabs = document.querySelectorAll('.chakra-tab-btn');
    const title = document.getElementById('activeChakraTitle');
    const hz = document.getElementById('activeChakraHz');
    const desc = document.getElementById('activeChakraDesc');
    const playBtn = document.getElementById('playChakraToneBtn');

    if (!tabs.length || !title || !hz || !desc) return;

    let currentIndex = 0;

    function renderChakra(index) {
      currentIndex = index;
      const data = chakraData[index];
      tabs.forEach((tab, i) => {
        if (i === index) tab.classList.add('is-active');
        else tab.classList.remove('is-active');
      });

      title.textContent = data.name;
      hz.textContent = data.hz;
      desc.textContent = data.desc;
      playPureTone(data.tone, 2.5);
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => renderChakra(idx));
    });

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const data = chakraData[currentIndex];
        playPureTone(data.tone, 3.5);
      });
    }
  }

  /* --------------------------------------------------------------------------
     3. 1-Minute Mindful Stillness Sanctuary
     -------------------------------------------------------------------------- */
  function initMindfulStillness() {
    const startBtn = document.getElementById('startStillnessBtn');
    const timerDisplay = document.getElementById('stillnessCountdown');

    if (!startBtn || !timerDisplay) return;

    let seconds = 60;
    let interval = null;
    let active = false;

    startBtn.addEventListener('click', () => {
      if (active) {
        clearInterval(interval);
        active = false;
        startBtn.textContent = 'Begin 1-Minute Pause';
        timerDisplay.textContent = '60s';
        seconds = 60;
      } else {
        active = true;
        seconds = 60;
        startBtn.textContent = 'Pause Silence';
        timerDisplay.textContent = '60s';
        playPureTone(528, 4.0); // opening bell

        interval = setInterval(() => {
          seconds--;
          timerDisplay.textContent = `${seconds}s`;
          if (seconds <= 0) {
            clearInterval(interval);
            active = false;
            startBtn.textContent = 'Practice Again';
            timerDisplay.textContent = 'Peace ✦';
            playPureTone(432, 5.0); // closing chime
          }
        }, 1000);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBreathSphere();
    initChakraTuner();
    initMindfulStillness();
  });
})();
