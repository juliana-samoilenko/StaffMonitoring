import Drawable from './Drawable.js';

export default class Wall extends Drawable {
  constructor( xStart, yStart, xEnd, yEnd, thickness, color ) {
    super( xStart, yStart, xEnd, yEnd, thickness, color )
  }

  draw() {
    super.drawLine();
  }
}
