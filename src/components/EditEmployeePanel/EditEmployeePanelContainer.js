import { Container } from '../Container';
import { EditEmployeePanelView } from './EditEmployeePanelView';
import { cloneDeep } from '../../Common/utils/cloneDeep';

import {
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_EDIT_PANEL,
  OPEN_ADD_PANEL,
} from '/eventConstants';

export class EditEmployeePanelContainer extends Container {
  constructor({
    employee,
    tracks,
    zones,
    isAwaitingConfirmation,
  },
  { eventManager, employeeApiService }) {
    super();
    this.eventManager = eventManager;
    this.employeeApiService = employeeApiService;
    this.component = new EditEmployeePanelView({
      employee,
      tracks,
      zones,
      isAwaitingConfirmation,
    });

    this.component.setCloseButtonHandler(() => {
      this.component.setState({ isAwaitingConfirmation: false });
      this.component.clearForm();
      this.component.hide();
    });

    this.component.setSaveChangeButtonHandler(async (event) => {
      try {
        event.preventDefault();

        const { employee: originalEmployee } = cloneDeep(this.component.getState());
        const originalEmployeeId = originalEmployee.id;
        const changedEmployee = this.component.getEditableEmployeeInformation(originalEmployeeId);
        await this.employeeApiService.updateEmployee(changedEmployee, originalEmployeeId);

        eventManager.publish({
          type: EMPLOYEE_EDITED,
          payload: {
            originalEmployee,
            changedEmployee,
          },
        });

        this.component.clearForm();
        this.component.hide();
      } catch (error) {
        console.error(error);
      }
    });

    this.component.setAcceptRemovalButtonHandler(async () => {
      try {
        const { employee: employeeToRemove } = cloneDeep(this.component.getState());
        await this.employeeApiService.removeEmployee(employeeToRemove);

        eventManager.publish({
          type: EMPLOYEE_REMOVED,
          payload: {
            currentEmployeeId: employeeToRemove.id,
            employeeTrackId: employeeToRemove.trackId,
          },
        });

        this.component.setState({ isAwaitingConfirmation: false });
        this.component.hide();
      } catch (error) {
        console.error(error);
      }
    });

    this.eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
      if (this.component.isComponentShown) {
        this.component.hide();
      }
    });

    this.eventManager.subscribe(OPEN_EDIT_PANEL, (payload) => {
      this.component.show();
      this.component.setState({
        employee: payload.employeeForEdit,
        tracks: payload.tracksWithOccupiedStatus,
      });
    });

    this.eventManager.subscribe(OPEN_ADD_PANEL, () => {
      if (this.component.isComponentShown) {
        this.component.hide();
      }
    });

    this.component.setConfirmationButtonRemoveEmployeeHandler(() => {
      this.component.setState({ isAwaitingConfirmation: true });
    });

    this.component.setRejectRemovalButtonHandler(() => {
      this.component.setState({ isAwaitingConfirmation: false });
    });
  }

  hide() {
    this.component.hide();
  }
}
