document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const projectSection = document.getElementById('projects');
    const allDetailContents = document.querySelectorAll('.project-detail-content');

    // --- Allgemeine Navigation (Home, Über mich, Kontakt) ---
    document.querySelectorAll('header nav a[href^="#"]:not(.dropdown-menu a)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToTarget(targetId);
        });
    });

    // --- Navigation über das Dropdown-Menü zu den Projekten ---
    document.querySelectorAll('.dropdown-menu a[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Hier direkt zur #projects Sektion scrollen
            scrollToTarget('#projects');
            // Anschließend das entsprechende Detail anzeigen (optional, je nach gewünschtem Verhalten)
            const targetId = this.dataset.target;
            showProjectDetail(targetId);
        });
    });

    // --- "Details ansehen" Links ---
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            showProjectDetail(targetId);
            // Zum Detailbereich scrollen, nachdem er sichtbar ist
            setTimeout(() => {
                const targetDetailElement = document.getElementById(targetId);
                if (targetDetailElement) {
                    scrollToTarget(`#${targetId}`);
                }
            }, 10); // Kurze Verzögerung, um sicherzustellen, dass das Element sichtbar ist
        });
    });

    // --- "Zurück zu Projekten" Links ---
    document.querySelectorAll('.back-to-projects-link.internal-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllProjectDetails();
            scrollToTarget('#projects');
        });
    });

    // --- Schließen-Buttons für Projektdetails ---
    document.querySelectorAll('.close-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            hideAllProjectDetails();
            scrollToTarget('#projects');
        });
    });

    // --- Hilfsfunktionen ---

    function scrollToTarget(targetId) {
        let targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - headerHeight - 20;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    function showProjectDetail(targetId) {
        hideAllProjectDetails();
        const targetDetailElement = document.getElementById(targetId);
        if (targetDetailElement) {
            targetDetailElement.classList.add('active');
        }
    }

    function hideAllProjectDetails() {
        allDetailContents.forEach(detail => {
            detail.classList.remove('active');
        });
    }

    // --- Fade-In Observer (unverändert) ---
    const fadeInSections = document.querySelectorAll('.content-section, .hero-section');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => {
        section.classList.add('fade-in');
        fadeInObserver.observe(section);
    });

    // --- Dropdown Toggle (unverändert) ---
    const projectNavLi = document.querySelector('.nav-projects.has-dropdown');
    if (projectNavLi) {
        projectNavLi.querySelector('#projects-nav-link').addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                projectNavLi.classList.toggle('dropdown-open');
            }
        });
        document.addEventListener('click', function(e) {
            if (!projectNavLi.contains(e.target)) {
                projectNavLi.classList.remove('dropdown-open');
            }
        });
    }
});