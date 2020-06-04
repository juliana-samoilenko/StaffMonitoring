import { v4 as uuidv4 } from 'uuid';
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

let employeeIdForEdit = null;

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

    let employeeForEdit = {};
    employeeIdForEdit = event.target.id;
    employeeListPanel.getCurrentEmployeeList().forEach((employee) => {
      if (employee.id === employeeIdForEdit) {
        employeeForEdit = cloneDeep(employee);
      }
    });

    const tracksWithOccupiedStatus = markOccupiedTracks(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);
    editEmployeePanel.setState({ employee: employeeForEdit, tracks: tracksWithOccupiedStatus });
    editEmployeePanel.show();
  })

  //handlers for add employee panel
  addEmployeePanel.setCloseButtonHandler(() => {
    addEmployeePanel.clearForm();
    addEmployeePanel.hide();
  });

  addEmployeePanel.setAddEmployeeButtonHandler((event) => {
    event.preventDefault();

    const nextId = uuidv4();
    const newEmployee = addEmployeePanel.getInformationOfForm(nextId);

    addEmployeePanel.clearForm();

    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();
    employeeListPanel.setState({ employeeList: [...currentEmployeeList, newEmployee] });

    const newTrackList = markOccupiedTracks(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);
    addEmployeePanel.setState({ tracks: newTrackList, zones });
  });

  //handlers for edit employee panel
  editEmployeePanel.setCloseButtonHandler(() => {
    editEmployeePanel.clearForm();
    editEmployeePanel.hide();
  });

  editEmployeePanel.setSaveChangeButtonHandler((event) => {
    event.preventDefault();

    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const currentEmployeeId = employeeIdForEdit;
    const currentEmployee = currentEmployeeList.find(employee => employee.id == currentEmployeeId);
    const currentTrackId = currentEmployee.trackId;

    const changedEmployee = editEmployeePanel.getInformationOfForm(currentEmployeeId);

    const oldEmployeeList = employeeListPanel.getCurrentEmployeeList();
    const newEmployeeList = oldEmployeeList.map((employee) => 
      employee.id === changedEmployee.id ? changedEmployee : employee);

    employeeListPanel.setState({ employeeList: newEmployeeList });

    const tracksWithOccupiedStatus = markOccupiedTracks(employeeListPanel.getCurrentEmployeeList(), EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(currentTrackId, tracksWithOccupiedStatus);
    
    addEmployeePanel.setState({ tracks: newTrackList });
    addEmployeePanel.hide();

    editEmployeePanel.setState({ employee: changedEmployee, tracks: newTrackList });
    editEmployeePanel.hide();
  });

  editEmployeePanel.setConfirmationButtonRemoveEmployeeHandler(() => {
    editEmployeePanel.toggleConfirmationButtons(true);
  })

  editEmployeePanel.setAcceptRemovalButtonHandler(() => {
    const currentEmployeeId = employeeIdForEdit;
    const currentEmployeeList = employeeListPanel.getCurrentEmployeeList();

    const employeeToRemove = currentEmployeeList.find(employee => employee.id == currentEmployeeId);
    const employeeTrack = employeeToRemove.trackId;

    const newEmployeeList = currentEmployeeList.filter((employee) => employee.id !== currentEmployeeId);

    const tracksWithOccupiedStatus = markOccupiedTracks(currentEmployeeList, EMPLOYEE_TRACKS);
    const newTrackList = makePreviousTrackUnoccupied(employeeTrack, tracksWithOccupiedStatus);

    employeeListPanel.setState({ employeeList: newEmployeeList });
    addEmployeePanel.setState({ tracks: newTrackList });
    editEmployeePanel.setState({ tracks: newTrackList });
    
    editEmployeePanel.hide();
    addEmployeePanel.hide();
  })

  editEmployeePanel.setRejectRemovalButtonHandler(() => {
    editEmployeePanel.toggleConfirmationButtons(false);
  })
}
