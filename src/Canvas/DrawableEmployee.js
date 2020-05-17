import { DrawableCircle } from './Drawable/DrawableCircle';
import { Moveable } from './Moveable';

export class DrawableEmployee extends Moveable(DrawableCircle) {
  constructor({
    id,
    name,
    xCurrent,
    yCurrent,
    radius,
    color,
    drawPoint,
    track,
    currentPointIndex,
  }, two) {
    super({
      id,
      name,
      xCurrent,
      yCurrent,
      radius,
      color,
      drawPoint,
      track,
      currentPointIndex,
    }, two);
  }

  clear() {
    this.two.remove(this.drawPoint);
  }

  move(x, y) {
    this.clear();
    this.xCenter = x;
    this.yCenter = y;
    this.draw();
  }
}
