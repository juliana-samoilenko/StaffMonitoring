import { v4 as uuidv4 } from 'uuid';
import { EventManager } from './eventManager';
import { Canvas } from './components/Canvas';
import { NotificationList } from './components/NotificationList';
import { OpenEmployeeListPanelButton } from './components/OpenEmployeeListPanelButton';
import { EmployeeListPanel } from './components/EmployeeListPanel';
import { AddEmployeePanel } from './components/AddEmployeePanel';
import { EditEmployeePanel } from './components/EditEmployeePanel';

import {
  EMPLOYEE_TRACKS,
  ZONES,
  EMPLOYEE,
} from './const';

import {
  EMPLOYEE_ADDED,
  EMPLOYEE_EDITED,
  EMPLOYEE_REMOVED, 
} from './eventConstants';

const markOccupiedTracks = (employeeList, tracks) => { 
  const unoccupiedTracks = employeeList.map((employee) => {
    if (employee.trackId !== null) {
      return employee.trackId;
    }
  });

  const tracksWithEmptyStatus = cloneDeep(tracks).map((track) => {
    track.empty = !unoccupiedTracks.includes(track.id);
    return track;
  })

  return tracksWithEmptyStatus;
};

const makePreviousTrackUnoccupied = (currentTrackId, tracks) => {
  const tracksWithEmptyStatus = cloneDeep(tracks).map((track) => {
    if (track.id == currentTrackId) {
      track.empty = true;
    }
    return track;
  })

  return tracksWithEmptyStatus;
}

