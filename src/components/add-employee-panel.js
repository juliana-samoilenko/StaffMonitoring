const createTemplateForCloseButtonOfEmployeeAddPanel = () => `
<button class="employee-add-panel__button button-close" type="button" title="Закрыть">&#10006;</button>
`;

const createTemplateForAddEmployeeButton = () => `
<button type="button" class="footer-add__button-add-employee" title="Добавить работника">Добавить сотрудника</button>
`;

const createTracksList = (tracks) => `
<option value="${tracks.id}">${tracks.id}</option>
`;

const createZonesList = (zones) => `
<div>
  <input type="checkbox" id="zone${zones.id}">
  <label for="zone${zones.id}">${zones.name}</label>
</div>
`;

export const createTemplateOfAddEmployeeForm = (freeTracks, zones) => {
  const listOfFreeTraks = freeTracks.map((e) => createTracksList(e)).join('');
  const zonesList = zones.map((e) => createZonesList(e)).join('');

  return `
  <form class="employee-add-panel__form add-employee-form" action="" name="add-emp" method="GET">
    
      <div class="add-employee-form__name add-name-container">
        <label class="add-name-container__label" for="add-name">ФИО:</label>
        <input class="add-name-container__input" type="text" id="add-name" placeholder="Иванов И.И." autofocus
          required>
      </div>
      
      <div class="add-employee-form__position add-position-container">
        <label class="add-position-container__label" for="add-position">Должность:</label>
        <input class="add-position-container__input" type="text" id="add-position" placeholder="Техник"
          required>
      </div>
      
      <div class="add-employee-form__track add-track-container">
        <label class="add-track-container__label" for="add-track">Путь:</label>
        <select class="add-track-container__select" id="add-track" required>
          <option class="js-add-tracks">Выберите путь</option>
          ${listOfFreeTraks}
        </select>
      </div>
      
      <label>Доступные зоны:</label>
      <div class="add-employee-form__zone">
        <div class="add-zone-container">
          ${zonesList}
        </div>
      </div>
      </form>
  `;
};

export const createAddEmployeePanelTemplate = (form) => `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButtonOfEmployeeAddPanel()}
    </header>
  
    <div class="employee-add-panel__body">
      ${form}
    </div>
  
    <footer class="employee-add-panel__footer footer-add">
      ${createTemplateForAddEmployeeButton()}
    </footer>
  </div>
`;
