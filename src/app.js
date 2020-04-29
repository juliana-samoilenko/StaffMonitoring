import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING
} from '/const.js';
import Door from './Door.js';

export const canvas = document.querySelector('.js-building-canvas');
export const plan = new Two({width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas});

ELEMENTS_BUILDING.walls.forEach((item) => {
  let wall = new Wall({ xStart: item.xStart, yStart: item.yStart, 
                        xEnd: item.xEnd, yEnd: item.yEnd, 
                        thickness: item.thickness, color: item.color} );
  wall.drawWall();
})

ELEMENTS_BUILDING.doors.forEach((item) => {
  let door = new Door({ xStart: item.xStart, yStart: item.yStart, 
                        xEnd: item.xEnd, yEnd: item.yEnd, 
                        thickness: item.thickness, color: item.color} );
  door.drawDoor();
})

plan.update();
