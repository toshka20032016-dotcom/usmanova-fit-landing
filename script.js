/**
 * UsmanovaTeam Fitness Landing — script.js
 */

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const name = nameInput.value.trim();

  showThankYouAlert(name);

  nameInput.value = '';
  emailInput.value = '';

  return false;
}

function showThankYouAlert(name) {
  const existing = document.querySelector('.alert-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'alert-toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = name
    ? `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`
    : 'Спасибо! Мы свяжемся с вами в ближайшее время.';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
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
