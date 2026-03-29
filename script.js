/* ═══════════════════════════════════════════════════════
   RATHINAM GLOBAL UNIVERSITY — script.js
   Features:
   · Navbar: transparent ↔ scrolled (dark frosted)
   · Mobile menu toggle
   · Parallax engine (orbs, grid, content, images)
   · Scroll-reveal with IntersectionObserver
   · Animated counters
   · Progress bar triggers
   · Ticker bar
   · Smooth internal anchor scrolling
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CACHE DOM ELEMENTS
  ───────────────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const menuToggle  = document.getElementById('menu-toggle');
  const mobileMenu  = document.getElementById('mobile-menu');
  const heroSection = document.getElementById('hero');

  if (!navbar) return; // Guard: abort if critical elements missing


  /* ═══════════════════════════════════════════
     NAVBAR — transparent ↔ scrolled
  ═══════════════════════════════════════════ */
  function updateNavbar () {
    const heroBottom = heroSection
      ? heroSection.getBoundingClientRect().bottom
      : 0;

    if (heroBottom <= 72) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Immediate call so state is correct on page load
  updateNavbar();


  /* ═══════════════════════════════════════════
     MOBILE MENU TOGGLE
  ═══════════════════════════════════════════ */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      const icon   = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars',  !isOpen);
        icon.classList.toggle('fa-times',  isOpen);
      }
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }


  /* ═══════════════════════════════════════════
     SMOOTH INTERNAL SCROLL
  ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.offsetHeight || 76;
      const top  = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ═══════════════════════════════════════════
     PARALLAX ENGINE
  ═══════════════════════════════════════════ */
  const parallaxOrbs  = document.querySelectorAll('.parallax-orb');
  const parallaxGrid  = document.querySelectorAll('.parallax-grid');
  const parallaxUp    = document.querySelectorAll('.parallax-up');
  const parallaxDown  = document.querySelectorAll('.parallax-down');
  const parallaxImgs  = document.querySelectorAll('.parallax-img');

  function runParallax () {
    const scrollY = window.pageYOffset;

    // Hero ambient orbs — drift up + slight X wobble
    parallaxOrbs.forEach((orb, i) => {
      const speed = parseFloat(orb.dataset.speed) || 0.18;
      const yOff  = scrollY * speed;
      const xOff  = scrollY * speed * (i % 2 === 0 ? 0.2 : -0.15);
      orb.style.transform = `translate(${xOff}px, ${yOff}px)`;
    });

    // Grid — slower than content
    parallaxGrid.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.06;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Hero content — subtle upward drift
    parallaxUp.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.07;
      el.style.transform = `translateY(${-scrollY * speed}px)`;
    });

    // Hero card — slight downward drift (depth separation)
    parallaxDown.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.05;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Section images — gentle float relative to viewport centre
    // parallaxImgs.forEach(el => {
    //   const rect  = el.getBoundingClientRect();
    //   const inVP  = rect.top < window.innerHeight && rect.bottom > 0;
    //   if (!inVP) return;
    //   const speed  = parseFloat(el.dataset.speed) || 0.04;
    //   const offset = (rect.top - window.innerHeight / 2) * speed;
    //   el.style.transform = `translateY(${offset}px)`;
    // });
  }


  /* ═══════════════════════════════════════════
     SCROLL REVEAL
  ═══════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // Trigger elements already in viewport on load
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }, 120);


  /* ═══════════════════════════════════════════
     ANIMATED COUNTERS
  ═══════════════════════════════════════════ */
  function animateCounter (el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 2000; // ms
    const fps      = 60;
    const step     = target / (duration / (1000 / fps));
    let   current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 1000 / fps);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));


  /* ═══════════════════════════════════════════
     PROGRESS BARS
  ═══════════════════════════════════════════ */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar').forEach(el => progressObserver.observe(el));


  /* ═══════════════════════════════════════════
     TICKER PAUSE ON HOVER
  ═══════════════════════════════════════════ */
  const tickerTrack = document.querySelector('.ticker-track');
  const tickerBar   = document.querySelector('.ticker-bar');
  if (tickerTrack && tickerBar) {
    tickerBar.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    tickerBar.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }


  /* ═══════════════════════════════════════════
     UNIFIED SCROLL HANDLER — rAF throttled
  ═══════════════════════════════════════════ */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNavbar();
        runParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial parallax run
  runParallax();


  /* ═══════════════════════════════════════════
     GALLERY — simple lightbox-ready hook
     (No third-party dependency; logs click for future integration)
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        // Placeholder for lightbox integration
        // e.g. GLightbox, PhotoSwipe, etc.
        console.log('Gallery image clicked:', img.alt);
      }
    });
  });


  /* ═══════════════════════════════════════════
     ACTIVE NAV LINK — highlight section in viewport
  ═══════════════════════════════════════════ */
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = (href === `#${id}`)
            ? 'rgba(255,255,255,1)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

})();

