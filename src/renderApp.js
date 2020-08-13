import { EmployeeApiService } from './EmployeeApiService';
import { TelegramApiService } from './TelegramApiService';
import { EventManager } from './eventManager';
import { CanvasContainer } from './components/Canvas';
import { NotificationListContainer } from './components/NotificationList';
import { OpenEmployeeListPanelButtonContainer } from './components/OpenEmployeeListButton';
import { EmployeeListPanelContainer } from './components/EmployeeListPanel';
import { EditEmployeePanelContainer } from './components/EditEmployeePanel';
import { AddEmployeePanelContainer } from './components/AddEmployeePanel';
import { cloneDeep } from './Common/utils/cloneDeep';
import { markOccupiedTracks } from './Core/markOccupiedTracks';
import { renderComponent } from './Common/utils/renderComponent';

import {
  EMPLOYEE_TRACKS,
  ZONES,
} from '/Canvas/staticCanvasElements';

export const renderApp = async () => {
  const canvasContainer = document.querySelector('.js-display-building');
  const employeeInformationPanel = document.querySelector('.js-employee-information-panel');
  const violationsList = [];

  const employeeApiService = new EmployeeApiService();
  const telegramApiService = new TelegramApiService();
  const eventManager = new EventManager();
  const employeeList = await employeeApiService.getEmployees();
  const tracks = markOccupiedTracks(employeeList, EMPLOYEE_TRACKS);
  const zones = cloneDeep(ZONES);

  const canvas = new CanvasContainer({ employeeList }, { eventManager });
  renderComponent(canvasContainer, canvas);

  const notifications = new NotificationListContainer(
    { violationsList },
    { eventManager, telegramApiService },
  );
  notifications.show();
  renderComponent(canvasContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButtonContainer({ eventManager });
  openEmployeeListPanelButton.show();
  renderComponent(employeeInformationPanel, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanelContainer(
    { employeeList },
    { eventManager, employeeApiService },
  );
  employeeListPanel.hide();
  renderComponent(employeeInformationPanel, employeeListPanel);

  const addEmployeePanel = new AddEmployeePanelContainer(
    { tracks, zones },
    { eventManager, employeeApiService },
  );
  addEmployeePanel.hide();
  renderComponent(employeeInformationPanel, addEmployeePanel);

  const editEmployeePanel = new EditEmployeePanelContainer(
    {
      tracks,
      zones,
      isAwaitingConfirmation: false,
    },
    { eventManager, employeeApiService },
  );
  editEmployeePanel.hide();
  renderComponent(employeeInformationPanel, editEmployeePanel);
};
