import { Container } from '../Container';
import { CanvasView } from './CanvasView';

import {
  EMPLOYEE_PERMISSION_VIOLATION,
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
} from '../../eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '../../const';

export class CanvasContainer extends Container {
  constructor({ eventManager, employeeList }) {
    super();
    this.eventManager = eventManager;
    this.employeeList = employeeList;
    this.component = new CanvasView();
    this.component.drawElementsBuilding();
    this.component.drawEmployeeList(this.employeeList, EMPLOYEE_TRACKS);

    this.component.setOverlapHandler((employee, zone) => {
      if (!employee.permittedZoneIds.includes(zone.id)) {
        this.eventManager.publish({
          type: EMPLOYEE_PERMISSION_VIOLATION,
          payload: { employee, zone },
        });
      }
    });

    this.eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
      this.component.drawNewEmployee(payload.newEmployee, EMPLOYEE_TRACKS);
    });

    this.eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
      this.component.drawEditedEmployee(payload.changedEmployee, EMPLOYEE_TRACKS);
    });

    this.eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
      this.component.removeEmployee(payload.currentEmployeeId);
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

  drawElementsBuilding() {
    return this.component.drawElementsBuilding();
  }

  drawEmloyeeList(employeeList) {
    return this.component.drawEmployeeList(employeeList, EMPLOYEE_TRACKS);
  }
}
