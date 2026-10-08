const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const progressBar = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-top-float');
const modal = document.querySelector('#project-modal');
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];

window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.loader')?.classList.add('is-hidden'), 500);
});

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  backToTop.classList.toggle('is-visible', window.scrollY > 650);
  let currentSection = 'home';
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.36) currentSection = link.hash;
  });
  sectionLinks.forEach((link) => {
    if (link.hash === currentSection) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.count);
    const start = performance.now();
    const duration = 1000;
    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      entry.target.textContent = Math.round(target * (1 - (1 - progress) ** 3));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.8 });

document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));

const filters = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card[data-categories]');
filters.forEach((filter) => filter.addEventListener('click', () => {
  const selected = filter.dataset.filter;
  filters.forEach((button) => {
    const active = button === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach((card) => {
    const categories = card.dataset.categories.split(' ');
    const shouldShow = selected === 'all' || categories.includes(selected);
    card.classList.toggle('is-hidden', !shouldShow);
    card.classList.remove('is-filtering-out');
  });
}));

const projectData = {
  curology: {
    title: 'CUROLOGY', category: 'WEB DESIGN / UI & UX / BEAUTY BRAND',
    website: 'https://nishitajakhotia821-droid.github.io/curology/',
    overview: 'A clean, conversion-focused skincare website with polished product storytelling and a premium wellness brand mood.',
    direction: 'Minimal layouts, soft skincare imagery and a confident editorial rhythm that keeps the experience premium and easy to browse.',
    tools: 'HTML, CSS, JavaScript, responsive design',
    sections: 'Hero, product highlights, brand story, benefits, categories, ingredients, reviews and contact.',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=85']
  },
  aurelia: {
    title: 'AURELIA CAFÉ', category: 'WEB DESIGN / UI & UX / HOSPITALITY',
    website: 'https://nishitajakhotia821-droid.github.io/Aurelia-Cafe/',
    overview: 'A warm hospitality website built around coffee culture, inviting interiors and a memorable café experience.',
    direction: 'Earthy espresso tones, creamy surfaces, expressive serif type and rich food photography create a welcoming, editorial feel.',
    tools: 'HTML, CSS, JavaScript, visual design',
    sections: 'Hero, story, specials, menu, coffee culture, gallery, reservations and contact.',
    images: ['https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85']
  },
  kazuko: {
    title: 'KAZUKO', category: 'WEB DESIGN / UI & UX / BRAND EXPERIENCE',
    website: 'https://nishitajakhotia821-droid.github.io/kazuko/',
    overview: 'A refined restaurant and brand experience designed to tell a premium story through polished visuals and intuitive browsing.',
    direction: 'Editorial layouts, warm neutrals and focused details that elevate the restaurant atmosphere without cluttering the experience.',
    tools: 'HTML, CSS, JavaScript, responsive design',
    sections: 'Landing page, menu, ambiance, dining story, gallery, reservation callouts and contact.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85']
  },
  eleve: {
    title: 'ÉLEVÉ BAKERY', category: 'WEB DESIGN / UI & UX / FOOD',
    website: 'https://nishitajakhotia821-droid.github.io/eleve-bakery/',
    overview: 'A luxury bakery experience built around handcrafted pastries, signature menus and a warm artisanal story.',
    direction: 'Soft cream, butter yellow, deep cocoa and tactile food photography create a comforting but elevated feel.',
    tools: 'HTML, CSS, JavaScript, visual design',
    sections: 'Hero, story, menu, specialty cakes, gallery, custom orders and contact.',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=85']
  },
  ironpeak: {
    title: 'IRON PEAK FITNESS', category: 'WEB DESIGN / UI & UX / FRONT-END DEVELOPMENT',
    website: 'https://nishitajakhotia821-droid.github.io/gym-website/',
    overview: 'A complete fitness website with a dark athletic visual system, clear program structure and a performance-first browsing flow.',
    direction: 'Dark charcoal surfaces, condensed display typography and sharp lime accents balance energy with clarity.',
    tools: 'HTML, CSS, JavaScript, visual design',
    sections: 'Hero, programs, coaches, membership, transformations, gallery, testimonials and contact.',
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=85']
  },
  shweta: {
    title: "SHWETA'S MAKEOVER", category: 'WEB DESIGN / UI & UX / BEAUTY',
    website: 'https://nishitajakhotia821-droid.github.io/Shweta-s-Makeover/',
    overview: 'A multi-page beauty and salon website that brings services, bridal work, the academy and booking details together in one experience.',
    direction: 'Beauty-focused imagery and clear service navigation keep the content polished, layered and easy to explore.',
    tools: 'HTML, CSS, JavaScript',
    sections: 'Home, about, services, hair, makeup, bridal, academy, offers, portfolio and contact.',
    images: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85']
  },
  lumiere: {
    title: 'LUMIÈRE SALON', category: 'WEB DESIGN / UI & UX / BEAUTY',
    website: 'https://nishitajakhotia821-droid.github.io/lumiere-salon/',
    overview: 'A polished salon experience that blends premium beauty styling, clear service discovery and an elegant online brand presence.',
    direction: 'Warm ivory tones, soft editorial details and carefully composed imagery create a refined salon mood.',
    tools: 'HTML, CSS, JavaScript, visual design',
    sections: 'Hero, services, hair, beauty, bridal, pricing, gallery, testimonials and booking.',
    images: ['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85']
  }
};

let activeProject = null;
let activeImage = 0;
const modalImage = modal.querySelector('.modal-image');
const modalGallery = modal.querySelector('.modal-gallery');

function showProjectImage(index) {
  const images = activeProject.images;
  activeImage = (index + images.length) % images.length;
  modalImage.src = images[activeImage];
  modalImage.alt = `${activeProject.title}, project image ${activeImage + 1}`;
  modal.querySelector('.modal-image-count').textContent = `${String(activeImage + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
  modalGallery.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === activeImage));
}

function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  activeProject = project;
  modal.querySelector('.modal-category').textContent = project.category;
  modal.querySelector('#modal-title').textContent = project.title;
  modal.querySelector('.modal-overview').textContent = project.overview;
  modal.querySelector('.modal-direction').textContent = project.direction;
  modal.querySelector('.modal-tools').textContent = project.tools;
  modal.querySelector('.modal-sections').textContent = project.sections;
  modal.querySelector('.modal-site-link').href = project.website;
  modal.querySelector('.modal-site-link').setAttribute('aria-label', `Open the ${project.title} website`);
  modalGallery.replaceChildren(...project.images.map((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show project image ${index + 1}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = image;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    button.append(thumbnail);
    button.addEventListener('click', () => showProjectImage(index));
    return button;
  }));
  showProjectImage(0);
  modal.showModal();
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

document.querySelectorAll('[data-project]').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.project)));
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.querySelector('.modal-prev').addEventListener('click', () => showProjectImage(activeImage - 1));
modal.querySelector('.modal-next').addEventListener('click', () => showProjectImage(activeImage + 1));
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
window.addEventListener('keydown', (event) => {
  if (!modal.open) return;
  if (event.key === 'ArrowLeft') showProjectImage(activeImage - 1);
  if (event.key === 'ArrowRight') showProjectImage(activeImage + 1);
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.classList.remove('is-error');
  const phone = contactForm.elements.phone;
  if (phone.value.trim() && !phone.checkValidity()) {
    phone.setCustomValidity('Enter a phone number using 8 to 20 digits or common phone symbols.');
    phone.reportValidity();
    phone.setCustomValidity('');
    return;
  }
  if (!contactForm.reportValidity()) return;
  formStatus.textContent = "THANK YOU. YOUR MESSAGE HAS BEEN RECEIVED. I'LL GET BACK TO YOU SOON.";
  contactForm.reset();
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
