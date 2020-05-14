import { createCanvasTemplate } from './components/canvas';
import { createNotificationListTemplate, createNotificationItemTemplate } from './components/notification';
import { createButtonOpenListTemplate } from './components/button-open-list-employees';

export const renderApp = () => {
  const mainContainer = document.querySelector('.js-work-display');
  render(mainContainer, createCanvasTemplate(), 'afterbegin');

  /*const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  const notificationItemTemplates = violationInformation.map(e => createNotificationItemTemplate(e)).join('');

  render(mainContainer, createNotificationListTemplate(notificationItemTemplates), 'beforeend');*/

  render(mainContainer, createButtonOpenListTemplate(), 'beforeend');
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position,template);
}
