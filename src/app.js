import './index.scss';
import Two from 'two.js';
import { Wall } from './Wall.js';
import { Door } from './Door.js';
import { Zone } from './Zone.js';
import { Employee } from './Employee.js';
import { EmployeeTrack } from './EmployeeTrack.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from './const.js';

const canvasElement = document.querySelector('.js-building-canvas');
const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvasElement });
const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
  zone: Zone,
  employee: Employee,
};

[...ELEMENTS_BUILDING.walls, ...ELEMENTS_BUILDING.doors, ...ELEMENTS_BUILDING.zones].forEach((buildingObjectConfigWithType) => {
  const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
  const Drawable = buildingObjectsByTypes[buildingObjectType];

  const drawableObject = new Drawable(buildingObjectConfig, two);
  drawableObject.draw();
});

const track1 = new EmployeeTrack({ id: 1, points: [{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 150 }, { x: 100, y: 100 }, { x: 50, y: 100 }] });
const employee1 = new Employee({
  id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track1,
}, two);

const track2 = new EmployeeTrack({ id: 1, points: [{ x: 200, y: 200 }, { x: 200, y: 250 }, { x: 250, y: 250 }, { x: 250, y: 200 }] });
const employee2 = new Employee({
  id: 2, name: 'Петров С.М.', xCurrent: 200, yCurrent: 200, radius: 15, color: '#3A19A4', track: track2,
}, two);

const track3 = new EmployeeTrack({ id: 1, points: [{ x: 400, y: 400 }, { x: 500, y: 500 }, { x: 300, y: 500 }] });
const employee3 = new Employee({
  id: 3, name: 'Кожемяка В.С.', xCurrent: 500, yCurrent: 500, radius: 15, color: '#3A19A4', track: track3,
}, two);

[employee1, employee2, employee3].forEach((employee) => {
  employee.draw();
  employee.moveAlong();
});
