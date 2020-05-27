import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForEmployeeListItem = (employees, listNumber) => `
<li class="employees-list__item employee js-employees-list__item">
  <div class="employee__container">
    <span class="employee__name">${listNumber}) ${employees.name}</span>
    <button class="employee__button-open-edit js-open-edit-panel" type="button" title="Редактировать">
    </button>
  </div>
</li>`;

const createTemplateForEmployeePanel = ({ employeesList }) => {
  const employeeListItemTemplates = employeesList.map((e, index) => createTemplateForEmployeeListItem(e, index + 1)).join('');

  return `
  <div class="employees-panel">
  
    <header class="employees-panel__header list-header">
      <h2 class="list-header__text">Список сотрудников</h2>
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employees-panel__body employees-list">
      <ul class="employees-list__container">
        ${employeeListItemTemplates}
      </ul>
    </div>
  
    <footer class="employees-panel__footer footer-list">
      <button class="footer-list__button-open-add js-open-add-panel" type="button" title="Добавить сотрудика">
      </button>
    </footer>
  </div>
  `;
};

export class EmployeeListPanel extends Component {
  getTemplate() {
    return createTemplateForEmployeePanel(this.data);
  }

  setCloseButtonHandler(handler) {
    this.closeButtonHandler = handler;

    this.getElement().querySelector('.js-btn-close').addEventListener('click', handler);
  }

  setHandlerForOpenButtonAddPanel(handler) {
    this.openButtonForAddPanel = handler;

    this.getElement().querySelector('.js-open-add-panel').addEventListener('click', handler);
  }

  setHandlerForOpenButtonEditPanel(handler) {
    this.openButtonForEditPanel = handler;

    const editButtons = this.getElement().querySelectorAll('.js-open-edit-panel');
    
    editButtons.forEach((button) => {
      button.addEventListener('click', handler);
    }) 
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
    this.setHandlerForOpenButtonAddPanel(this.openButtonForAddPanel);
    this.setHandlerForOpenButtonEditPanel(this.openButtonForEditPanel);
  }
}
