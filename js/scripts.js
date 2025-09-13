// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const hamburger = mobileMenuToggle.querySelector('.hamburger');



function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('translate-x-full');

    if (isOpen) {
        // Close menu
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    } else {
        // Open menu
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
}

// Event listeners
mobileMenuToggle.addEventListener('click', toggleMobileMenu);
closeMobileMenu.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

// Close menu on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
        toggleMobileMenu();
    }
});



// Slider functionality
let currentSlide = 0;
const slider = document.getElementById('slider');
const totalSlides = 2;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);


function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

