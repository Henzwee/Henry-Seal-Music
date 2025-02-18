document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.text-container');
    const name = document.querySelector('.name');
    const seal = document.querySelector('.seal');
    
    // Delayed animation for text
    setTimeout(() => {
        headerText.style.opacity = '1';
        headerText.style.animation = 'slideIn 2s forwards';
    }, 500);  // Adjust timing as needed
});
