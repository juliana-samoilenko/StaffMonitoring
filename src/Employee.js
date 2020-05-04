import {DrawableCircle} from './Drawable.js';

export class Employee extends DrawableCircle {
  constructor(id, name, xCurrent, yCurrent, radius, color, two, drawPoint, track) {
    super(id, name, xCurrent, yCurrent, radius, color, two, drawPoint);
    this.track = track;
    this.currentPointIndex = 0;
  }

  clear() {
    this.two.remove(this.drawPoint);
  }

  move(x, y) {
    this.clear();
    this.xCenter = x;
    this.yCenter = y;
    super.draw();
  }

  getPoint() {

  }


  moveAlong(track) {
    this.track = track.points;
    //легко отследить индекс точки пути
    /*for(let i = 0; i < this.track.length; i++) {
      this.currentPointIndex = i;
      let xNext = this.track[i].x;
      let yNext = this.track[i].y;

      setInterval(()=> {
        this.move(xNext, yNext)
      }, 5000);
    }*/

    this.track.forEach((point) => {
      const xNext = point.x;
      const yNext = point.y;

      const id = setInterval(() => this.move(xNext, yNext), 100);
      
      //просто, чтобы остановить
      setTimeout(() => clearInterval(id), 5000)
    });
  }
}
