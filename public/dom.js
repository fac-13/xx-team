var loginBtn = document.querySelector('#login-btn');
var signUp = document.querySelector('#signup');
var newUser = document.querySelector('#new-user');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm-password');

// Show the correct dialog
newUser.addEventListener('click', function () {
    login.removeAttribute('open');
    signUp.setAttribute('open', 'true');
})

// Set custom validity message for singup password 
password.addEventListener("input", function (event) {
    if (!password.validity.valid) {
        password.setCustomValidity("Password must contain 1 uppercase letter, a number or special character and be at least 8 characters long");
    } else {
        password.setCustomValidity("");
    }
});

// Ensure that password and confirm passwords match
confirmPassword.addEventListener("input", function (event) {
    if (!confirmPassword.validity.valid) {
        confirmPassword.setCustomValidity("Password must contain 1 uppercase letter, a number or special character and be at least 8 characters long");
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords must match");
    } else {
        password.setCustomValidity("");
    }
});