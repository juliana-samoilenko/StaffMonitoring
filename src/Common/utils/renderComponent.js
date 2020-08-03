export const renderComponent = (node, component, position = 'beforeend') => {
  switch (position) {
    case 'afterbegin': {
      node.prepend(component.getElement());
      break;
    }

    case 'beforeend': {
      node.append(component.getElement());
      break;
    }

    default: {
      throw new Error(`Unknown position given ${position}`);
    }
  }
};
