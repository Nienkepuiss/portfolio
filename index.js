function setInitialBannerHeight() {
  const banner = document.getElementById('banner');
  const height = window.innerHeight;

  // Définir une hauteur fixe initiale pour la bannière
  banner.style.height = `${height}px`;
}

// Ajuster la hauteur uniquement au chargement de la page
window.addEventListener('load', setInitialBannerHeight);

// Empêcher la hauteur de changer lors du redimensionnement de la fenêtre ou du changement d'orientation
window.addEventListener('resize', () => {
  const banner = document.getElementById('banner');
  const currentHeight = parseInt(banner.style.height);
  banner.style.height = `${currentHeight}px`;
});

window.addEventListener('orientationchange', () => {
  const banner = document.getElementById('banner');
  const currentHeight = parseInt(banner.style.height);
  banner.style.height = `${currentHeight}px`;
});



// NAV EFFECTS
document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menu-toggle');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      // Ferme le menu en cliquant sur le toggle
      menuToggle.click();

      // Gère les classes 'active' pour la navigation
      menuItems.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Détecte la section visible pour ajouter la classe 'active' au lien correspondant
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('main > section');

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= window.innerHeight / 2 && sectionTop >= -section.offsetHeight / 2) {
        currentSection = section.getAttribute('id');
      }
    });

    menuItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').substring(1) === currentSection) {
        item.classList.add('active');
      }
    });
  });
});

// OPEN MENU
document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('active');
});


// SKILLS EFFECT
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    const skillIcons = document.querySelectorAll('.skills img');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillIcons.forEach((icon, index) => {
            setTimeout(() => {
              icon.classList.add('visible');
            }, index * 200); // délai pour chaque icône
          });
          observer.unobserve(skillsSection); // Arrêter d'observer une fois que l'animation est déclenchée
        }
      });
    }, options);

    observer.observe(skillsSection);
});




// MOBILE DISPLAY PROJECTS

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const slides = document.querySelectorAll('.project-card');
  let currentSlide = 0;
  const totalSlides = slides.length;
  let touchStartX = 0;
  let touchEndX = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  };

  // Swipe detection logic
  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleGesture();
  });

  const handleGesture = () => {
    if (touchStartX - touchEndX > 50) {
      // Swiped left
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      // Swiped right
      prevSlide();
    }
    // Reset touch coordinates
    touchStartX = 0;
    touchEndX = 0;
  };

  // Buttons click events (optional, if you want to keep them)
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);

  // Show the first slide initially
  showSlide(currentSlide);
});

// OPEN MODALES 
function openModale(modaleId) {
  document.getElementById(modaleId).style.display = 'flex';
  document.getElementById(modaleId).setAttribute('aria-hidden', 'false');
}

// CLOSE MODALES
function closeModale(modaleId) {
  document.getElementById(modaleId).style.display = 'none';
  document.getElementById(modaleId).setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
      e.preventDefault();  
      const modaleId = this.getAttribute('href').substring(1); 
      openModale(modaleId);
  });
});

document.querySelectorAll('.modale-content #close-modale').forEach(button => {
  button.addEventListener('click', function () {
      const modale = this.closest('aside');
      closeModale(modale.id);
  });
});

