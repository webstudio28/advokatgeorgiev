document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('[data-services-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('[data-services-track]');
    const cards = Array.from(carousel.querySelectorAll('[data-service-card]'));
    const prevButton = carousel.querySelector('.services-carousel-prev');
    const nextButton = carousel.querySelector('.services-carousel-next');
    const container = track.parentElement;

    if (!track || !cards.length) return;

    let currentIndex = 0;
    const gap = 24; // gap-6 = 1.5rem = 24px

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width >= 1024) return 3; // lg: 3 cards
        if (width >= 768) return 2;  // md: 2 cards
        return 1; // mobile: 1 card
    }

    function setCardWidths() {
        const visibleCount = getVisibleCount();
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const containerWidth = container.offsetWidth - paddingLeft - paddingRight;
        
        // Calculate card width: (container width - gaps) / visible count
        const cardWidth = (containerWidth - (gap * (visibleCount - 1))) / visibleCount;
        
        cards.forEach(card => {
            card.style.width = `${Math.floor(cardWidth)}px`;
            card.style.flexShrink = '0';
        });
    }

    function getMaxIndex() {
        const visibleCount = getVisibleCount();
        return Math.max(0, cards.length - visibleCount);
    }

    function updateCarousel() {
        setCardWidths();
        
        requestAnimationFrame(() => {
            const visibleCount = getVisibleCount();
            const cardWidth = cards[0] ? parseFloat(cards[0].style.width) : 0;
            const step = cardWidth + gap;
            const translateX = -currentIndex * step;
            
            track.style.transform = `translateX(${translateX}px)`;

            // Update button states
            const maxIndex = getMaxIndex();
            
            if (prevButton) {
                const disabled = currentIndex === 0;
                prevButton.disabled = disabled;
                prevButton.classList.toggle('opacity-40', disabled);
                prevButton.classList.toggle('cursor-not-allowed', disabled);
            }

            if (nextButton) {
                const disabled = currentIndex >= maxIndex;
                nextButton.disabled = disabled;
                nextButton.classList.toggle('opacity-40', disabled);
                nextButton.classList.toggle('cursor-not-allowed', disabled);
            }
        });
    }

    function goNext() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }

    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Event listeners
    if (nextButton) {
        nextButton.addEventListener('click', goNext);
    }

    if (prevButton) {
        prevButton.addEventListener('click', goPrev);
    }

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isDragging = false;
    const swipeThreshold = 50; // Minimum distance for swipe
    const swipeVerticalThreshold = 100; // Max vertical distance to consider it horizontal swipe

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isDragging = true;
        track.style.transition = 'none'; // Disable transition during drag
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Only allow horizontal swipe if vertical movement is minimal
        if (Math.abs(deltaX) > deltaY) {
            e.preventDefault(); // Prevent vertical scroll during horizontal swipe
            
            // Calculate current position
            const cardWidth = cards[0] ? parseFloat(cards[0].style.width) : 0;
            const step = cardWidth + gap;
            const baseTranslateX = -currentIndex * step;
            const dragOffset = deltaX;
            
            // Apply drag offset to transform
            track.style.transform = `translateX(${baseTranslateX + dragOffset}px)`;
        }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Re-enable transition
        track.style.transition = 'transform 0.3s ease-in-out';
        
        // Check if it's a valid horizontal swipe
        if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > deltaY && deltaY < swipeVerticalThreshold) {
            if (deltaX > 0) {
                // Swipe right - go to previous
                goPrev();
            } else {
                // Swipe left - go to next
                goNext();
            }
        } else {
            // Not a valid swipe, return to current position
            updateCarousel();
        }
        
        isDragging = false;
    }, { passive: true });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateCarousel();
        }, 150);
    });

    // Initialize
    track.style.transition = 'transform 0.3s ease-in-out';
    updateCarousel();

    // Wait for images
    window.addEventListener('load', () => {
        updateCarousel();
    });
});
