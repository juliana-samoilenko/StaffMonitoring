import { Component, createElement } from './Component';

const createCanvasTemplate = () =>`
  <canvas class="work-display__plan js-building-canvas">
  </canvas>
`;

export class Canvas extends Component {
  getElement() {
    if (this.element === null) {
      this.element = createElement(createCanvasTemplate());
    }
    return this.element;
  }
}
