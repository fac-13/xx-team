/* eslint-disable */
var loginBtn = document.querySelector('#login-btn');
var signupBtn = document.querySelector('#signup-btn');
var signUp = document.querySelector('#signup');
var newUser = document.querySelector('#new-user');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm-password');
var commentBtn = document.getElementById('comment-btn');
var login = document.getElementById('login');
var hasAccount = document.getElementById('has-account');
var posts = document.getElementById('posts');
var emaildisplay = document.getElementById('showemail');

var makeRequest = function (url, method, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status == 200) {
      const response = xhr.responseText;
      return callback(null, response);
    } else {
      callback('Server error' + xhr.status);
    }
  });
  xhr.addEventListener('error', function () {
    callback('Server did not respond');
  });
  xhr.open(method, url, true);
  if (data) xhr.send(data);
  else xhr.send();
};

makeRequest('/viewall', 'get', null, displayPosts);

function displayPosts(err, data) {
  data = JSON.parse(data);
  if (err) console.log(err);

  data.forEach(function (post) {
    var article = document.createElement('article');
    article.className = 'post';
    var p = document.createElement('p');
    var text = document.createTextNode(post.comment);
    var author = document.createElement('span');
    author.className = 'author';
    var email = document.createTextNode('Written by: ' + post.email);
    var date = document.createElement('span');
    date.className = 'date';
    var timestamp = document.createTextNode('2018-05-15');
    console.log(text, email, timestamp);
    p.appendChild(text);
    author.appendChild(email);
    date.appendChild(timestamp);
    article.appendChild(p);
    article.appendChild(author);
    article.appendChild(date);
    posts.appendChild(article);
  });
}

commentBtn.addEventListener('click', function (e) {
  e.preventDefault();
  while (posts.firstChild) posts.removeChild(posts.firstChild);
  data = document.getElementById('post-comment').value;
  makeRequest('/comment', 'post', data, updatePosts);
});

function updatePosts(data) {
  makeRequest('/viewall', 'get', null, displayPosts);
}

function showEmail(data) {
  var email = document.createElement('h3');
  var emailText = document.createTextNode('You are logged in as: ' + data);
  email.appendChild(emailText);
  emaildisplay.appendChild(email);
  document.getElementById('login').removeAttribute('open');
  document.getElementById('signup').removeAttribute('open');
}

function getEmail(e) {
  e.preventDefault();
  makeRequest('/validate', 'get', null, function (err, email) {
    showEmail(email);
  });
}

loginBtn.addEventListener('click', getEmail);


function handleError() {
  console.log('error');
}

// Show the correct dialog
newUser.addEventListener('click', () => {
  login.removeAttribute('open');
  signUp.setAttribute('open', 'true');
});

hasAccount.addEventListener('click', function () {
  login.setAttribute('open', 'true');
  signUp.removeAttribute('open');
});

// Set custom validity message for signup password
password.addEventListener('input', event => {
  if (password.validity.patternMismatch) {
    password.setCustomValidity(
      'Password must contain 1 uppercase varter, a number or special character and be at least 8 characters long'
    );
  } else {
    password.setCustomValidity('');
  }
});

// Ensure that password and confirm passwords match
confirmPassword.addEventListener('input', event => {
  if (confirmPassword.validity.patternMismatch) {
    confirmPassword.setCustomValidity(
      'Password must contain 1 uppercase varter, a number or special character and be at least 8 characters long'
    );
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Passwords must match');
  } else {
    confirmPassword.setCustomValidity('');
  }
});


document.getElementById('logout').addEventListener('click', function () {
  makeRequest('/logout', 'GET', '', function () { });
});
