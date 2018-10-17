var net = require('net');
var socket = new net.Socket();
socket.connect(5000, "127.0.0.1");
var fs = require('fs');
var path = require('path');

var packets = 0;
var buffer = new Buffer(0);
socket.on('data', function(chunk){
  packets++;
  console.log(chunk);
  buffer = Buffer.concat([buffer, chunk]);
});

socket.on('close', function(){
  console.log("total packages", packets);

  var writeStream = fs.createWriteStream(path.join(__dirname, "xafter.png"));
  console.log("buffer size", buffer.length);
  while(buffer.length){
    var head = buffer.slice(0, 4);
    console.log("head", head.toString());
    if(head.toString() != "FILE"){
      console.log("ERROR!!!!");
      process.exit(1);
    }
    var sizeHex = buffer.slice(4, 8);
    var size = parseInt(sizeHex, 16);

    console.log("size", size);

    var content = buffer.slice(8, size + 8);
    var delimiter = buffer.slice(size + 8, size + 9);
    console.log("delimiter", delimiter.toString());
    if(delimiter != "@"){
      console.log("wrong delimiter!!!");
      process.exit(1);
    }

    writeStream.write(content);
    buffer = buffer.slice(size + 9);
  }

  setTimeout(function(){
    writeStream.end();
  }, 2000);

});


























// var net = require('net');
// var fs = require('fs');


// var PORT = 9001;
// var HOST = '127.0.0.1';
// var FILEPATH = 'C:/Users/User/Desktop/test/x.jpg';

// var client = new net.Socket()

// //connect na die server toe
// client.connect(PORT,HOST,function() {
//     'Client Connected to server'

//     //send die file hier
//     var fileStream = fs.createReadStream(FILEPATH);
//     fileStream.on('error', function(err){
//         console.log(err);
//     })

//     fileStream.on('open',function() {
//         fileStream.pipe(client);
//     });

// });

// //handle closed
// client.on('close', function() {
//     console.log('server closed connection')
// });

// client.on('error', function(err) {
//     console.log(err);
// });







// const net = require('net');
// const fs = require('fs');
// net.bufferSize = 300000;
// net.bytesRead = 300000;
// const client = net.connect({port: 8124, address: 'localhost' }, () => {
//   // 'connect' listener
//   console.log('connected to server!');
//   client.write('world!\r\n');
// });

// const chunks = []
// client.on('data', chunk => chunks.push(chunk));
// client.on('end', () => {
//   const file = Buffer.concat(chunks)
//   fs.writeFile('./uploads', File, function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   }); 
// });
// // client.on('data', (data) => {
// //   // console.log(data.toString());
// //   console.log(net.bufferSize,data.length);
// //   client.end();
// // });
// // client.on('end', () => {
// //   console.log('disconnected from server');
// // });