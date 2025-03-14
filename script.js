document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.text-container');
    const name = document.querySelector('.name');
    const seal = document.querySelector('.seal');
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

    // Set viewport height dynamically to prevent resizing issues
    function setVH() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }

    window.addEventListener('resize', setVH);
    setVH(); // Run once on load
});
