import Drawable from './Drawable.js';

export default class Employee extends Drawable {
  constructor( xCenter, yCenter, radius, color ) {
    super( xCenter, yCenter, radius, color )
  }

  draw() {
    super.drawCircle();
  }
}
