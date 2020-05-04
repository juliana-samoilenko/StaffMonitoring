import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';
import Door from './Door.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from '/const.js';

const element = document.querySelector('.js-building-canvas');
const canvas = new Two({width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: element});
const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
};

[...ELEMENTS_BUILDING.walls, ...ELEMENTS_BUILDING.doors].forEach((item) => {
  const Drawable = buildingObjectsByTypes[item.type];
  let nameProperties = [];
  for (let key in item) {
    if (key !== "type") {
      nameProperties.push(key);
    }
  }
  let properties = new Object();
  for (let property of nameProperties) {
    properties[property] = item[property];
  }

  let drawableObject = new Drawable(properties, canvas);
  drawableObject.draw();
});

