export class DrawableLine {
  constructor({
    xStart, yStart, xEnd, yEnd, thickness, color,
  }, two) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
    this.two = two;
  }

  draw() {
    this._makeLine();
    this.two.update();
  }

  _makeLine() {
    const line = this.two.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    line.linewidth = this.thickness;
    line.stroke = this.color;
  }
}
