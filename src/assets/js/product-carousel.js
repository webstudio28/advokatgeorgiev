/**
 * Product Image Carousel
 * Main image with thumbnail navigation
 */
(function() {
    'use strict';

    function initProductCarousel() {
        const mainImage = document.getElementById('product-main-image');
        const thumbnails = document.querySelectorAll('.product-thumbnail');
        
        if (!mainImage) return;
        
        // If no thumbnails, nothing to do
        if (thumbnails.length === 0) return;

        // Set first thumbnail as active on load
        if (thumbnails.length > 0) {
            thumbnails[0].classList.remove('opacity-60');
        }

        // Add click handlers to thumbnails
        thumbnails.forEach((thumb) => {
            thumb.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-image-src');
                
                if (!newSrc || newSrc === mainImage.src) return;

                // Update main image with fade effect
                mainImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 150);

                // Update active thumbnail
                thumbnails.forEach(t => {
                    t.classList.add('opacity-60');
                });
                
                this.classList.remove('opacity-60');
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductCarousel);
    } else {
        initProductCarousel();
    }
})();

