import { Container } from '../Container';
import { EmployeeListPanelView } from './EmployeeListPanelView';
import { markOccupiedTracks } from '../../Common/utils/markOccupiedTracks';
import { cloneDeep } from '../../Common/utils/cloneDeep';

import {
  HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_ADD_PANEL,
  OPEN_EDIT_PANEL,
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
} from '../../eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '../../const';

export class EmployeeListPanelContainer extends Container {
  constructor({
    employeeList,
    eventManager,
    employeeApiService,
  }) {
    super();
    this.eventManager = eventManager;
    this.employeeApiService = employeeApiService;
    this.component = new EmployeeListPanelView({ employeeList });

    this.eventManager.subscribe(HIDE_OPEN_EMPLOYEE_LIST_BUTTON, () => {
      this.component.show();
    });

    this.eventManager.subscribe(EMPLOYEE_ADDED, async () => {
      try {
        const employeeListWithNewEmployee = await this.employeeApiService.getEmployees();
        this.component.setState({ employeeList: employeeListWithNewEmployee });
      } catch (error) {
        console.error(error);
      }
    });

    this.eventManager.subscribe(EMPLOYEE_EDITED, async () => {
      try {
        const newEmployeeList = await this.employeeApiService.getEmployees();
        this.component.setState({ employeeList: newEmployeeList });
      } catch (error) {
        console.error(error);
      }
    });

    this.eventManager.subscribe(EMPLOYEE_REMOVED, async () => {
      try {
        const newEmployeeList = await this.employeeApiService.getEmployees();
        this.component.setState({ employeeList: newEmployeeList });
      } catch (error) {
        console.error(error);
      }
    });

    this.component.setCloseButtonHandler(() => {
      this.component.hide();
      eventManager.publish({
        type: HIDE_EMPLOYEE_LIST_PANEL,
      });
    });

    this.component.setHandlerForAddPanelOpenButton(() => {
      eventManager.publish({
        type: OPEN_ADD_PANEL,
      });
    });

    this.component.setHandlerForEditPanelOpenButton((event) => {
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

      eventManager.publish({
        type: OPEN_EDIT_PANEL,
        payload: {
          employeeForEdit,
          tracksWithOccupiedStatus,
        },
      });
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
}
