var loginBtn = document.querySelector('#login-btn');
var signupBtn = document.querySelector('#signup-btn')
var signUp = document.querySelector('#signup');
var newUser = document.querySelector('#new-user');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm-password');

var xhr = new XMLHttpRequest();
var makeRequest = function (url, callback, errorCallback) {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        errorCallback();
      }
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

makeRequest('/viewall', displayPosts, handleError);


function displayPosts(data) {

    data.forEach(function(post) {
        var article = document.createElement('article');
        article.className = 'post';
        var p = document.createElement('p');
        var text = document.createTextNode(post.comment);
        var author = document.createElement('span');
        author.className = 'author';
        var email = document.createTextNode(post.email);        
        var date = document.createElement('span');
        date.className = 'date';
        var timestamp = document.createTextNode('2018-05-15');
        console.log(text, email, timestamp);
        p.appendChild(text);
        author.appendChild(email);
        date.appendChild(timestamp);
        article.appendChild(p)
        article.appendChild(author);
        article.appendChild(timestamp);
        document.getElementById('posts').appendChild(article);
    })
}

function handleError() {
    console.log('error');
}


// Show the correct dialog
newUser.addEventListener('click', function () {
    login.removeAttribute('open');
    signUp.setAttribute('open', 'true');
})

// Set custom validity message for signup password 
password.addEventListener("input", function (event) {
    if (password.validity.patternMismatch) {
        password.setCustomValidity("Password must contain 1 uppercase letter, a number or special character and be at least 8 characters long");
    } else {
        password.setCustomValidity("");
    }
});

// Ensure that password and confirm passwords match
confirmPassword.addEventListener("input", function (event) {
    if (confirmPassword.validity.patternMismatch) {
        confirmPassword.setCustomValidity("Password must contain 1 uppercase letter, a number or special character and be at least 8 characters long");
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords must match");
    } else {
        confirmPassword.setCustomValidity("");
    }
});
