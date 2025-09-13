// Add hover effects and animations
document.addEventListener('DOMContentLoaded', function () {
    // Animate elements on load
    const elements = document.querySelectorAll('h1, p, button, .bg-white\\/10');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.2s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    const brands = ['Vodka', 'Hennessy', 'Martel', 'Tequila', 'Brandy'];
    const scroller = document.getElementById('brandScroller').querySelector('div');

    // Create multiple sets for smooth infinite scroll
    for (let i = 0; i < 4; i++) {
        brands.forEach(brand => {
            const span = document.createElement('span');
            span.className = 'brand-text text-2xl md:text-4xl text-black px-8 md:px-12 lg:px-16 whitespace-nowrap';
            span.textContent = brand;
            scroller.appendChild(span);
        });
    }

    // Add pause on hover functionality
    const container = document.getElementById('brandScroller');
    container.addEventListener('mouseenter', () => {
        scroller.style.animationPlayState = 'paused';
    });

    container.addEventListener('mouseleave', () => {
        scroller.style.animationPlayState = 'running';
    });
});
// Add custom CSS for pause on hover
const style = document.createElement('style');
style.textContent = `
            .hover\\:pause-animation:hover {
                animation-play-state: paused !important;
            }
        `;
document.head.appendChild(style);