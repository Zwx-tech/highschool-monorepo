import { DisplayDriver } from "./display";
import { GameState } from "./state";

let previousTime = 0;

export function _init() {
  const canvas = document.getElementById("app") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const displayDriver = new DisplayDriver(ctx);
  displayDriver.setSize(
    GameState.instance.mapWidth * 16,
    GameState.instance.mapHeight * 16
  );
}

export function _update() {
  const currentTime = Date.now();
  const deltaTime = currentTime - previousTime;

  const dd = DisplayDriver.instance;
  if (dd) {
    dd.clear();
    dd.displayMap(); // Display the updated map
  }

  update();
  while (deltaTime < 1000 / 24) {}
  requestAnimationFrame(_update);
}

function update() {}
