var net = require('net');
var fs = require('fs');


var PORT = 5644;
var HOST = '192.168.1.2';
var FILEPATH = 'C:/Users/piete/Desktop/itrw-322-TCP-UDP-/itrw322-nodeTCP/x.jpg';

var client = new net.Socket()

//connect na die server toe
client.connect(PORT,HOST,function() {
    'Client Connected to server'

    //send die file hier
    var fileStream = fs.createReadStream(FILEPATH);
    fileStream.on('error', function(err){
        console.log(err);
    })

    fileStream.on('open',function() {
        fileStream.pipe(client);
    });

});

//handle closed
client.on('close', function() {
    console.log('server closed connection')
});

client.on('error', function(err) {
    console.log(err);
});







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