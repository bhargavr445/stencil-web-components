import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fepoc-tooltip',
  styleUrl: './tooltip-component.css',
  scoped: true
})
export class TooltipComponent {

  @Prop({ reflect: true, mutable: true }) displayText: string = 'Bhargav Reddy Guntaka';
  @Prop({ reflect: true }) HoverText: string;
  @Prop({ reflect: true }) hoverLength: number = 6;

  // checkIfStringIsGraterThanHoverLength() {
  //   console.log('exec...');
  //   return `${this.displayText.substring(0, this.hoverLength)}...`
  // }

  render() {

    return (
      <div>
        <span class="tooltip">{this.displayText}
          <span class="tooltiptext">Tooltip text</span>
        </span>
      </div>
    )
  }
}
