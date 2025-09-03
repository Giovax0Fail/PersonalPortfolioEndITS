document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsContainer) {
    console.error('Elementi carosello mancanti o nomi classi non corrispondono.');
    return;
  }

  let currentIndex = 0;

  // Crea i pallini dinamicamente
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Aggiorna lo stato attivo dei pallini
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Mostra/nascondi i pulsanti in base alla posizione
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'block';
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
});
