import { createZoneEntity } from '../Core/entity/ZoneEntity';
import { EmployeeTrack } from './EmployeeTrack';
import {
  points1, points2, points3,
  points4, points5,
} from './staticCanvasPointsForTracks';

const WALL_COLOR = '#000000';
const DOOR_COLOR = '#A63600';
const ZONE_COLOR = '#FFD173';
const INTERNAL_WALL_THICKNESS = 5;
const DOOR_THICKNESS = 5;
const FRONT_DOOR_THICKNESS = 7;
const EXTERNAL_WALL_THICKNESS = 15;

export const EMPLOYEE_COLOR = '#3A19A4';
export const EMPLOYEE_RADUIS = 15;
export const WIDTH_CANVAS = 1045;
export const HEIGHT_CANVAS = 600;

export const ZONES = [
  { id: 1, name: 'Высотные работы', isPermitted: false },
  { id: 2, name: 'Цех 1', isPermitted: false },
  { id: 3, name: 'Высокое напряжение', isPermitted: false },
  { id: 4, name: 'Спец оборудование', isPermitted: false },
];

export const EMPLOYEE_TRACKS = [
  new EmployeeTrack({
    id: 1,
    name: 1,
    points: points1,
    isOccupied: false,
  }),
  new EmployeeTrack({
    id: 2,
    name: 2,
    points: points2,
    isOccupied: true,
  }),
  new EmployeeTrack({
    id: 3,
    name: 3,
    points: points3,
    isOccupied: true,
  }),
  new EmployeeTrack({
    id: 4,
    name: 4,
    points: points4,
    isOccupied: false,
  }),
  new EmployeeTrack({
    id: 5,
    name: 5,
    points: points5,
    isOccupied: false,
  }),
];

const zoneEntity1 = createZoneEntity(ZONES[0]);
const zoneEntity2 = createZoneEntity(ZONES[1]);
const zoneEntity3 = createZoneEntity(ZONES[2]);
const zoneEntity4 = createZoneEntity(ZONES[3]);

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
      type: 'wall', xStart: 0, yStart: HEIGHT_CANVAS, xEnd: (WIDTH_CANVAS - 110) / 2, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
    },
    {
      type: 'wall', xStart: (WIDTH_CANVAS + 40) / 2, yStart: HEIGHT_CANVAS, xEnd: WIDTH_CANVAS, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR,
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
      type: 'door', xStart: 468, yStart: 595, xEnd: 400, yEnd: 565, thickness: FRONT_DOOR_THICKNESS, color: DOOR_COLOR,
    },
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
