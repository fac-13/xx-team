var loginBtn = document.querySelector('#login-btn'); 
var signUp = document.querySelector('#signup');
var newUser = document.querySelector('#new-user');

// Show the correct dialog
newUser.addEventListener('click', function() {
    login.removeAttribute('open');
    signUp.setAttribute('open', 'true');
})