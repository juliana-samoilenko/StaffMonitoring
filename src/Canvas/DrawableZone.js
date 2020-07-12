import { DrawableRectangle } from './Drawable/DrawableRectangle';

export class DrawableZone extends DrawableRectangle {
  constructor({
    zone,
    xCenter,
    yCenter,
    width,
    height,
    color,
  }, two) {
    super({
      xCenter,
      yCenter,
      width,
      height,
      color,
    }, two);
    this.id = zone.id;
    this.name = zone.name;
    this.zone = zone;
  }

  draw() {
    super.draw();
    this._writeText();
    this.update();
  }

  _writeText() {
    const text = this.two.makeText(this.name, this.xCenter, this.yCenter);
    text.size = 14;
  }

  contains(xCenter, yCenter) {
    const {
      left: xMin,
      right: xMax,
      top: yMin,
      bottom: yMax,
    } = this.rectangle.getBoundingClientRect();
    const currentXEmployee = xCenter;
    const currentYEmployee = yCenter;

    return this._isWithinRange(currentXEmployee, xMin, xMax) && this._isWithinRange(currentYEmployee, yMin, yMax);
  }

  _isWithinRange(checkedPoint, minValue, maxValue) {
    return checkedPoint >= minValue && checkedPoint <= maxValue;
  }
}
