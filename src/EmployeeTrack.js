export class EmployeeTrack {
  constructor({ id, points }) {
    this.id = id;
    this._points = points;
  }

  getPoint(index) {
    return this._points[index];
  }

  getLength() {
    return this._points.length;
  }
}
