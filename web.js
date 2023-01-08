const socket = new WebSocket('ws://localhost:8080/');

socket.onmessage = function(event) {
  const consoleOutput = document.getElementById('console-output');
  consoleOutput.innerHTML += event.data + '<br>';
};

function sendMessageToServer(message) {
  socket.send(message);
}
