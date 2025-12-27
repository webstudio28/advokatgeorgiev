document.addEventListener('DOMContentLoaded', () => {
    const iconWrappers = document.querySelectorAll('.benefit-icon-wrapper');

    iconWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation();

            const isAlreadyActive = wrapper.classList.contains('is-active');

            // Deactivate all other active tooltips
            document.querySelectorAll('.benefit-icon-wrapper.is-active').forEach(activeWrapper => {
                activeWrapper.classList.remove('is-active');
            });

            // If it wasn't already active, activate it.
            // This makes the click a toggle for the specific icon,
            // but clicking a new icon will close the old one.
            if (!isAlreadyActive) {
                wrapper.classList.add('is-active');
            }
        });
    });

    // Close any active tooltip when clicking elsewhere on the document
    document.addEventListener('click', () => {
        document.querySelectorAll('.benefit-icon-wrapper.is-active').forEach(activeWrapper => {
            activeWrapper.classList.remove('is-active');
        });
    });
});
