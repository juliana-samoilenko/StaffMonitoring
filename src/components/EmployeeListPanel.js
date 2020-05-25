import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForEmployeeListItem = (employees) => `
<li class="employees-list__item employee">
  <div class="employee__container">
    <span class="employee__name">${employees.id}) ${employees.name}</span>
    <button class="employee__button-open-edit js-open-edit-panel" type="button" title="Редактировать">
    </button>
  </div>
</li>`;

const createTemplateForEmployeePanel = ({ employeesList }) => {
  const employeeListItemTemplates = employeesList.map((e) => createTemplateForEmployeeListItem(e)).join('');

  return `
  <div class="employees-panel">
  
    <header class="employees-panel__header list-header">
      <h2 class="list-header__text">Список сотрудников</h2>
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employees-panel__body employees-list">
      <ul class="employees-list__container js-employees-list__container">
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
}
