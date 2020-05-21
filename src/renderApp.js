import { Canvas, createCanvasTemplate } from './components/Canvas';
import { Notification, createNotificationListTemplate } from './components/Notification';
import { OpenEmployeeListPanelButton, createTemplateForOpenEmployeeListButton } from './components/OpenEmployeeListPanelButton';
import { EmployeeListPanel, createTemplateForEmployeePanel } from './components/EmployeeListPanel';
import { AddEmployeePanel, createAddEmployeePanelTemplate } from './components/AddEmployeePanel';
import { EditEmployeePanel, createEditEmployeePanelTemplate } from './components/EditEmployeePanel';

const renderComponent = (container, template, functionOfCreateTemplate, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template.render(functionOfCreateTemplate));
}

export const renderApp = () => {
  const rootContainer = document.querySelector('.js-work-display');
  const canvas = new Canvas();
  renderComponent(rootContainer, canvas, createCanvasTemplate);

  const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  const notifications = new Notification(violationInformation);
  renderComponent(rootContainer, notifications, createNotificationListTemplate);

  /*const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  renderComponent(rootContainer, openEmployeeListPanelButton, createTemplateForOpenEmployeeListButton);*/

  const employeesList = [{ id: 1, name: 'Пиратов В.К.' }, { id:  2, name: 'Шиханов П.А.'}, { id: 3, name: 'Терёхин У.Л.' }];
  const employeeListPanel = new EmployeeListPanel(employeesList);
  renderComponent(rootContainer, employeeListPanel, createTemplateForEmployeePanel);

  const employeePanel = rootContainer.querySelector('.js-employee-information-panel');
  const tracks = [{ id: 1, name: 1, points: [{}, {}]}, { id: 3, name: 3, points: [{}, {}]}, { id: 4, name: 4, points: [{}, {}]}];
  const zones = [ { id: 1, name: 'Цех 1' }, { id: 2, name: 'Высотные работы' }, { id: 3, name: 'Цех 2' }, { id: 4, name: 'Напряжение' } ];
  /*const addEmployeePanel = new AddEmployeePanel({tracks, zones});
  renderComponent(employeePanel, addEmployeePanel, createAddEmployeePanelTemplate);*/

  const employee = {
    id: 1,
    trackId: 2,
    name: 'Пиратов В.К.',
    position: 'engineer',
    permittedZones: [{ id: 1, name: 'Цех 1' }, { id: 4, name: 'Напряжение' }],
  };
  const editEmployeePanel = new EditEmployeePanel({employee, tracks, zones, isChecked: false});
  renderComponent(employeePanel, editEmployeePanel, createEditEmployeePanelTemplate);
}
