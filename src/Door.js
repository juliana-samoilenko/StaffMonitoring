import Drawable from './Drawable.js';

export default class Door extends Drawable {
  constructor( xStart, yStart, xEnd, yEnd, thickness, color ) {
    super( xStart, yStart, xEnd, yEnd, thickness, color )
  }

  draw() {
    super.drawLine();
  }
}

