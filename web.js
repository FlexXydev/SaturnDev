const WebSocket = require('ws');
const socket = new WebSocket('ws://127.0.0.1:8080');

socket.onopen = function(event) {
  socket.send('Hello Server!');
};

socket.onmessage = function(event) {
  console.log('Received message from server: ', event.data);
};
