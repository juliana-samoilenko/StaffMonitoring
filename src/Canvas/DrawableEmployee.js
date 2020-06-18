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
    afterMove
  }, two) {
    super({
      xCurrent,
      yCurrent,
      radius,
      color,
      drawPoint,
      currentPointIndex,
    }, two);
    this.track = track ? track : null;
    this.id = employee.id;
    this.name = employee.name;
    this.drawableZones = null;
    this.afterMove = afterMove;
    this.drawableEmployee = null;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  draw() {
    super.draw();
    this.update();
  }

  clear() {
    this.two.remove(this.drawPoint);
    this.update();
  }

  move(x, y) {
    this.clear();
    this.xCenter = x;
    this.yCenter = y;
    this.draw();
  }

  remove() {
    this.stopMovingAlongTrack();
    this.clear();
  }

  addArgumentsForCheckOverlap(drawableZones, drawableEmployee) {
    this.drawableZones = drawableZones;
    this.drawableEmployee = drawableEmployee;
  }

  getOverlaps() {
    return this.overlaps;
  }
}
