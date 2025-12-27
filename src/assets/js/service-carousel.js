/**
 * Service Hero Image Carousel
 * Fade transition carousel with dot indicators
 */
(function() {
    'use strict';

    function initServiceCarousel() {
        const carousel = document.getElementById('service-hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        
        // If only one image, ensure it's visible and exit
        if (slides.length <= 1) {
            if (slides.length === 1) {
                slides[0].classList.add('opacity-100');
                slides[0].classList.remove('opacity-0');
            }
            return;
        }

        let currentIndex = 0;
        let autoPlayInterval = null;
        const AUTO_PLAY_DELAY = 5000; // 5 seconds

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('opacity-100');
                    slide.classList.remove('opacity-0');
                } else {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-white', 'w-6');
                    dot.classList.remove('bg-white/50', 'w-2');
                } else {
                    dot.classList.remove('bg-white', 'w-6');
                    dot.classList.add('bg-white/50', 'w-2');
                }
            });

            currentIndex = index;
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function goToSlide(index) {
            showSlide(index);
            resetAutoPlay();
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Arrow click handlers
        const prevArrow = document.querySelector('.carousel-arrow-prev');
        const nextArrow = document.querySelector('.carousel-arrow-next');
        
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                resetAutoPlay();
            }
        }

        // Ensure first slide is visible on load
        showSlide(0);
        
        // Start auto-play
        startAutoPlay();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServiceCarousel);
    } else {
        initServiceCarousel();
    }
})();

