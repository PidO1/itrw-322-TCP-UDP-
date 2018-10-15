var PORT = 33333;
var HOST = 'localhost';
var dgram = require('dgram');
var log = require('util').log;
var client = dgram.createSocket('udp4');
var fs = require("fs");
var message ;
fs.readFile('C:/Users/User/Desktop/itrw322-nodeUDP/x.jpg',(err,data)=>{

message =  Buffer.from(data,'base64');
client.send(message, 0, data.length, PORT, HOST, function(err, bytes) {
    if (err) {
        return console.log(err);
      }
    log('UDP file sent to ' + HOST +':'+ PORT);
    log('File size: ' + data.length);
  });
});

// fs.readFile('C:/Users/User/Desktop/itrw322-nodeUDP/test.txt', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
  
// });