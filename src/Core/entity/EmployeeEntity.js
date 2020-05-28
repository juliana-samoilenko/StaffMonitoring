export class EmployeeEntity {
  constructor({ id, name, position, trackId, zones }) {
    this.id = id;
    this.name= name;
    this.position = position;
    this.trackId = trackId;
    this.permittedZones = zones;
  }
}
