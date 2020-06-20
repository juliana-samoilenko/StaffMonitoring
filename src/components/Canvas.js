import Two from 'two.js';
import { Component } from './Component';
import { DrawableWall } from '../Canvas/DrawableWall';
import { DrawableDoor } from '../Canvas/DrawableDoor';
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
  wall: DrawableWall,
  door: DrawableDoor,
  zone: DrawableZone,
};

const createCanvasTemplate = () =>`
  <canvas class="work-display__plan js-building-canvas">
  </canvas>
`;

export class Canvas extends Component {
  constructor(data) {
    super(data);
    this.two = new Two({
      width: WIDTH_CANVAS,
      height: HEIGHT_CANVAS,
      domElement: this.getElement()
    });
    this.employeeListForDrawing = [];
    this.drawableZones = [];
    this.overlaps = new Map();
  }

  getTemplate() {
    return createCanvasTemplate(this.data);
  }

  drawElementsBuilding() {
    const elementForDrawing = Object.values(ELEMENTS_BUILDING).flat();

    elementForDrawing.forEach((buildingObjectConfigWithType) => {
      const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
      const Drawable = buildingObjectsByTypes[buildingObjectType];

      const drawableObject = new Drawable(buildingObjectConfig, this.two);

      if (buildingObjectType === 'zone') {
        this.drawableZones.push(drawableObject);
      }

      drawableObject.draw();
    });
  }

  drawEmployeeList(employeeList, tracks) {
    employeeList.forEach(employee => {
      this.drawNewEmployee(employee, tracks);
    })
  }

  drawNewEmployee(newEmployee, tracks) {
    if (newEmployee.trackId) {
      const employeeTrack = tracks.find(track => track.id === newEmployee.trackId);
      this._drawEmployeeWithTrack(newEmployee, employeeTrack);
    } else {
      this._drawEmployeeWithoutTrack(newEmployee);
    }
  }

  drawEditedEmployee(editedEmployee, tracks) {
    const editedEmployeeId = editedEmployee.id;
    this.removeEmployee(editedEmployeeId);
    this.drawNewEmployee(editedEmployee, tracks);
  }

  removeEmployee(employeeId) {
    const employeeToRemove = this.employeeListForDrawing.find(employee => employee.getId() === employeeId);
    employeeToRemove.remove();
    this.employeeListForDrawing = this.employeeListForDrawing.filter(employee => employee.getId() !== employeeId);
  }

  setOverlapHandler(handler) {
    this.handleOverlap = handler;
  }

  checkOverlapBetweeenEmployeeAndZone(drawableEmployee) {
    const drawableEmployeeId = drawableEmployee.id;

    this.drawableZones.forEach(drawableZone => {
      const isEmployeeInZone = drawableZone.contains(
        drawableEmployee.xCenter,
        drawableEmployee.yCenter
      );
      const isEmployeeInOverlapList = this.isEmployeeInAnyZone(drawableEmployeeId);

      if (isEmployeeInZone && !isEmployeeInOverlapList) {
        this.overlaps.set(
          drawableEmployeeId,
          { zoneId: drawableZone.id }
        );

        this.handleOverlap(drawableEmployee.employee, drawableZone.zone);
      }
      else if (!isEmployeeInZone && isEmployeeInOverlapList && this.isEmployeeZone(drawableZone, drawableEmployeeId)) {
        this.overlaps.delete(drawableEmployeeId);
      }
    });
  }

  isEmployeeInAnyZone(employeeId) {
    return this.overlaps.has(employeeId);
  }

  isEmployeeZone(zone, drawableEmployeeId) {
    const employeeOverlap = this.overlaps.get(drawableEmployeeId);
    return employeeOverlap.zoneId === zone.id ? true : false;
  }

  _drawEmployeeWithTrack(employee, employeeTrack) {
    const { x: pointX, y: pointY } = employeeTrack.getPoint(0);
    const drawableEmployee = new DrawableEmployee({
      employee: employee,
      xCurrent: pointX,
      yCurrent: pointY,
      radius: EMPLOYEE_RADUIS,
      color: EMPLOYEE_COLOR,
      track: employeeTrack,
      afterMove: this.checkOverlapBetweeenEmployeeAndZone.bind(this),
    }, this.two);

    this.employeeListForDrawing.push(drawableEmployee);

    drawableEmployee.draw();
    drawableEmployee.startMovingAlongTrack();
  }

  _drawEmployeeWithoutTrack(employee) {
    const drawableEmployee = new DrawableEmployee({
      employee: employee,
      xCurrent: -100,
      yCurrent: -100,
      radius: EMPLOYEE_RADUIS,
      color: EMPLOYEE_COLOR,
    }, this.two);

    this.employeeListForDrawing.push(drawableEmployee);
  }
}
