import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForTrackOption = (track) => `
<option value="${track.id}">${track.id}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div>
  <input name="employeeZones" type="checkbox" value="${zone.name}" id="zone${zone.id}">
  <label for="zone${zone.id}">${zone.name}</label>
</div>
`;

const createAddEmployeePanelTemplate = ({ tracks, zones }) => {
  const trackList = tracks.map((e) => createTemplateForTrackOption(e)).join('');
  const zonesList = zones.map((e) => createTemplateForZoneCheckbox(e)).join('');

  return `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-add-panel__body">

    <form class="employee-add-panel__form add-employee-form js-add-employee-form" action="" name="add-emp" method="GET">
    
    <div class="add-employee-form__name add-name-container">
      <label class="add-name-container__label" for="add-name">ФИО:</label>
      <input name="employeeName" class="add-name-container__input" type="text" id="add-name" placeholder="Иванов И.И." autofocus
        required>
    </div>
    
    <div class="add-employee-form__position add-position-container">
      <label class="add-position-container__label" for="add-position">Должность:</label>
      <input name="employeePosition" class="add-position-container__input" type="text" id="add-position" placeholder="Техник"
        required>
    </div>
    
    <div class="add-employee-form__track add-track-container">
      <label class="add-track-container__label" for="add-track">Путь:</label>
      <select name="employeeTrack" class="add-track-container__select" id="add-track" required>
        <option class="js-add-tracks">Выберите путь</option>
        ${trackList}
      </select>
    </div>
    
    <label>Доступные зоны:</label>
    <div class="add-employee-form__zone">
      <div class="add-zone-container">
        ${zonesList}
      </div>
    </div>
    </form>

    </div>
  
    <footer class="employee-add-panel__footer footer-add">
      <button type="button" class="footer-add__button-add-employee js-button-add-employee" title="Добавить работника">Добавить сотрудника</button>
    </footer>
  </div>
`;
}

export class AddEmployeePanel extends Component {
  getTemplate() {
    return createAddEmployeePanelTemplate(this.data);
  }

  setCloseButtonHandler(handler) {
    this.closeButtonHandler = handler;

    this.getElement().querySelector('.js-btn-close').addEventListener('click', handler);
  }

  setAddEmployeeButtonHandler(handler) {
    this.addEmployeeButtonHandler = handler;

    this.getElement().querySelector('.js-button-add-employee').addEventListener('click', handler);
  }

  getInformationOfForm() {
    const form = this.getElement().querySelector('.js-add-employee-form');
    const permittedZones = [];
    const zones = form.elements.employeeZones;
    zones.forEach(zone => {
      if (zone.checked) {
        permittedZones.push({ name: zone.value });
      }
    });
    return {
      id: 0,
      trackId: form.employeeTrack.value,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZones: permittedZones,
    };
  }

  clearFormHandler() {
    const form = this.getElement().querySelector('.js-add-employee-form');
    form.reset();
  }
}
