import { LightningElement, track } from 'lwc';

export default class BookingParent extends LightningElement {
@track showListView = true;
@track showRecordView = false;
selectedRecordId;

handleRecordSelect(event) {
this.selectedRecordId = event.detail;
this.showListView = false;
this.showRecordView = true;
}
}