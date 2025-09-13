class TestimonialSlider {
    constructor() {
        this.originalSlides = 4;
        this.currentSlide = 0;
        this.actualSlide = 0; // For dot navigation
        this.sliderTrack = document.getElementById('sliderTrack');
        this.dots = document.querySelectorAll('.dot');
        this.autoSlideInterval = null;
        this.isHovered = false;
        this.isTransitioning = false;
        this.init();
    }
    init() {
        this.cloneSlides();
        this.setupEventListeners();
        this.setInitialPosition();
        this.startAutoSlide();
    }
    cloneSlides() {
        const originalCards = Array.from(this.sliderTrack.children);
        // Clone slides for infinite effect
        // Add clones at the end
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            this.sliderTrack.appendChild(clone);
        });
        // Add clones at the beginning
        originalCards.slice().reverse().forEach(card => {
            const clone = card.cloneNode(true);
            this.sliderTrack.insertBefore(clone, this.sliderTrack.firstChild);
        });
    }
    setInitialPosition() {
        // Start at the first original slide (after the cloned ones)
        this.currentSlide = this.originalSlides;
        this.updateSliderPosition(false); // No transition for initial position
    }
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        // Pause auto-slide on hover
        this.sliderTrack.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.stopAutoSlide();
        });
        this.sliderTrack.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.startAutoSlide();
        });
        // Listen for transition end to handle infinite loop
        this.sliderTrack.addEventListener('transitionend', () => {
            this.handleTransitionEnd();
        });
        // Touch/Swipe support
        let startX = 0;
        let isDragging = false;
        this.sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoSlide();
        });
        this.sliderTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        this.sliderTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
            if (!this.isHovered) {
                this.startAutoSlide();
            }
        });
    }
    updateSliderPosition(withTransition = true) {
        // Calculate transform based on screen size
        let translateX;
        if (window.innerWidth >= 1024) {
            // Desktop: show 4 cards, move by 25%
            translateX = -this.currentSlide * 25;
        } else if (window.innerWidth >= 640) {
            // Tablet: show 2 cards, move by 50%
            translateX = -this.currentSlide * 50;
        } else {
            // Mobile: show 1 card, move by 100%
            translateX = -this.currentSlide * 100;
        }
        if (!withTransition) {
            this.sliderTrack.style.transition = 'none';
        }
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        if (!withTransition) {
            // Force reflow then restore transition
            this.sliderTrack.offsetHeight;
            this.sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }
        this.updateDots();
    }
    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.actualSlide) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600', 'active');
            } else {
                dot.classList.remove('bg-blue-600', 'active');
                dot.classList.add('bg-gray-300');
            }
        });
    }
    handleTransitionEnd() {
        if (this.isTransitioning) {
            this.isTransitioning = false;
            // Check if we need to reset position for infinite loop
            if (this.currentSlide >= this.originalSlides * 2) {
                // We're at the end clones, jump to beginning originals
                this.currentSlide = this.originalSlides;
                this.updateSliderPosition(false);
            } else if (this.currentSlide < this.originalSlides) {
                // We're at the beginning clones, jump to end originals
                this.currentSlide = this.originalSlides * 2 - 1;
                this.updateSliderPosition(false);
            }
        }
    }
    goToSlide(slideIndex) {
        if (this.isTransitioning) return;
        this.actualSlide = slideIndex;
        this.currentSlide = this.originalSlides + slideIndex;
        this.isTransitioning = true;
        this.updateSliderPosition();
        this.resetAutoSlide();
    }
    nextSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentSlide++;
        this.actualSlide = (this.actualSlide + 1) % this.originalSlides;
        this.updateSliderPosition();
    }
    prevSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentSlide--;
        this.actualSlide = (this.actualSlide - 1 + this.originalSlides) % this.originalSlides;
        this.updateSliderPosition();
    }
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            if (!this.isHovered && !this.isTransitioning) {
                this.nextSlide();
            }
        }, 4000);
    }
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    resetAutoSlide() {
        if (!this.isHovered) {
            this.startAutoSlide();
        }
    }
}
// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});
// Update slider on window resize
window.addEventListener('resize', () => {
    if (window.testimonialSlider) {
        window.testimonialSlider.updateSliderPosition(false);
    }
});

// Add hover effects and animations
// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
    const slider = new TestimonialSlider();
    // Store slider instance globally for resize handling
    window.testimonialSlider = slider;

    
});