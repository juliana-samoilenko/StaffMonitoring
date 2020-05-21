const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template.trim();

  return div.firstChild;
}

export class Component {
  constructor(data) {
    this.element = null;
    this.data = data;
  }

  getElement(functionOfCreateTemplate) {
    if (this.element === null) {
      this.element = createElement(functionOfCreateTemplate(this.data));
    }
    return this.element;
  }

  render(functionOfCreateTemplate) {
    return this.getElement(functionOfCreateTemplate).outerHTML;
  }
}
