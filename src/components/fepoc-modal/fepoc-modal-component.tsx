import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fepoc-modal',
  styleUrl: './fepoc-modal-component.css',
  scoped: true
})
export class ModalPopupComponent {

  // @State() showModal: boolean = false;
  // @Event() closeType: EventEmitter;
  // labels = {
  //   headerLabel: '',
  //   content: '',
  //   primaryButton: '',
  //   secondaryButton: ''
  // }

  // constructor() {
  //   setTimeout(() => {this.showModal = true}, 3000);
  //   this.open('Confirmation', 'Are you sure, do you want to delete this permanently ?', 'Cancel1', 'Confirm', true, '');

  // }


  // @Method()
  // open(headerLabel: string, content: string, primaryButton: string, secondaryButton: string, openModal: boolean, closeModalType: string): Promise<void | boolean> {
  //   this.labels.headerLabel = headerLabel;
  //   this.labels.content = content;
  //   this.labels.primaryButton = primaryButton;
  //   this.labels.secondaryButton = secondaryButton;
  //   if (openModal) {
  //     return new Promise<void>((resolve, _) => {
  //       resolve()
  //     })
  //   } else {
  //     return new Promise((resolve, _) => {
  //       return resolve(closeModalType === 'cancel');
  //     })
  //   }
  // }

  // onButtonsClick(clickType: string): void {
  //   this.showModal = false;
  //   this.closeType.emit(clickType);
  //   this.open('Confirmation', 'Are you sure, do you want to delete this permanently ?', 'Cancel1', 'Confirm', false, clickType);
  // }

  // render() {
  //   let popup = null;
  //   if (this.showModal) {
  //     popup = (
  //       <div id="fepoc-modal" class="modal">
  //         <div class="modal-content">
  //           <span class="close">&times;</span>
  //           <h2>{this.labels.headerLabel}</h2>
  //           <p>{this.labels.content}</p>
  //           <div class="modal-footer">
  //             <button class="btn cancel" onClick={() => this.onButtonsClick('cancel')} >{this.labels.primaryButton}</button>
  //             <button class="btn confirm" onClick={() => this.onButtonsClick('confirm')}>{this.labels.secondaryButton}</button>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  //   return popup;
  // }

  @Prop({ reflect: true, mutable: true }) open: string;
  @Prop({ reflect: true }) header: string;
  @Prop({ reflect: true }) content: string;
  @Prop({ reflect: true }) primarybutton: string;
  @Prop({ reflect: true }) secondarybutton: string;
  @Event() closeType: EventEmitter<string>;

  onButtonsClick(clickType: string): void {
    this.open = 'c';    
    this.closeType.emit(clickType);
  }


  render() {
    const buttons = this.primarybutton && this.secondarybutton ? <div class="modal-footer">
    <button class="btn cancel" onClick={() => this.onButtonsClick('cancel')} >{this.primarybutton}</button>
    <button class="btn confirm" onClick={() => this.onButtonsClick('confirm')}>{this.secondarybutton}</button>
  </div> : <div class="modal-footer">
    <button class="btn confirm" onClick={() => this.onButtonsClick('confirm')}>{this.secondarybutton}</button>
  </div>
    let openType = (
      <div id="fepoc-modal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => this.onButtonsClick('x')}>&times;</span>
          <h2>{this.header}</h2>
          <div class="content-section">{this.content}</div>
          {buttons}
        </div>
      </div>
    );
    let closeType = '';
    return <div>{this.open === 'o' ? openType : closeType}</div>
  }
}


