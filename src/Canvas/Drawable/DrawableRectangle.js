export class DrawableRectangle {
  constructor({
    xCenter,
    yCenter,
    width,
    height,
    color,
  }, two) {
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.width = width;
    this.height = height;
    this.color = color;
    this.two = two;
  }

  draw() {
    this._makeRectangle();
  }

  _makeRectangle() {
    const rectangle = this.two.makeRectangle(this.xCenter, this.yCenter, this.width, this.height);
    rectangle.fill = this.color;
    rectangle.noStroke();
  }

  update() {
    this.two.update();
  }
}
