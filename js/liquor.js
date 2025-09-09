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
    
});