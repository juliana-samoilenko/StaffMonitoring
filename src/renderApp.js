import { createCanvasTemplate } from './components/canvas';

export const renderApp = () => {
  const mainContainer = document.querySelector('.js-work-display');
  render(mainContainer, createCanvasTemplate(), 'afterbegin');
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position,template);
}