const renderComponent = (container, component, position = 'beforeend') => {
  switch(position) {
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

export const cloneDeep = array => JSON.parse(JSON.stringify(array));

export const renderApp = () => {
  const canvasContainer = document.querySelector('.display-building');
  const employeeInformationPanel = document.querySelector('.js-employee-information-panel');

  const violationsList = [
    { name: 'Миронов И.А', zone: 'Цех 1' },
    { name: 'Петухов В.П.', zone: 'Высотные работы' },
    { name: 'Лукин В.Р', zone: 'Цех 1' }
  ];
  const employeeList = cloneDeep(EMPLOYEE);
  const tracks = markOccupiedTracks(employeeList, EMPLOYEE_TRACKS);
  const zones = cloneDeep(ZONES);
  const employee = { trackId: null, permittedZoneIds: []};
  
  const canvas = new Canvas();
  renderComponent(canvasContainer, canvas);

  const notifications = new NotificationList({ violationsList });
  notifications.hide();
  renderComponent(canvasContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  openEmployeeListPanelButton.show();
  renderComponent(employeeInformationPanel, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanel({ employeeList });
  employeeListPanel.hide();
  renderComponent(employeeInformationPanel, employeeListPanel);

  const addEmployeePanel = new AddEmployeePanel({ tracks, zones });
  addEmployeePanel.hide();
  renderComponent(employeeInformationPanel, addEmployeePanel);

  const editEmployeePanel = new EditEmployeePanel({ employee, tracks, zones });
  editEmployeePanel.hide();
  renderComponent(employeeInformationPanel, editEmployeePanel);

  const eventManager = new EventManager();

  eventManager.subscribe(EMPLOYEE_ADDED, () => {
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newTrackList = markOccupiedTracks(currentEmployeeList, EMPLOYEE_TRACKS);

    addEmployeePanel.setState({ tracks: newTrackList, zones });
  });

  eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();

    employeeListPanel.setState({ employeeList: [...currentEmployeeList, payload.newEmployee] });
  });

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    const oldEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newEmployeeList = oldEmployeeList.map((employee) => 
      employee.id === payload.changedEmployee.id ? payload.changedEmployee : employee);
    
    employeeListPanel.setState({ employeeList: newEmployeeList });
  });

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const tracksWithOccupiedStatus = markOccupiedTracks(currentEmployeeList, EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(payload.currentTrackId, tracksWithOccupiedStatus);

    addEmployeePanel.setState({ tracks: newTrackList });
  });

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const tracksWithOccupiedStatus = markOccupiedTracks(currentEmployeeList, EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(payload.currentTrackId, tracksWithOccupiedStatus);

    editEmployeePanel.setState({ employee: payload.changedEmployee, tracks: newTrackList });
  });

  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    const oldEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newEmployeeList = oldEmployeeList.filter((employee) => employee.id !== payload.currentEmployeeId);

    employeeListPanel.setState({ employeeList: newEmployeeList });
  });

  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    const oldEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const tracksWithOccupiedStatus = markOccupiedTracks(oldEmployeeList, EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(payload.employeeTrackId, tracksWithOccupiedStatus);

    addEmployeePanel.setState({ tracks: newTrackList });
  });

  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    const oldEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const tracksWithOccupiedStatus = markOccupiedTracks(oldEmployeeList, EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(payload.employeeTrackId, tracksWithOccupiedStatus);

    editEmployeePanel.setState({ tracks: newTrackList, isAwaitingConfirmation: false });
  });

  //handler for open employee list button
  openEmployeeListPanelButton.setClickHandler(() => {
    openEmployeeListPanelButton.hide();
    employeeListPanel.show();
  });

  //handlers for employee list panel
  employeeListPanel.setCloseButtonHandler(() => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }

    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }
    employeeListPanel.hide();
    openEmployeeListPanelButton.show();
  });

  employeeListPanel.setHandlerForAddPanelOpenButton(() => {
    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }

    addEmployeePanel.show();
  });

  employeeListPanel.setHandlerForEditPanelOpenButton((event) => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }
    const employeeIdForEdit = event.target.id;
    const employeeForEdit = cloneDeep(employeeListPanel.getCurrentEmployeeList().find(employee => employee.id === employeeIdForEdit));

    const tracksWithOccupiedStatus = markOccupiedTracks(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);
    editEmployeePanel.setState({ employee: employeeForEdit, tracks: tracksWithOccupiedStatus });
    editEmployeePanel.show();
  });

  //handlers for add employee panel
  addEmployeePanel.setCloseButtonHandler(() => {
    addEmployeePanel.clearForm();
    addEmployeePanel.hide();
  });

  addEmployeePanel.setAddEmployeeButtonHandler((event) => {
    event.preventDefault();

    eventManager.publish({
      type: EMPLOYEE_ADDED,
      payload : {
        newEmployee: addEmployeePanel.getNewEmployee(),
      }
    });
    
    addEmployeePanel.clearForm();
  });

  //handlers for edit employee panel
  editEmployeePanel.setCloseButtonHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: false });
    editEmployeePanel.clearForm();
    editEmployeePanel.hide();
  });

  editEmployeePanel.setSaveChangeButtonHandler((event) => {
    event.preventDefault();

    const formData = editEmployeePanel.getData();
    const currentEmployee = cloneDeep(formData.employee);
    const currentEmployeeId = currentEmployee.id;

    eventManager.publish({
      type: EMPLOYEE_EDITED,
      payload: {
        changedEmployee: editEmployeePanel.getEditableEmployeeInformation(currentEmployeeId),
        currentTrackId: currentEmployee.trackId,
      }
    });

    addEmployeePanel.hide();
    editEmployeePanel.hide();
  });

  editEmployeePanel.setConfirmationButtonRemoveEmployeeHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: true });
  });

  editEmployeePanel.setAcceptRemovalButtonHandler(() => {
    const formData = editEmployeePanel.getData();
    const employeeToRemove = cloneDeep(formData.employee);

    eventManager.publish({
      type: EMPLOYEE_REMOVED,
      payload: {
        currentEmployeeId: employeeToRemove.id,
        employeeTrackId: employeeToRemove.trackId,
      }
    });
    
    editEmployeePanel.hide();
    addEmployeePanel.hide();
  });

  editEmployeePanel.setRejectRemovalButtonHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: false });
  });
}
