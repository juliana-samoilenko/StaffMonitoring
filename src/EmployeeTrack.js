export class EmployeeTrack {
  constructor({ id, points }) {
    this.id = id;
    this.points = points;
  }

  getPoint(index) {
    return this.points[index];
  }

  getLengthTrack() {
    return this.points.length;
  }
}
