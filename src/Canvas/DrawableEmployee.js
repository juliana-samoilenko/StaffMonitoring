import { DrawableCircle } from './Drawable/DrawableCircle';
import { Moveable } from './Moveable';

export class DrawableEmployee extends Moveable(DrawableCircle) {
  constructor({
    employee,
    xCurrent,
    yCurrent,
    radius,
    color,
    drawPoint,
    track,
    currentPointIndex,
  }, two) {
    super({
      xCurrent,
      yCurrent,
      radius,
      color,
      drawPoint,
      track,
      currentPointIndex,
    }, two);
    this.id = employee.id;
    this.name = employee.name;
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
