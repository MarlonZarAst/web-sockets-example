import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Usuario conectado en el servidor');

  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    });
    // ws.send(JSON.stringify(payload));

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });


  ws.on('close',() => {
    console.log('Usuario ha sido desconectado en el servidor');
  })

  // setInterval(()=> {
  //   ws.send('Hola de nuez bb');
  // }, 2000)
});

console.log('Server running on: http://localhost:3000');