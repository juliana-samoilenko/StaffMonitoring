import { RenderingComponent, createElement } from './RenderingComponent';
import warningSvg from '../img/warning.min.svg';

const createNotificationItemTemplate = (violation) => `
<article class="notification-list__notification notification">
  <header class="notification__header">
    <img class="notification__img" src="${warningSvg}" arial-role="presentation">
    <p class="notification__text">Внимание!</p>
    <button class="notification__button-close" type="button" title="Закрыть">&#10006;</button>
  </header>
  <div class="notification__message">
    ${violation.name} зашёл в зону ${violation.zone}
  </div>
</article>
`;

const createNotificationListTemplate = (violationInformation) => {
  const notificationItemTemplates = violationInformation.map((e) => createNotificationItemTemplate(e)).join('');

  return `<div class="notification-list">${notificationItemTemplates}</div>`;
};

export class Notification extends RenderingComponent {
  getElement() {
    if (this.element === null) {
      this.element = createElement(createNotificationListTemplate(this.data));
    }
    return this.element;
  }
}
