import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const markPermittedZones = (employee, zones) => {
  const permittedZones = employee.permittedZones;
  const sortedZones = JSON.parse(JSON.stringify(zones));
  permittedZones.map((permittedZone) => {
    sortedZones.map((sortedZone)=> {
      if (permittedZone == sortedZone.id) {
        sortedZone.permitted = true;
      }
    })
  })
  return sortedZones;
}

const createTemplateForUnoccupiedTrackOptions = (track) => `
<option value="${track.id}">${track.id}</option>
`;

const createTemplateForOccupiedTrackOption = (trackName) => `
<option value="${trackName}">${trackName}</option>
`;

const createTemplateForPermittedZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input name="employeeZones" type="checkbox" id="${zone.id}" checked>
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createTemplateForUnpermittedZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input name="employeeZones" type="checkbox" id="${zone.id}">
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createEditEmployeePanelTemplate = ({ employee, tracks, zones }) => {
  const trackList = [];
  if (employee.trackId === null)  {
    trackList.push(createTemplateForOccupiedTrackOption('Нет пути'));
   }
   else {
    trackList.push(createTemplateForOccupiedTrackOption(employee.trackId));
    trackList.push(createTemplateForOccupiedTrackOption('Нет пути'));
   }

  tracks.map((track) => {
    if (track.empty) {
      trackList.push(createTemplateForUnoccupiedTrackOptions(track));
    }
    return trackList;
  });

  const zonesList = [];
  const sortedZones = markPermittedZones(employee, zones);
  sortedZones.map((zone) => {
    if (zone.permitted) {
      zonesList.push(createTemplateForPermittedZoneCheckbox(zone));
    }
    else {
      zonesList.push(createTemplateForUnpermittedZoneCheckbox(zone));
    }
  })

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
        <select name="employeeTrack" class="edit-track-container__select" required>
          ${trackList.join('')}
        </select>
      </div>
      
        <label>Доступные зоны:</label>
          <div class="edit-employee-form__zone">
            ${zonesList.join('')}
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
    form.addEventListener('submit', (event) => handler(event));
  }

  setConfirmationButtonRemoveEmployeeHandler(handler) {
    this.removeEmployeeButtonHandler = handler;

    this.getElement().querySelector('.js-button-remove-emp').addEventListener('click', handler);
  }

  setAcceptRemovalButtonHandler(handler) {
    this.acceptRemovalButton = handler;

    this.getElement().querySelector('.js-button-remove-yes').addEventListener('click', handler);
  }

  setRejectRemovalButtonHandler(handler) {
    this.rejectRemovalButton = handler;

    this.getElement().querySelector('.js-button-remove-no').addEventListener('click', handler);
  }

  getForm() {
    return this.getElement().querySelector('#edit-form');
  }

  getInformationOfForm(employeeId) {
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
      id: employeeId,
      trackId: (form.employeeTrack.value === "Нет пути") ? null : convertedTrackNumber,
      name: form.employeeName.value,
      position: form.employeePosition.value,
      permittedZones: permittedZones,
    };
  }

  recoveryEventListeners() {
    this.setCloseButtonHandler(this.closeButtonHandler);
    this.setSaveChangeButtonHandler(this.saveChangeButtonHandler);
    this.setConfirmationButtonRemoveEmployeeHandler(this.removeEmployeeButtonHandler);
    this.setRejectRemovalButton(this.rejectRemovalButton);
    this.setAcceptRemovalButton(this.acceptRemovalButton);
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
