import Two from 'two.js';
import { DrawableLine } from './DrawableLine';
import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
} from 'const';

describe('DrawableLine', () => {
  describe('draw', () => {
    it('Draw line with xStart = 0, yStart = 0 and xEnd = 100, yEnd = 100 having thickness = 5 and white color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const line = new DrawableLine({
        xStart: 0,
        yStart: 0,
        xEnd: 100,
        yEnd: 0,
        thickness: 5,
        color: '#fff',
      }, two);

      line.draw();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });
  });
});
