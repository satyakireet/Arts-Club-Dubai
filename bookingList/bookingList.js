// import { LightningElement, wire } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
// import getBookings from '@salesforce/apex/customBookingRecord.getBookings';

// export default class BookingList extends NavigationMixin(LightningElement) {
//     @wire(getBookings)
//     bookings;

//     handleBookingClick(event) {
//         const bookingId = event.currentTarget.dataset.id;
//         this[NavigationMixin.Navigate]({
//             type: 'standard__recordPage',
//             attributes: {
//                 recordId: bookingId,
//                 objectApiName: 'booking__c',
//                 actionName: 'view'
//             }
//         });
//     }
// }

import { LightningElement, wire } from 'lwc';
import getBookings from '@salesforce/apex/customBookingRecord.getBookings';
import getBookingRecordDetails from '@salesforce/apex/customBookingRecord.getBookingRecordDetails';

const columns = [
  // Define columns for the datatable
  { label: 'Name', fieldName: 'Name' ,type:'url',
		typeAttributes: { label: { fieldName: 'Name' }, value: { fieldName: 'Name' }, target: 'urlProjectPath',}}
];



export default class MyComponentName extends LightningElement {
  bookingRecords;
  selectedRecordId;
  recordDetails;
  columns = columns;
  @wire(getBookings)
  wiredBookingRecords({ data, error }) {
    if (data) {
      //this.bookingRecords = JSON.stringify(data);
      this.bookingRecords = data;
      console.log(data);
    } else if (error) {
      // Handle error
    }
  }

    handleRowAction(event) {
        console.log('Hello this is rr',event);
        //console.log('Hello this is rr',event.detail.Id);
      const selectedRecordId = event.detail.row.Id;
      //window.alert(selectedRecordId);
      getBookingRecordDetails({ recordId: selectedRecordId })
    .then(result => {
      this.selectedRecordId = selectedRecordId;
      this.recordDetails = result;
    })
    .catch(error => {
      // Handle error
    });
    }
}