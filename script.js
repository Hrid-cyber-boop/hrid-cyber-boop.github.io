/**
 * Mashrur Alam (Hrid) - Software Developer Portfolio
 * Vanilla JavaScript for Theme Management, Interactivity & Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDisclaimerBanner();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initCopyButtons();
  initPrintButton();
  initContactForm();
});

/* --- 1. Theme Management (Dark / Light Mode) --- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}

/* --- 2. Disclaimer Banner Dismissal --- */
function initDisclaimerBanner() {
  const closeBtn = document.getElementById('closeBannerBtn');
  const banner = document.getElementById('disclaimerBanner');
  if (!closeBtn || !banner) return;

  closeBtn.addEventListener('click', () => {
    banner.style.transition = 'opacity 0.25s ease, height 0.25s ease, margin 0.25s ease, padding 0.25s ease';
    banner.style.opacity = '0';
    banner.style.height = '0';
    banner.style.padding = '0';
    banner.style.margin = '0';
    banner.style.overflow = 'hidden';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 250);
  });
}

/* --- 3. Mobile Navigation Menu Toggle --- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- 4. ScrollSpy / Active Link Navigation --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 5. Project Filtering --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 6. Copy to Clipboard Utility --- */
function initCopyButtons() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (!copyEmailBtn) return;

  copyEmailBtn.addEventListener('click', () => {
    const textToCopy = copyEmailBtn.getAttribute('data-copy');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const copyTextSpan = copyEmailBtn.querySelector('.copy-text');
      const originalText = copyTextSpan ? copyTextSpan.textContent : 'Copy Email';
      
      if (copyTextSpan) copyTextSpan.textContent = 'Copied!';
      copyEmailBtn.classList.add('btn-primary');

      setTimeout(() => {
        if (copyTextSpan) copyTextSpan.textContent = originalText;
        copyEmailBtn.classList.remove('btn-primary');
      }, 2000);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  });
}

/* --- 7. Print Resume Utility --- */
function initPrintButton() {
  const printBtn = document.getElementById('printResumeBtn');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

/* --- 8. Contact Form Validation & Mailto Trigger --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const subjectInput = document.getElementById('subjectInput');
  const messageInput = document.getElementById('messageInput');
  const successAlert = document.getElementById('formSuccessAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      showError('nameError', nameInput);
      isValid = false;
    } else {
      clearError('nameError', nameInput);
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError('emailError', emailInput);
      isValid = false;
    } else {
      clearError('emailError', emailInput);
    }

    // Subject Validation
    if (!subjectInput.value.trim()) {
      showError('subjectError', subjectInput);
      isValid = false;
    } else {
      clearError('subjectError', subjectInput);
    }

    // Message Validation (min 10 chars)
    if (messageInput.value.trim().length < 10) {
      showError('messageError', messageInput);
      isValid = false;
    } else {
      clearError('messageError', messageInput);
    }

    if (isValid) {
      // Trigger native mailto link
      const recipient = 'mashrur.alam@mohawkcollege.ca';
      const subject = encodeURIComponent(subjectInput.value.trim());
      const body = encodeURIComponent(`From: ${nameInput.value.trim()} (${emailInput.value.trim()})

Message:
${messageInput.value.trim()}`);
      
      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
      
      if (successAlert) {
        successAlert.classList.add('visible');
      }

      // Open email client
      window.location.href = mailtoLink;
      form.reset();

      setTimeout(() => {
        if (successAlert) successAlert.classList.remove('visible');
      }, 8000);
    }
  });

  function showError(errorId, inputElement) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('visible');
    inputElement.classList.add('invalid');
  }

  function clearError(errorId, inputElement) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.remove('visible');
    inputElement.classList.remove('invalid');
  }
}
