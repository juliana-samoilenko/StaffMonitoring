export class EmployeeTrack {
  constructor({ id, name, points, isEmpty }) {
    this.id = id;
    this.name = name;
    this._points = points;
    this.isEmpty = isEmpty;
  }

  getPoint(index) {
    return this._points[index];
  }

  getLength() {
    return this._points.length;
  }
}
