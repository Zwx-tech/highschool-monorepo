const WebSocket = require("ws");

const PORT = 1337;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`ws startuje na porcie ${PORT}`);
});

//reakcja na podłączenie klienta i odesłanie komunikatu

wss.on("connection", (ws, req) => {
  //adres ip klienta

  const clientip = req.connection.remoteAddress; //reakcja na komunikat od klienta

  ws.on("message", (message) => {
    console.log("serwer odbiera z klienta " + clientip + ": ", message);
    ws.send("serwer odsyła do klienta -> " + message);
  });
});
