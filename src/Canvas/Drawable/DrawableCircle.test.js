import Two from 'two.js';
import { DrawableCircle } from './DrawableCircle';
import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
} from 'const';

describe('Check the rendering DrawableCircle', () => {
  describe('Add a circle to canvas', () => {

    it('Draw circle with xCurrent = 550, yCurrent = 300 having radius = 40 and green color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const circle = new DrawableCircle({
        xCurrent: 550, 
        yCurrent: 300, 
        radius: 40, 
        color: "green",
      }, two);

      circle.draw();
      circle.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });

    it('Draw circle with xCurrent = 800, yCurrent = 200 having radius = 10 and blue color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const circle = new DrawableCircle({
        xCurrent: 800, 
        yCurrent: 200, 
        radius: 10, 
        color: "blue",
      }, two);

      circle.draw();
      circle.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });
  });
});
