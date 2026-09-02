/**
 * SHRI MOKSHAM — Enhanced Himalayan Dew, Moisture Droplet & Star Stardust Canvas
 * Renders interactive translucent moisture droplets, gentle cursor ripple rings, and twinkling celestial stars
 */

(function () {
  'use strict';

  function initDropletCanvas() {
    const canvas = document.getElementById('himalayanDropletCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouseX = -1000;
    let mouseY = -1000;
    let ripples = [];

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn subtle water ripple occasionally on mouse move
      if (Math.random() > 0.85) {
        ripples.push({
          x: mouseX,
          y: mouseY,
          radius: 2,
          maxRadius: Math.random() * 45 + 25,
          opacity: 0.45
        });
      }
    });

    const droplets = [];
    const dropletCount = Math.min(60, Math.floor(window.innerWidth / 24));

    // Sparkling Celestial Stars
    const stars = [];
    const starCount = Math.min(40, Math.floor(window.innerWidth / 35));

    class DewDroplet {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -15;
        this.radius = Math.random() * 3.2 + 1.2;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.45 + 0.25;
        this.glow = Math.random() * 8 + 4;
        this.isGoldReflect = Math.random() > 0.6;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Interactive mouse gentle push
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );

        if (this.isGoldReflect) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.3})`);
          gradient.addColorStop(0.6, `rgba(244, 226, 175, ${this.opacity * 0.7})`);
          gradient.addColorStop(1, `rgba(184, 134, 11, ${this.opacity * 0.2})`);
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.3})`);
          gradient.addColorStop(0.6, `rgba(213, 227, 236, ${this.opacity * 0.75})`);
          gradient.addColorStop(1, `rgba(112, 148, 176, ${this.opacity * 0.25})`);
          ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
        }

        ctx.fillStyle = gradient;
        ctx.shadowBlur = this.glow;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.5})`;
        ctx.fill();

        ctx.restore();
      }
    }

    class CelestialStar {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.6 + 0.6;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.008;
      }

      update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > 0.8 || this.alpha < 0.15) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, this.alpha)})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < dropletCount; i++) {
      droplets.push(new DewDroplet());
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new CelestialStar());
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      // Draw Water Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.9;
        r.opacity -= 0.012;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184, 134, 11, ${r.opacity * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Draw Droplets
      for (let i = 0; i < droplets.length; i++) {
        droplets[i].update();
        droplets[i].draw();
      }

      requestAnimationFrame(render);
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropletCanvas);
  } else {
    initDropletCanvas();
  }
})();
