import { useEffect, useState } from "react";

export function useWebsocket(
  socketUrl: string,
  onMessage: (data: { data: Blob }) => void
) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(socketUrl || "ws://localhost:1337");
    ws.onopen = () => {
      console.log("Connected to websocket");
      setSocket(ws);
    };

    ws.onmessage = onMessage;

    ws.onclose = () => {
      console.log("Disconnected from websocket");
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
}
