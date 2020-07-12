/*eslint-disable*/
import { v4 as uuidv4 } from 'uuid';
import { EmployeeApiService } from './EmployeeApiService';
import { TelegramApiService } from './TelegramApiService';
import { EventManager } from './eventManager';
import { Canvas } from './components/Canvas';
import { NotificationList } from './components/NotificationList';
import { OpenEmployeeListPanelButton } from './components/OpenEmployeeListPanelButton';
import { EmployeeListPanelContainer } from './components/EmployeeListPanel';
import { EditEmployeePanel } from './components/EditEmployeePanel';

import { AddEmployeePanelContainer } from './components/AddEmployeePanel';

import {
  EMPLOYEE_TRACKS,
  ZONES,
} from './const';

import {
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED,
  HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_EDIT_PANEL,
  OPEN_ADD_PANEL,
  EMPLOYEE_PERMISSION_VIOLATION,
} from './eventConstants';

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

  const canvas = new Canvas();
  renderComponent(canvasContainer, canvas);
  canvas.drawElementsBuilding();
  canvas.drawEmployeeList(employeeList, EMPLOYEE_TRACKS);

  const notifications = new NotificationList({ violationsList });
  notifications.show();
  renderComponent(canvasContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  openEmployeeListPanelButton.hide();
  renderComponent(employeeInformationPanel, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanelContainer({ employeeList, eventManager, employeeApiService });
  employeeListPanel.show();
  renderComponent(employeeInformationPanel, employeeListPanel);

  /*const addEmployeePanel = new AddEmployeePanelContainer({ tracks, zones, eventManager, employeeApiService });
  addEmployeePanel.hide();
  renderComponent(employeeInformationPanel, addEmployeePanel);*/

  const editEmployeePanel = new EditEmployeePanel({ employee, tracks, zones });
  editEmployeePanel.hide();
  renderComponent(employeeInformationPanel, editEmployeePanel);
  
  /*
  class Container {
    constructor() {
      this.component = null;
    }

    setState() {
      this.component.setState();
    }

    render() {
      this.component.render();
    }
  }

  class EditEmployeePanelContainer extends Container {
    constructor(eventManager) {
      super();
      this.component = new EditEmployeePanel(...);

      // subscribe for component events

      c.setCloseButtonHandler(this.closeEditEmployeePanel.bind(this));
    }

    closeEditEmployeePanel () {
      editEmployeePanel.setState({ isAwaitingConfirmation: false });
      editEmployeePanel.clearForm();
      editEmployeePanel.hide();
    }
  }
*/
  /*eventManager.subscribe(EMPLOYEE_ADDED, async () => {
    try {
      const employeeListWithNewEmployee = await employeeApiService.getEmployees();
      employeeListPanel.setState({ employeeList: employeeListWithNewEmployee });
    } catch (error) {
      console.error(error);
    }
  });*/

  eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
    canvas.drawNewEmployee(payload.newEmployee, EMPLOYEE_TRACKS);
  });

  /*eventManager.subscribe(EMPLOYEE_EDITED, async () => {
    try {
      const newEmployeeList = await employeeApiService.getEmployees();
      employeeListPanel.setState({ employeeList: newEmployeeList });
    } catch (error) {
      console.error(error);
    }
  });*/

  /*eventManager.subscribe(EMPLOYEE_EDITED, async () => {
    try {
      const newEmployeeList = await employeeApiService.getEmployees();
      const newTrackList = markOccupiedTracks(newEmployeeList, EMPLOYEE_TRACKS);
      addEmployeePanel.setState({ tracks: newTrackList });
      addEmployeePanel.hide();
    } catch (error) {
      console.error(error);
    }
  });*/

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    canvas.drawEditedEmployee(payload.changedEmployee, EMPLOYEE_TRACKS);
  });

  /*eventManager.subscribe(EMPLOYEE_REMOVED, async () => {
    try {
      const newEmployeeList = await employeeApiService.getEmployees();
      employeeListPanel.setState({ employeeList: newEmployeeList });
    } catch (error) {
      console.error(error);
    }
  });*/

  /*eventManager.subscribe(EMPLOYEE_REMOVED, async () => {
    try {
      const newEmployeeList = await employeeApiService.getEmployees();
      const tracksWithoutRemovedEmployeeTrack = markOccupiedTracks(newEmployeeList, EMPLOYEE_TRACKS);
      addEmployeePanel.setState({ tracks: tracksWithoutRemovedEmployeeTrack });
      addEmployeePanel.hide();
    } catch (error) {
      console.error(error);
    }
  });*/

  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    canvas.removeEmployee(payload.currentEmployeeId);
  });

  /*eventManager.subscribe(HIDE_OPEN_EMPLOYEE_LIST_BUTTON, () => {
    employeeListPanel.show();
  });*/

  /*eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }
  });*/

  eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }
  });

  eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    openEmployeeListPanelButton.show();
  });

  eventManager.subscribe(OPEN_EDIT_PANEL, (payload) => {
    editEmployeePanel.show();
    editEmployeePanel.setState({
      employee: payload.employeeForEdit,
      tracks: payload.tracksWithOccupiedStatus,
    });
  });

  /*eventManager.subscribe(OPEN_EDIT_PANEL, () => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }
  });*/

  /*eventManager.subscribe(OPEN_ADD_PANEL, () => {
    addEmployeePanel.show();
  });*/

  eventManager.subscribe(OPEN_ADD_PANEL, () => {
    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }
  });

  canvas.setOverlapHandler((employee, zone) => {
    if (!employee.permittedZoneIds.includes(zone.id)) {
      eventManager.publish({
        type: EMPLOYEE_PERMISSION_VIOLATION,
        payload: { employee, zone },
      });
    }
  });

  eventManager.subscribe(EMPLOYEE_PERMISSION_VIOLATION, (payload) => {
    const time = new Date().toLocaleTimeString('ru-RU');
    const employeeName = payload.employee.name;
    const zoneName = payload.zone.name;
    const newViolation = {
      id: uuidv4(),
      employeeName,
      zoneName,
      time,
    };
    const { violationsList: oldViolations } = notifications.getState();

    telegramApiService.sendMessage(employeeName, zoneName, time);

    notifications.setState({ violationsList: [...oldViolations, newViolation] });
  });

  openEmployeeListPanelButton.setClickHandler(() => {
    openEmployeeListPanelButton.hide();
    eventManager.publish({
      type: HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
    });
  });

  /*employeeListPanel.setCloseButtonHandler(() => {
    employeeListPanel.hide();
    eventManager.publish({
      type: HIDE_EMPLOYEE_LIST_PANEL,
    });
  });

  employeeListPanel.setHandlerForAddPanelOpenButton(() => {
    eventManager.publish({
      type: OPEN_ADD_PANEL,
    });
  });*/

  /*employeeListPanel.setHandlerForEditPanelOpenButton((event) => {
    const employeeIdForEdit = event.target.id;
    const employeeForEdit = cloneDeep(employeeListPanel.getCurrentEmployeeList().find((employee) => employee.id === employeeIdForEdit));
    const tracksWithOccupiedStatus = markOccupiedTracks(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);

    eventManager.publish({
      type: OPEN_EDIT_PANEL,
      payload: {
        employeeForEdit,
        tracksWithOccupiedStatus,
      },
    });
  });*/

  notifications.setCloseButtonHandler((event) => {
    const notificationId = event.target.id;
    const { violationsList: currentViolations } = notifications.getState();

    const violationListWithoutClosedViolation = currentViolations.filter((violation) => violation.id !== notificationId);

    notifications.setState({ violationsList: violationListWithoutClosedViolation });
  });

  /*addEmployeePanel.setCloseButtonHandler(() => {
    addEmployeePanel.clearForm();
    addEmployeePanel.hide();
  });*/

  /*addEmployeePanel.setAddEmployeeButtonHandler(async (event) => {
    try {
      event.preventDefault();

      const newEmployee = addEmployeePanel.getNewEmployee();
      await employeeApiService.createEmployee(newEmployee);
      eventManager.publish({
        type: EMPLOYEE_ADDED,
        payload : {
          newEmployee,
        },
      });
      const employeeList = await employeeApiService.getEmployees();
      const tracksWithoutAddedEmployeeTrack = markOccupiedTracks(employeeList, EMPLOYEE_TRACKS);
      addEmployeePanel.setState({ tracks: tracksWithoutAddedEmployeeTrack, zones });
      addEmployeePanel.clearForm();
    } catch (error) {
      console.error(error);
    }
  });*/

  editEmployeePanel.setCloseButtonHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: false });
    editEmployeePanel.clearForm();
    editEmployeePanel.hide();
  });

  editEmployeePanel.setSaveChangeButtonHandler(async (event) => {
    try {
      event.preventDefault();

      const { employee: originalEmployee } = cloneDeep(editEmployeePanel.getState());
      const originalEmployeeId = originalEmployee.id;
      const changedEmployee = editEmployeePanel.getEditableEmployeeInformation(originalEmployeeId);
      await employeeApiService.updateEmployee(changedEmployee, originalEmployeeId);

      eventManager.publish({
        type: EMPLOYEE_EDITED,
        payload: {
          originalEmployee,
          changedEmployee,
        },
      });

      editEmployeePanel.clearForm();
      editEmployeePanel.hide();
    } catch (error) {
      console.error(error);
    }
  });

  editEmployeePanel.setConfirmationButtonRemoveEmployeeHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: true });
  });

  editEmployeePanel.setAcceptRemovalButtonHandler(async () => {
    try {
      const { employee: employeeToRemove } = cloneDeep(editEmployeePanel.getState());
      await employeeApiService.removeEmployee(employeeToRemove);

      eventManager.publish({
        type: EMPLOYEE_REMOVED,
        payload: {
          currentEmployeeId: employeeToRemove.id,
          employeeTrackId: employeeToRemove.trackId,
        },
      });

      editEmployeePanel.setState({ isAwaitingConfirmation: false });
      editEmployeePanel.hide();
    } catch (error) {
      console.error(error);
    }
  });

  editEmployeePanel.setRejectRemovalButtonHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: false });
  });
};
