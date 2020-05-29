import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForTrackOption = (track) => `
<option value="${track.name}">${track.name}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div>
  <input name="employeeZones" type="checkbox" value="${zone.id}" id="${zone.id}">
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createAddEmployeePanelTemplate = ({ tracks, zones }) => {
  const trackList = tracks.map((e) => {
    const unoccupiedTracks = [];
    if (e.empty) {
      unoccupiedTracks.push(createTemplateForTrackOption(e));
    }
    return unoccupiedTracks.join('');
  })
  const zonesList = zones.map((e) => createTemplateForZoneCheckbox(e)).join('');

  return `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-add-panel__body">

    <form class="employee-add-panel__form add-employee-form js-add-employee-form" action="" name="add-emp" method="GET">
    
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
      <select name="employeeTrack" class="add-track-container__select" id="add-track" required>
        <option class="js-add-tracks">Нет пути</option>
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
      <button type="button" class="footer-add__button-add-employee js-button-add-employee" title="Добавить работника">Добавить сотрудника</button>
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

    this.getElement().querySelector('.js-button-add-employee').addEventListener('click', handler);
  }

  checkRequiredFields() {
    const form = this.getElement().querySelector('.js-add-employee-form');
    if (form.employeeName.value !== '' && form.employeePosition.value !== '') {
      return true;
    }

    return false;
  }

  getInformationOfForm(nextId) {
    const form = this.getElement().querySelector('.js-add-employee-form');

    const permittedZones = [];
    const zones = form.elements.employeeZones;
    zones.forEach(zone => {
      if (zone.checked) {
        permittedZones.push(zone.id);
      }
    });

    return {
      id: nextId,
      trackId: form.employeeTrack.value,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZones: permittedZones,
    };
  }

  clearForm() {
    const form = this.getElement().querySelector('.js-add-employee-form');
    form.reset();
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
    this.setAddEmployeeButtonHandler(this.addEmployeeButtonHandler);
  }
}
