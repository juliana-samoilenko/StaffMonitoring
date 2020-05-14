import { createCanvasTemplate } from './components/canvas';
import { createNotificationListTemplate, createNotificationItemTemplate } from './components/notification';
import { createButtonOpenListTemplate } from './components/button-open-list-employees';
import { createEmployeesPanelTemplate, createEmployeeListItemTemplate } from './components/employees-panel';

export const renderApp = () => {
  const mainContainer = document.querySelector('.js-work-display');
  render(mainContainer, createCanvasTemplate(), 'afterbegin');

  /*const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  const notificationItemTemplates = violationInformation.map(e => createNotificationItemTemplate(e)).join('');

  render(mainContainer, createNotificationListTemplate(notificationItemTemplates), 'beforeend');
  
  render(mainContainer, createButtonOpenListTemplate(), 'beforeend');*/
  const employeesList = [{ id: 1, name: 'Пиратов В.К.' }, { id:  2, name: 'Шиханов П.А.'}, { id: 3, name: 'Терёхин У.Л.' }];
  const employeeListItemTemplates = employeesList.map(e => createEmployeeListItemTemplate(e)).join('');

  render(mainContainer, createEmployeesPanelTemplate(employeeListItemTemplates), 'beforeend');
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position,template);
}
