import { v4 as uuidv4 } from 'uuid';

export const createEmployeeEntity = ({
  name,
  position,
  trackId,
  permittedZoneIds,
}) => ({
  id: uuidv4(),
  name,
  position,
  trackId,
  permittedZoneIds,
});
