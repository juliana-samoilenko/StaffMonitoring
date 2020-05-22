import { Component } from './Component';

const createCanvasTemplate = () =>`
  <canvas class="work-display__plan js-building-canvas">
  </canvas>
`;

export class Canvas extends Component {
  getTemplate() {
    return createCanvasTemplate(this.data);
  }
}
