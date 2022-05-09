var socket = io.connect('ws://192.168.50.12:33000');
socket.on('connect',function(){
    console.log('服务已连接');
});
function sendMes(mes) {
    socket.emit('message', mes);
}
socket.on('message',function(data){
    console.log(data);
});