export class DrawableCircle {
  constructor({
    xCurrent,
    yCurrent,
    radius,
    color,
  }, two) {
    this.xCenter = xCurrent;
    this.yCenter = yCurrent;
    this.radius = radius;
    this.color = color;
    this.two = two;
    this.drawPoint = null;
  }

  draw() {
    this._makeCircle();
    this.two.add(this.drawPoint);
    this.two.update();
  }

  _makeCircle() {
    this.drawPoint = this.two.makeCircle(this.xCenter, this.yCenter, this.radius);
    this.drawPoint.fill = this.color;
    this.drawPoint.noStroke();
  }
}
