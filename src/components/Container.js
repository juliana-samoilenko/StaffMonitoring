export class Container {
  constructor() {
    this.component = null;
  }

  getTemplate() {
    return this.component.getTemplate();
  }

  getElement() {
    return this.component.getElement();
  }

  show() {
    return this.component.show();
  }
}
