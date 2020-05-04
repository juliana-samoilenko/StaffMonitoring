import '/index.scss';
import Two from 'two.js';
import Wall from './Wall.js';
import Door from './Door.js';
import Zone from './Zone.js';

import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
  ELEMENTS_BUILDING,
} from '/const.js';

const element = document.querySelector('.js-building-canvas');
const canvas = new Two( { width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: element } );
const buildingObjectsByTypes = {
  wall: Wall,
  door: Door,
  zone: Zone,
};

[...ELEMENTS_BUILDING.walls, ...ELEMENTS_BUILDING.doors, ...ELEMENTS_BUILDING.zones].forEach((buildingObjectConfigWithType) => {
  const { type: buildingObjectType, ...buildingObjectConfig } = buildingObjectConfigWithType;
  const Drawable = buildingObjectsByTypes[buildingObjectType];

  const drawableObject = new Drawable(buildingObjectConfig, canvas);
  drawableObject.draw();
});
