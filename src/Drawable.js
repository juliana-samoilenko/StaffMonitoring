export default class DrawableLine {
  constructor({ xStart, yStart, xEnd, yEnd, thickness, color }, canvas) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
    this.canvas = canvas;
  }

  draw() {
    this._makeLine();
    this.canvas.update();
  }

  _makeLine() {
    let line = this.canvas.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    line.linewidth = this.thickness;
    line.stroke = this.color;
  }
}
