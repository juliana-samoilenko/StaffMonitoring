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

  rerender() {
    const oldElement = this.getElement();
    const container = oldElement.parentElement;
    
    this.element = null;

    const newElement = this.getElement();
    container.replaceChild(newElement, oldElement);
    
    this.recoveryEventListeners();
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
