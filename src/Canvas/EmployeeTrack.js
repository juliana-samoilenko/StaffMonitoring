export class EmployeeTrack {
  constructor({ id, name, points, isOccupied }) {
    this.id = id;
    this.name = name;
    this._points = points;
    this.isOccupied = isOccupied;
  }

  getPoint(index) {
    return this._points[index];
  }

  getLength() {
    return this._points.length;
  }
}
