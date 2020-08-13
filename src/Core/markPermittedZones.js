import { cloneDeep } from '../Common/utils/cloneDeep';

export const markPermittedZones = (employee, zones) => {
  const { permittedZoneIds } = employee;

  const zonesWithPermittedStatus = cloneDeep(zones).map((zone) => ({
    ...zone,
    isPermitted: permittedZoneIds.includes(zone.id),
  }));

  return zonesWithPermittedStatus;
};
