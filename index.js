document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        let currentSection = '';
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

document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  const slides = document.querySelectorAll('.project-card');
  let currentSlide = 0;
  const totalSlides = slides.length;

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

  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);

  // Show the first slide initially
  showSlide(currentSlide);
});


// Fonction pour ouvrir une modale
function openModale(modaleId) {
  document.getElementById(modaleId).style.display = 'flex';
  document.getElementById(modaleId).setAttribute('aria-hidden', 'false');
}

// Fonction pour fermer une modale
function closeModale(modaleId) {
  document.getElementById(modaleId).style.display = 'none';
  document.getElementById(modaleId).setAttribute('aria-hidden', 'true');
}

// Ajouter des écouteurs d'événements aux cartes de projet
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
      e.preventDefault();  // Empêche la navigation par défaut
      const modaleId = this.getAttribute('href').substring(1); // Obtenir l'ID de la modale à partir du href
      openModale(modaleId);
  });
});

// Ajouter des écouteurs d'événements aux boutons de fermeture
document.querySelectorAll('.modale-content #close-modale').forEach(button => {
  button.addEventListener('click', function () {
      const modale = this.closest('aside');
      closeModale(modale.id);
  });
});



document.getElementById('form').addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        event.preventDefault();
    } else if (!validateEmail(email)) {
        alert('Veuillez entrer une adresse email valide.');
        event.preventDefault();
    }

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

