document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * 1. SCROLL REVEAL ANIMATION
     * This uses the Intersection Observer API to detect when 
     * elements enter the viewport.
     */
    const animatedElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class defined in your CSS
                entry.target.classList.add('visible');
                // Stop observing once it's visible to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start watching all elements with the .fade-up class
    animatedElements.forEach(el => observer.observe(el));


    /**
     * 2. SMOOTH SCROLLING FOR NAVIGATION
     * Ensures all internal links (#) scroll smoothly.
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Prevent default jump
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /**
     * 3. UPI DEEP LINK HANDLER (Optional enhancement)
     * Some browsers block 'upi://' links. This log helps debug 
     * if users click and nothing happens.
     */
    const upiButtons = document.querySelectorAll('a[href^="upi://"]');
    upiButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("UPI Link triggered for amount: " + btn.innerText);
        });
    });
});
