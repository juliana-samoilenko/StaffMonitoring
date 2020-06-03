import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';
import { cloneDeep } from '../renderApp';

const markPermittedZones = (employee, zones) => {
  const permittedZones = employee.permittedZoneIds.map(zone => Number(zone));
  const zonesWithPermittedStatus = cloneDeep(zones).map((zone) => {
    zone.permitted = permittedZones.includes(zone.id);

    return zone;
  });

  return zonesWithPermittedStatus;
}

const createTemplateForTrackOption = (track = undefined) => `
<option value="${track ? track.id : ''}">${track ? track.name : 'Нет пути'}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input name="employeeZones" type="checkbox" id="${zone.id}" ${zone.permitted ? 'checked' : ''}>
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createEditEmployeePanelTemplate = ({ employee, tracks, zones }) => {
  const upoccupiedTrackList = cloneDeep(tracks).filter(track => {
    if (track.empty && track.empty !== undefined) {
      return track;
    }
  }).map(createTemplateForTrackOption);
  const currentTrack = cloneDeep(tracks).filter(track => {
    if (track.id == employee.trackId) {
      return track;
    }
  }).map(createTemplateForTrackOption);
  const emptyTrack = currentTrack ? createTemplateForTrackOption() : null;
  
  const trackList = [currentTrack, emptyTrack, ...upoccupiedTrackList];

  const zonesWithPermittedStatus = markPermittedZones(employee, zones);
  const zonesList = zonesWithPermittedStatus.map(zone => createTemplateForZoneCheckbox(zone)).join('');

  return `
  <div class="employee-edit-panel">
    <header class="employee-edit-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-edit-panel__body">
      <form id="edit-form" class="employee-edit-panel__form edit-employee-form js-edit-employee-form" action="" name="edit-emp" method="GET">
        
      <div class="edit-employee-form__name edit-name-container">
        <label class="edit-name-container__label" for="add-name">ФИО:</label>
        <input name="employeeName" value="${employee.name}" class="edit-name-container__input" type="text" autofocus required>
      </div>
      
      <div class="edit-employee-form__position edit-positision-container">
        <label class="edit-positision-container__label" for="edit-name">Должность:</label>
        <input name="employeePosition" class="edit-positision-container__input" type="text" value=${employee.position} required>
      </div>
      
      <div class="edit-employee-form__track edit-track-container">
        <label class="edit-track-container__label" for="edit-track">Путь:</label>
        <select name="employeeTrack" class="edit-track-container__select">
          ${trackList}
        </select>
      </div>
      
        <label>Доступные зоны:</label>
          <div class="edit-employee-form__zone">
            ${zonesList}
          </div>
      <div class="employee-edit-panel__footer footer-edit">
      <footer class="footer-edit__edit-button-group">
        <div class="removal-сonfirmation-container js-removal-buttons">
          <div class="removal-button-group">
            <button class="button button-save-change" type="submit" title="Сохранить изменения">
              Сохранить изменения
            </button>
            <button class="button button-remove-emp js-button-remove-emp" type="button" title="Удалить сотрудника">
              Удалить сотрудника
            </button>
          </div>
        </div>
        <div class="default-action-container js-default-buttons u-hidden">
          <p class="footer-edit__question">Вы уверены, что хотите удалить сотрудника?</p>
          <div class="default-button-group">
            <button class="button button-remove-yes js-button-remove-yes" type="button" title="Да">
              Да
            </button>
            <button class="button button-remove-no js-button-remove-no" type="button" title="Нет">
              Нет
            </button>
          </div>
        </div>
      </footer>
      </div> 
    </form>
    </div>
  </div>
`;
}

export class EditEmployeePanel extends Component {
  getTemplate() {
    return createEditEmployeePanelTemplate(this.data);
  }

  setCloseButtonHandler(handler) {
    this.closeButtonHandler = handler;

    this.getElement().querySelector('.js-btn-close').addEventListener('click', handler);
  }

  setSaveChangeButtonHandler(handler) {
    this.saveChangeButtonHandler = handler;

    const form = this.getForm();
    form.addEventListener('submit', handler);
  }

  setConfirmationButtonRemoveEmployeeHandler(handler) {
    this.removeEmployeeButtonHandler = handler;

    this.getElement().querySelector('.js-button-remove-emp').addEventListener('click', handler);
  }

  setAcceptRemovalButtonHandler(handler) {
    this.acceptRemovalButtonHandler = handler;

    this.getElement().querySelector('.js-button-remove-yes').addEventListener('click', handler);
  }

  setRejectRemovalButtonHandler(handler) {
    this.rejectRemovalButtonHandler = handler;

    this.getElement().querySelector('.js-button-remove-no').addEventListener('click', handler);
  }

  getForm() {
    return this.getElement().querySelector('#edit-form');
  }

  getInformationOfForm(employeeId) {
    const form = this.getForm();
    
    const zones = Array.from(form.elements.employeeZones);
    const permittedZoneIds = zones.filter(zone => zone.checked).map(zone => zone.id);
    const trackId = Number(form.employeeTrack.value);

    return {
      id: employeeId,
      trackId: trackId ? trackId : null,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZoneIds: permittedZoneIds,
    };
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
    this.setSaveChangeButtonHandler(this.saveChangeButtonHandler);
    this.setConfirmationButtonRemoveEmployeeHandler(this.removeEmployeeButtonHandler);
    this.setRejectRemovalButtonHandler(this.rejectRemovalButtonHandler);
    this.setAcceptRemovalButtonHandler(this.acceptRemovalButtonHandler);
  }

  clearForm() {
    const form = this.getForm();
    form.reset();
  }

  changeState(isChecked) {
    const removalButtonGroup = document.querySelector('.js-removal-buttons');
    const defaultButtonGroup = document.querySelector('.js-default-buttons');
  
    if (isChecked) {
      removalButtonGroup.classList.add('u-hidden');
      defaultButtonGroup.classList.remove('u-hidden');
    }
    else {
      defaultButtonGroup.classList.add('u-hidden');
      removalButtonGroup.classList.remove('u-hidden');
    }
  };
}
