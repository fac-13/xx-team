const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, () => {
  console.log(`The server is running: http://${host}:${port}`);
});
