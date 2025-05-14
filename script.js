document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling für Ankerlinks
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Bei #home speziell zum Seitenanfang scrollen
            if (targetId === '#hero' || targetId === '#') {
                 window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    let offsetTop = targetElement.offsetTop;
                    // Offset für fixierten Header anpassen
                    const header = document.querySelector('header');
                    if (header) {
                        offsetTop -= header.offsetHeight;
                    }
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Optionale Fade-In Animation für Sektionen beim Scrollen
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: Animation nur einmal auslösen
            } else { // Optional: Element ausblenden, wenn es wieder aus dem Viewport verschwindet
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // 10% der Sektion sichtbar

    sections.forEach(section => {
        section.classList.add('fade-in'); // Klasse für initialen Zustand setzen
        fadeInObserver.observe(section);
    });

});