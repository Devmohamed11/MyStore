document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});
