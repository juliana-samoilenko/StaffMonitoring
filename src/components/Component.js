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

  setState(nextData) {
    const previousData = this.data;
    this.data = { ...previousData, ...nextData };
    
    this.rerender();
  }

  rerender() {
    const oldElement = this.getElement();
    const container = oldElement.parentElement;
    
    this.removeElement();

    const newElement = this.getElement();
    container.replaceChild(newElement, oldElement);
    
    this.recoveryEventListeners();
  }
  
  removeElement() {
    this.element = null;
  }

  recoveryEventListeners() {
    throw new Error('Implement in the derived class');
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

  isComponentShown() {
    return !this.getElement().classList.contains('u-hidden');
  }
}
