export const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template.trim();

  return div.firstChild;
};

export class Component {
  constructor(data) {
    this.element = null;
    this.data = data;
  }

  getElement() {
    if (this.element === null) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  render() {
    return this.getElement().outerHTML;
  }
}
