export class RenderingComponent {
  constructor(data) {
    this.element = null;
    this.data = data;
  }

  getElement() {
    throw new Error('Implement method \'getElement\' in your derived class!');
  }

  render() {
    return this.getElement().outerHTML;
  }
}

export const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template.trim();

  return div.firstChild;
}
