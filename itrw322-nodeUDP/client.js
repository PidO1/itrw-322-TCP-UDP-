var PORT = 5644;
var HOST = '192.168.1.2';
var dgram = require('dgram');
var log = require('util').log;
var client = dgram.createSocket('udp4');
var fs = require("fs");
var message ;
fs.readFile('C:/Users/piete/Desktop/itrw-322-TCP-UDP-/itrw322-nodeUDP/x.jpg',(err,data)=>{
  var d = new Date();
  var n ;
message =  Buffer.from(data,'base64');
client.send(message, 0, data.length, PORT, HOST, function(err, bytes) {
    n =  d.getMilliseconds();
    if (err) {
        return console.log(err);
      }
    log('UDP file sent to ' + HOST +':'+ PORT);
    log('File size: ' + data.length);
    var na = d.getMilliseconds();
  console.log(na-n);
  });
});

// fs.readFile('C:/Users/User/Desktop/itrw322-nodeUDP/test.txt', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
  
// });