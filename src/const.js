export const WIDTH_CANVAS = 1045;
export const HEIGHT_CANVAS = 600;
export const WALL_COLOR = '#000';
export const INTERNAL_WALL_THICKNESS = 5;
export const EXTERNAL_WALL_THICKNESS = 15;

export const ELEMENTS_BUILDING = {
  walls: [
    //external walls
    { xStart: 0, yStart: 0, xEnd: 0, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 0, yStart: 0, xEnd: WIDTH_CANVAS, yEnd: 0, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 0, yStart: HEIGHT_CANVAS, xEnd: WIDTH_CANVAS, yEnd: HEIGHT_CANVAS, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: WIDTH_CANVAS, yStart: HEIGHT_CANVAS, xEnd: WIDTH_CANVAS, yEnd: 0, thickness: EXTERNAL_WALL_THICKNESS, color: WALL_COLOR },

    //internal walls
    { xStart: 0, yStart: 190, xEnd: 500, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 570, yStart: 190, xEnd: 860, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 930, yStart: 190, xEnd: 1045, yEnd: 190, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 800, yStart: 192, xEnd: 800, yEnd: 0, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 330, yStart: 190, xEnd: 330, yEnd: 400, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 330, yStart: 470, xEnd: 330, yEnd: 600, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 660, yStart: 190, xEnd: 660, yEnd: 400, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
    { xStart: 660, yStart: 470, xEnd: 660, yEnd: 600, thickness: INTERNAL_WALL_THICKNESS, color: WALL_COLOR },
  ],
};
