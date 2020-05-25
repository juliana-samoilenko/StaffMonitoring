import { Canvas } from './components/Canvas';
import { Notification } from './components/Notification';
import { OpenEmployeeListPanelButton } from './components/OpenEmployeeListPanelButton';
import { EmployeeListPanel } from './components/EmployeeListPanel';
import { AddEmployeePanel } from './components/AddEmployeePanel';
import { EditEmployeePanel } from './components/EditEmployeePanel';

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

  const violationInformation = [
    { name: 'Миронов И.А', zone: 'Цех 1' },
    { name: 'Петухов В.П.', zone: 'Высотные работы' },
    { name: 'Лукин В.Р', zone: 'Цех 1' }
  ];
  const employeesList = [
    { id: 1, name: 'Пиратов В.К.' },
    { id:  2, name: 'Шиханов П.А.'},
    { id: 3, name: 'Терёхин У.Л.' }
  ];
  const tracks = [
    { id: 1, name: 1, points: [{}, {}]},
    { id: 3, name: 3, points: [{}, {}]},
    { id: 4, name: 4, points: [{}, {}]}
  ];
  const zones = [
    { id: 1, name: 'Цех 1' },
    { id: 2, name: 'Высотные работы' },
    { id: 3, name: 'Цех 2' },
    { id: 4, name: 'Напряжение' }
  ];
  const employee = {
    id: 1,
    trackId: 2,
    name: 'Пиратов В.К.',
    position: 'engineer',
    permittedZones: [{ id: 1, name: 'Цех 1' }, { id: 4, name: 'Напряжение' }],
  };
  
  const canvas = new Canvas();
  renderComponent(canvasContainer, canvas);

  const notifications = new Notification({ violationInformation });
  notifications.hide();
  renderComponent(canvasContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  openEmployeeListPanelButton.show();
  renderComponent(employeeInformationPanel, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanel({ employeesList });
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
    employeeListPanel.hide();
    openEmployeeListPanelButton.show();
  });

  employeeListPanel.setHandlerForOpenButtonAddPanel(() => {
    if (editEmployeePanel.checkComponentShow) {
      editEmployeePanel.hide();
    }

    addEmployeePanel.show();
  });

  employeeListPanel.setHandlerForOpenButtonEditPanel(() => {
    if (addEmployeePanel.checkComponentShow) {
      addEmployeePanel.hide();
    }

    editEmployeePanel.show();
  })
}
