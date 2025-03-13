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
            
            if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
                text.style.opacity = '1';
            } else {
                text.style.opacity = '0';
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once to set initial state
});
