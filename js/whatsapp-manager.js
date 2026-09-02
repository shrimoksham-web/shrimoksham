/**
 * SHRI MOKSHAM — Universal WhatsApp Action Manager
 * Direct WhatsApp dispatch for all actions with context-aware pre-filled messages (No input forms)
 */

(function () {
  'use strict';

  const whatsappMessages = {
    course: 'Namaste Shri Moksham, I would like to know more about the 4–5 Month Certified Jyotish Course and enrolment.',
    consultation: 'Namaste Shri Moksham, I would like to enquire about a personal Jyotish consultation for directional guidance.',
    meditation: 'Namaste Shri Moksham, I would like to enquire about the meditation and conscious breathing programmes.',
    seva: 'Namaste Shri Moksham, I would like to participate in Seva initiatives and support the spiritual vision.',
    rishikesh: 'Namaste Shri Moksham, I would like to learn more and support the Rishikesh spiritual retreat vision.',
    donate: 'Namaste Shri Moksham, I would like to make a contribution / donation towards Seva.',
    general: 'Namaste Shri Moksham, I would like to connect and learn more about your offerings.'
  };

  function sendWhatsApp(category = 'general') {
    const text = whatsappMessages[category] || whatsappMessages.general;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/919997066326?text=${encoded}`;
    window.open(url, '_blank');
  }

  function initWhatsAppManager() {
    // Attach listener to all trigger buttons across the entire website
    document.querySelectorAll('[data-enquiry-trigger], [data-whatsapp-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('data-enquiry-trigger') || btn.getAttribute('data-whatsapp-action') || 'general';
        sendWhatsApp(action);
      });
    });

    // Expose global helper
    window.triggerShriMokshamWhatsApp = sendWhatsApp;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppManager);
  } else {
    initWhatsAppManager();
  }
})();
