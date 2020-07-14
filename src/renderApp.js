import { EmployeeApiService } from './EmployeeApiService';
import { TelegramApiService } from './TelegramApiService';
import { EventManager } from './eventManager';
import { CanvasContainer } from './components/Canvas';
import { NotificationListContainer } from './components/NotificationList';
import { OpenEmployeeListPanelButtonContainer } from './components/OpenEmployeeListButton';
import { EmployeeListPanelContainer } from './components/EmployeeListPanel';
import { EditEmployeePanelContainer } from './components/EditEmployeePanel';
import { AddEmployeePanelContainer } from './components/AddEmployeePanel';

import {
  EMPLOYEE_TRACKS,
  ZONES,
} from './const';

export const cloneDeep = (array) => JSON.parse(JSON.stringify(array));

export const markOccupiedTracks = (employeeList, tracks) => {
  const unoccupiedTracks = employeeList.map((employee) => {
    if (employee.trackId !== null) {
      return employee.trackId;
    }
  });

  const tracksWithEmptyStatus = cloneDeep(tracks).map((track) => {
    track.isOccupied = unoccupiedTracks.includes(track.id);
    return track;
  });

  return tracksWithEmptyStatus;
};

const renderComponent = (container, component, position = 'beforeend') => {
  switch (position) {
    case 'afterbegin': {
      container.prepend(component.getElement());
      break;
    }

    case 'beforeend': {
      container.append(component.getElement());
      break;
    }

    default: {
      throw new Error(`Unknown position given ${position}`);
    }
  }
};

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
  const employee = { trackId: null, permittedZoneIds: [] };

  const canvas = new CanvasContainer({ eventManager, employeeList });
  renderComponent(canvasContainer, canvas);

  const notifications = new NotificationListContainer({ violationsList, eventManager, telegramApiService });
  notifications.show();
  renderComponent(canvasContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButtonContainer({ eventManager });
  openEmployeeListPanelButton.show();
  renderComponent(employeeInformationPanel, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanelContainer({
    employeeList,
    eventManager,
    employeeApiService,
  });
  employeeListPanel.hide();
  renderComponent(employeeInformationPanel, employeeListPanel);

  const addEmployeePanel = new AddEmployeePanelContainer({
    tracks,
    zones,
    eventManager,
    employeeApiService,
  });
  addEmployeePanel.hide();
  renderComponent(employeeInformationPanel, addEmployeePanel);

  const editEmployeePanel = new EditEmployeePanelContainer({
    employee,
    tracks,
    zones,
    isAwaitingConfirmation: false,
    eventManager,
    employeeApiService,
  });
  editEmployeePanel.hide();
  renderComponent(employeeInformationPanel, editEmployeePanel);
};
