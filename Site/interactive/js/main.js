/**
 * JAVASCRIPT - PROJET VERSION AVEC JS
 * Coach : CAPO-CHICHI Miguel
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initFaqAccordion();
  initPackFilters();
  initContactModal();
});

/* 1. Header scroll effect */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. Mobile navigation toggle */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 3. FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* 4. Pack Filter Buttons */
function initPackFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const packCards = document.querySelectorAll('.pack-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      packCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Contact / Booking Modal */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const closeBtn = document.getElementById('modalClose');
  const whatsappBtn = document.getElementById('modalWhatsappLink');

  if (!modal) return;

  window.openContactModal = function(packName = 'Pack Découverte (0 €)') {
    modal.classList.add('active');
    if (modalTitle) modalTitle.textContent = `Réserver : ${packName}`;
    if (modalSubtitle) modalSubtitle.textContent = `Contactez directement Miguel CAPO-CHICHI pour réserver votre créneau de ${packName}.`;

    // Update WhatsApp pre-filled message link
    if (whatsappBtn) {
      const text = encodeURIComponent(`Bonjour Miguel, je souhaite effectuer une réservation pour la formule : ${packName}. Merci de m'indiquer vos prochaines disponibilités !`);
      whatsappBtn.href = `https://wa.me/?text=${text}`;
    }
  };

  window.closeContactModal = function() {
    modal.classList.remove('active');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeContactModal();
    }
  });
}
