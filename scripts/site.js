/* ================================================
   BALM OF GILEAD LOGISTICS — scripts/site.js
   External file required by CSP: script-src 'self'
   All JS must live here — NO inline scripts.
================================================ */

/* --- Nav: scroll shadow + hamburger ----------- */
(function () {
  var nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

/* --- Scroll reveal animation ------------------ */
(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- Quote form: async Formspree submit ------- */
(function () {
  var form    = document.getElementById('quoteForm');
  var success = document.getElementById('form-success');
  var error   = document.getElementById('form-error');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.form-submit');
    if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; }

    fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        if (success) success.style.display = 'block';
        if (error)   error.style.display   = 'none';
        form.reset();
        form.style.display = 'none';
      } else {
        throw new Error('failed');
      }
    })
    .catch(function () {
      if (error)   error.style.display   = 'block';
      if (success) success.style.display = 'none';
      if (btn) { btn.textContent = 'Submit Quote Request \u2192'; btn.disabled = false; }
    });
  });
})();
