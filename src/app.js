import '/index.scss';
import Two from 'two.js';
import {Wall} from './Wall.js';
import {Door} from './Door.js';
import {Zone} from './Zone.js';
import {Employee} from './Employee.js';
import { EmployeeTrack } from './EmployeeTrack.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from '/const.js';


const canvasElement = document.querySelector('.js-building-canvas');
const two = new Two( { width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvasElement } );
const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
  zone: Zone,
  employee: Employee
};

[...ELEMENTS_BUILDING.walls, ...ELEMENTS_BUILDING.doors, ...ELEMENTS_BUILDING.zones, ...ELEMENTS_BUILDING.employees].forEach((buildingObjectConfigWithType) => {
  const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
  const Drawable = buildingObjectsByTypes[buildingObjectType];

  const drawableObject = new Drawable(buildingObjectConfig, two);
  drawableObject.draw();
});

let track = new EmployeeTrack( { id: 1, points: [{x: 50, y: 50}, {x: 100, y: 50}, {x: 100, y: 100}, {x: 200, y: 200}, {x: 300, y: 200}], employeeCurrentPointIndex: 0} );

let circle = new Employee( {id: 13, name: 'Юдашин В.К.', xCurrent: 100, yCurrent: 100, radius: 10, color: "red"}, two );
circle.draw();
circle.moveAlong(track);
