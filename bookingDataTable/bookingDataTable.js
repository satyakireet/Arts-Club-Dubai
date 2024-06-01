import { LightningElement, wire, api } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import CONTACT_ID from '@salesforce/schema/User.ContactId';
import getBookingData from '@salesforce/apex/EventCardController.getBookingData'
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import CHECKIN_FIELD from "@salesforce/schema/Booking__c.Check_In__c";
import CHECKOUT_FIELD from "@salesforce/schema/Booking__c.Check_Out__c";
import ID_FIELD from "@salesforce/schema/Booking__c.Id";
import { NavigationMixin } from 'lightning/navigation';

// const columns = [
//     { label: 'Name', fieldName: 'Name' },
//     { label: 'Member Events', fieldName: 'EventName' },
//     {
//         label: 'No of Guests',
//         fieldName: 'NumberOfGuests',
//     },
//     {
//         type: "button",
//         typeAttributes: {
//             label: 'CheckIn',
//             name: 'CheckIn',
//             title: 'CheckIn',
//             disabled: false,
//             value: 'CheckIn',
//             iconPosition: 'left'
//         }
//     },
//     {
//         type: "button",
//         typeAttributes: {
//             label: 'CheckOut',
//             name: 'CheckOut',
//             title: 'CheckOut',
//             disabled: false,
//             value: 'CheckOut',
//             iconPosition: 'left'
//         }
//     }
// ];

export default class BookingDataTable extends NavigationMixin(LightningElement) {
    contactId;
    resultData = []
        //columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    @api recordId;
    eventName
    noOfGuests
    bookingId
    bookingName

    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] }) wireuser({ error, data }) {
        if (error) {
            console.log('error--->', error)
        } else if (data) {
            this.contactID = data.fields.ContactId.value;
            console.log('ContactId-->' + this.contactID)
            this.getBookingDetails()

        }
    }

    getBookingDetails() {
            getBookingData({ UserId: USER_ID })
                .then(result => {
                    if (result) {
                        let tempArray = []
                        console.log('DATA__?' + JSON.stringify(result))
                        result.forEach(element => {
                            let temp = {}
                            temp.Id = element.Id;
                            temp.Name = element.Name;
                            temp.NumberOfGuests = element.No_Of_Guests__c;
                            temp.EventName = element.Member_Events__r.Name;
                            tempArray.push(temp)
                        });
                        this.resultData = tempArray
                        console.log('this.resultData:' + JSON.stringify(this.resultData))
                        this.eventName = this.resultData[0].EventName
                        this.noOfGuests = this.resultData[0].NumberOfGuests
                        this.bookingId = this.resultData[0].Id
                        this.bookingName = this.resultData[0].Name
                    }
                })
                .catch(error => {
                    console.log('error--->', error)
                });
        }
        // callRowAction(event) {

    //     const recId = event.detail.row.Id;
    //     console.log('recId--' + recId)
    //     const actionName = event.detail.action.name;
    //     if (actionName === 'CheckIn') {
    //         console.log('IN ACTION NAME--' + actionName)
    //         const fields = {};
    //         let date = new Date().toJSON();
    //         console.log('date-??' + date)
    //         fields[ID_FIELD.fieldApiName] = event.detail.row.Id;
    //         fields[CHECKIN_FIELD.fieldApiName] = date;

    //         const recordInput = { fields };
    //         console.log('recorsInput--->' + JSON.stringify(recordInput))
    //         updateRecord(recordInput)
    //             .then(() => {
    //                 this.showToast('Success', 'Checked In Successfully', 'success');
    //             })
    //             .catch(error => {
    //                 this.showToast('Error', 'Error in Checking', 'error');
    //             });
    //     } else if (actionName === 'CheckOut') {
    //         const fields = {};
    //         let date = new Date().toJSON();
    //         console.log('date-??' + date)
    //         fields[ID_FIELD.fieldApiName] = event.detail.row.Id;
    //         fields[CHECKOUT_FIELD.fieldApiName] = date;

    //         const recordInput = { fields };
    //         console.log('recorsInput--->' + JSON.stringify(recordInput))
    //         updateRecord(recordInput)
    //             .then(() => {
    //                 this.showToast('Success', 'Check Out Successfully', 'success');
    //             })
    //             .catch(error => {
    //                 this.showToast('Error', 'Error in Checking Out', 'error');
    //             });
    //     }
    // }
    handleClickCheckIn(event) {
        console.log('ccacaoooo' + event.target.value)
        const fields = {};
        let date = new Date().toJSON();
        console.log('date-??' + date)
        fields[ID_FIELD.fieldApiName] = event.target.value;
        fields[CHECKIN_FIELD.fieldApiName] = date;

        const recordInput = { fields };
        console.log('recorsInput--->' + JSON.stringify(recordInput))
        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success', 'Checked In Successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', 'Error in Checking', 'error');
            });

    }
    handleClickCheckOut(event) {
        console.log('ccaca' + event.target.value)
        const fields = {};
        let date = new Date().toJSON();
        console.log('date-??' + date)
        fields[ID_FIELD.fieldApiName] = event.target.value;
        fields[CHECKOUT_FIELD.fieldApiName] = date;

        const recordInput = { fields };
        console.log('recorsInput--->' + JSON.stringify(recordInput))
        updateRecord(recordInput)
            .then(() => {
                this.showToast('Success', 'Check Out Successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', 'Error in Checking Out', 'error');
            });
    }
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
    handleBookingClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.bookingId,
                objectApiName: 'Booking__c',
                actionName: 'view'
            }
        });
    }
}