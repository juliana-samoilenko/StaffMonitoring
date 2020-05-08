import {Employee} from './Employee';
import {EmployeeTrack} from './EmployeeTrack';

const two = {};

describe('Emloyee class, check logic', function() {

  describe('Add empty track', function() {
    it('When adding a empty track to an employee, it is saved in the employee property', () => {
      //Arrange
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
      const track = new EmployeeTrack( { id: 1, points: [{x: 50, y: 50}, {x: 50, y: 100}]} );

      //Act
      const employee = new Employee({
        id: 1, name: 'Петров С.М.', xCurrent: 50, yCurrent: 50, radius: 15, color: '#3A19A4', track: track}, two );

      //Assert
      expect(employee.track._points).toEqual([{x: 50, y: 50}, {x: 50, y: 100}]);
    });
  });
});
