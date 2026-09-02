/**
 * SHRI MOKSHAM — Dynamic Himalayan Atmosphere Engine
 * Switch between Dawn (Brahma Muhurta), Golden Sun (Midday), and Himalayan Midnight
 */

(function () {
  'use strict';

  function initAtmosphereSwitcher() {
    const buttons = document.querySelectorAll('.atmosphere-btn');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');

        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        document.body.classList.remove('theme-dawn', 'theme-midday', 'theme-midnight');

        if (theme === 'midnight') {
          document.body.classList.add('theme-midnight');
        } else if (theme === 'dawn') {
          document.body.classList.add('theme-dawn');
        } else {
          document.body.classList.add('theme-midday');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAtmosphereSwitcher);
})();
