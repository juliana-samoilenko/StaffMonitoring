import './index.scss';
import Two from 'two.js';
import { Wall } from './Canvas/Wall';
import { Door } from './Canvas/Door';
import { DrawableZone } from './Canvas/DrawableZone';
import { DrawableEmployee } from './Canvas/DrawableEmployee';
import { EmployeeTrack } from './Canvas/EmployeeTrack';
import { createEmployeeEntity } from './Core/entity/EmployeeEntity';
import { renderApp } from './renderApp';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from './const';

renderApp();

const canvasElement = document.querySelector('.js-building-canvas');
const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvasElement });
const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
  zone: DrawableZone,
  employee: DrawableEmployee,
};

const elementForDrawing = Object.values(ELEMENTS_BUILDING).flat();

elementForDrawing.forEach((buildingObjectConfigWithType) => {
  const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
  const Drawable = buildingObjectsByTypes[buildingObjectType];

  const drawableObject = new Drawable(buildingObjectConfig, two);
  drawableObject.draw();
});

const points1 = [{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 100, y: 100 }];
const track1 = new EmployeeTrack({ id: 1, points: points1 });
const employeeEntity1 = createEmployeeEntity({ name: 'Петров С.М.', position: 'engineer', trackId: 1, permittedZoneIds: [1, 2] });
const employee1 = new DrawableEmployee({
  employee: employeeEntity1,
  xCurrent: 50,
  yCurrent: 50,
  radius: 15,
  color: '#3A19A4',
  track: track1,
}, two);

const points2 = [{ x: 200, y: 200 }, { x: 200, y: 250 }, { x: 250, y: 250 }, { x: 250, y: 200 }];
const track2 = new EmployeeTrack({ id: 1, points: points2 });
const employeeEntity2 = createEmployeeEntity({ name: 'Щербаков Д.Д.', position: 'working', trackId: 2, permittedZoneIds: [2, 4] });
const employee2 = new DrawableEmployee({
  employee: employeeEntity2,
  xCurrent: 200,
  yCurrent: 200,
  radius: 15,
  color: '#3A19A4',
  track: track2,
}, two);

const points3 = [{ x: 400, y: 400 }, { x: 500, y: 500 }, { x: 300, y: 500 }];
const track3 = new EmployeeTrack({ id: 1, points: points3 });
const employeeEntity3 = createEmployeeEntity({ name: 'Пугало Р.К.', position: 'programmer', trackId: 3, permittedZoneIds: [1, 3, 4] });
const employee3 = new DrawableEmployee({
  employee: employeeEntity3,
  xCurrent: 500,
  yCurrent: 500,
  radius: 15,
  color: '#3A19A4',
  track: track3,
}, two);

[employee1, employee2, employee3].forEach((employee) => {
  employee.draw();
  employee.moveAlong();
});
