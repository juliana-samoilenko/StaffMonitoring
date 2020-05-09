import {Employee} from './Employee';
import {EmployeeTrack} from './EmployeeTrack';

describe('Emloyee class, check logic', function() {

  describe('Add empty track', function() {
    it('When adding a empty track to an employee, it is saved in the employee property', () => {
      //Arrange
      const two = {};
      const track = new EmployeeTrack( { id: 2, points: []} );

      //Act
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track}, two );

      //Assert
      expect(employee.track._points).toEqual([]);
    });
  });

  describe('Add track', function() {
    it('When adding a track to an employee, it is saved in the employee property', () => {
      //Arrange
      const two = {};
      const track = new EmployeeTrack( { id: 1, points: [{x: 50, y: 50}, {x: 50, y: 100}]} );

      //Act
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track}, two );

      //Assert
      expect(employee.track._points).toEqual([{x: 50, y: 50}, {x: 50, y: 100}]);
    });
  });

  describe('Add current coordinates to employee', function() {
    it('When coordinates are added to an employee, they are saved in the employee object', () => {
      //Arrange
      const two = {};
      const x = 300;
      const y = 400;

      //Act
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: x, yCurrent: y, radius: 15, color: '#3A19A4', track: {}}, two );

      //Assert
      expect(employee.xCenter).toEqual(300);
      expect(employee.yCenter).toEqual(400);
    });
  });

  describe('Add move to employee', function() {
    it('When using move(x, y) method, the values of the starting point are changed to x and y', () => {
      //Arrange
      const two = {};
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: {}}, two );
      const x = 300; 
      const y = 500;

      //Act
      employee.move(x, y);

      //Assert
      expect(employee.xCenter).toEqual(300);
      expect(employee.yCenter).toEqual(500);
    });
  });

  describe('Add track', function() {
    it('Check track length', () => {
      //Arrange
      const two = {};
      const track = new EmployeeTrack( { id: 1, points: [{x: 50, y: 50}, {x: 50, y: 100}, {x: 100, y: 100}, {x: 100, y: 150}, {x: 100, y: 100}, {x: 50, y: 100}]} );
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track}, two )

      //Act
      const trackLength = employee.track.getLength();

      //Assert
      expect(trackLength).toEqual(6);
    });
  });

  describe('Add track', function() {
    it('Check to change _currentPointIndex', () => {
      //Arrange
      const two = {};
      const track = new EmployeeTrack( { id: 1, points: [{x: 60, y: 100}, {x: 700, y: 600}]} );
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track}, two );

      //Act
      const { x: xNext, y: yNext } = employee.getNextPoint();

      //Assert
      expect(xNext).toEqual(700);
      expect(yNext).toEqual(600);
      expect(employee._currentPointIndex).toEqual(1);
    });
  });
});
