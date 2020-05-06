export class DrawableCircle {
  constructor({ id, name, xCurrent, yCurrent, radius, color }, two) {
    this.id = id;
    this.name = name;
    this.xCenter = xCurrent;
    this.yCenter = yCurrent;
    this.radius = radius;
    this.color = color;
    this.two = two;
    this.drawPoint;
  }

  draw() {
    this._makeCircle();
    this.two.add(this.drawPoint);
    this.two.update();
  }

  _makeCircle() {
    this.drawPoint = this.two.makeCircle(this.xCenter, this.yCenter, this.radius);
    this.drawPoint.id = this.id;
    this.drawPoint.fill = this.color;
    this.drawPoint.noStroke();
  }
}
