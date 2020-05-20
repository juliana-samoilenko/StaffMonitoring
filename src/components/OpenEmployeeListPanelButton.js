import { RenderingComponent, createElement } from './RenderingComponent';

export const createTemplateForOpenEmployeeListButton = () => `
<button class="button button-open-list" type="button" title="Список сотрудников">
</button>
`;

export class OpenEmployeeListPanelButton extends RenderingComponent {
  getElement() {
    if (this.element === null) {
      this.element = createElement(createTemplateForOpenEmployeeListButton());
    }
    return this.element;
  }
}
