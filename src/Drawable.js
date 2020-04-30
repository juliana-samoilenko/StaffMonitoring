import {
  canvas
} from './app.js';

export default class Drawable {
  constructor( { xStart, yStart, xEnd, yEnd, thickness, color, xCenter, yCenter, radius } ) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    //this.xCenter = xCenter;
    //this.yCenter = yCenter;

    //this.radius = radius;

    this.thickness = thickness;
    this.color = color; 
  }

  drawLine() {
    this._makeLine();
    canvas.update();
  }

  /*drawCircle() {
    this._makeCircle();
    canvas.update();
  }*/

  _makeLine() {
    let line = canvas.makePath(this.xStart, this.yStart, this.xEnd, this.yEnd);
    line.linewidth = this.thickness;
    line.stroke = this.color;
  }
  /*_makeCircle() {
    let circle = canvas.makeCircle(this.xCenter, this.yCenter, this.radius);
    circle.fill = this.color;
  }*/

}
