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
    this.rectangle = null;
  }

  draw() {
    this._makeRectangle();
  }

  _makeRectangle() {
    this.rectangle = this.two.makeRectangle(this.xCenter, this.yCenter, this.width, this.height);
    this.rectangle.fill = this.color;
    this.rectangle.noStroke();
  }

  update() {
    this.two.update();
  }
}
