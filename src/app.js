import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING
} from '/const.js';
import Door from './Door.js';

export const CANVAS = document.getElementById('work-display__plan');
export const PLAN = new Two({width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: CANVAS});

ELEMENTS_BUILDING.walls.forEach((item) => {
  let wall = new Wall(item.xStart, item.yStart, 
                      item.xEnd, item.yEnd, 
                      item.thickness, item.color);
  wall.drawWall();
})

ELEMENTS_BUILDING.doors.forEach((item) => {
  let door = new Door(item.xStart, item.yStart, 
                      item.xEnd, item.yEnd, 
                      item.thickness, item.color);
  door.drawDoor();
})

PLAN.update();
