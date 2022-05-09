/**
 * Created by Ben on 2016/9/19.
 */
let sendudp = require('./udpclient').send;
let UDPrecive = require('./udpclient').recive;

var io = require('socket.io')({
    transports: ['websocket'],
});

io.attach(33000);

io.on('connection', function(socket){
    //console.log('a user connected');
    var iparray = socket.request.connection.remoteAddress.toString().split(':');
    //socket.handshake.address
    var socketinfo = {id: socket.id, ip: iparray[iparray.length - 1]};

    console.log('a user connected : ' + JSON.stringify(socketinfo));
    //socket.broadcast.emit('hi');

    //socket.emit('chat message', "Hello Dude Your ip info is : " + JSON.stringify(socketinfo));

    socket.on('disconnect', function () {
        console.log('user disconnected : ' + JSON.stringify(socketinfo));
    });

    socket.on('message', function (msg) {
        //io.emit('message', msg);
        //socket.emit('boop',msg);
        socket.broadcast.emit('message',msg);
        sendudp(msg);
        console.log('message: ' + msg);
    });
});

UDPrecive.on('message',function(message,remote){
    "use strict";
    console.log(remote.address + ':' + remote.port +' - ' + message);
    io.emit('message', message);
});