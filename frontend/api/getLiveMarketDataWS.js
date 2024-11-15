export const getLiveMarketDataWS = async (socket, tickerName, setRealTimePrice, setRealTimePoints) => {
    socket.addEventListener('open', function (event) {
      console.log('WebSocket is open now.');
      setRealTimePoints([]);
      socket.send(tickerName);
    });

    socket.addEventListener('message', function (event) {
      let parsedObj =  JSON.parse(event.data)?.[0];
      let ap = parsedObj?.['ap'] ?? 0;
      let t = parsedObj?.['t'] ?? Date.now();
      if(ap !== 0){ 
        setRealTimePrice(ap);
        setRealTimePoints(points => [...points, [t, ap]]);
      }
    });

    socket.addEventListener('close', function (event) {
      console.log('WebSocket is closed now.');
    });

    socket.addEventListener('error', function (event) {
      console.error('WebSocket error observed:', event);
    });
};