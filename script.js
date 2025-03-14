document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.text-container');
    const albumTexts = document.querySelectorAll('.album-text');

    // Delayed animation for header text
    setTimeout(() => {
        headerText.style.opacity = '1';
        headerText.style.animation = 'slideIn 2s forwards';
    }, 500);  // Adjust timing as needed

    // Scroll-based text visibility effect for albums
    function handleScroll() {
        albumTexts.forEach(text => {
            const rect = text.parentElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.9 && rect.bottom > -windowHeight * 0.4) {
                text.style.opacity = '1';
            } else {
                text.style.opacity = '0';
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once to set initial state

    // Lock viewport height to prevent resizing on scroll
    function setFixedVH() {
        const vh = window.innerHeight; // Capture viewport height at load
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.querySelector('.header').style.height = `${vh}px`;
        document.querySelector('.header').style.maxHeight = `${vh}px`;
    }

    // Run once on load, and update on orientation change only
    setFixedVH();
    window.addEventListener('resize', () => {
        if (window.matchMedia("(orientation: portrait)").matches || 
            window.matchMedia("(orientation: landscape)").matches) {
            setFixedVH();
        }
    });
});
