export class DrawableLine {
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
    const line = this.canvas.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    line.linewidth = this.thickness;
    line.stroke = this.color;
  }
}

export class DrawableRectangle {
  constructor({ id, name, xCenter, yCenter, width, height, color }, canvas) {
    this.id = id;
    this.name = name;
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = canvas;
  }

  draw() {
    this._makeRectangle();
    this.canvas.update();
  }

  _makeRectangle() {
    const rectangle = this.canvas.makeRectangle(this.xCenter, this.yCenter, this.width, this.height);
    rectangle.fill = this.color;
    rectangle.id = this.id;
    rectangle.noStroke();
  }
}

export class DrawableCircle {
  constructor({ id, name, xCurrent, yCurrent, radius, color }, canvas) {
    this.id = id;
    this.name = name;
    this.xCenter = xCurrent;
    this.yCenter = yCurrent;
    this.radius = radius;
    this.color = color;
    this.canvas = canvas;
  }

  draw() {
    this._makeCircle();
    this.canvas.update();
  }

  _makeCircle() {
    const circle = this.canvas.makeCircle(this.xCenter, this.yCenter, this.radius);
    circle.id = this.id;
    circle.fill = this.color;
    circle.noStroke();
  }
}
