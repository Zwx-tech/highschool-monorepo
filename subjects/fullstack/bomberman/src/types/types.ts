export enum MapTile {
  EMPTY = 0,
  WALL = 1,
  BRICK = 2,
  PLAYER = 3,
}

export type Enemy = {
  pos: { x: number; y: number };
};
