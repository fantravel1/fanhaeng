/* ============================================
   FANHAENG — Travel as a fan.
   Main JavaScript — Navigation, Interactions, AEO
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // === MOBILE NAVIGATION ===
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // === NAVBAR SCROLL EFFECT ===
  const nav = document.querySelector('.nav');
  if (nav) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // === FAQ ACCORDION ===
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // === SCROLL ANIMATIONS ===
  var animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // === SCORE BAR ANIMATION ===
  var scoreBars = document.querySelectorAll('.score-bar__fill');

  if (scoreBars.length > 0) {
    var scoreObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          scoreObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    scoreBars.forEach(function (bar) {
      bar.style.width = '0%';
      scoreObserver.observe(bar);
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav ? nav.offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // === COUNTER ANIMATION ===
  var counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-count'));
          var suffix = entry.target.getAttribute('data-suffix') || '';
          animateCounter(entry.target, target, suffix);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el, target, suffix) {
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // === IMAGE LAZY LOADING FALLBACK ===
  if (!('loading' in HTMLImageElement.prototype)) {
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      lazyObserver.observe(img);
    });
  }

});
