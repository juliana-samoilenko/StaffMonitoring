import { AddEmployeePanelView } from './AddEmployeePanelView';
import { Container } from '../Container';
import { markOccupiedTracks } from '../../renderApp';

import {
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_ADD_PANEL,
  EMPLOYEE_ADDED,
  OPEN_EDIT_PANEL,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
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
    this.component.setCloseButtonHandler(() => {
      this.component.clearForm();
      this.component.hide();
    });

    this.component.setAddEmployeeButtonHandler(async (event) => {
      try {
        event.preventDefault();
        const newEmployee = this.component.getNewEmployee();
        await this.employeeApiService.createEmployee(newEmployee);
        eventManager.publish({
          type: EMPLOYEE_ADDED,
          payload: {
            newEmployee,
          },
        });
        const employeeList = await this.employeeApiService.getEmployees();
        const tracksWithoutAddedEmployeeTrack = markOccupiedTracks(employeeList, EMPLOYEE_TRACKS);
        this.component.setState({ tracks: tracksWithoutAddedEmployeeTrack, zones });
        this.component.clearForm();
      } catch (error) {
        console.error(error);
      }
    });

    this.eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
      if (this.component.isComponentShown()) {
        this.component.hide();
      }
    });

    this.eventManager.subscribe(OPEN_ADD_PANEL, () => {
      this.component.show();
    });

    this.eventManager.subscribe(OPEN_EDIT_PANEL, () => {
      if (this.component.isComponentShown) {
        this.component.hide();
      }
    });

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

    this.eventManager.subscribe(EMPLOYEE_REMOVED, async () => {
      try {
        const newEmployeeList = await this.employeeApiService.getEmployees();
        const tracksWithoutRemovedEmployeeTrack = markOccupiedTracks(
          newEmployeeList,
          EMPLOYEE_TRACKS,
        );
        this.component.setState({ tracks: tracksWithoutRemovedEmployeeTrack });
        this.component.hide();
      } catch (error) {
        console.error(error);
      }
    });
  }

  getTemplate() {
    return this.component.getTemplate();
  }

  getElement() {
    return this.component.getElement();
  }

  show() {
    return this.component.show();
  }

  hide() {
    this.component.hide();
  }

  isComponentShown() {
    this.component.isComponentShown();
  }
}
