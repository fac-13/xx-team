const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

server.listen(port, function() {
  console.log(`The server is running: http://${host}:${port}`);
})