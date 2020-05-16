import { createCanvasTemplate } from './components/canvas';
import { createNotificationListTemplate} from './components/notification';
import { createButtonOpenListTemplate } from './components/button-open-list-employees';
import { createEmployeesListPanelTemplate, createEmployeeListItemTemplate } from './components/employees-list-panel';
import { createAddEmployeePanelTemplate, createEmployeeAddFormTemplate, createTracksList, createZonesList } from './components/add-employee';

export const renderApp = () => {
  const mainContainer = document.querySelector('.js-work-display');
  render(mainContainer, createCanvasTemplate(), 'afterbegin');

  const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  
  render(mainContainer, createNotificationListTemplate(violationInformation), 'beforeend');
  render(mainContainer, createButtonOpenListTemplate(), 'beforeend');

  /*const employeesList = [{ id: 1, name: 'Пиратов В.К.' }, { id:  2, name: 'Шиханов П.А.'}, { id: 3, name: 'Терёхин У.Л.' }];
  const employeeListItemTemplates = employeesList.map(e => createEmployeeListItemTemplate(e)).join('');
  render(mainContainer, createEmployeesListPanelTemplate(employeeListItemTemplates), 'beforeend');

  const employeePanel = mainContainer.querySelector('.js-employee-information-panel');*/
  /*const tracks = [{ id: 1, points: [{}, {}]}, { id: 2, points: [{}, {}]}, { id: 4, points: [{}, {}]}];
  const tracksList = tracks.map(e => createTracksList(e)).join('');
  const zones = [ { id: 1, name: 'Цех 1' }, { id: 2, name: 'Высотные работы' }, { id: 3, name: 'Цех 2' }, { id: 4, name: 'Напряжение' } ];
  const zonesList = zones.map(e => createZonesList(e)).join('');
  const form = createEmployeeAddFormTemplate(tracksList, zonesList);

  render(employeePanel, createAddEmployeePanelTemplate(form), 'beforeend');*/
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position,template);
}
