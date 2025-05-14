document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    // Smooth scrolling für allgemeine Ankerlinks und CTA-Buttons
    document.querySelectorAll('a[href^="#"]:not(.dropdown-menu a):not(.project-link):not(.back-to-projects-link), .cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindert den standardmäßigen Sprung des Browsers
            const targetId = this.getAttribute('href');
            let targetElement;

            if (targetId === '#hero' || targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            } else {
                targetElement = document.querySelector(targetId);
            }

            if (targetElement) {
                let offsetTop = targetElement.offsetTop - headerHeight - 20; // 20px zusätzlicher Puffer
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Projektdetails anzeigen/verstecken ---
    const detailTriggerLinks = document.querySelectorAll('.project-link, .dropdown-menu a[data-target]');
    const projectDetailsContainer = document.querySelector('.project-details-container');
    const allDetailContents = document.querySelectorAll('.project-detail-content');
    const projectSection = document.getElementById('projects');

    detailTriggerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // **WICHTIG: Verhindert den standardmäßigen Sprung hier!**
            const targetId = this.dataset.target; // Verwende data-target für die ID des Detail-Elements

            // Alle anderen Details ausblenden
            allDetailContents.forEach(detail => {
                if (detail.id !== targetId) {
                    detail.classList.remove('active');
                }
            });

            const targetDetailElement = document.getElementById(targetId);
            if (targetDetailElement) {
                // Detail ein-/ausblenden (toggle)
                targetDetailElement.classList.toggle('active');

                if (targetDetailElement.classList.contains('active')) {
                    // Zum eingeblendeten Detail scrollen
                    // Stelle sicher, dass es im DOM sichtbar ist, bevor Offset berechnet wird.
                    setTimeout(() => {
                        let detailOffsetTop = targetDetailElement.offsetTop - headerHeight - 20; // 20px Puffer
                        window.scrollTo({
                            top: detailOffsetTop,
                            behavior: 'smooth'
                        });
                    }, 0); // Kurze Verzögerung gibt dem Browser Zeit für das Rendern
                } else {
                    // Wenn es ausgeblendet wurde, zur Projektübersicht scrollen
                    if (projectSection) {
                         let projectSectionOffsetTop = projectSection.offsetTop - headerHeight -20;
                         window.scrollTo({ top: projectSectionOffsetTop, behavior: 'smooth'});
                    }
                }
            }
        });
    });

    // Schließen-Buttons für Projektdetails
    document.querySelectorAll('.close-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const detailToClose = this.closest('.project-detail-content');
            if (detailToClose) {
                detailToClose.classList.remove('active');
                // Optional: Zurück zur Projektübersicht scrollen
                if (projectSection) {
                    let projectSectionOffsetTop = projectSection.offsetTop - headerHeight - 20;
                    window.scrollTo({ top: projectSectionOffsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // "Zurück zur Projektübersicht"-Links in den Details
    document.querySelectorAll('.back-to-projects-link.internal-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindert den standardmäßigen Sprung auch hier
            const detailToClose = this.closest('.project-detail-content');
            if (detailToClose) {
                detailToClose.classList.remove('active');
            }
            if (projectSection) {
                let projectSectionOffsetTop = projectSection.offsetTop - headerHeight - 20;
                window.scrollTo({ top: projectSectionOffsetTop, behavior: 'smooth' });
            }
        });
    });


    // Optionale Fade-In Animation für Sektionen beim Scrollen (Ihr bestehender Code)
    const fadeInSections = document.querySelectorAll('.content-section, .hero-section');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Diese 'visible'-Klasse ist für die Scroll-Animation
                // observer.unobserve(entry.target); // Animation nur einmal auslösen
            } else {
                // entry.target.classList.remove('visible'); // Optional: Ausblenden beim Verlassen des Viewports
            }
        });
    }, { threshold: 0.1 }); // 10% der Sektion sichtbar

    fadeInSections.forEach(section => {
        section.classList.add('fade-in'); // Klasse für initialen Zustand setzen
        fadeInObserver.observe(section);
    });

    // Optional: Dropdown bei Klick öffnen/schließen (zusätzlich zum CSS :hover)
    // Für bessere Touch-Bedienung
    const projectNavLi = document.querySelector('.nav-projects.has-dropdown');
    if (projectNavLi) {
        projectNavLi.querySelector('#projects-nav-link').addEventListener('click', function(e) {
            // Wenn es ein Link zu #projects ist und wir auf der Projektdetailseite sind,
            // wollen wir vielleicht zur Sektion scrollen und nicht nur das Menü toggeln.
            // Für Touch ist ein direkter Toggle aber oft besser.
            if (window.innerWidth <= 768) { // Beispiel: Nur auf kleineren Bildschirmen Klick-Toggle erzwingen
                 e.preventDefault(); // Verhindert das Springen zum Anker #projects
                 projectNavLi.classList.toggle('dropdown-open');
            }
        });

        // Schließen, wenn außerhalb geklickt wird
        document.addEventListener('click', function(e) {
            if (!projectNavLi.contains(e.target)) {
                projectNavLi.classList.remove('dropdown-open');
            }
        });
    }
});