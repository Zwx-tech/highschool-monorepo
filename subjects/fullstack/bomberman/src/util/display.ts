import { MapTile } from "../types/types";
import { GameState } from "./state";

const spriteSheetSize = {
  width: 16,
  height: 16,
};

const idToPosition = (id: number) => {
  return {
    x: (id % spriteSheetSize.width) * spriteSheetSize.width,
    y: Math.floor(id / spriteSheetSize.width) * spriteSheetSize.height,
  };
};

export class DisplayDriver {
  animationFrame: number = 0;
  ctx: CanvasRenderingContext2D;
  spriteSheet: HTMLImageElement;
  static instance: DisplayDriver | null = null;
  private renderCount: number = 0; // Add this line

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;

    this.spriteSheet = document.getElementById(
      "spriteSheet"
    ) as HTMLImageElement;
    if (!this.spriteSheet) {
      throw new Error("Sprite sheet not found");
    }
    DisplayDriver.instance = this;
  }

  displaySprite(id: number, xPos: number = 0, yPos: number = 0) {
    const { x, y } = idToPosition(id);
    this.ctx.drawImage(
      this.spriteSheet,
      x,
      y,
      spriteSheetSize.width,
      spriteSheetSize.height,
      xPos,
      yPos,
      spriteSheetSize.width,
      spriteSheetSize.height
    );
  }

  mapTile(tile: MapTile) {
    let tileId = 0;
    switch (tile) {
      case MapTile.EMPTY:
        tileId = 16 * 5;
        break;
      case MapTile.WALL:
        tileId = 16 * 3 + 3;
        break;
      case MapTile.BRICK:
        tileId = 16 * 3 + 4;
        break;
      default:
        tileId = 16 * 4;
    }
    return tileId;
  }

  enemySpriteFrame(animationFrame: number) {
    return 15 * 16 + (animationFrame % 4);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  setSize(width: number, height: number) {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }

  displayMap() {
    const gameState = GameState.instance;
    // Increment animation frame every 8 renders
    this.renderCount = (this.renderCount + 1) % 18;
    if (this.renderCount === 0) {
      this.animationFrame++;
    }

    for (let i = 0; i < gameState.mapHeight; i++) {
      for (let j = 0; j < gameState.mapWidth; j++) {
        this.displaySprite(this.mapTile(gameState.map[i][j]), j * 16, i * 16);
      }
    }
    // Draw enemies with animation
    for (const enemy of gameState.enemys) {
      this.displaySprite(
        this.enemySpriteFrame(this.animationFrame),
        enemy.pos.x * 16,
        enemy.pos.y * 16
      );
    }
  }
}
