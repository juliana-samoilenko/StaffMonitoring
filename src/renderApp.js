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
  HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
  HIDE_EMPLOYEE_LIST_PANEL,
  OPEN_EDIT_PANEL,
  OPEN_ADD_PANEL,
} from './eventConstants';

const markOccupiedTracksInEmployeeList = (employeeList, tracks) => {
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
  const canvasContainer = document.querySelector('.js-display-building');
  const employeeInformationPanel = document.querySelector('.js-employee-information-panel');

  const violationsList = [
    { name: 'Миронов И.А', zone: 'Цех 1' },
    { name: 'Петухов В.П.', zone: 'Высотные работы' },
    { name: 'Лукин В.Р', zone: 'Цех 1' }
  ];
  const employeeList = cloneDeep(EMPLOYEE);
  const tracks = cloneDeep(EMPLOYEE_TRACKS);
  const zones = cloneDeep(ZONES);
  const employee = { trackId: null, permittedZoneIds: []};

  const canvas = new Canvas();
  renderComponent(canvasContainer, canvas);
  canvas.drawElementsBuilding();
  canvas.drawEmployeeList(employeeList, EMPLOYEE_TRACKS);

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

  //EMPLOYEE_ADDED
  eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();

    employeeListPanel.setState({ employeeList: [...currentEmployeeList, payload.newEmployee] });
  });

  eventManager.subscribe(EMPLOYEE_ADDED, (payload) => {
    canvas.drawNewEmployee(payload.newEmployee, EMPLOYEE_TRACKS);
  });

  //EMPLOYEE_EDITED
  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    const originEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newEmployeeList = originEmployeeList.map((employee) =>
      employee.id === payload.changedEmployee.id ? payload.changedEmployee : employee);

    employeeListPanel.setState({ employeeList: newEmployeeList });
  });

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    const tracks  = addEmployeePanel.getDataOnTracks();
    const { originalEmployee, changedEmployee } = payload;
    const { trackId: originalEmployeeTrackId = undefined } = originalEmployee;
    const { trackId: changedEmployeeTrackId = undefined } = changedEmployee;
    const newTrackList = tracks.map((track) => {
      if (track.id === originalEmployeeTrackId || track.id === changedEmployeeTrackId) {
        track.empty = !track.empty;
      }

      return track;
    });

    addEmployeePanel.setState({ tracks: newTrackList });
    addEmployeePanel.hide();
  });

  eventManager.subscribe(EMPLOYEE_EDITED, (payload) => {
    canvas.drawEditedEmployee(payload.changedEmployee, EMPLOYEE_TRACKS);
  });

  //EMPLOYEE_REMOVED
  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    const originEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newEmployeeList = originEmployeeList.filter((employee) => employee.id !== payload.currentEmployeeId);

    employeeListPanel.setState({ employeeList: newEmployeeList });
  });

  eventManager.subscribe(EMPLOYEE_REMOVED, ({ employeeTrackId }) => {
    const { tracks } = addEmployeePanel.data;
    const tracksWithoutRemovedEmployeeTrack = cloneDeep(tracks).map(track => {
      if (track.id === employeeTrackId) {
        track.empty = true;
      }

      return track;
    });

    addEmployeePanel.setState({ tracks: tracksWithoutRemovedEmployeeTrack });
    addEmployeePanel.hide();
  });

  eventManager.subscribe(EMPLOYEE_REMOVED, (payload) => {
    canvas.removeEmployee(payload.currentEmployeeId);
  });

  //HIDE_OPEN_EMPLOYEE_LIST_BUTTON
  eventManager.subscribe(HIDE_OPEN_EMPLOYEE_LIST_BUTTON, () => {
    employeeListPanel.show();
  })

  //HIDE_EMPLOYEE_LIST_PANEL
  eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }
  })

  eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }
  })

  eventManager.subscribe(HIDE_EMPLOYEE_LIST_PANEL, () => {
    openEmployeeListPanelButton.show();
  })

  //OPEN_EDIT_PANEL
  eventManager.subscribe(OPEN_EDIT_PANEL, (payload) => {
    editEmployeePanel.show();
    editEmployeePanel.setState({
      employee: payload.employeeForEdit,
      tracks: payload.tracksWithOccupiedStatus
    });
  })

  eventManager.subscribe(OPEN_EDIT_PANEL, () => {
    if (addEmployeePanel.isComponentShown) {
      addEmployeePanel.hide();
    }
  })

  //OPEN_ADD_PANEL
  eventManager.subscribe(OPEN_ADD_PANEL, () => {
    addEmployeePanel.show();
  })

  eventManager.subscribe(OPEN_ADD_PANEL, () => {
    if (editEmployeePanel.isComponentShown) {
      editEmployeePanel.hide();
    }
  })

  //handler for open employee list button
  openEmployeeListPanelButton.setClickHandler(() => {
    openEmployeeListPanelButton.hide();
    eventManager.publish({
      type: HIDE_OPEN_EMPLOYEE_LIST_BUTTON,
    });
  });

  //handlers for employee list panel
  employeeListPanel.setCloseButtonHandler(() => {
    employeeListPanel.hide();
    eventManager.publish({
      type: HIDE_EMPLOYEE_LIST_PANEL,
    });
  });

  employeeListPanel.setHandlerForAddPanelOpenButton(() => {
    eventManager.publish({
      type: OPEN_ADD_PANEL,
    });
  });

  employeeListPanel.setHandlerForEditPanelOpenButton((event) => {
    const employeeIdForEdit = event.target.id;
    const employeeForEdit = cloneDeep(employeeListPanel.getCurrentEmployeeList().find(employee => employee.id === employeeIdForEdit));
    const tracksWithOccupiedStatus = markOccupiedTracksInEmployeeList(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);

    eventManager.publish({
      type: OPEN_EDIT_PANEL,
      payload: {
        employeeForEdit: employeeForEdit,
        tracksWithOccupiedStatus: tracksWithOccupiedStatus,
      }
    });
  });

  //handlers for add employee panel
  addEmployeePanel.setCloseButtonHandler(() => {
    addEmployeePanel.clearForm();
    addEmployeePanel.hide();
  });

  addEmployeePanel.setAddEmployeeButtonHandler((event) => {
    event.preventDefault();

    const newEmployee = addEmployeePanel.getNewEmployee();
    const tracks = addEmployeePanel.getDataOnTracks();

    eventManager.publish({
      type: EMPLOYEE_ADDED,
      payload : {
        newEmployee,
      }
    });

    const newTrackList = tracks.map((track) => {
      if (track.id === newEmployee.trackId) {
        track.empty = !track.empty;
      }

      return track;
    });

    addEmployeePanel.setState({ tracks: newTrackList, zones });
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

    const formData = editEmployeePanel.getFormData();
    const originalEmployee = cloneDeep(formData.employee);
    const originalEmployeeId = originalEmployee.id;
    const changedEmployee = editEmployeePanel.getEditableEmployeeInformation(originalEmployeeId);

    eventManager.publish({
      type: EMPLOYEE_EDITED,
      payload: {
        originalEmployee,
        changedEmployee,
      }
    });

    editEmployeePanel.clearForm();
    editEmployeePanel.hide();
  });

  editEmployeePanel.setConfirmationButtonRemoveEmployeeHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: true });
  });

  editEmployeePanel.setAcceptRemovalButtonHandler(() => {
    const formData = editEmployeePanel.getFormData();
    const employeeToRemove = cloneDeep(formData.employee);

    eventManager.publish({
      type: EMPLOYEE_REMOVED,
      payload: {
        currentEmployeeId: employeeToRemove.id,
        employeeTrackId: employeeToRemove.trackId,
      }
    });

    editEmployeePanel.hide();
  });

  editEmployeePanel.setRejectRemovalButtonHandler(() => {
    editEmployeePanel.setState({ isAwaitingConfirmation: false });
  });
}
