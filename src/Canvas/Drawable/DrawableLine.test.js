import Two from 'two.js';
import {
  WIDTH_CANVAS,
  HEIGHT_CANVAS,
} from '../staticCanvasElements';
import { DrawableLine } from './DrawableLine';

describe('Check the rendering DrawableLine', () => {
  describe('Add a line to canvas', () => {
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
      line.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });

    it('Draw line with xStart = 300, yStart = 200 and xEnd = 350, yEnd = 205 having thickness = 15 and red color', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const line = new DrawableLine({
        xStart: 300,
        yStart: 200,
        xEnd: 350,
        yEnd: 205,
        thickness: 15,
        color: 'red',
      }, two);

      line.draw();
      line.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });

    it('Draw two line purple color having thickness = 10. In the end should get a "+"', () => {
      const canvas = document.createElement('canvas');
      const two = new Two({ width: WIDTH_CANVAS, height: HEIGHT_CANVAS, domElement: canvas });
      const line1 = new DrawableLine({
        xStart: 300,
        yStart: 150,
        xEnd: 300,
        yEnd: 250,
        thickness: 10,
        color: 'purple',
      }, two);
      const line2 = new DrawableLine({
        xStart: 250,
        yStart: 200,
        xEnd: 350,
        yEnd: 200,
        thickness: 10,
        color: 'purple',
      }, two);

      line1.draw();
      line1.update();
      line2.draw();
      line2.update();

      expect(canvas.toDataURL()).toMatchSnapshot();
    });
  });
});
