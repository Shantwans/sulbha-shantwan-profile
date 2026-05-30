const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const galleryImages = [
  ["assets/teacher-training-classroom.jpg", "Teacher training workshop"],
  ["assets/teacher-training-lab.jpg", "AI tools and classroom implementation"],
  ["assets/IMG20220924104357.jpg", "Community learning conversation"],
  ["assets/IMG20220924105858.jpg", "Workshop beyond the classroom"],
  ["assets/IMG20221014132934.jpg", "Student learning session"],
  ["assets/IMG20240209133656.jpg", "Experiential learning setup"],
  ["assets/IMG_20221115_143542.jpg", "Collaborative learning in action"],
  ["assets/WhatsApp Image 2026-05-24 at 18.06.50.jpeg", "Learning moment from the field"],
  ["assets/WhatsApp Image 2026-05-24 at 18.06.52.jpeg", "Student work and exploration"],
  ["assets/WhatsApp Image 2026-05-24 at 18.06.54.jpeg", "Learning materials in use"],
  ["assets/WhatsApp Image 2026-05-24 at 18.06.56.jpeg", "Learning in progress"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.04.jpeg", "Student-centered activity"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.05.jpeg", "Field practice"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.06.jpeg", "Learning experience"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.07.jpeg", "Real-room learning"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.08.jpeg", "Activities and reflection"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.09.jpeg", "Classroom materials"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.10.jpeg", "Teacher and learner interaction"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.11.jpeg", "Learning community"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.12.jpeg", "Workshop activity"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.13.jpeg", "Classroom engagement"],
  ["assets/WhatsApp Image 2026-05-24 at 18.07.14 (1).jpeg", "Learning moment"],
];

const gallery = document.querySelector("[data-gallery]");
const galleryTrack = gallery?.querySelector(".gallery-track");

if (galleryTrack) {
  galleryImages.forEach(([src, caption], index) => {
    const figure = document.createElement("figure");
    figure.className = `gallery-slide${index === 0 ? " is-active" : ""}`;

    const image = document.createElement("img");
    image.src = src;
    image.alt = caption;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;

    figure.append(image, figcaption);
    galleryTrack.appendChild(figure);
  });
}

const slides = gallery ? [...gallery.querySelectorAll(".gallery-slide")] : [];
const dotsWrap = gallery?.querySelector(".gallery-dots");
let galleryIndex = 0;
let galleryTimer;

function showGallerySlide(index) {
  if (!slides.length || !dotsWrap) return;
  galleryIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === galleryIndex);
  });
  dotsWrap.querySelectorAll(".gallery-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === galleryIndex);
  });
}

function startGallery() {
  if (slides.length < 2) return;
  window.clearInterval(galleryTimer);
  galleryTimer = window.setInterval(() => showGallerySlide(galleryIndex + 1), 4200);
}

if (gallery && dotsWrap && slides.length) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Show gallery image ${index + 1}`);
    dot.addEventListener("click", () => {
      showGallerySlide(index);
      startGallery();
    });
    dotsWrap.appendChild(dot);
  });

  gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
    showGallerySlide(galleryIndex - 1);
    startGallery();
  });

  gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
    showGallerySlide(galleryIndex + 1);
    startGallery();
  });

  gallery.addEventListener("mouseenter", () => window.clearInterval(galleryTimer));
  gallery.addEventListener("mouseleave", startGallery);
  gallery.addEventListener("focusin", () => window.clearInterval(galleryTimer));
  gallery.addEventListener("focusout", startGallery);

  showGallerySlide(0);
  startGallery();
}

/* Game modal open/close */
const gameModal = document.getElementById('game-modal');
const gameModalIframe = document.getElementById('game-modal-iframe');
const gameModalClose = document.querySelector('.game-modal-close');

function openGameModal(src) {
  if (!gameModal) return;
  gameModal.removeAttribute('hidden');
  gameModalIframe.src = src;
  document.body.style.overflow = 'hidden';
}

function closeGameModal() {
  if (!gameModal) return;
  gameModal.setAttribute('hidden', '');
  gameModalIframe.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.play-game').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const src = btn.getAttribute('data-src');
    if (src) openGameModal(src);
  });
});

gameModalClose?.addEventListener('click', closeGameModal);
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeGameModal));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGameModal();
});
