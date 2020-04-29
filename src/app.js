import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';
import Door from './Door.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
  EXTERNAL_WALL_THICKNESS, 
  WALL_COLOR
} from '/const.js';


export const element = document.querySelector('.js-building-canvas');
export const canvas = new Two({width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: element});

let line = new Wall( { xStart: 0, yStart: 0, xEnd: 0, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR } );
line.draw();


/*ELEMENTS_BUILDING.walls.forEach((item) => {
  let wall = new Wall({ xStart: item.xStart, yStart: item.yStart, 
                        xEnd: item.xEnd, yEnd: item.yEnd, 
                        thickness: item.thickness, color: item.color} );
  wall.drawWall();
})*/

/*ELEMENTS_BUILDING.doors.forEach((item) => {
  let door = new Door({ xStart: item.xStart, yStart: item.yStart, 
                        xEnd: item.xEnd, yEnd: item.yEnd, 
                        thickness: item.thickness, color: item.color} );
  door.drawDoor();
})*/
