var connect = require('connect');
var serveStatic = require('serve-static');

var port = 8080;
connect().use(serveStatic(__dirname)).listen(port);


console.log('Server up at localhost:',port);
