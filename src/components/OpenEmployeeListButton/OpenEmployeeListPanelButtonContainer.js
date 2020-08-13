import { Container } from '../Container';
import { OpenEmployeeListPanelButtonView } from './OpenEmployeeListPanelButtonView';

import {
  HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
  HIDE_EMPLOYEE_LIST_PANEL,
} from '../../eventConstants';

export class OpenEmployeeListPanelButtonContainer extends Container {
  constructor({ eventManager }) {
    super();
    this.eventManager = eventManager;
    this.component = new OpenEmployeeListPanelButtonView({ eventManager });
    this.component.setClickHandler(this.handleHideOpenEmployeeListButton.bind(this));

    this.eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
      this.handleShowOpenEmployeeListButton();
    });
  }

  handleHideOpenEmployeeListButton() {
    this.component.hide();
    this.eventManager.publish({
      type: HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
    });
  }

  handleShowOpenEmployeeListButton() {
    this.component.show();
  }
}
