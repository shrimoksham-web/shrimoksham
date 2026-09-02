/**
 * SHRI MOKSHAM — Universal Enquiry Modal & WhatsApp Connector
 * Coordinates context-sensitive booking triggers and pre-filled WhatsApp actions
 */

(function () {
  'use strict';

  function initEnquiryModal() {
    const modalBackdrop = document.getElementById('enquiryModalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const enquiryForm = document.getElementById('enquiryForm');
    const subjectSelect = document.getElementById('enquirySubjectSelect');
    const messageTextarea = document.getElementById('enquiryMessage');
    const whatsappDirectBtn = document.getElementById('modalWhatsAppBtn');
    const toast = document.getElementById('toastNotification');

    if (!modalBackdrop) return;

    const prefilledTemplates = {
      course: {
        subject: 'jyotish-course',
        text: 'Namaste Shri Moksham, I would like to know more about the 4–5 Month Certified Jyotish Course curriculum and enrolment.'
      },
      consultation: {
        subject: 'jyotish-consultation',
        text: 'Namaste Shri Moksham, I would like to enquire about a Jyotish consultation for self-understanding and directional guidance.'
      },
      meditation: {
        subject: 'meditation-program',
        text: 'Namaste Shri Moksham, I would like to enquire about the meditation and conscious breathing programmes.'
      },
      seva: {
        subject: 'seva-support',
        text: 'Namaste Shri Moksham, I would like to contribute towards Seva initiatives and support the spiritual vision.'
      },
      rishikesh: {
        subject: 'rishikesh-vision',
        text: 'Namaste Shri Moksham, I would like to learn more and support the Rishikesh spiritual retreat vision.'
      },
      donate: {
        subject: 'donation-pledge',
        text: 'Namaste Shri Moksham, I would like to make a contribution / donation towards Seva.'
      },
      general: {
        subject: 'general-enquiry',
        text: 'Namaste Shri Moksham, I would like to connect and learn more about your offerings.'
      }
    };

    function showToast(message) {
      if (!toast) return;
      toast.querySelector('.toast-text').textContent = message;
      toast.classList.add('is-shown');
      setTimeout(() => {
        toast.classList.remove('is-shown');
      }, 4500);
    }

    function openModal(category = 'general') {
      const config = prefilledTemplates[category] || prefilledTemplates.general;

      if (subjectSelect) {
        subjectSelect.value = config.subject;
      }
      if (messageTextarea) {
        messageTextarea.value = config.text;
      }

      modalBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    // Attach listeners to all trigger buttons across page
    document.querySelectorAll('[data-enquiry-trigger]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const category = btn.getAttribute('data-enquiry-trigger') || 'general';
        openModal(category);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
        closeModal();
      }
    });

    // WhatsApp Action from modal
    if (whatsappDirectBtn) {
      whatsappDirectBtn.addEventListener('click', () => {
        const msg = messageTextarea ? encodeURIComponent(messageTextarea.value) : encodeURIComponent('Namaste Shri Moksham, I would like to enquire about your spiritual and Jyotish offerings.');
        const url = `https://wa.me/919997066326?text=${msg}`;
        window.open(url, '_blank');
      });
    }

    // Form submission
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('enquiryName')?.value || 'Seeker';
        closeModal();
        showToast(`Thank you, ${name}. Your enquiry has been received in grace. We will respond shortly.`);
        enquiryForm.reset();
      });
    }

    // Global helper
    window.openShriMokshamModal = openModal;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryModal);
  } else {
    initEnquiryModal();
  }
})();
