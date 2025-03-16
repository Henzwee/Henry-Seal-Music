document.addEventListener('DOMContentLoaded', function () {
    const headerText = document.querySelector('.text-container');
    const henryText = document.querySelector('.name');
    const sealText = document.querySelector('.seal');
    const albumTexts = document.querySelectorAll('.album-text');
    const albumBoxes = document.querySelectorAll('.album');
    const streamingSection = document.getElementById('streaming-links');

    // Ensure text-container appears immediately
    if (headerText) {
        headerText.style.opacity = '1';
    }

    // Animate HENRY first (No JS override of CSS)
    setTimeout(() => {
        if (henryText) {
            henryText.style.removeProperty('opacity'); // Let CSS handle opacity
        }
    }, 200); // Small delay for a smoother load

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
    handleScroll();

    // Lock viewport height to prevent resizing on scroll
    function setFixedVH() {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        const header = document.querySelector('.header');
        if (header) {
            header.style.height = `${vh}px`;
            header.style.maxHeight = `${vh}px`;
        }
    }

    // Run once on load, and update on orientation change only
    setFixedVH();
    window.addEventListener('resize', () => {
        if (window.matchMedia("(orientation: portrait)").matches || 
            window.matchMedia("(orientation: landscape)").matches) {
            setFixedVH();
        }
    });

    // Smooth scroll to streaming links when clicking an album
    if (streamingSection) {
        albumBoxes.forEach(album => {
            album.addEventListener('click', function () {
                console.log('Album clicked:', album); // Debugging log
                streamingSection.scrollIntoView({ behavior: 'smooth' });
            });
        });
    } else {
        console.error('Error: Streaming section not found!');
    }
});
