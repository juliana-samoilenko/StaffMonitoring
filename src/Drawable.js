export class DrawableLine {
  constructor({ xStart, yStart, xEnd, yEnd, thickness, color }, two) {
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
