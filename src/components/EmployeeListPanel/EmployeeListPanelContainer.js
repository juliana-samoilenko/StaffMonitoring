/*eslint-disable*/
import { Container } from '../Container';
import { EmployeeListPanelView } from './EmployeeListPanelView';

import {
  EMPLOYEE_ADDED,
} from '../../eventConstants';

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
    /*this.eventManager.subscribe(EMPLOYEE_ADDED, async () => {
      try {
        const employeeListWithNewEmployee = await this.employeeApiService.getEmployees();
        this.component.setState({ employeeList: employeeListWithNewEmployee });
      } catch (error) {
        console.error(error);
      }
    });*/
  }

  getTemplate() {
    this.component.getTemplate();
  }

  getElement() {
    this.component.getElement();
  }

  show() {
    this.component.show();
  }

  /*setState(nextData) {
    this.component.setState(nextData);
  }

  rerender() {
    this.component.rerender();
  }

  hide() {
    this.component.hide();
  }

  removeElement() {
    this.component.removeElement();
  }

  isComponentShow() {
    this.component.isComponentShow();
  }

  recoveryEventListeners() {
    this.component.recoveryEventListeners();
  }*/
}
