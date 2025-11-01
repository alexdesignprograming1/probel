const inner = document.getElementById('header-inner');
window.addEventListener('scroll', () => {
  inner.classList.toggle('scrolled', window.scrollY > 50);
});


document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.getElementById('open-demo');
  const closeBtn = document.getElementById('close-demo');
  const dialog   = document.getElementById('demo-dialog');
  const demoBtns = document.querySelectorAll('.open-demo');

  demoBtns.forEach(btn =>
    btn.addEventListener('click', () => dialog.showModal())
  );

  openBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Opcional: fecha o dialog se clicar fora do formulário
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn       = document.getElementById('btn-close');

  closeBtn.addEventListener('click', () => {
    // desmarca o checkbox, fechando o menu
    toggleCheckbox.checked = false;
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.querySelector('label[for="menu-toggle"]').focus();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn       = document.getElementById('btn-close');

  toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('no-scroll', toggleCheckbox.checked);
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.body.classList.remove('no-scroll');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards        = document.querySelector('.pricing-cards-info');
  const table        = document.querySelector('.features-table');
  const headerH      = document.querySelector('#header').offsetHeight;
  const tableTop     = table.offsetTop;
  const tableHeight  = table.offsetHeight;
  const buffer       = 200; // px antes do fim da tabela para esconder
  const minWidthShow = 960; // px — abaixo disso nunca exibe

  const tableEndThreshold = tableTop + tableHeight - buffer;

  function updateCardsVisibility() {
    const scrollPos = window.scrollY + headerH;
    const isWide   = window.innerWidth >= minWidthShow;
    const inRange  = scrollPos >= tableTop && scrollPos < tableEndThreshold;

    if (isWide && inRange) {
      cards.classList.add('fixed');
      cards.style.display = 'flex';
    } else {
      cards.classList.remove('fixed');
      cards.style.display = 'none';
    }
  }

  window.addEventListener('scroll', updateCardsVisibility);
  window.addEventListener('resize', updateCardsVisibility);

  // inicializa no load
  updateCardsVisibility();
});

// Carousel functionality
class ProductCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.cards = document.querySelectorAll('.wrapper-card');
    this.prevBtn = document.querySelector('.carousel-btn-prev');
    this.nextBtn = document.querySelector('.carousel-btn-next');
    this.dots = document.querySelectorAll('.dot');

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  init() {
    this.updateCarousel();
    this.bindEvents();
    this.startAutoPlay();
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Touch events for mobile
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Resize handler
    window.addEventListener('resize', () => {
      this.cardsPerView = this.getCardsPerView();
      this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.updateCarousel();
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  prev() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.updateCarousel();
    this.resetAutoPlay();
  }

  next() {
    this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  updateCarousel() {
    const cardWidth = this.cards[0].offsetWidth + 24; // width + gap
    const translateX = -this.currentIndex * cardWidth;

    this.track.style.transform = `translateX(${translateX}px)`;

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });

    // Update button states
    this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    this.nextBtn.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
  }

  // startAutoPlay() {
  //   this.autoPlayInterval = setInterval(() => {
  //     if (this.currentIndex === this.maxIndex) {
  //       this.currentIndex = 0;
  //     } else {
  //       this.currentIndex++;
  //     }
  //     this.updateCarousel();
  //   }, 5000);
  // }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    //this.startAutoPlay();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductCarousel();
});

const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  grabCursor: true,
  rewind: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
