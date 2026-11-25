/* ============================================================================
   DFASH Express Logistics Services — Main Script (ELIOS Layout Edition)
   Blocks:
   1. Environment & Reduced-Motion Guard
   2. Smooth Scroll (Lenis on fine-pointer desktop only; native touch preserved)
   3. GSAP + ScrollTrigger Motion & Failsafe Reveal
   4. Services Showcase Carousel & Customer Proof Carousel (Swiper)
   5. Sticky Header State & Active Nav Highlight
   6. Accessible Mobile Drawer (Focus Trap, Esc, Outside Tap, Scroll Lock)
   7. FAQ Accordion
   8. Static Quote Form Validation & WhatsApp Prefill Helper
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Environment & Reduced-Motion Guard
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointerDesktop =
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(hover: hover)').matches &&
    window.innerWidth >= 1024;

  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';
  const hasSwiper = typeof window.Swiper !== 'undefined';

  /* --------------------------------------------------------------------------
     2. Smooth Scroll (Lenis desktop-only; touch devices keep native scrolling)
     -------------------------------------------------------------------------- */
  let lenis = null;

  if (hasGSAP && hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.config({ ignoreMobileResize: true });
  }

  if (!prefersReducedMotion && isFinePointerDesktop && hasLenis) {
    lenis = new window.Lenis();

    if (hasGSAP && hasScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const headerHeight = document.getElementById('site-header')?.offsetHeight || 74;

      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -headerHeight });
      } else {
        const y = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. GSAP + ScrollTrigger Reveals & Failsafe
     -------------------------------------------------------------------------- */
  const revealAllFallback = () => {
    document.querySelectorAll('.hero-anim, .reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  };

  if (!prefersReducedMotion && hasGSAP && hasScrollTrigger) {
    const mm = window.gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      window.gsap.from('.hero-anim', {
        y: 22,
        opacity: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      window.gsap.utils.toArray('.reveal').forEach((el) => {
        window.gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
    });

    mm.add('(max-width: 767px)', () => {
      window.gsap.from('.hero-anim', {
        y: 14,
        opacity: 0,
        duration: 0.52,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });

      window.gsap.utils.toArray('.reveal').forEach((el) => {
        window.gsap.from(el, {
          y: 14,
          opacity: 0,
          duration: 0.48,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        });
      });
    });

    window.addEventListener('load', () => {
      window.ScrollTrigger.refresh();
    });

    window.addEventListener('orientationchange', () => {
      window.setTimeout(() => window.ScrollTrigger.refresh(), 250);
    });
  } else {
    revealAllFallback();
  }

  // Failsafe reveal guard
  window.setTimeout(() => {
    document.querySelectorAll('.hero-anim').forEach((el) => {
      if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 1800);

  /* --------------------------------------------------------------------------
     4. Services Split Showcase Carousel & Reviews Carousel (Swiper)
     -------------------------------------------------------------------------- */
  const servicesEl = document.getElementById('services-swiper');
  if (servicesEl && hasSwiper) {
    const servicesSwiper = new window.Swiper(servicesEl, {
      slidesPerView: 1,
      spaceBetween: 16,
      autoHeight: false,
      grabCursor: true,
      preventClicks: true,
      preventClicksPropagation: true,
      touchAngle: 35,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous logistics service',
        nextSlideMessage: 'Next logistics service',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: '.services-pagination',
        clickable: true,
      },
    });

    // Wire all slide-internal prev/next square buttons cleanly
    servicesEl.addEventListener('click', (event) => {
      if (event.target.closest('.services-next')) {
        if (servicesSwiper.isEnd) servicesSwiper.slideTo(0);
        else servicesSwiper.slideNext();
      } else if (event.target.closest('.services-prev')) {
        if (servicesSwiper.isBeginning) servicesSwiper.slideTo(servicesSwiper.slides.length - 1);
        else servicesSwiper.slidePrev();
      }
    });
  }

  const reviewsEl = document.getElementById('reviews-swiper');
  if (reviewsEl && hasSwiper) {
    new window.Swiper(reviewsEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      touchAngle: 35,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous customer review',
        nextSlideMessage: 'Next customer review',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: '.reviews-next',
        prevEl: '.reviews-prev',
      },
      pagination: {
        el: '.reviews-pagination',
        clickable: true,
      },
    });
  }

  /* --------------------------------------------------------------------------
     5. Sticky Header Scroll State & Active Nav Highlight
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  if ('IntersectionObserver' in window && observedSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-32% 0px -56% 0px' }
    );
    observedSections.forEach((sec) => observer.observe(sec));
  }

  /* --------------------------------------------------------------------------
     6. Accessible Mobile Drawer (Focus Trap, Esc, Outside Tap, Scroll Lock)
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));

  let lastFocusedEl = null;

  const getFocusableInDrawer = () => {
    if (!mobileDrawer) return [];
    return Array.from(
      mobileDrawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  const openDrawer = () => {
    if (!mobileDrawer || !mobileBackdrop || !navToggle) return;
    lastFocusedEl = document.activeElement;

    mobileDrawer.hidden = false;
    mobileBackdrop.hidden = false;

    requestAnimationFrame(() => {
      mobileDrawer.classList.add('is-open');
      mobileBackdrop.classList.add('is-open');
    });

    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
    if (lenis) lenis.stop();

    const focusables = getFocusableInDrawer();
    if (focusables.length) focusables[0].focus();
  };

  const closeDrawer = ({ restoreFocus = true } = {}) => {
    if (!mobileDrawer || !mobileBackdrop || !navToggle || mobileDrawer.hidden) return;

    mobileDrawer.classList.remove('is-open');
    mobileBackdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
    if (lenis) lenis.start();

    window.setTimeout(() => {
      if (!mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.hidden = true;
        mobileBackdrop.hidden = true;
      }
    }, prefersReducedMotion ? 10 : 320);

    if (restoreFocus && lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  mobileClose?.addEventListener('click', () => closeDrawer());
  mobileBackdrop?.addEventListener('click', () => closeDrawer());

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => closeDrawer({ restoreFocus: false }));
  });

  document.addEventListener('keydown', (event) => {
    if (!mobileDrawer || mobileDrawer.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key === 'Tab') {
      const focusables = getFocusableInDrawer();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileDrawer && !mobileDrawer.hidden) {
      closeDrawer({ restoreFocus: false });
    }
  });

  /* --------------------------------------------------------------------------
     7. FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqTriggers = Array.from(document.querySelectorAll('.faq-trigger'));

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      faqTriggers.forEach((other) => {
        if (other === trigger) return;
        other.setAttribute('aria-expanded', 'false');
        const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
        if (otherPanel) otherPanel.hidden = true;
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });

  /* --------------------------------------------------------------------------
     8. Static Quote Form Validation & WhatsApp Prefill (Zero Network Request)
     -------------------------------------------------------------------------- */
  const quoteForm = document.getElementById('quote-form');
  const formStatus = document.getElementById('form-status');

  if (quoteForm && formStatus) {
    const requiredFields = [
      { id: 'q-name', errId: 'err-name', msg: 'Please enter your name.' },
      { id: 'q-phone', errId: 'err-phone', msg: 'Please enter a valid phone or WhatsApp number.' },
      { id: 'q-service', errId: 'err-service', msg: 'Please select a logistics service.' },
      { id: 'q-pickup', errId: 'err-pickup', msg: 'Please enter a pickup location.' },
      { id: 'q-dropoff', errId: 'err-dropoff', msg: 'Please enter a destination.' },
    ];

    const clearFieldError = (input, errEl) => {
      input.removeAttribute('aria-invalid');
      if (errEl) errEl.textContent = '';
    };

    requiredFields.forEach(({ id, errId }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(errId);
      input?.addEventListener('input', () => clearFieldError(input, errEl));
      input?.addEventListener('change', () => clearFieldError(input, errEl));
    });

    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let firstInvalid = null;

      requiredFields.forEach(({ id, errId, msg }) => {
        const input = document.getElementById(id);
        const errEl = document.getElementById(errId);
        if (!input) return;

        const val = input.value.trim();
        const isPhoneTooShort = id === 'q-phone' && val.replace(/\D/g, '').length < 7;

        if (!val || isPhoneTooShort) {
          input.setAttribute('aria-invalid', 'true');
          if (errEl) errEl.textContent = msg;
          if (!firstInvalid) firstInvalid = input;
        } else {
          clearFieldError(input, errEl);
        }
      });

      if (firstInvalid) {
        formStatus.hidden = true;
        firstInvalid.focus();
        return;
      }

      const name = document.getElementById('q-name').value.trim();
      const phone = document.getElementById('q-phone').value.trim();
      const service = document.getElementById('q-service').value.trim();
      const weight = document.getElementById('q-weight').value.trim() || 'Not specified';
      const pickup = document.getElementById('q-pickup').value.trim();
      const dropoff = document.getElementById('q-dropoff').value.trim();
      const notes = document.getElementById('q-notes').value.trim() || 'None';

      const waMessage = [
        'Hello D-Fash Express, I would like a delivery quote:',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Pickup: ${pickup}`,
        `Destination: ${dropoff}`,
        `Weight/Size: ${weight}`,
        `Notes: ${notes}`,
      ].join('\n');

      const waUrl = `https://wa.me/2349067270530?text=${encodeURIComponent(waMessage)}`;

      formStatus.hidden = false;
      formStatus.innerHTML = `Your quote summary is ready (this demo form is not connected to email yet). <a href="${waUrl}" target="_blank" rel="noopener noreferrer">Tap here to send these details on WhatsApp</a> or call <a href="tel:+2349067270530">+234 906 727 0530</a>.`;
    });
  }
});
