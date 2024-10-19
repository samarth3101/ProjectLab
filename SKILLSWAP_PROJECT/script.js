// Select the login form, signup form, social login section, and toggle links
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const socialLogin = document.querySelector('.social-login'); // Social login section
const toggleSignup = document.getElementById('toggleSignup');
const toggleLogin = document.getElementById('toggleLogin');

// Get the logout button in the dashboard
const logoutButton = document.getElementById('logoutButton');

// Select the login and signup buttons specifically
const loginButton = loginForm?.querySelector('button[type="submit"]');
const signupButton = signupForm?.querySelector('button[type="submit"]');

// Get the loading screen
const loadingScreen = document.getElementById('loadingScreen');

// Show the login form by default
if (loginForm) {
    loginForm.classList.add('active');
    signupForm?.classList.remove('active');
    socialLogin.style.display = 'block'; // Show social login initially
}

// Switch to Signup form when the "Sign up" link is clicked
toggleSignup?.addEventListener('click', (e) => {
    e.preventDefault();
    // Hide the login form and social icons
    loginForm.classList.add('hidden');
    loginForm.classList.remove('active');

    // Show the signup form
    signupForm.classList.remove('hidden');
    signupForm.classList.add('active');
});

// Switch back to Login form when the "Login" link is clicked
toggleLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    // Hide the signup form
    signupForm.classList.add('hidden');
    signupForm.classList.remove('active');

    // Show the login form and social icons
    loginForm.classList.remove('hidden');
    loginForm.classList.add('active');
});

// Function to show the loading screen and redirect after a delay
function showLoadingScreenAndRedirect(redirectUrl, action) {
    const progressBar = loadingScreen.querySelector('.loading-bar'); // Select the progress bar element
    if (progressBar) {
        progressBar.style.width = '0'; // Reset width at the start
    }

    // Show loading screen
    loadingScreen.classList.add('show');

    // Start the progress bar animation
    setTimeout(() => {
        if (progressBar) {
            progressBar.style.width = '100%'; // Fill the bar
        }
    }, 0); // Ensure this runs after the loading screen is visible

    // Set the loading message based on action
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.textContent = action === 'login' 
            ? "Logging In..." 
            : action === 'signup' 
            ? "Signing Up..." 
            : action === 'save' 
            ? "Saving Changes..." 
            : "Logging Out...";
    }

    // Simulate loading time before redirecting (3 seconds for the animation)
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 3000); // 3-second delay before the redirect happens
}

// Simulated Login Process
loginButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the email and password values
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    // Basic validation
    if (!email || !password) {
        alert("Please fill in all fields."); // Feedback for empty fields
        return;
    }

    // Simulate successful login
    showLoadingScreenAndRedirect('dashboard.html', 'login'); // Redirect after login
});

// Simulated Signup Process
signupButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the name, email, and password values
    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value.trim();

    // Basic validation
    if (!name || !email || !password) {
        alert("Please fill in all fields."); // Feedback for empty fields
        return;
    }

    // Simulate successful signup
    showLoadingScreenAndRedirect('dashboard.html', 'signup'); // Redirect after signup
});

// Add event listener for the logout button
logoutButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    showLoadingScreenAndRedirect('login.html', 'logout'); // Show loading screen before redirecting
});

// Function to clear form fields after submission (optional)
function clearForm(form) {
    form.reset(); // Resets all form fields to their default values
}

// Simulated social login functions
function handleSocialLogin(platform) {
    alert(`Logging in with ${platform}...`);
    showLoadingScreenAndRedirect('dashboard.html', 'login'); // Redirect after social login
}

// Add event listeners for social login buttons
document.getElementById('googleLogin')?.addEventListener('click', () => handleSocialLogin('Google'));
document.getElementById('facebookLogin')?.addEventListener('click', () => handleSocialLogin('Facebook'));
document.getElementById('twitterLogin')?.addEventListener('click', () => handleSocialLogin('Twitter'));

// User Profile Handling (assumes the profile form exists)
const profileForm = document.getElementById('profileForm');

// Simulated profile save process
profileForm?.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get user details
    const name = profileForm.querySelector('input[name="name"]').value.trim();
    const email = profileForm.querySelector('input[name="email"]').value.trim();
    const bio = profileForm.querySelector('textarea[name="bio"]').value.trim();

    // Basic validation
    if (!name || !email || !bio) {
        alert("Please fill in all fields."); // Feedback for empty fields
        return;
    }

    // Simulate saving user details
    showLoadingScreenAndRedirect('dashboard.html', 'save');
});

// Handle the "Save Changes" button click for the profile form
document.getElementById('saveChangesButton')?.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default action like form submission or page reload

    // Display the loading screen with the "Saving Changes..." message
    showLoadingScreenAndRedirect('dashboard.html', 'save');
});

// Add event listener for the profile button (assuming it exists)
const profileButton = document.getElementById('profileButton');
profileButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.href = 'profile.html'; // Directly redirect to profile page
});