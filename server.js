// Démarrez le serveur websocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Stockez une référence au serveur websocket dans une variable globale
global.websocketServer = wss;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});
