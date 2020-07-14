import { Container } from '../Container';
import { NotificationListView } from './NotificationListView';
import { v4 as uuidv4 } from 'uuid';

import {
  EMPLOYEE_PERMISSION_VIOLATION,
} from '../../eventConstants';

export class NotificationListContainer extends Container {
  constructor({ violationsList, eventManager, telegramApiService }) {
    super();
    this.eventManager = eventManager;
    this.telegramApiService = telegramApiService;
    this.component = new NotificationListView({ violationsList });
    this.component.setCloseButtonHandler((event) => {
      const notificationId = event.target.id;
      const { violationsList: currentViolations } = this.component.getState();

      const violationListWithoutClosedViolation = currentViolations.filter((violation) => violation.id !== notificationId);

      this.component.setState({ violationsList: violationListWithoutClosedViolation });
    });

    this.eventManager.subscribe(EMPLOYEE_PERMISSION_VIOLATION, (payload) => {
      const time = new Date().toLocaleTimeString('ru-RU');
      const employeeName = payload.employee.name;
      const zoneName = payload.zone.name;
      const newViolation = {
        id: uuidv4(),
        employeeName,
        zoneName,
        time,
      };
      const { violationsList: oldViolations } = this.component.getState();

      telegramApiService.sendMessage(employeeName, zoneName, time);

      this.component.setState({ violationsList: [...oldViolations, newViolation] });
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
}
