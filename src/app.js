import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';
import Door from './Door.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from '/const.js';

export const element = document.querySelector('.js-building-canvas');
export const canvas = new Two({width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: element});

ELEMENTS_BUILDING.walls.forEach((item) => {
  let wall = new Wall({
    xStart: item.xStart, 
    yStart: item.yStart,                 
    xEnd: item.xEnd, 
    yEnd: item.yEnd, 
    thickness: item.thickness, 
    color: item.color
  }, canvas);

  wall.draw();
});

ELEMENTS_BUILDING.doors.forEach((item) => {
  let door = new Door({
    xStart: item.xStart,
    yStart: item.yStart, 
    xEnd: item.xEnd,
    yEnd: item.yEnd, 
    thickness: item.thickness, 
    color: item.color
  }, canvas);

  door.draw();
})
