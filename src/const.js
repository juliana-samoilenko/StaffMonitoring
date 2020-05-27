import { ZoneEntity } from './Core/entity/ZoneEntity';

const WALL_COLOR = '#000000';
const DOOR_COLOR = '#A63600';
const ZONE_COLOR = '#FFD173';
const INTERNAL_WALL_THICKNESS = 5;
const DOOR_THICKNESS = 5;
const EXTERNAL_WALL_THICKNESS = 15;

export const WIDTH_CANVAS = 1045;
export const HEIGHT_CANVAS = 600;

export const EMPLOYEE_TRACKS = [
  { id: 1, name: 1, points: [[100, 100], [200, 200], [300, 300]] },
  { id: 2, name: 2, points: [[100, 200], [100, 300], [100, 400]] },
  { id: 3, name: 3, points: [[700, 100], [700, 200], [700, 300]] },
];

export const ZONES = [
  {id: 1, name: 'Высотные работы' },
  {id: 2, name: 'Цех 1'},
  {id: 3, name: 'Высокое напряжение'},
  {id: 4, name: 'Спец оборудование'}
];

export const EMPLOYEE = [
  { id: 1, name: 'Петров С.М.', position: 'engineer', permittedZones: [1, 2] },
  { id: 2, name: 'Щербаков Д.Д.', position: 'working', permittedZones: [2, 4] },
  { id: 3, name: 'Пугало Р.К.', position: 'programmer', permittedZones: [1, 3, 4] }
];

const zoneEntity1 = new ZoneEntity (ZONES[0]);
const zoneEntity2 = new ZoneEntity (ZONES[1]);
const zoneEntity3 = new ZoneEntity (ZONES[2]);
const zoneEntity4 = new ZoneEntity (ZONES[3]);

export const ELEMENTS_BUILDING = {
  walls: [
    // external walls
    {
      type: 'wall', xStart: 0, yStart: 0, xEnd: 0, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 0, yStart: 0, xEnd: WIDTH_CANVAS, yEnd: 0, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 0, yStart: HEIGHT_CANVAS, xEnd: WIDTH_CANVAS, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: WIDTH_CANVAS, yStart: HEIGHT_CANVAS, xEnd: WIDTH_CANVAS, yEnd: 0, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },

    // internal walls
    {
      type: 'wall', xStart: 0, yStart: 190, xEnd: 500, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 570, yStart: 190, xEnd: 860, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 930, yStart: 190, xEnd: 1045, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 800, yStart: 192, xEnd: 800, yEnd: 0, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 330, yStart: 190, xEnd: 330, yEnd: 400, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 330, yStart: 470, xEnd: 330, yEnd: 600, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 660, yStart: 190, xEnd: 660, yEnd: 400, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: 660, yStart: 470, xEnd: 660, yEnd: 600, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
  ],

  doors: [
    {
      type: 'door', xStart: 570, yStart: 189, xEnd: 635, yEnd: 235, thickness: DOOR_THICKNESS, color: DOOR_COLOR,
    },
    {
      type: 'door', xStart: 930, yStart: 189, xEnd: 995, yEnd: 235, thickness: DOOR_THICKNESS, color: DOOR_COLOR,
    },
    {
      type: 'door', xStart: 329, yStart: 400, xEnd: 375, yEnd: 335, thickness: DOOR_THICKNESS, color: DOOR_COLOR,
    },
    {
      type: 'door', xStart: 659, yStart: 470, xEnd: 615, yEnd: 535, thickness: DOOR_THICKNESS, color: DOOR_COLOR,
    },
  ],

  zones: [
    {
      type: 'zone', zone: zoneEntity1, xCenter: 108, yCenter: 58, width: 200, height: 100, color: ZONE_COLOR,
    },
    {
      type: 'zone', zone: zoneEntity2, xCenter: 920, yCenter: 98, width: 235, height: 180, color: ZONE_COLOR,
    },
    {
      type: 'zone', zone: zoneEntity3, xCenter: 168, yCenter: 258, width: 319, height: 130, color: ZONE_COLOR,
    },
    {
      type: 'zone', zone: zoneEntity4, xCenter: 922, yCenter: 532, width: 230, height: 120, color: ZONE_COLOR,
    },
  ],
};
