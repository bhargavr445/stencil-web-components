import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'gbr-pagination',
  styleUrl: 'gbr-pagination.css',
  shadow: true,
})
export class GbrPagination {
  @Prop({reflect: true}) datalist: any[] = [];
  @Prop() pagesize: number = 10;
  @Event() paginatedlisthandler: EventEmitter<any[]>;
  @State() paginatedList: any[] = [];
  @State() pageNumber: number = 0;
  @State() disableFirstPage: boolean = false;
  @State() disableLastPage: boolean = false;
  @State() displayRecordsRange: string = '';

  
  @Watch('datalist')
  onDataListChange() {    
    this.onFirstClick();
  }

  componentWillLoad() {    
    this.onFirstClick();
  }

  componentDidUpdate() {    
    this.sendDataToTableComponent();
  }

  onFirstClick() {    
    const endingNumber = this.checkIfDataListIsGreaterThanRequiredSize(this.pagesize) ? this.pagesize : this.datalist.length;
    this.setPaginatedRecords(0, endingNumber);
    this.setDisplayRangeText(0, endingNumber);
    this.pageNumber = 1;
    endingNumber === this.datalist.length ? this.disableLastPage = true : this.disableLastPage = false;
    this.disableFirstPage = true;
    this.sendDataToTableComponent();
  }

  onPreviousClick() {
    const beginningNumber = ((this.pageNumber - 1) * this.pagesize) - this.pagesize;
    const endingNumber = (this.pageNumber - 1) * this.pagesize;
    this.setPaginatedRecords(beginningNumber, endingNumber);
    this.setDisplayRangeText(beginningNumber, endingNumber);
    this.pageNumber--;
    if (beginningNumber === 0) this.disableFirstPage = true;
    this.disableLastPage = false;
    this.sendDataToTableComponent();
  }

  onNextClick() {
    const beginningNumber = (this.pageNumber * this.pagesize);
    const endingNumber = this.checkIfDataListIsGreaterThanRequiredSize(beginningNumber + this.pagesize) ? (beginningNumber + this.pagesize) : this.datalist.length;
    this.setPaginatedRecords(beginningNumber, endingNumber);
    this.setDisplayRangeText(beginningNumber, endingNumber);
    this.pageNumber++;
    this.disableLastPage = !this.checkIfDataListIsGreaterThanRequiredSize(beginningNumber + this.pagesize);
    this.disableFirstPage = false;
    this.sendDataToTableComponent();
  }

  onLastClick() {
    const lastPageNumber = Math.ceil(this.datalist.length / this.pagesize);
    const beginningNumber = (lastPageNumber - 1) * this.pagesize;
    const endingNumber = this.datalist.length;
    this.setPaginatedRecords(beginningNumber, endingNumber);
    this.setDisplayRangeText(beginningNumber, endingNumber);
    this.pageNumber = lastPageNumber;
    this.disableFirstPage = false;
    this.disableLastPage = true;
    this.sendDataToTableComponent();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log('ENTER');
      const previousPageNumber = this.pageNumber;
      const goToPageNumber = Number(event.target.value);

      if (goToPageNumber > 0 && goToPageNumber <= Math.ceil(this.datalist.length / this.pagesize)) {
        console.log('Proceed');
        
        const beginningNumber = (goToPageNumber - 1) * this.pagesize;
        const endingNumber = beginningNumber + this.pagesize;

        this.setPaginatedRecords(beginningNumber, endingNumber);
        this.setDisplayRangeText(beginningNumber, endingNumber);
        this.pageNumber = goToPageNumber;
        this.disableLastPage = !this.checkIfDataListIsGreaterThanRequiredSize(endingNumber);
        this.disableFirstPage = goToPageNumber === 1;
        this.sendDataToTableComponent();
      } else {
        console.log('Dont Proceed');
        console.log(previousPageNumber);
        event.preventDefault();
        event.target.value = previousPageNumber
        this.pageNumber = previousPageNumber;
        console.log(this.pageNumber);
      }
    } else {
      console.log('Not Enter');
      
    }

  }

  setDisplayRangeText(beginningNumber: number, endingNumber: number) {
    this.displayRecordsRange = `${beginningNumber + 1} - ${endingNumber}`;
  }

  setPaginatedRecords(beginningNumber: number, endingNumber: number) {
    this.paginatedList = JSON.parse(JSON.stringify(this.datalist)).slice(beginningNumber, endingNumber);
  }

  private checkIfDataListIsGreaterThanRequiredSize(lengthValueToCheck): boolean {    
    
    return this.datalist.length > lengthValueToCheck;
  }

  sendDataToTableComponent() {
      this.paginatedlisthandler.emit(this.paginatedList);
  }

  render() {
    const originalNumber = this.datalist.length / this.pagesize;
    const roundedNumber = Math.ceil(originalNumber);

    return (
      <div>
        <button id='firstButton' class="table-btn mat-h-20" disabled={this.disableFirstPage} onClick={() => this.onFirstClick()}>first</button>
        <button id='previousButton' class="table-btn mat-h-20" disabled={this.disableFirstPage} onClick={() => this.onPreviousClick()}>previous</button>
        {/* <span class="paging-info">&nbsp; {this.displayRecordsRange} of {this.datalist.length} Records,  Page </span> */}
        <span>&nbsp;Page&nbsp;</span> 
        <input type="number" class="paging-input" value={this.pageNumber} onKeyPress={(event) => this.handleKeyPress(event)} /> &nbsp; of {roundedNumber}
        <button id='nextButton' class="table-btn mat-h-20" disabled={this.disableLastPage} onClick={() => this.onNextClick()}>next</button>
        <button id='lastButton' class="table-btn mat-h-20" disabled={this.disableLastPage} onClick={() => this.onLastClick()}>last</button>
      </div>
    );
  }
}

