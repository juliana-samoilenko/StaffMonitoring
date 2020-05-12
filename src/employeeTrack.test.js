import { EmployeeTrack } from './EmployeeTrack';

describe('EmloyeeTrack class', () => {
  describe('Add track', () => {
    it('Check track length', () => {
      // Arrange
      const points = [{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 100, y: 100 }];
      const track = new EmployeeTrack({
        id: 1,
        points,
      });

      // Act
      const trackLength = track.getLength();

      // Assert
      expect(trackLength).toEqual(points.length);
    });

    it('When adding a track to an employee, it is saved in the employee property', () => {
      // Arrange
      const point1 = { x: 600, y: 50 };
      const point2 = { x: 50, y: 100 };

      // Act
      const track = new EmployeeTrack({
        id: 1,
        points: [point1, point2],
      });

      // Assert
      expect(track.getPoint(0)).toEqual({ x: point1.x, y: point1.y });
      expect(track.getPoint(1)).toEqual({ x: point2.x, y: point2.y });
    });
  });
});
