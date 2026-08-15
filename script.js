document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    // Nodos del diagrama → desplazar a la tarjeta correspondiente
    document.querySelectorAll('.node[data-target]').forEach(node => {
        const goToProject = () => {
            const projectId = node.dataset.target;
            const card = document.getElementById(projectId);

            if (!card) return;

            card.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'center'
            });

            card.classList.add('flash');

            window.setTimeout(() => {
                card.classList.remove('flash');
            }, 1600);
        };

        node.addEventListener('click', goToProject);

        node.addEventListener('keydown', event => {
            const validKey =
                event.key === 'Enter' ||
                event.key === ' ' ||
                event.key === 'Spacebar';

            if (!validKey) return;

            event.preventDefault();
            goToProject();
        });
    });

    // Elementos que deben aparecer al desplazarse
    const revealElements = document.querySelectorAll('.reveal');

    // Mostrar inmediatamente si el usuario prefiere menos movimiento
    // o si el navegador no soporta IntersectionObserver.
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(element => {
            element.classList.add('in');
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
});