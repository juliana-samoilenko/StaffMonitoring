export class EmployeeEntity {
  constructor({ id, name, position, zones }) {
    this.id = id;
    this.name= name;
    this.position = position;
    this.permittedZones = zones;
  }
}
