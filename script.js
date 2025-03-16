document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.text-container');
    const henryText = document.querySelector('.name');
    const sealText = document.querySelector('.seal');
    const albumTexts = document.querySelectorAll('.album-text');
    const albumBoxes = document.querySelectorAll('.album'); // Selects all album boxes
    const streamingSection = document.getElementById('streaming-links'); // Targets the streaming links section

    // Ensure text-container appears
    if (headerText) {
        headerText.style.opacity = '1';
    }

    // Ensure both texts start invisible and off-screen
    if (henryText) {
        henryText.style.opacity = '0';
        henryText.style.transform = 'translateX(-150%)';
    }
    if (sealText) {
        sealText.style.opacity = '0';
        sealText.style.transform = 'translateX(-150%)';
    }

    // Animate HENRY first (faster)
    setTimeout(() => {
        if (henryText) {
            henryText.style.animation = 'slideIn 1.5s ease-out forwards';
        }
    }, 500); // HENRY slides in first

    // Animate SEAL later (slower)
    setTimeout(() => {
        if (sealText) {
            sealText.style.animation = 'slideInSeal 3s ease-out forwards';
        }
    }, 1200); // SEAL slides in more slowly

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
            album.addEventListener('click', function() {
                console.log('Album clicked:', album); // Debugging log
                streamingSection.scrollIntoView({ behavior: 'smooth' });
            });
        });
    } else {
        console.error('Error: Streaming section not found!');
    }
});
