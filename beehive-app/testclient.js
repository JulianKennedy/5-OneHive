//create websocket test client
var WebSocket = require('ws');

var ws = new WebSocket('ws://192.168.3.194:443');

ws.on('open', function open() {
    //send this to the server
    // {"Temperature":"-1","Humidity":"-2","Pressure":"-0.03","Weight":"-4","Frequency":"-5"}
    const data = {"Temperature":"-1","Humidity":"-2","Pressure":"-0.03","Weight":"-4","Frequency":"-5"};
    ws.send(JSON.stringify(data));
    }
);
