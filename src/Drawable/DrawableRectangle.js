export class DrawableRectangle {
  constructor({ id, name, xCenter, yCenter, width, height, color }, two) {
    this.id = id;
    this.name = name;
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.width = width;
    this.height = height;
    this.color = color;
    this.two = two;
  }

  draw() {
    this._makeRectangle();
    this.two.update();
  }

  _makeRectangle() {
    const rectangle = this.two.makeRectangle(this.xCenter, this.yCenter, this.width, this.height);
    rectangle.fill = this.color;
    rectangle.id = this.id;
    rectangle.noStroke();
  }
}
