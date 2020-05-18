const createTemplateForCloseButton = () => `
<button class="employee-add-panel__button button-close" type="button" title="Закрыть">&#10006;</button>
`;

const createTemplateForAddEmployeeButton = () => `
<button type="button" class="footer-add__button-add-employee" title="Добавить работника">Добавить сотрудника</button>
`;

const createTrackOptionTemplate = (track) => `
<option value="${track.name}">${track.name}</option>
`;

const createZoneCheckboxTemplate = (zone) => `
<div>
  <input type="checkbox" id="zone${zone.id}">
  <label for="zone${zone.id}">${zone.name}</label>
</div>
`;

export const createTemplateForAddEmployeeForm = (freeTracks, zones) => {
  const freeTracksTemplate = freeTracks.map((e) => createTrackOptionTemplate(e)).join('');
  const zonesTemplate = zones.map((e) => createZoneCheckboxTemplate(e)).join('');

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
          ${freeTracksTemplate}
        </select>
      </div>
      
      <label>Доступные зоны:</label>
      <div class="add-employee-form__zone">
        <div class="add-zone-container">
          ${zonesTemplate}
        </div>
      </div>
      </form>
  `;
};

export const createAddEmployeePanelTemplate = (form) => `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-add-panel__body">
      ${form}
    </div>
  
    <footer class="employee-add-panel__footer footer-add">
      ${createTemplateForAddEmployeeButton()}
    </footer>
  </div>
`;
