import { cloneDeep } from './cloneDeep';

export const markOccupiedTracks = (employeeList, tracks) => {
  const unoccupiedTracks = employeeList.map((employee) => {
    if (employee.trackId !== null) {
      return employee.trackId;
    }
  });

  const tracksWithEmptyStatus = cloneDeep(tracks).map((track) => {
    track.isOccupied = unoccupiedTracks.includes(track.id);
    return track;
  });

  return tracksWithEmptyStatus;
};