//create websocket test client
var WebSocket = require('ws');

var ws = new WebSocket('ws://192.168.1.1:443');

ws.on('open', function open() {
    ws.send('something');
    }
);
