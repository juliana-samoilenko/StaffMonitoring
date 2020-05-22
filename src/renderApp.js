import { Canvas } from './components/Canvas';
import { Notification } from './components/Notification';
import { OpenEmployeeListPanelButton } from './components/OpenEmployeeListPanelButton';
import { EmployeeListPanel } from './components/EmployeeListPanel';
import { AddEmployeePanel, createAddEmployeePanelTemplate } from './components/AddEmployeePanel';
import { EditEmployeePanel, createEditEmployeePanelTemplate } from './components/EditEmployeePanel';

const renderComponent = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template.render());
}

export const renderApp = () => {
  const rootContainer = document.querySelector('.js-work-display');
  const canvas = new Canvas();
  renderComponent(rootContainer, canvas);

  const violationInformation = [{ name: 'Миронов И.А', zone: 'Цех 1' }, { name: 'Петухов В.П.', zone: 'Высотные работы' }, { name: 'Лукин В.Р', zone: 'Цех 1' }];
  const notifications = new Notification(violationInformation);
  renderComponent(rootContainer, notifications);

  /*const openEmployeeListPanelButton = new OpenEmployeeListPanelButton();
  renderComponent(rootContainer, openEmployeeListPanelButton);*/

  const employeesList = [{ id: 1, name: 'Пиратов В.К.' }, { id:  2, name: 'Шиханов П.А.'}, { id: 3, name: 'Терёхин У.Л.' }];

  const employeeListPanel = new EmployeeListPanel(employeesList);
  renderComponent(rootContainer, employeeListPanel);

  function closePanel(e) {
    const elementForClose = e.currentTarget.parentNode.parentNode;
    elementForClose.remove();
  }

  const btnCls = document.querySelectorAll('.button-close');
  btnCls.forEach(btn => btn.addEventListener('click', closePanel));

  const tracks = [{ id: 1, name: 1, points: [{}, {}]}, { id: 3, name: 3, points: [{}, {}]}, { id: 4, name: 4, points: [{}, {}]}];
  const zones = [ { id: 1, name: 'Цех 1' }, { id: 2, name: 'Высотные работы' }, { id: 3, name: 'Цех 2' }, { id: 4, name: 'Напряжение' } ];
  const employee = {
    id: 1,
    trackId: 2,
    name: 'Пиратов В.К.',
    position: 'engineer',
    permittedZones: [{ id: 1, name: 'Цех 1' }, { id: 4, name: 'Напряжение' }],
  };
  
  const employeePanel = rootContainer.querySelector('.js-employee-information-panel');

  function openAddPanel() {
    const addEmployeePanel = new AddEmployeePanel({tracks, zones});
    renderComponent(employeePanel, addEmployeePanel);
  }
  
  const btnOpenAddPanel = document.querySelector('.footer-list__button-open-add');
  btnOpenAddPanel.addEventListener('click', openAddPanel);

  function openEditPanel() {
    const editEmployeePanel = new EditEmployeePanel({employee, tracks, zones, isChecked: false});
    renderComponent(employeePanel, editEmployeePanel);
  }

  const btnOpenEditPanel = document.querySelectorAll('.employee__button-open-edit');
  btnOpenEditPanel.forEach(btn => btn.addEventListener('click', openEditPanel));
}
