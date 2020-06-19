// eslint-disable-next-line no-shadow
export const Moveable = (superClass) => class Moveable extends superClass {
  constructor({ track, currentPointIndex, afterMove, ...objectProperties }, ...dependencies) {
    super(objectProperties, ...dependencies);

    this.track = track;
    this._currentPointIndex = 0;
    this.interval = null;
    this.overlaps = new Map();
  }

  move() {
    throw new Error('Implement method \'move\' in your derived class!');
  }

  startMovingAlongTrack() {
    const moveEmployeeToNextPoint = () => {
      const { x: xNext, y: yNext } = this.getNextPoint();
      this.move(xNext, yNext);
      this.afterMove();
    };

    this.interval = setInterval(moveEmployeeToNextPoint, 1000);
  }

  getNextPoint() {
    this._currentPointIndex = this._getIndexNextPoint();
    return this.track.getPoint(this._currentPointIndex);
  }

  stopMovingAlongTrack() {
    clearInterval(this.interval);
  }

  _getIndexNextPoint() {
    return (this._currentPointIndex + 1) % this.track.getLength();
  }

  _checkNameOfOverlappedZoneWithNameCurrentZone(nameCurrentZone) {
    return nameCurrentZone === 
    this.overlaps.get(this.name) ?
    true : false;
  }
};
