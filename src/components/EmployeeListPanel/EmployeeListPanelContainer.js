import { Container } from '../Container';
import { EmployeeListPanelView } from './EmployeeListPanelView';
import { markOccupiedTracks } from '../../Core/markOccupiedTracks';
import { cloneDeep } from '../../Common/utils/cloneDeep';

import {
  HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_ADD_PANEL,
  OPEN_EDIT_PANEL,
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
} from '/eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '/Canvas/staticCanvasElements';

export class EmployeeListPanelContainer extends Container {
  constructor({ employeeList }, { eventManager, employeeApiService }) {
    super();
    this.eventManager = eventManager;
    this.employeeApiService = employeeApiService;
    this.component = new EmployeeListPanelView({ employeeList });

    this.component.setCloseButtonHandler(this.closePanel.bind(this));
    this.component.setHandlerForAddPanelOpenButton(this.openAddPanel.bind(this));
    this.component.setHandlerForEditPanelOpenButton((event) => {
      this.openEditPanel(event);
    });

    this.eventManager.subscribe(HIDE_OPEN_EMPLOYEE_LIST_BUTTON, () => {
      this.handlerHideOpenEmployeeListButton();
    });
    this.eventManager.subscribe(EMPLOYEE_ADDED, () => {
      this.handlerEmployeeAdded();
    });
    this.eventManager.subscribe(EMPLOYEE_EDITED, () => {
      this.handlerEmployeeEdited();
    });
    this.eventManager.subscribe(EMPLOYEE_REMOVED, () => {
      this.handlerEmployeeRemoved();
    });
  }

  hide() {
    this.component.hide();
  }

  closePanel() {
    this.component.hide();
    this.eventManager.publish({
      type: HIDE_EMPLOYEE_LIST_PANEL,
    });
  }

  openAddPanel() {
    this.eventManager.publish({
      type: OPEN_ADD_PANEL,
    });
  }

  openEditPanel(event) {
    const employeeIdForEdit = event.target.id;
    const employeeForEdit = cloneDeep(
      this.component.getCurrentEmployeeList().find(
        (employee) => employee.id === employeeIdForEdit,
      ),
    );
    const tracksWithOccupiedStatus = markOccupiedTracks(
      this.component.getCurrentEmployeeList(),
      EMPLOYEE_TRACKS,
    );

    this.eventManager.publish({
      type: OPEN_EDIT_PANEL,
      payload: {
        employeeForEdit,
        tracksWithOccupiedStatus,
      },
    });
  }

  handlerHideOpenEmployeeListButton() {
    this.component.show();
  }

  async handlerEmployeeAdded() {
    try {
      const employeeListWithNewEmployee = await this.employeeApiService.getEmployees();
      this.component.setState({ employeeList: employeeListWithNewEmployee });
    } catch (error) {
      console.error(error);
    }
  }

  async handlerEmployeeEdited() {
    try {
      const employeeListWithNewEmployee = await this.employeeApiService.getEmployees();
      this.component.setState({ employeeList: employeeListWithNewEmployee });
    } catch (error) {
      console.error(error);
    }
  }

  async handlerEmployeeRemoved() {
    try {
      const newEmployeeList = await this.employeeApiService.getEmployees();
      this.component.setState({ employeeList: newEmployeeList });
    } catch (error) {
      console.error(error);
    }
  }
}
