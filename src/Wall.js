import DrawableLine from './DrawableLine.js';

export default class Wall extends DrawableLine {
  constructor( xStart, yStart, xEnd, yEnd, thickness, color ) {
    super( xStart, yStart, xEnd, yEnd, thickness, color )
  }

  draw() {
    super.draw();
  }
}