/* ═══════════════════════════════════════════
   RECRUITER CAROUSEL — drag to scrub
═══════════════════════════════════════════ */
(function () {
  function initCarousel(id) {
    const track = document.getElementById(id);
    if (!track) return;

    // Clone items for seamless loop
    Array.from(track.children).forEach(item => {
      const clone = item.cloneNode(true);
      clone.dataset.clone = '1';
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    let dragging = false, dragStartX = 0, currentX = 0;

    function getX() {
      return new DOMMatrix(getComputedStyle(track).transform).m41;
    }
    function startDrag(x) {
      dragging = true; dragStartX = x;
      currentX = getX();
      track.style.animation = 'none';
      track.style.transform = `translateX(${currentX}px)`;
    }
    function moveDrag(x) {
      if (!dragging) return;
      let next = currentX + (x - dragStartX);
      const half = track.scrollWidth / 2;
      if (next < -half) next += half;
      if (next > 0)     next -= half;
      track.style.transform = `translateX(${next}px)`;
    }
    function endDrag(x) {
      if (!dragging) return;
      dragging = false;
      let stopX = currentX + (x - dragStartX);
      const half = track.scrollWidth / 2;
      stopX = ((stopX % half) - half) % half;
      if (stopX > 0) stopX -= half;
      const dur  = id === 'recruiterTrack2' ? 28 : 32;
      const delay = -(Math.abs(stopX) / half) * dur;
      track.style.transform = '';
      track.style.animation = '';
      track.style.animationDelay = `${delay}s`;
    }

    track.addEventListener('mousedown',  e => { startDrag(e.clientX); e.preventDefault(); });
    document.addEventListener('mousemove', e => moveDrag(e.clientX));
    document.addEventListener('mouseup',   e => endDrag(e.clientX));
    track.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove',  e => moveDrag(e.touches[0].clientX),  { passive: true });
    track.addEventListener('touchend',   e => endDrag(e.changedTouches[0].clientX));
  }

  initCarousel('recruiterTrack1');
  initCarousel('recruiterTrack2');
})();

/* ═══════════════════════════════════════════
   CAMPUS CAROUSEL — auto-slide every 4s
═══════════════════════════════════════════ */
(function initCampusCarousel () {
  const carousel  = document.querySelector('.campus-carousel');
  if (!carousel) return;

  const track     = carousel.querySelector('.carousel-track');
  const slides    = carousel.querySelectorAll('.carousel-slide');
  const dots      = carousel.querySelectorAll('.carousel-dot');
  const prevBtn   = carousel.querySelector('.carousel-prev');
  const nextBtn   = carousel.querySelector('.carousel-next');
  const total     = slides.length;
  let   current   = 0;
  let   timer     = null;

  function goTo (index) {
    // Wrap around
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next () { goTo(current + 1); }
  function prev () { goTo(current - 1); }

  function startAuto () {
    stopAuto();
    timer = setInterval(next, 4000);
  }
  function stopAuto () {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Arrow controls
  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Dot controls
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Pause on hover, resume on leave
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch / swipe support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    startAuto();
  }, { passive: true });

  // Keyboard support when carousel is focused
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
  });

  // Boot
  goTo(0);
  startAuto();
})();