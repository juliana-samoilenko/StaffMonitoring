import { Container } from '../Container';
import { CanvasView } from './CanvasView';

import {
  EMPLOYEE_PERMISSION_VIOLATION,
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
} from '/eventConstants';

import {
  EMPLOYEE_TRACKS,
} from '/Canvas/staticCanvasElements';

export class CanvasContainer extends Container {
  constructor({ employeeList }, { eventManager }) {
    super();
    this.eventManager = eventManager;
    this.employeeList = employeeList;
    this.component = new CanvasView();
    this.component.drawElementsBuilding();
    this.component.drawEmployeeList(this.employeeList, EMPLOYEE_TRACKS);

    this.component.setOverlapHandler((employee, zone) => {
      this.handleEmployeeEnteringZone(employee, zone);
    });

    this.eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
      this.handleEmployeeAdded(payload);
    });
    this.eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
      this.handleEmployeeEdited(payload);
    });
    this.eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
      this.handleEmloyeeRemoved(payload);
    });
  }

  drawElementsBuilding() {
    return this.component.drawElementsBuilding();
  }

  drawEmloyeeList(employeeList) {
    return this.component.drawEmployeeList(employeeList, EMPLOYEE_TRACKS);
  }

  handleEmployeeEnteringZone(employee, zone) {
    if (!employee.permittedZoneIds.includes(zone.id)) {
      this.eventManager.publish({
        type: EMPLOYEE_PERMISSION_VIOLATION,
        payload: { employee, zone },
      });
    }
  }

  handleEmployeeAdded(payload) {
    this.component.drawNewEmployee(payload.newEmployee, EMPLOYEE_TRACKS);
  }

  handleEmployeeEdited(payload) {
    this.component.drawEditedEmployee(payload.changedEmployee, EMPLOYEE_TRACKS);
  }

  handleEmloyeeRemoved(payload) {
    this.component.removeEmployee(payload.currentEmployeeId);
  }
}
