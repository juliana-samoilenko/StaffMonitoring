import Two from 'two.js';
import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
} from '../../const';
import { DrawableRectangle } from './DrawableRectangle';

describe('Check the rendering DrawableRectangle', () => {
  describe('Add a rectangle to canvas', () => {
    it('Draw rectangle with xCenter = 300, yCenter = 300 having width = 100, height = 200 and yellow color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const circle = new DrawableRectangle({
        xCenter: 300,
        yCenter: 300,
        width: 100,
        height: 200,
        color: 'yellow',
      }, two);

      circle.draw();
      circle.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });

    it('Draw rectangle with xCenter = 600, yCenter = 400 having width = 300, height = 100 and orange color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const circle = new DrawableRectangle({
        xCenter: 600,
        yCenter: 400,
        width: 300,
        height: 100,
        color: 'orange',
      }, two);

      circle.draw();
      circle.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });
  });
});
