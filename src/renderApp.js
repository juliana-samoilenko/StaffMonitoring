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

export const renderApp = () => {
  const canvasContainer = document.querySelector('.display-building');
  const employeeInformationPanel = document.querySelector('.js-employee-information-panel');

  const violationsList = [
    { name: 'Миронов И.А', zone: 'Цех 1' },
    { name: 'Петухов В.П.', zone: 'Высотные работы' },
    { name: 'Лукин В.Р', zone: 'Цех 1' }
  ];
  const employeeList = Object.assign(EMPLOYEE);
  const tracks = Object.assign(EMPLOYEE_TRACKS);
  const zones = Object.assign(ZONES);
  const employee = {
    id: 4,
    trackId: 2,
    name: 'Пиратов В.К.',
    position: 'engineer',
    permittedZones: [{ id: 1, name: 'Цех 1' }, { id: 4, name: 'Напряжение' }],
  };
  
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

  const editEmployeePanel = new EditEmployeePanel({employee, tracks, zones, isChecked: false});
  editEmployeePanel.hide();
  renderComponent(employeeInformationPanel, editEmployeePanel);

  //handler for open employee list button
  openEmployeeListPanelButton.setClickHandler(() => {
    openEmployeeListPanelButton.hide();
    employeeListPanel.show();
  });

  //handlers for employee list panel
  employeeListPanel.setCloseButtonHandler(() => {
    if (addEmployeePanel.isComponentShow) {
      addEmployeePanel.hide();
    }

    if (editEmployeePanel.isComponentShow) {
      editEmployeePanel.hide();
    }
    employeeListPanel.hide();
    openEmployeeListPanelButton.show();
  });

  employeeListPanel.setHandlerForAddPanelOpenButton(() => {
    if (editEmployeePanel.isComponentShow) {
      editEmployeePanel.hide();
    }

    addEmployeePanel.show();
  });

  employeeListPanel.setHandlerForEditPanelOpenButton(() => {
    if (addEmployeePanel.isComponentShow) {
      addEmployeePanel.hide();
    }

    editEmployeePanel.show();
  })

  //handlers for add employee panel
  addEmployeePanel.setCloseButtonHandler(() => {
    addEmployeePanel.clearForm();
    addEmployeePanel.hide();
  });

  addEmployeePanel.setAddEmployeeButtonHandler(() => {
    if (addEmployeePanel.checkRequiredFields()) {
      const nextId = employeeListPanel.getIndexForNextEmployee();
      const newEmployee = addEmployeePanel.getInformationOfForm(nextId);
      addEmployeePanel.clearForm();
      employeeListPanel.setState(newEmployee);
    }
  });

  //handlers for edit employee panel
  editEmployeePanel.setCloseButtonHandler(() => {
    editEmployeePanel.clearForm();
    editEmployeePanel.hide();
  });
}
