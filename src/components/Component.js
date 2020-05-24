const createElement = (template) => {
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

  hide() {
    this.getElement().classList.add('u-hidden');
  }

  show() {
    this.getElement().classList.remove('u-hidden');
  }
}
