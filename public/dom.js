/* eslint-disable */

var loginBtn = document.querySelector('#login-btn');
var signupBtn = document.querySelector('#signup-btn');
var signUp = document.querySelector('#signup');
var newUser = document.querySelector('#new-user');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm-password');
var commentBtn = document.getElementById('comment-btn');
var posts = document.getElementById('posts');

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
    var email = document.createTextNode(post.email);
    var date = document.createElement('span');
    date.className = 'date';
    var timestamp = document.createTextNode('2018-05-15');
    console.log(text, email, timestamp);
    p.appendChild(text);
    author.appendChild(email);
    date.appendChild(timestamp);
    article.appendChild(p);
    article.appendChild(author);
    article.appendChild(timestamp);
    posts.appendChild(article);
  });
}

commentBtn.addEventListener('click', function () {
  while (posts.firstChild) posts.removeChild(posts.firstChild);
  data = document.getElementById('post-comment').value;
  makeRequest('/comment', 'post', data, updatePosts);
});

function updatePosts(data) {
  makeRequest('/viewall', 'get', null, displayPosts);
}

function handleError() {
  console.log('error');
}

// Show the correct dialog
newUser.addEventListener('click', () => {
  login.removeAttribute('open');
  signUp.setAttribute('open', 'true');
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
