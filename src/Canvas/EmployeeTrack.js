export class EmployeeTrack {
  constructor({ id, name, points }) {
    this.id = id;
    this.name = name;
    this._points = points;
  }

  getPoint(index) {
    return this._points[index];
  }

  getLength() {
    return this._points.length;
  }
}
