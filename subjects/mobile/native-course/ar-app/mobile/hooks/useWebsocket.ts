import { useEffect, useRef, useState } from "react";

export function useWebsocket(url?: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [timeoutCompleted, settimeoutCompleted] = useState(true);

  useEffect(() => {
    const websocket = new WebSocket(url || "ws://192.168.1.28:1337");

    setWs(websocket);

    websocket.onopen = () => {
      console.log("WebSocket connected.");
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    websocket.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendWithThrottle = (data: any, delay?: number) => {
    if (ws && ws.readyState === ws.OPEN && timeoutCompleted) {
      ws.send(JSON.stringify(data));
      settimeoutCompleted(false);
      const t = setTimeout(() => {
        settimeoutCompleted(true);
      }, delay || 200);
    }
  };

  return { ws, sendWithThrottle };
}
