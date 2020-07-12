import { Component } from './Component';
import warningSvg from '../img/warning.min.svg';

const createNotificationItemTemplate = (violation) => `
<article class="notification-list__notification notification">
  <header class="notification__header">
    <img class="notification__img" src="${warningSvg}" arial-role="presentation">
    <p class="notification__text">Внимание!</p>
    <button id="${violation.id}" class="notification__button-close js-button-close" type="button" title="Закрыть">&#10006;</button>
  </header>
  <div class="notification__message">
    ${violation.employeeName} зашёл в зону ${violation.zoneName} в ${violation.time}
  </div>
</article>
`;

const createNotificationListTemplate = ({ violationsList }) => {
  const notificationItemTemplates = violationsList.map((violation) => createNotificationItemTemplate(violation)).join('');

  return `<div class="notification-list">${notificationItemTemplates}</div>`;
};

export class NotificationList extends Component {
  getTemplate() {
    return createNotificationListTemplate(this.data);
  }

  setCloseButtonHandler(handler) {
    this.closeButtonHandler = handler;
    const closeButtons = this.getElement().querySelectorAll('.js-button-close');

    closeButtons.forEach((button) => {
      button.addEventListener('click', handler);
    });
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
  }
}
