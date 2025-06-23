// Redirect to login if not logged in
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html"; // Send to login page
}

// Get stored email from localStorage
const email = localStorage.getItem("userEmail");

// Display welcome message if email is present
if (email) {
  const welcomeElement = document.getElementById("welcome");
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${email}`;
  }
}

// Handle logout button in form.html
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn"); // Clear login status
    localStorage.removeItem("userEmail"); // Clear user email
    window.location.href = "index.html"; // Redirect to login
  });
}

// Handle logout link in nav
const logoutNav = document.getElementById("logoutNav");
if (logoutNav) {
  logoutNav.addEventListener("click", () => {
    localStorage.removeItem("loggedIn"); // Clear login status
    localStorage.removeItem("userEmail"); // Clear user email
    window.location.href = "index.html"; // Redirect to login
  });
}

// Switch between login and signup forms
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

if (switchToSignup) {
  switchToSignup.addEventListener('click', e => {
    e.preventDefault(); // Prevent default anchor behavior
    loginForm.classList.add('hidden'); // Hide login form
    signupForm.classList.remove('hidden'); // Show signup form
  });
}

if (switchToLogin) {
  switchToLogin.addEventListener('click', e => {
    e.preventDefault(); // Prevent default anchor behavior
    signupForm.classList.add('hidden'); // Hide signup form
    loginForm.classList.remove('hidden'); // Show login form
  });
}

// Login form submission handler
const loginFormElement = loginForm?.querySelector('form');
loginFormElement?.addEventListener('submit', e => {
  e.preventDefault(); // Stop form from submitting

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (localStorage.getItem(`user_${email}`) === password) {
    localStorage.setItem('loggedIn', 'true'); // Set login flag
    localStorage.setItem('userEmail', email); // Save email
    window.location.href = 'form.html'; // Redirect
  } else {
    alert('Invalid login'); // Show error
  }
});

// Signup form submission handler
const signupFormElement = signupForm?.querySelector('form');
signupFormElement?.addEventListener('submit', e => {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (localStorage.getItem(`user_${email}`)) {
    alert('Account already exists'); // Check for duplicates
  } else {
    localStorage.setItem(`user_${email}`, password); // Save new user
    localStorage.setItem('loggedIn', 'true'); // Set login flag
    localStorage.setItem('userEmail', email); // Save email
    window.location.href = 'form.html'; // Go to form
  }
});

// Auto-redirect logged in users from login to form page
if (window.location.pathname.includes("index.html") && localStorage.getItem("loggedIn")) {
  window.location.href = "form.html";
}
