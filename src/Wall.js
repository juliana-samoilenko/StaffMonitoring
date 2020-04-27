import {
  PLAN
} from './app.js';

export default class Wall {
  constructor(xStart, yStart, xEnd, yEnd, thickness, color) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.thickness = thickness;
    this.color = color;
  }
}
