// interface CanvasInterface {
//   makeCircle() {}
//   update() {}
// }

// Rafael -> Adapter { makeCircle(...args) { Rafael.createCircle(...args)}}
//   createCircle

export class DrawableCircle {
  constructor({
    xCurrent,
    yCurrent,
    radius,
    color,
  }, two /* CanvasInterface */) {
    this.xCenter = xCurrent;
    this.yCenter = yCurrent;
    this.radius = radius;
    this.color = color;
    this.two = two;
    this.drawPoint = null;
  }

  draw() {
    this._makeCircle();
  }

  _makeCircle() {
    this.drawPoint = this.two.makeCircle(this.xCenter, this.yCenter, this.radius);
    this.drawPoint.fill = this.color;
    this.drawPoint.noStroke();
  }

  update() {
    this.two.update();
  }
}
