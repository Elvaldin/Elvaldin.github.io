// Nodos del diagrama → scroll a la tarjeta del proyecto
document.querySelectorAll('.node[data-target]').forEach(node => {
    const go = () => {
        const card = document.getElementById(node.dataset.target);
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('flash');
        setTimeout(() => card.classList.remove('flash'), 1600);
    };
    node.addEventListener('click', go);
    node.addEventListener('keydown', e =>{
        if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); go();}
    });
});

// Aparición al hacer scroll
const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (en.isIntersecting) {en.target.classList.add('in'); io.unobserve(en.target);}
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));