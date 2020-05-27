import { Canvas } from './components/Canvas';
import { NotificationList } from './components/NotificationList';
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
  const rootContainer = document.querySelector('.js-work-display');
  const violationsList = [
    { name: 'Миронов И.А', zone: 'Цех 1' },
    { name: 'Петухов В.П.', zone: 'Высотные работы' },
    { name: 'Лукин В.Р', zone: 'Цех 1' }
  ];
  const employeeList = [
    { id: 1, name: 'Пиратов В.К.' },
    { id: 2, name: 'Шиханов П.А.' },
    { id: 3, name: 'Терёхин У.Л.' }
  ];
  const tracks = [
    { id: 1, name: 1, points: [{},{}] },
    { id: 3, name: 3, points: [{},{}] },
    { id: 4, name: 4, points: [{},{}] }
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
  renderComponent(rootContainer, canvas);

  const notifications = new NotificationList({ violationsList });
  notifications.hide();
  renderComponent(rootContainer, notifications);

  const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  openEmployeeListPanelButton.hide();
  renderComponent(rootContainer, openEmployeeListPanelButton);

  const employeeListPanel = new EmployeeListPanel({ employeeList });
  employeeListPanel.show();
  renderComponent(rootContainer, employeeListPanel);

  setTimeout(() => {
    employeeListPanel.setState({ employeeList: [
      { id: 1, name: 'Пиратов В.К.' },
      { id: 2, name: 'Шиханов П.А.' },
      { id: 3, name: 'Терёхин У.Л.' },
      { id: 4, name: 'Уптин В.В.' }
    ]
  })
  }, 3000);

}
