import { Component, createElement } from './Component';

const createTemplateForOpenEmployeeListButton = () => `
<button class="button button-open-list" type="button" title="Список сотрудников">
</button>
`;

export class OpenEmployeeListPanelButton extends Component {
  getElement() {
    if (this.element === null) {
      this.element = createElement(createTemplateForOpenEmployeeListButton());
    }
    return this.element;
  }
}
