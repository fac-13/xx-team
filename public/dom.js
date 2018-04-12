var loginBtn = document.querySelector('#login-btn');
var signupBtn = document.querySelector('#signup-btn')
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
    if (!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password.value)) {
        password.setCustomValidity("Password must contain 1 uppercase letter, a number or special character and be at least 8 characters long");
    } else {
        password.setCustomValidity("");
    }
});

function checkPasswords(event) {
    event.preventDefault();
    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords must match");
    }
}
// Ensure that password and confirm passwords match
signupBtn.addEventListener("submit", checkPasswords); 


