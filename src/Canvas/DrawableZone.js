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

  contains(drawableEmployee) {
    const currentXEmployee = drawableEmployee.xCenter;
    const currentYEmployee = drawableEmployee.yCenter;
    const xMin = this.xCenter - this.width / 2;
    const xMax = this.xCenter + this.width / 2;
    const yMin = this.yCenter - this.height / 2;
    const yMax = this.yCenter + this.height / 2;

    return this._isWithinRange(currentXEmployee, xMin, xMax) && this._isWithinRange(currentYEmployee, yMin, yMax);
  }

  _isWithinRange(checkedPoint, minValue, maxValue) {
    return checkedPoint >= minValue && checkedPoint <= maxValue ? true : false;
  }
}
