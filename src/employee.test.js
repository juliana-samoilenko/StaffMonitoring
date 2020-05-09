import { Employee } from './Employee';
import { EmployeeTrack } from './EmployeeTrack';

describe('Emloyee class, check logic', () => {
  describe('Add empty track', () => {
    it('When adding a empty track to an employee, it is saved in the employee property', () => {
      // Arrange
      const two = {};
      const track = new EmployeeTrack({ id: 2, points: [] });

      // Act
      const employee = new Employee({
        id: 1,
        name: 'Петров С.М.',
        xCurrent: 50,
        yCurrent: 50,
        radius: 15,
        color: '#3A19A4',
        track,
      }, two);

      // Assert
      expect(employee.track).toBe(track);
    });
  });

  describe('Add track', () => {
    it('When adding a track to an employee, it is saved in the employee property', () => {
      // Act
      const point1 = { x: 600, y: 50 };
      const point2 = { x: 50, y: 100 };
      const track = new EmployeeTrack({ id: 1, points: [point1, point2] });

      // Assert
      expect(track.getPoint(0)).toEqual({ x: point1.x, y: point1.y });
      expect(track.getPoint(1)).toEqual({ x: point2.x, y: point2.y });
    });
  });

  describe('Add current coordinates to employee', () => {
    it('When coordinates are added to an employee, they are saved in the employee object', () => {
      // Arrange
      const two = {};
      const x = 300;
      const y = 400;

      // Act
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: x, yCurrent: y, radius: 15, color: '#3A19A4', track: {},
      }, two);

      // Assert
      expect(employee.xCenter).toEqual(300);
      expect(employee.yCenter).toEqual(400);
    });
  });

  describe('Add move to employee', () => {
    it('When using move(x, y) method, the values of the starting point are changed to x and y', () => {
      // Arrange
      const two = {
        remove: jest.fn(),
      };

      const employee = new Employee({
        id: 1,
        name: 'Петров С.М.',
        xCurrent: 50,
        yCurrent: 50,
        radius: 15,
        color: '#3A19A4',
        track: {},
      }, two);
      const x = 300;
      const y = 500;
      employee.draw = jest.fn();

      // Act
      employee.move(x, y);

      // Assert
      expect(employee.xCenter).toEqual(300);
      expect(employee.yCenter).toEqual(500);
    });
  });

  describe('Add track', () => {
    it('Check track length', () => {
      // Arrange
      const points = [{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 100, y: 100 }];
      const track = new EmployeeTrack({ id: 1, points });

      // Act
      const trackLength = track.getLength();

      // Assert
      expect(trackLength).toEqual(points.length);
    });
  });

  describe('Add track', () => {
    it('When next point received for the first time, check that _currentPointIndex is changed to 1', () => {
      // Arrange
      const two = {};
      const track = new EmployeeTrack({ id: 1, points: [{ x: 60, y: 100 }, { x: 700, y: 600 }] });
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track,
      }, two);

      // Act
      const { x: xNext, y: yNext } = employee.getNextPoint();

      // Assert
      expect(xNext).toEqual(700);
      expect(yNext).toEqual(600);
      expect(employee._currentPointIndex).toEqual(1);
    });
  });
});
