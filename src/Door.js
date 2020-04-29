import DrawableLine from './DrawableLine.js';

export default class Door extends DrawableLine {
  constructor( { xStart, yStart, xEnd, yEnd, thickness, color } ) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
  }

  drawDoor() {
    let door = plan.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    door.linewidth = this.thickness;
    door.stroke = this.color;

    plan.update();
  }
}
