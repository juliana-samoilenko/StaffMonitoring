import { Component } from './Component';

const createTemplateForOpenEmployeeListButton = () => `
<button class="button button-open-list" type="button" title="Список сотрудников">
</button>
`;

export class OpenEmployeeListPanelButton extends Component {
  getTemplate() {
    return createTemplateForOpenEmployeeListButton(this.data);
  }
  
  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }
}
