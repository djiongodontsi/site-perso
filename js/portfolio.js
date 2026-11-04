(() => {
  const themeToggle = document.getElementById('themeToggle');
  const applyTheme = (dark) => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeToggle?.setAttribute('aria-pressed', String(dark));
    themeToggle?.setAttribute('aria-label', dark ? 'Activer le thème clair' : 'Activer le thème sombre');
    if (themeToggle) themeToggle.textContent = dark ? '☼' : '◐';
  };
  let dark = false;
  try { dark = localStorage.getItem('dany-theme') === 'dark'; } catch (_) {}
  applyTheme(dark);
  themeToggle?.addEventListener('click', () => {
    dark = !dark;
    applyTheme(dark);
    try { localStorage.setItem('dany-theme', dark ? 'dark' : 'light'); } catch (_) {}
  });
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navClose');
  const setMenu = (open, returnFocus = true) => {
    if (!mobileNav) return;
    mobileNav.inert = !open;
    mobileNav.classList.toggle('open', open);
    overlay?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn?.focus();
    else if (returnFocus) menuBtn?.focus();
  };
  menuBtn?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  overlay?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false, false)));
  document.addEventListener('keydown', event => {
    if (!mobileNav?.classList.contains('open')) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key === 'Tab') {
      const focusable = [...mobileNav.querySelectorAll('a, button')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav?.classList.contains('open')) setMenu(false, false);
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('.form-status');
    button.disabled = true;
    status.textContent = 'Envoi en cours…';
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(contactForm)).toString()
      });
      if (!response.ok) throw new Error('Submission failed');
      window.location.assign(contactForm.getAttribute('action'));
    } catch (_) {
      status.textContent = 'Le message n’a pas pu être envoyé. Réessayez ou écrivez à djiongodontsi@gmail.com.';
      button.disabled = false;
    }
  });
  const veilleFilters = [...document.querySelectorAll('.veille-filter')];
  veilleFilters.forEach(button => button.addEventListener('click', () => {
    veilleFilters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.veille-article').forEach(article => {
      article.hidden = button.dataset.topic !== 'all' && article.dataset.topic !== button.dataset.topic;
      if (!article.hidden) count++;
    });
    document.getElementById('veilleCount').textContent = `${count} article${count > 1 ? 's' : ''}`;
  }));
  const cards = [...document.querySelectorAll('.project-card-custom')];
  const filters = [...document.querySelectorAll('.filter-btn[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) { count++; card.classList.add('visible'); }
    });
    document.querySelectorAll('.project-year').forEach(group => {
      group.hidden = ![...group.querySelectorAll('.project-card-custom')].some(card => !card.hidden);
    });
    const status = document.getElementById('filterCount');
    if (status) status.textContent = `${count} projet${count > 1 ? 's' : ''}`;
  }));
})();
