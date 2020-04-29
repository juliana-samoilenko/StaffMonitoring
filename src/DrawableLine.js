import {
  canvas
} from './app.js';

export default class DrawableLine {
  constructor( { xStart, yStart, xEnd, yEnd, thickness, color } ) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
  }

  draw() {
    this.makeLine();
    canvas.update();
  }

  makeLine() {
    let line = canvas.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    line.linewidth = this.thickness;
    line.fill = this.color;
  }
}
