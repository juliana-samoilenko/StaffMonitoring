import Two from 'two.js';
import { Component } from './Component';
import { Wall } from '../Canvas/Wall';
import { Door } from '../Canvas/Door';
import { DrawableZone } from '../Canvas/DrawableZone';
import { DrawableEmployee } from '../Canvas/DrawableEmployee';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
  EMPLOYEE_COLOR,
  EMPLOYEE_RADUIS,
} from '../const';

const createCanvasTemplate = () =>`
  <canvas class="work-display__plan js-building-canvas">
  </canvas>
`;

export class Canvas extends Component {
  constructor(data) {
    super(data);
    this.two = null;
    this.employeeListForDrawing = [];
  }
  
  getTemplate() {
    return createCanvasTemplate(this.data);
  }

  bindCanvasTwo() {
    const canvasElement = document.querySelector('.js-building-canvas');
    this.two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvasElement });
  }
}
