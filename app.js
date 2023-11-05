const http = require('http');
const fs = require('fs');
const routes = require('./route')
const hostname = 'localhost';
const port = 3000;
const server = http.createServer(routes.requestHandler);
server.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
});

