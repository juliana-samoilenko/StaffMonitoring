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

    this.component.setCloseButtonHandler(this.closePanel.bind(this));
    this.component.setSaveChangeButtonHandler((event) => {
      this.saveChangePanel(event);
    });
    this.component.setAcceptRemovalButtonHandler(this.acceptRemovalEmployee.bind(this));
    this.component.setConfirmationButtonRemoveEmployeeHandler(() => {
      this.confirmationRemoveEmployee();
    });
    this.component.setRejectRemovalButtonHandler(() => {
      this.rejectRemoveEmployee();
    });

    this.eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
      this.handlerHideEmployeeListPanel();
    });
    this.eventManager.subscribe(OPEN_EDIT_PANEL, (payload) => {
      this.handlereOpenEditPanel(payload);
    });
    this.eventManager.subscribe(OPEN_ADD_PANEL, () => {
      this.handlerOpenAddPanel();
    });
  }

  hide() {
    this.component.hide();
  }

  closePanel() {
    this.component.setState({ isAwaitingConfirmation: false });
    this.component.clearForm();
    this.component.hide();
  }

  async saveChangePanel(event) {
    try {
      event.preventDefault();

      const { employee: originalEmployee } = cloneDeep(this.component.getState());
      const originalEmployeeId = originalEmployee.id;
      const changedEmployee = this.component.getEditableEmployeeInformation(originalEmployeeId);
      await this.employeeApiService.updateEmployee(changedEmployee, originalEmployeeId);

      this.eventManager.publish({
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
  }

  async acceptRemovalEmployee() {
    try {
      const { employee: employeeToRemove } = cloneDeep(this.component.getState());
      await this.employeeApiService.removeEmployee(employeeToRemove);

      this.eventManager.publish({
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
  }

  confirmationRemoveEmployee() {
    this.component.setState({ isAwaitingConfirmation: true });
  }

  rejectRemoveEmployee() {
    this.component.setState({ isAwaitingConfirmation: false });
  }

  handlerHideEmployeeListPanel() {
    if (this.component.isComponentShown) {
      this.component.hide();
    }
  }

  handlereOpenEditPanel(payload) {
    this.component.show();
    this.component.setState({
      employee: payload.employeeForEdit,
      tracks: payload.tracksWithOccupiedStatus,
    });
  }

  handlerOpenAddPanel() {
    if (this.component.isComponentShown) {
      this.component.hide();
    }
  }
}
