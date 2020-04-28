import {
  plan
} from './app.js';

export default class Wall {
  constructor(xStart, yStart, xEnd, yEnd, thickness, color) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
  }

  drawWall() {
    let wall = plan.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    wall.linewidth = this.thickness;
    wall.fill = this.color;

    plan.update();
  }
}
