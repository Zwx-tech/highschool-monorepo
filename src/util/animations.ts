export namespace Animation {
  export function mapSprite(start: number, end: number, frame: number) {
    return start + (frame % (end - start));
  }

  export function mapEnemyAnimation(frame: number) {
    return mapSprite(19 * 14, 19 * 14 + 7, frame);
  }
}
