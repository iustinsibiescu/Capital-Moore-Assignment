const WebSocket = require('ws');

// should be stored in a Vault
const ALPACA_WS_URL = 'wss://stream.data.alpaca.markets/v2/iex';;
const API_KEY = 'PKJDY8ND6A4NLGRRU113';
const SECRET_KEY = 'jpcYtnSkrhwekimVTnZBADpld7cFW0MK5NeIOnFq';

const streamAlpaca = (clientSocket, ticker) => {
  const socket = new WebSocket(ALPACA_WS_URL, {
    headers: {
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': SECRET_KEY,
    },
  });  

  socket.on('open', function open() {
    console.log('Connected to Alpaca WebSocket');
    
    const authMessage = {
      action: 'auth',
      key: API_KEY,
      secret: SECRET_KEY,
    };
    socket.send(JSON.stringify(authMessage));
  
    const subscribeMessage = {
      action: 'subscribe',
      trades: [ticker],
      quotes: [ticker],
      bars: [ticker],
    };
    socket.send(JSON.stringify(subscribeMessage));
  });
  
  socket.on('message', async function incoming(ev) {
    const message = await JSON.parse(ev);
    console.log('Real-time data:', message);
    clientSocket.send(JSON.stringify(message));
  });
  
  socket.on('close', function close() {
    console.log('Disconnected from Alpaca WebSocket');
  });
  
  socket.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });

  return () => socket.close();
}

module.exports = streamAlpaca;