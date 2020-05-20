import { RenderingComponent, createElement } from './RenderingComponent';

const createCanvasTemplate = () =>`
  <canvas class="work-display__plan js-building-canvas">
  </canvas>
`;

export class Canvas extends RenderingComponent {
  getElement() {
    if (this.element === null) {
      this.element = createElement(createCanvasTemplate());
    }
    return this.element;
  }
}
