import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForUnoccupiedTrackOption = (track) => `
<option value="${track.name}">${track.name}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div>
  <input name="employeeZones" type="checkbox" value="${zone.id}" id="${zone.id}">
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createAddEmployeePanelTemplate = ({ tracks, zones }) => {
  const trackList = tracks.filter(track => track.empty).map(createTemplateForUnoccupiedTrackOption).join('');
  const zonesList = zones.map((zone) => createTemplateForZoneCheckbox(zone)).join('');

  return `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-add-panel__body">

    <form id="add-form" class="employee-add-panel__form add-employee-form" action="" name="add-emp" method="GET">
    
    <div class="add-employee-form__name add-name-container">
      <label class="add-name-container__label" for="add-name">ФИО:<span class="required-field">*</span></label>
      <input name="employeeName" class="add-name-container__input" type="text" id="add-name" placeholder="Иванов И.И." title="Введите ФИО сотрудника" 
        autofocus
        required>
    </div>
    
    <div class="add-employee-form__position add-position-container">
      <label class="add-position-container__label" for="add-position">Должность:<span class="required-field">*</span></label>
      <input name="employeePosition" class="add-position-container__input" type="text" id="add-position" placeholder="Техник" title="Введите должность сотрудника"
        required>
    </div>
    
    <div class="add-employee-form__track add-track-container">
      <label class="add-track-container__label" for="add-track">Путь:</label>
      <select name="employeeTrack" class="add-track-container__select" id="add-track">
        <option class="js-add-tracks" value="">Нет пути</option>
        ${trackList}
      </select>
    </div>
    
    <label>Доступные зоны:</label>
    <div class="add-employee-form__zone">
      <div class="add-zone-container">
        ${zonesList}
      </div>
    </div>
    
    <footer class="employee-add-panel__footer footer-add">
      <button type="submit" class="footer-add__button-add-employee js-button-add-employee" title="Добавить работника">Добавить сотрудника</button>
    </footer>
    </div>
    </form>
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

    const form = this.getForm();
    form.addEventListener('submit', handler);
  }

  checkRequiredFields() {
    const form = this.getForm();
    if (form.employeeName.value !== '' && form.employeePosition.value !== '') {
      return true;
    }

    return false;
  }

  getForm() {
    return this.getElement().querySelector('#add-form');
  }

  getInformationOfForm(nextId) {
    const form = this.getForm();

    const permittedZones = [];
    const zones = form.elements.employeeZones;
    zones.forEach(zone => {
      if (zone.checked) {
        permittedZones.push(zone.id);
      }
    });
    const convertedTrackNumber = Number(form.employeeTrack.value);
    
    return {
      id: nextId,
      trackId: form.employeeTrack.value ? convertedTrackNumber : null,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZones: permittedZones,
    };
  }

  clearForm() {
    const form = this.getForm();
    form.reset();
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
    this.setAddEmployeeButtonHandler(this.addEmployeeButtonHandler);
  }
}
