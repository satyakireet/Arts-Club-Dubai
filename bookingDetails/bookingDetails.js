import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Booking__c.Name';
//import FIELD1_FIELD from '@salesforce/schema/booking__c.';
//import FIELD2_FIELD from '@salesforce/schema/booking__c.Field2__c';
// Import other fields as needed

export default class BookingDetails extends LightningElement {
@api recordId;

@wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
booking;

get name() {
return getFieldValue(this.booking.data, NAME_FIELD);
}

// get field1() {
// return getFieldValue(this.booking.data, FIELD1_FIELD);
// }

// get field2() {
// return getFieldValue(this.booking.data, FIELD2_FIELD);
// }
// Add more getters for other fields as needed
}