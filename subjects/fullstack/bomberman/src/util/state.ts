import { Enemy, MapTile } from "../types/types";
import { DisplayDriver } from "./display";

export class GameState {
  static _instance: GameState;
  mapWidth: number = 0;
  mapHeight: number = 0;

  map: MapTile[][] = [];
  enemys: Enemy[] = [];
  static get instance() {
    if (!GameState._instance) {
      GameState._instance = new GameState();
    }
    return GameState._instance;
  }

  static mockGameState(width: number, height: number) {
    const instance = new GameState();
    //* Fill map with empty stuff
    instance.map = Array.from({ length: height }, () => Array(width).fill(0));
    instance.mapWidth = width;
    instance.mapHeight = height;
    //* Create borders around the map
    for (let i = 0; i < height; i++) {
      instance.map[i][0] = 1; // Left border
      instance.map[i][width - 1] = 1; // Right border
    }
    for (let i = 0; i < width; i++) {
      instance.map[0][i] = 1; // Top border
      instance.map[height - 1][i] = 1; // Bottom border
    }

    GameState._instance = instance;
    return instance;
  }

  static updateGameState(map: MapTile[][]) {
    const instance = GameState.instance;
    instance.map = map;
    instance.mapHeight = map.length;
    instance.mapWidth = map[0].length;

    DisplayDriver.instance?.setSize(
      instance.mapWidth * 16,
      instance.mapHeight * 16
    );
    DisplayDriver.instance?.clear();
  }
}
