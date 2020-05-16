import { createCanvasTemplate } from './components/canvas';
import { createNotificationListTemplate} from './components/notification';
import { createTemplateForOpenEmployeeListButton, createTemplateForEmployeesListPanel } from './components/employees-list-panel';
import { createAddEmployeePanelTemplate, createEmployeeAddFormTemplate, createTracksList, createZonesList } from './components/add-employee-panel';
import { createEditEmployeePanelTemplate } from './components/edit-employee-panel';

export const renderApp = () => {
  const rootContainer = document.querySelector('.js-work-display');
  render(rootContainer, createCanvasTemplate(), 'afterbegin');

  const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  
  render(rootContainer, createNotificationListTemplate(violationInformation), 'beforeend');
  /*render(rootContainer, createTemplateForOpenEmployeeListButton(), 'beforeend');*/

  const employeesList = [{ id: 1, name: 'Пиратов В.К.' }, { id:  2, name: 'Шиханов П.А.'}, { id: 3, name: 'Терёхин У.Л.' }];
  render(rootContainer, createTemplateForEmployeesListPanel(employeesList), 'beforeend');

  const employeePanel = rootContainer.querySelector('.js-employee-information-panel');
  const freeTracks = [{ id: 1, points: [{}, {}]}, { id: 3, points: [{}, {}]}, { id: 4, points: [{}, {}]}];
  const zones = [ { id: 1, name: 'Цех 1' }, { id: 2, name: 'Высотные работы' }, { id: 3, name: 'Цех 2' }, { id: 4, name: 'Напряжение' } ];

  /*render(employeePanel, createAddEmployeePanelTemplate(freeTracks, zones), 'beforeend');*/

  const employee = {
    id: 1,
    trackId: 2,
    name: 'Пиратов В.К.',
    position: 'engineer',
    accessibleZones: [{ id: 1, name: 'Цех 1' }, { id: 4, name: 'Напряжение' }],
  };
  const freeZones = [ 
    { id: 2, name: 'Высотные работы' }, 
    { id: 3, name: 'Цех 2' } 
  ];
  render(employeePanel, createEditEmployeePanelTemplate(employee, freeTracks, freeZones), 'beforeend');
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position,template);
}
