/**
 * UsmanovaTeam Fitness Landing — script.js
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function scrollToForm() {
  const form = document.getElementById('lead-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function validateName(input) {
  const valid = input.value.trim().length > 0;
  input.classList.toggle('input--valid', valid && input.value.length > 0);
  input.classList.toggle('input--invalid', !valid && input.value.length > 0);
  return valid;
}

function validateEmail(input) {
  const value = input.value.trim();
  if (!value) {
    input.classList.remove('input--valid', 'input--invalid');
    return false;
  }
  const valid = EMAIL_RE.test(value);
  input.classList.toggle('input--valid', valid);
  input.classList.toggle('input--invalid', !valid);
  return valid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const submitBtn = form.querySelector('#submit-btn');

  const nameValid = validateName(nameInput);
  const emailValid = validateEmail(emailInput);

  if (!nameValid || !emailValid) {
    if (!nameValid) nameInput.classList.add('input--invalid');
    if (!emailValid) emailInput.classList.add('input--invalid');
    return false;
  }

  const name = nameInput.value.trim();
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';

  setTimeout(() => {
    showSuccessModal(name);
    nameInput.value = '';
    emailInput.value = '';
    nameInput.classList.remove('input--valid', 'input--invalid');
    emailInput.classList.remove('input--valid', 'input--invalid');
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 1500);

  return false;
}

function showSuccessModal(name) {
  const modal = document.getElementById('success-modal');
  const message = document.getElementById('modal-message');
  if (!modal || !message) return;

  message.textContent = name
    ? `${name}, спасибо за обращение! Мы свяжемся с вами в ближайшее время.`
    : 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.';

  modal.classList.add('modal--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  modal.classList.remove('modal--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initModal() {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeModal();
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    observer.observe(el);
  });
}

function initCategoryFilter() {
  const tabs = document.querySelectorAll('.category-tab');
  const cards = document.querySelectorAll('.course-card[data-category]');
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('category-tab--active', active);
        t.setAttribute('aria-selected', String(active));
      });

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;

        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.classList.remove('is-filtered-out');
          });
        } else if (!card.classList.contains('is-filtered-out')) {
          card.classList.add('is-filtered-out');
          card.addEventListener(
            'transitionend',
            function onEnd(e) {
              if (e.propertyName === 'opacity' && card.classList.contains('is-filtered-out')) {
                card.style.display = 'none';
                card.removeEventListener('transitionend', onEnd);
              }
            }
          );
        }
      });
    });
  });
}

function initFormValidation() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  if (!nameInput || !emailInput) return;

  const onName = () => validateName(nameInput);
  const onEmail = () => validateEmail(emailInput);

  nameInput.addEventListener('input', onName);
  nameInput.addEventListener('blur', onName);
  emailInput.addEventListener('input', onEmail);
  emailInput.addEventListener('blur', onEmail);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollReveal();
  initCategoryFilter();
  initFormValidation();
  initModal();
});
