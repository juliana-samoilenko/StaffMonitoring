export class EmployeeTrack {
  constructor({ id, name, points, empty }) {
    this.id = id;
    this.name = name;
    this._points = points;
    this.empty = empty;
  }

  getPoint(index) {
    return this._points[index];
  }

  getLength() {
    return this._points.length;
  }
}
