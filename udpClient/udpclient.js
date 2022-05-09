/**
 * Created by Ben on 2016/11/14.
 */
var HOST = '127.0.0.1';
var PORT = 3000;
var dgram = require ('dgram');
var server = dgram.createSocket('udp4');
var recive = [];
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

server.on ('listening', function(){
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    //console.log(remote.address + ':' + remote.port +' - ' + message);
    recive.push(message.toString());
    ee.emit('message',message.toString(),remote);
// var message = new Buffer(JSON.stringify(ret));
    //for(var i=1;i<10;i++) {
    //   server.send(message, 0, message.length, remote.port, remote.address);
    //}
});

server.bind(PORT, HOST);

module.exports.recive = ee;

module.exports.send = function(mes,callback){
    var message = new Buffer(mes);
    server.send(message, 0, message.length, 1122, '127.0.0.1');
	//server.send(message, 0, message.length, 10000, '192.168.0.182');
    if(callback!=null) {
        server.once('message', function (mes, remote) {
            //console.log(remote.address + ':' + remote.port +' - ' + mes);
            callback(mes.toString());
            callback = null;
        });
    }
};