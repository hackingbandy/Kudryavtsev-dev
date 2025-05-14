document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const projectSection = document.getElementById('projects');
    const allDetailContents = document.querySelectorAll('.project-detail-content');

    // Smooth scrolling for general navigation
    document.querySelectorAll('a[href^="#"]:not(.project-link):not(.back-to-projects-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // ... your existing smooth scroll logic ...
        });
    });

    // Project link click handler
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            handleProjectDetailClick(targetId);
        });
    });

    // Dropdown link click handler
    document.querySelectorAll('.dropdown-menu a[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            handleProjectDetailClick(targetId);
        });
    });

    function handleProjectDetailClick(targetId) {
        allDetailContents.forEach(detail => {
            detail.classList.remove('active');
        });

        const targetDetailElement = document.getElementById(targetId);
        if (targetDetailElement) {
            targetDetailElement.classList.add('active');
            setTimeout(() => {
                let detailOffsetTop = targetDetailElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: detailOffsetTop, behavior: 'smooth' });
            }, 0);
        }
    }

    // Close detail buttons
    document.querySelectorAll('.close-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const detailToClose = this.closest('.project-detail-content');
            if (detailToClose) {
                detailToClose.classList.remove('active');
                if (projectSection) {
                    window.scrollTo({ top: projectSection.offsetTop - headerHeight - 20, behavior: 'smooth' });
                }
            }
        });
    });

    // Back to projects links
    document.querySelectorAll('.back-to-projects-link.internal-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const detailToClose = this.closest('.project-detail-content');
            if (detailToClose) {
                detailToClose.classList.remove('active');
            }
            if (projectSection) {
                window.scrollTo({ top: projectSection.offsetTop - headerHeight - 20, behavior: 'smooth' });
            }
        });
    });

    // Fade-in observer (remains the same)
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

    // Dropdown toggle (remains the same)
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