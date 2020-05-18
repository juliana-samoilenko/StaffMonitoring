const createTemplateForCurrentFreeTrackOption = (track) => `
<option value="${track.id}">${track.id}</option>
`;

const createTemplateForCurrentPermittedZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input type="checkbox" id="${zone.id}" checked>
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createTemplateForCurrentUnpermittedZoneCheckbox = (zone) => `
<div class="edit-zone-container">
  <input type="checkbox" id="${zone.id}">
  <label for="${zone.id}">${zone.name}</label>
</div>
`;

const createTemplateForButtonSaveChanges = () => `
<button class="button button-save-change" type="button" title="Сохранить изменения">
  Сохранить изменения
</button>
`;

const createTemplateForButtonRemoveEmployee = () => `
<button class="button button-remove-emp" type="button" title="Удалить сотрудника">
  Удалить сотрудника
</button>
`;

const createTemplateForAcceptRemovalButton = () => `
<button class="button button-remove-yes" type="button" title="Да">
  Да
</button>
`;

const createTemplateForRejectRemovalButton = () =>`
<button class="button button-remove-no" type="button" title="Нет">
  Нет
</button>
`;

const createTemplateForQuestionRemoveEmployee = () => `
<p class="footer-edit__question">Вы уверены, что хотите удалить сотрудника?</p>
`;

export const createTemplateForEditEmployeeForm = (employee, freeTracks, freeZones) => {
  const listOfFreeTraks = freeTracks.map(e => createTemplateForCurrentFreeTrackOption(e)).join('');
  const currentPermittedZones = employee.accessibleZones.map(e => createTemplateForCurrentPermittedZoneCheckbox(e)).join('');
  const unpermittedZones = freeZones.map(e => createTemplateForCurrentUnpermittedZoneCheckbox(e)).join('');

  return `
  <form class="employee-edit-panel__form edit-employee-form" action="" name="edit-emp" method="GET">
    
    <div class="edit-employee-form__name edit-name-container">
      <label class="edit-name-container__label" for="add-name">ФИО:</label>
      <input value="${employee.name}" class="edit-name-container__input" type="text" autofocus required>
    </div>
    
    <div class="edit-employee-form__position edit-positision-container">
      <label class="edit-positision-container__label" for="edit-name">Должность:</label>
      <input class="edit-positision-container__input" type="text" value=${employee.position} required>
    </div>
    
    <div class="edit-employee-form__track edit-track-container">
      <label class="edit-track-container__label" for="edit-track">Путь:</label>
      <select name="track" class="edit-track-container__select" required>
        <option>${employee.trackId}</option>
        <option value="Нет пути">Нет пути</option>
        ${listOfFreeTraks}
      </select>
    </div>
    
      <label>Доступные зоны:</label>
        <div class="edit-employee-form__zone">
          ${currentPermittedZones}
          ${unpermittedZones}
        </div>
        </div>
    <div class="employee-edit-panel__footer footer-edit">

        ${createTemplateForQuestionRemoveEmployee()}

      <footer class="footer-edit__edit-button-group">
      
        ${createTemplateForAcceptRemovalButton()}
        ${createTemplateForRejectRemovalButton()}
        
      <!--  
        ${createTemplateForButtonSaveChanges()}
        ${createTemplateForButtonRemoveEmployee()}
      -->
      </footer>
    </div> 
  </form>
  `;
}

export const createEditEmployeePanelTemplate = (form) => `
  <div class="employee-edit-panel">
  
  <header class="employee-edit-panel__header">
    <button type="button" class="employee-edit-panel__button button-close" title="Закрыть">&#10006;</button>
  </header>
  
  <div class="employee-edit-panel__body">
    ${form}
  </div>
`;
