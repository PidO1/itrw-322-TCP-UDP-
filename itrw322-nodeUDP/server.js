var PORT = 33333;
var HOST = 'localhost';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var fs = require("fs");
var log = require('util').log;
var wstream = fs.createWriteStream('C:/Users/User/Desktop/itrw322-nodeUDP/uploads/test.jpg');

wstream.on('finish', function () {
  console.log('file has been written');
});

server.on('message', function (message, remote) {
    console.log('server on on port '+ PORT);
    wstream.write(message);
    wstream.end();
});

server.bind(PORT, HOST);
