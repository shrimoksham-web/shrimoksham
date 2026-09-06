/**
 * SHRI MOKSHAM — Extraordinary Glassmorphic Spiritual Engine
 * 7 Crystal Solfeggio Gems, Sacred Lotus 432Hz Breath Visualizer, and Three-Dot Drawer
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Web Audio Synthesizer for Pure Solfeggio Frequencies & Singing Bowls
     -------------------------------------------------------------------------- */
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHarmonicTone(freq, duration = 2.4) {
    try {
      const ctx = getAudioContext();

      // Fundamental + Rich Harmonic Overtone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.32, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     Authentic Soham / Sohum (Ajapa Japa) Audio Harmonic Tone Synthesizer
     - "SO..." (Inhale): Ascending 432Hz Himalayan singing bowl + airy breath sibilance
     - "HAM..." (Exhale): Grounding 216Hz/108Hz Om resonance + settling warm exhale
     -------------------------------------------------------------------------- */
  function playSohamTone(phase, duration = 4.0) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (phase === 'so' || phase === 'inhale') {
        // "SO..." (Inhale): Ascending 324Hz -> 432Hz with luminous Himalayan resonance
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(324, now);
        osc1.frequency.exponentialRampToValueAtTime(432, now + duration * 0.85);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(648, now);
        osc2.frequency.exponentialRampToValueAtTime(864, now + duration * 0.85);

        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(1296, now);
        osc3.frequency.exponentialRampToValueAtTime(1728, now + duration * 0.85);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.24, now + duration * 0.5);
        gain.gain.exponentialRampToValueAtTime(0.18, now + duration * 0.85);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain);
        osc2.connect(gain);
        osc3.connect(gain);

        // Gentle breath noise formant ("Ssss-ooo...")
        const bufferSize = Math.floor(ctx.sampleRate * Math.min(duration, 3.5));
        const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          last = last * 0.9 + white * 0.1;
          output[i] = last * 0.35;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuf;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(800, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(1500, now + duration * 0.7);
        noiseFilter.Q.value = 3.0;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.0001, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.07, now + duration * 0.35);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(gain);

        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        noiseSource.start(now);

        osc1.stop(now + duration);
        osc2.stop(now + duration);
        osc3.stop(now + duration);
        noiseSource.stop(now + duration);

      } else if (phase === 'hold') {
        // "HOLD..." (Stillness / Retention): 432Hz Om drone + peaceful serene silence
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, now);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(216, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.3);
        gain.gain.setValueAtTime(0.12, now + duration - 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);

      } else {
        // "HAM..." (Exhale): Grounding 216Hz -> 108Hz with settling Om hum
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const oscSub = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(216, now);
        osc1.frequency.exponentialRampToValueAtTime(108, now + duration * 0.85);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(432, now);
        osc2.frequency.exponentialRampToValueAtTime(216, now + duration * 0.85);

        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(108, now);
        oscSub.frequency.exponentialRampToValueAtTime(54, now + duration * 0.85);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.26, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.12, now + duration * 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain);
        osc2.connect(gain);
        oscSub.connect(gain);

        // Gentle breath exhale formant ("Hhh-aaammm...")
        const bufferSize = Math.floor(ctx.sampleRate * Math.min(duration, 3.5));
        const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          last = last * 0.92 + white * 0.08;
          output[i] = last * 0.45;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuf;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(500, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(250, now + duration * 0.8);
        noiseFilter.Q.value = 2.0;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.0001, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.85);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(gain);

        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        oscSub.start(now);
        noiseSource.start(now);

        osc1.stop(now + duration);
        osc2.stop(now + duration);
        oscSub.stop(now + duration);
        noiseSource.stop(now + duration);
      }
    } catch (e) {
      console.warn('Soham audio error:', e);
    }
  }

  // Vocal Formant + Solfeggio Carrier Resonator
  function playChakraVocalHarmonic(freq, duration = 3.0) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.38, now + 0.12);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(ctx.destination);

      // Carrier Sine (exact Solfeggio frequency)
      const oscCarrier = ctx.createOscillator();
      oscCarrier.type = 'sine';
      oscCarrier.frequency.setValueAtTime(freq, now);

      // Deep Vocal Overtone
      const oscVocal = ctx.createOscillator();
      oscVocal.type = 'triangle';
      const baseVocalFreq = freq * 0.5 > 80 ? freq * 0.5 : freq;
      oscVocal.frequency.setValueAtTime(baseVocalFreq, now);

      // Vocal Formant Filter (simulating human throat vowel resonance)
      const formantFilter = ctx.createBiquadFilter();
      formantFilter.type = 'bandpass';
      formantFilter.frequency.setValueAtTime(freq > 500 ? freq : 680, now);
      formantFilter.Q.setValueAtTime(4.2, now);

      // Singing bowl chime harmonic
      const oscBowl = ctx.createOscillator();
      oscBowl.type = 'sine';
      oscBowl.frequency.setValueAtTime(freq * 2.02, now);
      const bowlGain = ctx.createGain();
      bowlGain.gain.setValueAtTime(0.09, now);
      bowlGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.75);

      oscCarrier.connect(masterGain);
      oscVocal.connect(formantFilter);
      formantFilter.connect(masterGain);
      oscBowl.connect(bowlGain);
      bowlGain.connect(masterGain);

      oscCarrier.start(now);
      oscVocal.start(now);
      oscBowl.start(now);

      oscCarrier.stop(now + duration);
      oscVocal.stop(now + duration);
      oscBowl.stop(now + duration);
    } catch (e) {
      console.warn('Audio resonance warning:', e);
    }
  }

  /* --------------------------------------------------------------------------
     2. 7 Crystal Chakra Seed Mantras (Bīja Dhwani) Voice Chanting Engine
     -------------------------------------------------------------------------- */
  const chakrasData = [
    {
      id: 1,
      key: 'root',
      name: '1. Root Chakra (Muladhara)',
      mantra: 'LAM',
      devanagari: 'लं',
      hz: 396,
      element: 'Earth • Prithvi',
      color: '#E11D48',
      voiceChant: 'laam',
      desc: 'Awakens foundational stability, grounding, and vital life energy. Chanting the seed sound LAM dissolves subconscious fear, anxiety, and insecurity, firmly anchoring your awareness into deep safety and peace with Mother Earth.'
    },
    {
      id: 2,
      key: 'sacral',
      name: '2. Sacral Chakra (Svadhisthana)',
      mantra: 'VAM',
      devanagari: 'वं',
      hz: 417,
      element: 'Water • Jala',
      color: '#EA580C',
      voiceChant: 'vaam',
      desc: 'Harmonizes emotional fluidity, sensual balance, and creative life force. Chanting the seed sound VAM releases stagnant emotional energy and blockages, restoring joyful passion, adaptability, and pure creative flow.'
    },
    {
      id: 3,
      key: 'solar',
      name: '3. Solar Plexus Chakra (Manipura)',
      mantra: 'RAM',
      devanagari: 'रं',
      hz: 528,
      element: 'Fire • Agni',
      color: '#D97706',
      voiceChant: 'raam',
      desc: 'Ignites inner willpower, metabolic fire, and righteous courage (Dharma). Chanting the seed sound RAM transmutes hesitation and fatigue into dynamic power, empowering purposeful action and radiant self-confidence.'
    },
    {
      id: 4,
      key: 'heart',
      name: '4. Heart Chakra (Anahata)',
      mantra: 'YAM',
      devanagari: 'यं',
      hz: 639,
      element: 'Air • Vayu',
      color: '#059669',
      voiceChant: 'yaam',
      desc: 'Unlocks unconditional divine love, deep compassion, and inner forgiveness. Chanting the seed sound YAM dissolves grief and emotional armor, expanding your heart space to resonate with universal peace and selfless empathy.'
    },
    {
      id: 5,
      key: 'throat',
      name: '5. Throat Chakra (Vishuddha)',
      mantra: 'HAM',
      devanagari: 'हं',
      hz: 741,
      element: 'Ether • Akasha',
      color: '#0284C7',
      voiceChant: 'haam',
      desc: 'Purifies conscious speech, authentic expression, and sacred truth (Satya). Chanting the seed sound HAM frees the voice from fear of judgment, aligning your words with timeless spiritual wisdom and cosmic clarity.'
    },
    {
      id: 6,
      key: 'thirdeye',
      name: '6. Third Eye Chakra (Ajna)',
      mantra: 'OM',
      devanagari: 'ॐ',
      hz: 852,
      element: 'Mind • Manas',
      color: '#4F46E5',
      voiceChant: 'ohm',
      desc: 'Awakens spiritual intuition, transcendent insight, and inner vision. Chanting the sacred sound OM pierces through mental illusions (Maya) and chatter, harmonizing dualistic thought into pure soul consciousness.'
    },
    {
      id: 7,
      key: 'crown',
      name: '7. Crown Chakra (Sahasrara)',
      mantra: 'AUM',
      devanagari: 'ॐ',
      hz: 963,
      element: 'Consciousness • Brahman',
      color: '#9333EA',
      voiceChant: 'aauummmm',
      desc: 'Opens the thousand-petaled lotus to supreme cosmic consciousness, divine grace, and Moksha. Chanting the primordial sound AUM dissolves individual ego, merging your spirit with boundless universal light and bliss.'
    }
  ];

  let currentChakraIndex = 0;
  let chantVoiceTimer = null;

  function chantMantraVoice(mantraText, chakraData, onChantEnd) {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();

        const text = chakraData.voiceChant || mantraText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 0.9;
        utterance.rate = 0.72;
        utterance.volume = 1.0;

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const indianVoice = voices.find(v => 
            v.lang.includes('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('hindi')
          );
          if (indianVoice) {
            utterance.voice = indianVoice;
          }
        }

        utterance.onend = () => {
          if (onChantEnd) onChantEnd();
        };
        utterance.onerror = () => {
          if (onChantEnd) onChantEnd();
        };

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        if (onChantEnd) onChantEnd();
      }
    } else {
      if (onChantEnd) onChantEnd();
    }
  }

  function initCrystalChakraSuite() {
    const gems = document.querySelectorAll('.crystal-gem-btn');
    const devaEl = document.getElementById('crystalChakraDevanagari');
    const mantraEl = document.getElementById('crystalChakraMantra');
    const titleEl = document.getElementById('crystalChakraTitle');
    const hzEl = document.getElementById('crystalChakraHz');
    const elementEl = document.getElementById('crystalChakraElement');
    const descEl = document.getElementById('crystalChakraDesc');
    const voiceBtn = document.getElementById('crystalVoiceChantBtn');
    const voiceLabel = document.getElementById('crystalVoiceBtnLabel');

    if (!gems.length) return;

    function renderChakra(idx, playVoice = true) {
      currentChakraIndex = idx;
      const ch = chakrasData[idx];
      if (!ch) return;

      gems.forEach((g, i) => {
        if (i === idx) {
          g.classList.add('is-active');
        } else {
          g.classList.remove('is-active');
        }
      });

      if (devaEl) devaEl.textContent = ch.devanagari;
      if (mantraEl) mantraEl.textContent = ch.mantra;
      if (titleEl) titleEl.textContent = ch.name;
      if (hzEl) hzEl.textContent = `${ch.hz} Hz`;
      if (elementEl) elementEl.textContent = ch.element;
      if (descEl) descEl.textContent = ch.desc;
      if (voiceLabel) voiceLabel.textContent = `Chant ${ch.mantra} Voice`;

      if (playVoice) {
        triggerVoiceChant(ch);
      }
    }

    function triggerVoiceChant(ch) {
      if (voiceBtn) {
        voiceBtn.classList.add('is-chanting');
      }

      clearTimeout(chantVoiceTimer);

      // Speak Seed Mantra with pure voice ONLY (no background synthesizer / musical tones)
      chantMantraVoice(ch.mantra, ch, () => {
        if (voiceBtn) voiceBtn.classList.remove('is-chanting');
      });

      // Safety timeout for visual wave animation
      chantVoiceTimer = setTimeout(() => {
        if (voiceBtn) voiceBtn.classList.remove('is-chanting');
      }, 2500);
    }

    gems.forEach((gem, idx) => {
      gem.addEventListener('click', () => {
        renderChakra(idx, true);
      });
    });

    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        const ch = chakrasData[currentChakraIndex];
        if (ch) triggerVoiceChant(ch);
      });
    }

    // Preload speech synthesis voices
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  /* --------------------------------------------------------------------------
     3. Sacred Soham (Sohum) Ajapa Japa Meditation Visualizer & Soundscape
     Uses the authentic meditative background tone from 'soham new voice.mp3'
     with exact real-time audio-synced SOOOO (Inhale) & HAAMM (Exhale) matching.
     -------------------------------------------------------------------------- */
  function initLotusBreathVisualizer() {
    const sphere = document.getElementById('sacredLotusSphere');
    const label = document.getElementById('sacredLotusLabel');
    const subLabel = document.getElementById('sacredLotusSub');
    const toggleBtn = document.getElementById('sacredLotusToggle');

    if (!sphere || !label || !toggleBtn) return;

    let isPacing = false;
    let animFrameId = null;
    let sohamAudio = document.getElementById('sohamMeditationAudio');
    let fallbackTimer = null;
    let isSynthRunning = false;
    let synthOsc1 = null;
    let synthOsc2 = null;
    let synthGain = null;

    if (!sohamAudio) {
      sohamAudio = new Audio('assets/audio/soham-new-voice.mp3');
      sohamAudio.loop = true;
    }

    // Web Audio Synthesizer Fallback Tone generator (Exact matches to soham new voice: 272Hz & 204Hz)
    function startSynthFallback(phase) {
      try {
        const ctx = getAudioContext();
        if (!synthGain) {
          synthGain = ctx.createGain();
          synthGain.gain.setValueAtTime(0.001, ctx.currentTime);
          synthGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.5);
          synthGain.connect(ctx.destination);
        }

        let freq = 272;
        if (phase === 'hold') {
          freq = 432;
        } else if (phase === 'ham') {
          freq = 204;
        }
        const now = ctx.currentTime;

        if (synthGain) {
          if (phase === 'hold') {
            synthGain.gain.setValueAtTime(0.08, now);
          } else {
            synthGain.gain.setValueAtTime(0.24, now);
          }
        }

        if (synthOsc1) {
          synthOsc1.frequency.setValueAtTime(freq, now);
        } else {
          synthOsc1 = ctx.createOscillator();
          synthOsc1.type = 'sine';
          synthOsc1.frequency.setValueAtTime(freq, now);
          synthOsc1.connect(synthGain);
          synthOsc1.start();
        }

        if (synthOsc2) {
          synthOsc2.frequency.setValueAtTime(freq * 1.5, now);
        } else {
          synthOsc2 = ctx.createOscillator();
          synthOsc2.type = 'triangle';
          synthOsc2.frequency.setValueAtTime(freq * 1.5, now);
          synthOsc2.connect(synthGain);
          synthOsc2.start();
        }
      } catch (e) {
        console.warn('Synth error:', e);
      }
    }

    function stopSynthFallback() {
      try {
        if (synthGain) {
          const ctx = getAudioContext();
          synthGain.gain.setValueAtTime(synthGain.gain.value, ctx.currentTime);
          synthGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          setTimeout(() => {
            if (synthOsc1) { try { synthOsc1.stop(); synthOsc1.disconnect(); } catch (e) {} synthOsc1 = null; }
            if (synthOsc2) { try { synthOsc2.stop(); synthOsc2.disconnect(); } catch (e) {} synthOsc2 = null; }
            synthGain = null;
          }, 350);
        }
      } catch (e) {}
    }

    function updateVisualSync() {
      if (!isPacing) return;

      const curTime = (sohamAudio && !isSynthRunning) ? (sohamAudio.currentTime || 0) : 0;
      // Exact boundary matching for soham new voice.mp3 (Total: 19.58s):
      // 0.0s - 4.0s: Phase 1 (SOOO... Inhalation & Cosmic expansion)
      // 4.0s - 10.8s: Phase 2 (HOLD... Breath retention & Silent stillness)
      // 10.8s - 19.58s: Phase 3 (HAM... Exhalation & Deep surrender)
      if (curTime < 4.0) {
        if (label.textContent !== 'SOOO...') {
          label.textContent = 'SOOO...';
          if (subLabel) subLabel.textContent = 'Inhale • Universal Self';
          sphere.style.transition = 'transform 3.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 3.8s ease';
          sphere.style.transform = 'scale(1.42)';
          sphere.style.boxShadow = '0 0 45px rgba(212, 175, 55, 0.8), 0 0 80px rgba(245, 208, 97, 0.5)';
        }
      } else if (curTime < 10.8) {
        if (label.textContent !== 'HOLD...') {
          label.textContent = 'HOLD...';
          if (subLabel) subLabel.textContent = 'Hold • Silent Witness';
          sphere.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
          sphere.style.transform = 'scale(1.42)';
          sphere.style.boxShadow = '0 0 60px rgba(245, 208, 97, 1.0), 0 0 100px rgba(212, 175, 55, 0.7)';
        }
      } else {
        if (label.textContent !== 'HAM...') {
          label.textContent = 'HAM...';
          if (subLabel) subLabel.textContent = 'Exhale • Deep Surrender';
          sphere.style.transition = 'transform 8.0s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 8.0s ease';
          sphere.style.transform = 'scale(1.0)';
          sphere.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.4)';
        }
      }

      animFrameId = requestAnimationFrame(updateVisualSync);
    }

    function startTimerPacingFallback() {
      isSynthRunning = true;
      function cycleFallback() {
        if (!isPacing) return;

        // Phase 1: SOOO (0.0s - 4.0s = 4.0s)
        label.textContent = 'SOOO...';
        if (subLabel) subLabel.textContent = 'Inhale • Universal Self';
        sphere.style.transition = 'transform 3.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 3.8s ease';
        sphere.style.transform = 'scale(1.42)';
        sphere.style.boxShadow = '0 0 45px rgba(212, 175, 55, 0.8), 0 0 80px rgba(245, 208, 97, 0.5)';
        startSynthFallback('so');

        fallbackTimer = setTimeout(() => {
          if (!isPacing) return;

          // Phase 2: HOLD (4.0s - 10.8s = 6.8s)
          label.textContent = 'HOLD...';
          if (subLabel) subLabel.textContent = 'Hold • Silent Witness';
          sphere.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
          sphere.style.transform = 'scale(1.42)';
          sphere.style.boxShadow = '0 0 60px rgba(245, 208, 97, 1.0), 0 0 100px rgba(212, 175, 55, 0.7)';
          startSynthFallback('hold');

          fallbackTimer = setTimeout(() => {
            if (!isPacing) return;

            // Phase 3: HAM (10.8s - 19.58s = 8.78s)
            label.textContent = 'HAM...';
            if (subLabel) subLabel.textContent = 'Exhale • Deep Surrender';
            sphere.style.transition = 'transform 8.0s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 8.0s ease';
            sphere.style.transform = 'scale(1.0)';
            sphere.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.4)';
            startSynthFallback('ham');

            fallbackTimer = setTimeout(() => {
              if (isPacing) cycleFallback();
            }, 8780);
          }, 6800);
        }, 4000);
      }
      cycleFallback();
    }

    function startAudio() {
      // Resume Web Audio Context on user interaction
      try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
      } catch (e) {}

      if (sohamAudio) {
        sohamAudio.volume = 1.0;
        const p = sohamAudio.play();
        if (p !== undefined) {
          p.then(() => {
            isSynthRunning = false;
            updateVisualSync();
          }).catch((err) => {
            console.warn('Audio element blocked/offline, using Web Audio engine fallback:', err);
            startTimerPacingFallback();
          });
        } else {
          updateVisualSync();
        }
      } else {
        startTimerPacingFallback();
      }
    }

    function stopAudio() {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      if (sohamAudio) {
        try {
          sohamAudio.pause();
          sohamAudio.currentTime = 0;
        } catch (e) {}
      }
      stopSynthFallback();
      isSynthRunning = false;
    }

    toggleBtn.addEventListener('click', () => {
      isPacing = !isPacing;
      if (isPacing) {
        toggleBtn.textContent = 'Pause Soham Meditation';
        startAudio();
      } else {
        toggleBtn.textContent = 'Begin Soham Meditation ➔';
        label.textContent = 'SO-HAM';
        if (subLabel) subLabel.textContent = 'Ajapa Japa';
        sphere.style.transition = 'transform 1s ease, box-shadow 1s ease';
        sphere.style.transform = 'scale(1.0)';
        sphere.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.4)';
        stopAudio();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Floating Soham Meditation Launcher & Sanctuary Pod Controller
     -------------------------------------------------------------------------- */
  function initFloatingSohamWidget() {
    const launcher = document.getElementById('floatingSohamLauncher');
    const pod = document.getElementById('floatingSohamPod');
    const closeBtn = document.getElementById('closeSohamPodBtn');

    if (!launcher || !pod) return;

    launcher.addEventListener('click', (e) => {
      e.stopPropagation();
      pod.classList.toggle('is-open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pod.classList.remove('is-open');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (pod.classList.contains('is-open') && !pod.contains(e.target) && !launcher.contains(e.target)) {
        pod.classList.remove('is-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pod.classList.contains('is-open')) {
        pod.classList.remove('is-open');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Three-Dot Drawer Menu Toggle
     -------------------------------------------------------------------------- */
  function initThreeDotDrawer() {
    const btn = document.getElementById('threeDotMenuBtn');
    const drawer = document.getElementById('mobileNavDrawer');

    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
    });

    const links = drawer.querySelectorAll('a, button');
    links.forEach((l) => {
      l.addEventListener('click', () => {
        drawer.classList.remove('is-open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCrystalChakraSuite();
    initLotusBreathVisualizer();
    initFloatingSohamWidget();
    initThreeDotDrawer();
  });
})();
