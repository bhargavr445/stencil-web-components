import { Component, EventEmitter, Prop, h, Event } from '@stencil/core';

@Component({
  tag: 'fepoc-drop-down-component',
  styleUrl: 'fepoc-drop-down-component.css',
  shadow: true,
})
export class FepocDropDownComponent {

  private id = 'fepocId';
  @Prop({ reflect: true }) options: any[];
  @Prop({ reflect: true }) displayprops: string[] = [];
  @Prop({ reflect: true }) placeholder?: string = 'Select';
  @Event() selectedOptionEvent: EventEmitter<any>;

  onOptionChange(event) {
    this.selectedOptionEvent.emit(this.getSelectedValue(event.target.value));
  }

  private getSelectedValue(selectedValue) {
    const selectedData = JSON.parse(selectedValue);
    const keys = Object.keys(selectedData);
    return keys.length === 1 && keys.includes(this.id) ? selectedData[this.id] : selectedData;
  }

  getValuesString(obj, defaultValue = '') {
    return this.displayprops.map(prop => (obj[prop] !== undefined ? obj[prop] : defaultValue)).join('-');
  }

  render() {
    return (
      <div class="drop-down-container">
        <div class="custom-select-container">
          <select id="customSelect" onChange={(e) => this.onOptionChange(e)}>
            {this.options?.map((option) =>
              <option value={this.displayprops.length > 0 ? JSON.stringify(option) : JSON.stringify({ [this.id]: option })}>
                {this.displayprops.length > 0 ? this.getValuesString(option) : option}
              </option>)}
          </select>
        </div>
      </div>
    );
  }

}
