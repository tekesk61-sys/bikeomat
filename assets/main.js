/* ===================================================================
   BIKEOMAT — Interaktion
   =================================================================== */
(function () {
  'use strict';

  /* ---- Header: Schatten beim Scrollen ---- */
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Navigation ---- */
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    });
  });

  /* ---- Tabs (generisch: [data-tab] / [data-panel]) ---- */
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === key));
      });
    });
  });

  /* ---- Einsatzorte-Karte: Liste <-> Pin sync ---- */
  const useList = document.querySelector('.use-list');
  if (useList) {
    const setActive = (key) => {
      document.querySelectorAll('.use-list button').forEach(b =>
        b.classList.toggle('active', b.dataset.use === key));
      document.querySelectorAll('[data-usepanel]').forEach(p =>
        p.classList.toggle('active', p.dataset.usepanel === key));
      document.querySelectorAll('.map-pin').forEach(p => {
        const on = p.dataset.use === key;
        p.querySelector('.dot').style.background = on ? '#fff' : 'var(--green)';
        p.style.zIndex = on ? 5 : 1;
      });
    };
    useList.querySelectorAll('button').forEach(b =>
      b.addEventListener('click', () => setActive(b.dataset.use)));
    document.querySelectorAll('.map-pin').forEach(p =>
      p.addEventListener('click', () => setActive(p.dataset.use)));
  }

  /* ---- Count-up Statistiken ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec = (el.dataset.count.split('.')[1] || '').length;
        let start = 0; const dur = 1400; const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec).replace('.', ',') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
  }

  /* ---- Formular-Submit via FormSubmit.co ---- */
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const ok = form.querySelector('.form-success');
      if (btn) { btn.textContent = 'Wird gesendet …'; btn.disabled = true; }
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
      .then(r => r.json())
      .then(data => {
        form.querySelectorAll('.field, .field-row, .chips, .form-actions').forEach(el => el.style.display = 'none');
        if (ok) ok.style.display = 'block';
        else if (btn) { btn.textContent = 'Gesendet ✓'; }
      })
      .catch(() => {
        if (btn) { btn.textContent = 'Fehler – bitte erneut versuchen'; btn.disabled = false; }
      });
    });
  });

  /* ---- Jahr im Footer ---- */
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
