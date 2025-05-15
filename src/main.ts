import "./style.css";
import { GameState } from "./util/state";
import { _init, _update } from "./util/update";

let wsUri = "ws://localhost:46089";
const websocket = new WebSocket(wsUri);

function send() {
  var msg = {
    test2: "Hello!",
  };
  websocket.send(JSON.stringify(msg));
}

function init() {
  websocket.onopen = function (ev) {
    console.log("WebSocket connection established");
  };

  websocket.onmessage = function (ev) {
    if (ev.data) {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "map") {
          GameState.updateGameState(msg.map);
          console.log("Map received and updated:", msg.map);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  };

  websocket.onerror = function (ev) {
    console.error("WebSocket error:", ev);
  };
}

document.getElementById("test")?.addEventListener("click", send);

document.addEventListener("DOMContentLoaded", () => {
  init();
  _init();
  _update();
});
