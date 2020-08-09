import { Component } from '../Component';
import { createTemplateForCloseButton } from '../CloseButton';
import { cloneDeep } from '../../Common/utils/cloneDeep';

const markPermittedZones = (employee, zones) => {
  const { permittedZoneIds } = employee;

  const zonesWithPermittedStatus = cloneDeep(zones).map((zone) => ({
    ...zone,
    isPermitted: permittedZoneIds.includes(zone.id),
  }));

  return zonesWithPermittedStatus;
};

const createTemplateForTrackOption = (track = undefined) => `
<option value="${track ? track.id : ''}">${track ? track.name : 'Нет пути'}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input name="employeeZones" type="checkbox" id="${zone.id}" ${zone.isPermitted ? 'checked' : ''}>
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createEditEmployeePanelTemplate = ({
  employee = undefined,
  tracks,
  zones,
  isAwaitingConfirmation,
}) => {
  const unoccupiedTrackList = cloneDeep(tracks).filter((track) => {
    if (!track.isOccupied) {
      return track;
    }
  }).map(createTemplateForTrackOption);

  const currentTrack = employee
    ? cloneDeep(tracks).find((track) => track.id === employee.trackId)
    : null;
  const emptyTrack = createTemplateForTrackOption();

  const baseTrack = currentTrack ? [
    createTemplateForTrackOption(currentTrack),
    emptyTrack,
  ] : [
    emptyTrack,
  ];

  const trackList = [...baseTrack, ...unoccupiedTrackList];

  const zonesWithPermittedStatus = employee
    ? markPermittedZones(employee, zones)
    : cloneDeep(zones).map((zone) => ({ ...zone, isPermitted: false }));
  const zonesList = zonesWithPermittedStatus.map((zone) => createTemplateForZoneCheckbox(zone)).join('');

  return `
  <div class="employee-edit-panel">
    <header class="employee-edit-panel__header">
      ${createTemplateForCloseButton()}
    </header>

    <div class="employee-edit-panel__body">
      <form id="edit-form" class="employee-edit-panel__form edit-employee-form js-edit-employee-form" action="" name="edit-emp" method="GET">

      <div class="edit-employee-form__name edit-name-container">
        <label class="edit-name-container__label" for="add-name">ФИО:</label>
        <input name="employeeName" value="${employee ? employee.name : ''}" class="edit-name-container__input" type="text" autofocus required>
      </div>

      <div class="edit-employee-form__position edit-positision-container">
        <label class="edit-positision-container__label" for="edit-name">Должность:</label>
        <input name="employeePosition" class="edit-positision-container__input" type="text" value=${employee ? employee.position : ''} required>
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
        ${isAwaitingConfirmation ? (`
        <div class="default-action-container js-default-buttons">
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
        `) : (`
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
        `)}
      </footer>
      </div>
    </form>
    </div>
  </div>
`;
};

export class EditEmployeePanelView extends Component {
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

    if (!this.getElement().querySelector('.js-button-remove-emp')) {
      return;
    }

    this.getElement().querySelector('.js-button-remove-emp').addEventListener('click', handler);
  }

  setAcceptRemovalButtonHandler(handler) {
    this.acceptRemovalButtonHandler = handler;

    if (!this.getElement().querySelector('.js-button-remove-yes')) {
      return;
    }

    this.getElement().querySelector('.js-button-remove-yes').addEventListener('click', handler);
  }

  setRejectRemovalButtonHandler(handler) {
    this.rejectRemovalButtonHandler = handler;

    if (!this.getElement().querySelector('.js-button-remove-no')) {
      return;
    }

    this.getElement().querySelector('.js-button-remove-no').addEventListener('click', handler);
  }

  getForm() {
    return this.getElement().querySelector('#edit-form');
  }

  getEditableEmployeeInformation(employeeId) {
    const form = this.getForm();

    const zoneCheckboxes = Array.from(form.elements.employeeZones);
    const permittedZoneIds = zoneCheckboxes.filter(
      (zoneCheckbox) => zoneCheckbox.checked,
    ).map((zoneCheckbox) => Number(zoneCheckbox.id));
    const trackId = Number(form.employeeTrack.value);

    return {
      id: employeeId,
      trackId: trackId || null,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZoneIds,
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
}
