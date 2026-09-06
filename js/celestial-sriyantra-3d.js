/**
 * SHRI MOKSHAM — Interactive 3D Sri Yantra & Celestial Globe Engine
 * Canvas Sacred Geometry with Fluid Touch / Mouse Drag Rotation & Stardust
 */

(function () {
  'use strict';

  function initSriYantra3D() {
    const canvas = document.getElementById('sriyantra3DCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth || 380;
    let height = canvas.clientHeight || 380;

    function resize() {
      width = canvas.parentElement.clientWidth || 320;
      height = canvas.parentElement.clientHeight || 200;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    let angleX = 0.25;
    let angleY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      angleY += dx * 0.008;
      angleX += dy * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      angleY += dx * 0.008;
      angleX += dy * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // 9 Sacred Sri Yantra Interlocking Triangles
    const triangles = [
      { yOffset: -50, base: 120, up: false, color: '#C59E3F' },
      { yOffset: -30, base: 100, up: false, color: '#D4AF37' },
      { yOffset: -10, base: 85, up: false, color: '#EBD696' },
      { yOffset: 10, base: 70, up: false, color: '#C59E3F' },
      { yOffset: 30, base: 110, up: true, color: '#D4AF37' },
      { yOffset: 15, base: 95, up: true, color: '#C59E3F' },
      { yOffset: -5, base: 80, up: true, color: '#EBD696' },
      { yOffset: -25, base: 65, up: true, color: '#D4AF37' },
      { yOffset: 0, base: 40, up: true, color: '#C59E3F' }
    ];

    // Particles
    const particles = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      z: (Math.random() - 0.5) * 200,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.02 + 0.01
    }));

    function render() {
      if (!isDragging) {
        angleY += 0.005; // Gentle ambient rotation
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const geomScale = Math.min(width / 320, height / 200, 0.95);

      // Draw Outer Golden Halo Ring
      ctx.save();
      ctx.translate(cx, cy);

      const rad = 86 * geomScale;
      ctx.beginPath();
      ctx.arc(0, 0, rad, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Rotating Zodiac Degree Markers
      for (let i = 0; i < 12; i++) {
        const theta = (i * Math.PI / 6) + angleY;
        const x1 = Math.cos(theta) * rad;
        const y1 = Math.sin(theta) * rad;
        const x2 = Math.cos(theta) * (rad - 6 * geomScale);
        const y2 = Math.sin(theta) * (rad - 6 * geomScale);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(197, 158, 63, 0.7)';
        ctx.stroke();
      }

      // 3D Sacred Geometry Transformation
      triangles.forEach((t) => {
        ctx.save();
        const rotX = Math.cos(angleX);
        const rotY = Math.sin(angleY);

        ctx.strokeStyle = t.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.shadowBlur = 6;

        const h = t.base * 0.86;
        const topY = (t.up ? t.yOffset - h * rotX : t.yOffset + h * rotX) * geomScale * 0.72;
        const botY = (t.up ? t.yOffset + h * 0.5 * rotX : t.yOffset - h * 0.5 * rotX) * geomScale * 0.72;
        const halfB = (t.base / 2) * Math.cos(angleY * 0.5) * geomScale * 0.72;

        ctx.beginPath();
        ctx.moveTo(0, topY);
        ctx.lineTo(-halfB, botY);
        ctx.lineTo(halfB, botY);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      });

      // Stardust Points
      particles.forEach((p) => {
        p.y += Math.sin(angleY) * 0.5;
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const px = (p.x * cosY - p.z * sinY) * geomScale * 0.75;
        const pz = (p.x * sinY + p.z * cosY) * geomScale * 0.75;

        const scaleFactor = 300 / (300 + pz);
        const finalX = px * scaleFactor;
        const finalY = p.y * scaleFactor * geomScale * 0.75;

        ctx.beginPath();
        ctx.arc(finalX, finalY, Math.max(0.8, p.radius * scaleFactor * geomScale), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.fill();
      });

      // Bindu (Central Point of Singularity)
      ctx.beginPath();
      ctx.arc(0, 0, 3.5 * geomScale, 0, Math.PI * 2);
      ctx.fillStyle = '#D4AF37';
      ctx.shadowColor = '#FFFFFF';
      ctx.fill();
      ctx.restore();
      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    }

    let isVisible = false;
    let animId = null;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              render();
            }
          } else {
            isVisible = false;
            if (animId) cancelAnimationFrame(animId);
          }
        });
      }, { rootMargin: '100px' });

      observer.observe(canvas);
    } else {
      isVisible = true;
      render();
    }
  }

  document.addEventListener('DOMContentLoaded', initSriYantra3D);
})();
