//creates a new server
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.createServer(app);
console.log('Server is running on PORT:',(port));
server.listen(port);


