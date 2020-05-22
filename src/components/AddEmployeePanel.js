import { Component } from './Component';
import { createTemplateForCloseButton } from './CloseButton';

const createTemplateForTrackOption = (track) => `
<option value="${track.name}">${track.name}</option>
`;

const createTemplateForZoneCheckbox = (zone) => `
<div>
  <input type="checkbox" id="zone${zone.id}">
  <label for="zone${zone.id}">${zone.name}</label>
</div>
`;

export const createAddEmployeePanelTemplate = ({tracks, zones}) => {
  const trackList = tracks.map((e) => createTemplateForTrackOption(e)).join('');
  const zonesList = zones.map((e) => createTemplateForZoneCheckbox(e)).join('');

  return `
  <div class="employee-add-panel">
    <header class="employee-add-panel__header">
      ${createTemplateForCloseButton()}
    </header>
  
    <div class="employee-add-panel__body">

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
      <button type="button" class="footer-add__button-add-employee" title="Добавить работника">Добавить сотрудника</button>
    </footer>
  </div>
`;
}

export class AddEmployeePanel extends Component {
  getTemplate() {
    return createAddEmployeePanelTemplate(this.data);
  }
}
