import { AddEmployeePanelView } from './AddEmployeePanelView';
import { Container } from '../Container';
import { markOccupiedTracks } from '../../Core/markOccupiedTracks';

import {
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_ADD_PANEL,
  EMPLOYEE_ADDED,
  OPEN_EDIT_PANEL,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
} from '/eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '/Canvas/staticCanvasElements';

export class AddEmployeePanelContainer extends Container {
  constructor({ tracks, zones }, { eventManager, employeeApiService }) {
    super();
    this.eventManager = eventManager;
    this.zones = zones;
    this.employeeApiService = employeeApiService;
    this.component = new AddEmployeePanelView({ tracks, zones });

    this.component.setCloseButtonHandler(this.closePanel.bind(this));
    this.component.setAddEmployeeButtonHandler(this.addEmployee.bind(this));

    this.eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
      this.handleHideEmployeeListPanel();
    });
    this.eventManager.subscribe(OPEN_ADD_PANEL, () => {
      this.handleOpenAddPanel();
    });
    this.eventManager.subscribe(OPEN_EDIT_PANEL, () => {
      this.handleOpenEditPanel();
    });
    this.eventManager.subscribe(EMPLOYEE_EDITED, () => {
      this.handleEmployeeEdited();
    });
    this.eventManager.subscribe(EMPLOYEE_REMOVED, () => {
      this.handleEmployeeRemoved();
    });
  }

  hide() {
    this.component.hide();
  }

  closePanel() {
    this.component.clearForm();
    this.component.hide();
  }

  async addEmployee(event) {
    try {
      event.preventDefault();
      const newEmployee = this.component.getNewEmployee();
      await this.employeeApiService.createEmployee(newEmployee);
      this.eventManager.publish({
        type: EMPLOYEE_ADDED,
        payload: {
          newEmployee,
        },
      });
      const employeeList = await this.employeeApiService.getEmployees();
      const tracksWithoutAddedEmployeeTrack = markOccupiedTracks(employeeList, EMPLOYEE_TRACKS);
      this.component.setState({ tracks: tracksWithoutAddedEmployeeTrack, zones: this.zones });
      this.component.clearForm();
    } catch (error) {
      console.error(error);
    }
  }

  handleHideEmployeeListPanel() {
    if (this.component.isComponentShown()) {
      this.component.hide();
    }
  }

  handleOpenAddPanel() {
    this.component.show();
  }

  handleOpenEditPanel() {
    if (this.component.isComponentShown) {
      this.component.hide();
    }
  }

  async handleEmployeeEdited() {
    try {
      const newEmployeeList = await this.employeeApiService.getEmployees();
      const newTrackList = markOccupiedTracks(newEmployeeList, EMPLOYEE_TRACKS);
      this.component.setState({ tracks: newTrackList });
      this.component.hide();
    } catch (error) {
      console.error(error);
    }
  }

  async handleEmployeeRemoved() {
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
  }
}
