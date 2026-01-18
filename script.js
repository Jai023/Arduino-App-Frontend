document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Reveal Animation
    const animatedElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // UPI Deep Link Handler
    const upiButtons = document.querySelectorAll('a[href^="upi://"]');
    upiButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log("UPI payment initiated");
            // Fallback for browsers that don't support UPI deep links
            setTimeout(() => {
                const scrollTarget = document.querySelector('#submit-order');
                if (scrollTarget) {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        });
    });
});
