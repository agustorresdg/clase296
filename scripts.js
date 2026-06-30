const header = document.querySelector(".nav-shell");
const revealItems = document.querySelectorAll(".reveal");
const colorButtons = document.querySelectorAll(".chip");
const selectedColor = document.querySelector(".selection b");
const configImage = document.querySelector(".config-image");
const formatTabs = document.querySelectorAll(".format-tab");
const formatCopy = document.querySelector(".format-copy");
const formatImage = document.querySelector(".format-image");
const formatCaption = document.querySelector(".format-caption");
const newsletterForm = document.querySelector(".newsletter-form");
const newsletterMessage = document.querySelector(".newsletter-message");
const hoverGalleries = document.querySelectorAll(".hover-gallery");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    colorButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    const color = button.dataset.color || "Negro";
    const image = button.dataset.image;
    if (selectedColor) selectedColor.textContent = color;
    if (configImage && image) {
      configImage.classList.add("is-changing");
      window.setTimeout(() => {
        configImage.src = image;
        configImage.alt = `Canon SELPHY CP1500 configurada en color ${color.toLowerCase()}`;
        configImage.classList.remove("is-changing");
      }, 160);
    }
  });
});

formatTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    formatTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    if (formatCopy) formatCopy.textContent = tab.dataset.copy || "";
    if (formatCaption) formatCaption.textContent = tab.dataset.title || "";
    if (formatImage && tab.dataset.image) {
      formatImage.classList.add("is-changing");
      window.setTimeout(() => {
        formatImage.src = tab.dataset.image;
        formatImage.alt = `Vista previa de formato ${tab.dataset.title || ""}`.trim();
        formatImage.classList.remove("is-changing");
      }, 140);
    }
  });
});

document.querySelectorAll(".accordion details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion details").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (newsletterMessage) {
    newsletterMessage.textContent = "Listo. Te avisamos cuando haya nuevas ideas y ofertas.";
  }
  newsletterForm.reset();
});

hoverGalleries.forEach((gallery) => {
  const image = gallery.querySelector("img");
  const galleryItems = (gallery.dataset.gallery || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!image || galleryItems.length < 2) return;

  const original = image.getAttribute("src") || galleryItems[0];
  let index = Math.max(galleryItems.indexOf(original), 0);
  let timer;

  const showNext = () => {
    index = (index + 1) % galleryItems.length;
    image.classList.add("is-swapping");
    window.setTimeout(() => {
      image.src = galleryItems[index];
      image.classList.remove("is-swapping");
    }, 120);
  };

  gallery.addEventListener("mouseenter", () => {
    showNext();
    timer = window.setInterval(showNext, 850);
  });

  gallery.addEventListener("mouseleave", () => {
    window.clearInterval(timer);
    index = Math.max(galleryItems.indexOf(original), 0);
    image.src = original;
    image.classList.remove("is-swapping");
  });
});

revealItems.forEach((item) => item.classList.add("is-visible"));
