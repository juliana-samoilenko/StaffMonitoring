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

const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
  zone: DrawableZone,
};

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

  drawElementsBuilding() {
    const elementForDrawing = Object.values(ELEMENTS_BUILDING).flat();

    elementForDrawing.forEach((buildingObjectConfigWithType) => {
    const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
    const Drawable = buildingObjectsByTypes[buildingObjectType];

    const drawableObject = new Drawable(buildingObjectConfig, this.two);
    drawableObject.draw();
    });
  }

  _drawEmployeeWithTrack(employee, employeeTrack) {
    const startPointsOfTrack = employeeTrack.getPoint(0);
    const drawingOfEmployee = new DrawableEmployee({
      employee: employee,
      xCurrent: startPointsOfTrack[0],
      yCurrent: startPointsOfTrack[1],
      radius: EMPLOYEE_RADUIS,
      color: EMPLOYEE_COLOR,
      track: employeeTrack,
    }, this.two);

    this.employeeListForDrawing.push(drawingOfEmployee); 

    drawingOfEmployee.draw();
    drawingOfEmployee.moveAlong();
  }

  _drawEmployeeWithoutTrack(employee, employeeTrack) {
    const drawingOfEmployee = new DrawableEmployee({
      employee: employee,
      xCurrent: -100,
      yCurrent: -100,
      radius: EMPLOYEE_RADUIS,
      color: EMPLOYEE_COLOR,
      track: employeeTrack,
    }, this.two);

    this.employeeListForDrawing.push(drawingOfEmployee); 
  }
}
