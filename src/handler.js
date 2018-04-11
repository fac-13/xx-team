const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { getAllPosts } = require('./queries/getalldata');

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
  console.log('LOGIN URL', request.url);
};

const signupHandler = (request, response) => {
  console.log('SIGNUP URL', request.url);
};

const logoutHandler = (request, response) => {
  console.log('LOGOUT URL', request.url);
};

const viewallHandler = (request, response) => {
    getAllPosts((err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem getting the posts from the server. Try again later.</h1>");
      } else {
        let output = JSON.stringify(res);
        response.writeHead(200, {
          "content-type": "application/json"
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
  logoutHandler
};
