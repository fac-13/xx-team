const fs = require('fs');
const path = require('path');
require('env2')('./config.env');
const querystring = require('querystring');
const { getAllPosts } = require('./queries/getalldata');
const { signup } = require('./queries/signup');
const { postComment } = require('./queries/postcomment');
const secret = process.env.SECRET;
const { checkPassword } = require('./queries/checkpassword');
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');

const staticHandler = (response, filepath) => {
  const extension = filepath.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml'
  };

  fs.readFile(path.join(__dirname, '..', filepath), 'utf8', (error, file) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end('<h1>Server error</h1>');
    } else {
      response.writeHead(200, { 'content-type': extensionType[extension] });
      response.end(file);
    }
  });
};

const loginHandler = (request, response) => {
  let data = '';
  request.on('data', function (chunk) {
    data += chunk;
  });
  request.on('end', () => {
      const registerData = querystring.parse(data);
      const email = registerData.email;
      const password = registerData.password;
      checkPassword(email, password, (err, res) => {
          if(err){
              response.writeHead(500, { 'content-type': 'text/html' });
              response.end('<h1>Failed to login the user, try again</h1>');
          }else{
            let token = sign({'logged-in' : 'true', 'email' : `${email}`}, secret);
            response.writeHead(302, {
              "Content-Type": "text/html", "location": "/", 'Set-Cookie' : `token = ${token}; HttpOnly; Max-Age=9000;`
            });
            response.end();
          }
      });
  });
};


const signupHandler = (request, response) => {
    let data = '';
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', () => {
        const registerData = querystring.parse(data);
        const email = registerData.email;
        const password = registerData.password;
        signup(email, password, (err, res) => {
            if(err){
                response.writeHead(500, { 'content-type': 'text/html' });
                response.end('<h1>Failed to sign the user, try again</h1>');
            }else{
              let token = sign({'logged-in' : 'true', 'email' : `${email}`}, secret);
              response.writeHead(302, {
                "Content-Type": "text/html", "location": "/", 'Set-Cookie' : `token = ${token}; HttpOnly; Max-Age=9000;`
              });
              response.end();
            }
        });
    });
};

const logoutHandler = (request, response) => {
  response.writeHead(302, {
    'Set-Cookie': 'token=false; Max-Age=0;',
    'Location' : '/'
  });
  return response.end();
};

const postCommentHandler = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    postComment(data, (err, res) => {
      if (err) {
        response.writeHead(500, { 'content-type': 'text/html' });
        response.end("<h1>Sorry, your post wasn't saved!</h1>");
      } else {
        response.writeHead(200, { 'content-type': 'text/plain' });
        response.end('Posted your comment.');
      }
    });
  });
};

const viewallHandler = (request, response) => {
  getAllPosts((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end(
        '<h1>Sorry, there was a problem getting the posts from the server. Try again later.</h1>'
      );
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(output);
    }
  });
};

module.exports = {
  staticHandler,
  loginHandler,
  signupHandler,
  viewallHandler,
  logoutHandler,
  postCommentHandler,
};
