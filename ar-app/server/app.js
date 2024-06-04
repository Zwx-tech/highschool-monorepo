const WebSocket = require("ws");

const PORT = 1337;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`ws startuje na porcie ${PORT}`);
});

sendToAllButMe = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

sendToAll = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", (ws, req) => {
  const clientip = req.connection.remoteAddress;
  console.log(`Client connected: ${clientip}`);

  ws.on("message", (message) => {
    console.log(`Received message from ${clientip}: ${message}`);
    sendToAllButMe(message, ws);
  });

  ws.on("close", () => {
    console.log(`Client disconnected: ${clientip}`);
  });
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});
