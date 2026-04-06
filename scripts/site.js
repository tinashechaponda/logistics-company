/* ================================================
   BALM OF GILEAD LOGISTICS — site.js
   External script (CSP: script-src 'self' requires
   all JS in external files — no inline scripts)
================================================ */

/* --- Nav: scroll shadow + hamburger ----------- */
(function () {
  var nav       = document.getElementById('mainNav');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

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
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- Quote form (contact.html) ---------------- */
(function () {
  var form    = document.getElementById('quoteForm');
  var success = document.getElementById('form-success');
  var error   = document.getElementById('form-error');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
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
    });
  });
})();

/* --- Subcontractor form (subcontractors.html) - */
(function () {
  var form    = document.getElementById('subForm');
  var success = document.getElementById('sub-success');
  var error   = document.getElementById('sub-error');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
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
    });
  });
})();
