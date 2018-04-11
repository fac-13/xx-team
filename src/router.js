const {
  staticHandler,
  loginHandler,
  signupHandler,
  viewallHandler,
  logoutHandler
} = require('./handler');
const fs = require('fs');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else if (url === '/login') {
    loginHandler(request, response);
  } else if (url.indexOf('/signup') !== -1) {
    signupHandler(request, response);
  } else if (url.indexOf('/logout') !== -1) {
    logoutHandler(request, response);
  } else if (url.indexOf('/viewall') !== -1) {
    viewallHandler(request, response);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
