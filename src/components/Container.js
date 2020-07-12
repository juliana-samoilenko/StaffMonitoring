export class Container {
  constructor() {
    this.component = null;
  }

  setState() {
    throw new Error();
  }

  getTemplate() {
    throw new Error();
  }

  getElement() {
    throw new Error();
  }
}
