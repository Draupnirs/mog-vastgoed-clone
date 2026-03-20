/* shared.js — MOG Vastgoed Common Functionality */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // Mobile Menu
  // ========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileNavClose = document.querySelector('.nav-mobile-close button');
  const mobileNavOverlay = document.querySelector('.nav-mobile');

  function openMobileMenu() {
    if (mobileNav) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Small delay so the transition plays after display: block
      requestAnimationFrame(() => {
        mobileNav.style.opacity = '1';
      });
    }
  }

  function closeMobileMenu() {
    if (mobileNav) {
      mobileNav.style.opacity = '0';
      document.body.style.overflow = '';
      setTimeout(() => {
        mobileNav.classList.remove('open');
      }, 300);
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close mobile menu on link click
  const mobileNavLinks = document.querySelectorAll('.nav-mobile-links a, .nav-mobile-actions a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ========================================
  // FAQ Accordion
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    if (question && answer && inner) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-answer').style.maxHeight = '0';
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          answer.style.maxHeight = '0';
        } else {
          item.classList.add('open');
          answer.style.maxHeight = inner.scrollHeight + 'px';
        }
      });
    }
  });

  // ========================================
  // Step Navigation (Feature Dots)
  // ========================================
  const stepDots = document.querySelectorAll('.step-dot');
  const featureCards = document.querySelectorAll('.feature-card');

  function updateActiveStep() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let activeIndex = -1;

    featureCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      if (scrollPos >= top && scrollPos <= bottom) {
        activeIndex = i;
      }
    });

    stepDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  if (stepDots.length && featureCards.length) {
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    updateActiveStep();
  }

  // Step dot click to scroll
  stepDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const card = featureCards[i];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // ========================================
  // Scroll Reveal Animations
  // ========================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
