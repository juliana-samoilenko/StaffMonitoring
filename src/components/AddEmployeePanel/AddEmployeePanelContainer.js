import { AddEmployeePanelView } from './AddEmployeePanelView';
import { Container } from '../Container';
import { markOccupiedTracks } from '../../renderApp';

import {
  EMPLOYEE_EDITED,
} from '../../eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '../../const';

export class AddEmployeePanelContainer extends Container {
  constructor({
    tracks,
    zones,
    eventManager,
    employeeApiService,
  }) {
    super();
    this.eventManager = eventManager;
    this.employeeApiService = employeeApiService;
    this.component = new AddEmployeePanelView({ tracks, zones });
    this.eventManager.subscribe(EMPLOYEE_EDITED, async () => {
      try {
        const newEmployeeList = await this.employeeApiService.getEmployees();
        const newTrackList = markOccupiedTracks(newEmployeeList, EMPLOYEE_TRACKS);
        this.component.setState({ tracks: newTrackList });
        this.component.hide();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
