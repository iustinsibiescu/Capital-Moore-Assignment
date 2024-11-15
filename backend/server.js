const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const url = require("url");
const cors = require("cors");
const fs = require('fs');
const csv = require('csv-parser');
const downloadHistoricData = require("./utils/downloadHistoricData");
const streamAlpaca = require("./utils/streamAlpaca");

const PORT = 8081;
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ noServer: true });

app.use(cors());
app.use(express.json());

app.get("/historicData", async (req, res) => {
  const dataReader = () => {
    fs.createReadStream(`./historic_data/${ticker}_stock_data_${days}.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      res.status(500).send(`Error reading CSV file: ${error.message}`);
    });
  }

  let { ticker, days } = req.query;
  days = parseInt(days);
  let results = [];

  await downloadHistoricData(ticker, days, dataReader);
});

wsServer.on("connection", async (wsClient) => {
  let disconnecter = () => {};

  wsClient.on("message", async (prompt) => {
    console.log("Received prompt: ", prompt.toString());
    
    try{
      disconnecter = streamAlpaca(wsClient, prompt.toString());
    } catch(error){
      console.log(error);
      wsClient.close();
    }
  });

  wsClient.on("close", function close() {
    console.log("Closing backend socket");
    disconnecter();
  });
});

server.on("upgrade", (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === "/v1/stream") {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});