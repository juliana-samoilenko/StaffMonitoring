
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
  });
});
