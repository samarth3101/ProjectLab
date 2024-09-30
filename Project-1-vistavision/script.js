// JavaScript to handle toggle button functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.navbar_toggle');
    const navbarLinks = document.querySelector('.navbar_links');

    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
});