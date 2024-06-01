import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import CONTACT_ID from '@salesforce/schema/User.ContactId';
import getBookingData from '@salesforce/apex/EventCardController.getBookingData';
import { NavigationMixin } from 'lightning/navigation';

export default class BookingCardPage extends NavigationMixin(LightningElement) {
    resultData = [];
    contactID
    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] }) wireuser({ error, data }) {
        if (error) {
            console.log('error--->', error)
        } else if (data) {
            this.contactID = data.fields.ContactId.value;
            this.getBookingData()
        }
    }
    getBookingData() {
        getBookingData({ UserId: USER_ID })
            .then(result => {
                if (result) {
                    this.resultData = result
                    console.log('Data--->', JSON.stringify(this.resultData))
                }
            })
            .catch(error => {
                console.log('error--->', error)
            });
    }
    recordData = {}
    handleOnClick(event) {
        //console.log('value-->' + event.target.value)
        console.log('DataID-->' + event.target.src)

        this.resultData.forEach(element => {
            if (element.Member_Events__r.Event_Image_URL__c == event.target.src) {
                this.recordData.BookingId = element.Id
                this.recordData.Booking_record_url = element.Booking_record_url__c
                this.recordData.BookingName = element.Name
                this.recordData.User = element.User__c
                this.recordData.No_Of_Guests = element.No_Of_Guests__c
                this.recordData.Id = element.Member_Events__r.Id
                this.recordData.Description = element.Member_Events__r.Description__c;
                this.recordData.Location = element.Member_Events__r.Location__c;
                this.recordData.Price = element.Member_Events__r.Price__c;
                this.recordData.Name = element.Member_Events__r.Name;
                this.recordData.Date = element.Member_Events__r.Date__c;
                this.recordData.Time = element.Member_Events__r.Time__c;
                this.recordData.ImageUrl = element.Member_Events__r.Event_Image_URL__c

            }
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'booking-details',

            }
        });
        sessionStorage.setItem('recordData', JSON.stringify(this.recordData));
    }
    handleOnClickRead(event) {
        console.log('value-->' + event.target.value)

        this.resultData.forEach(element => {
            if (element.Member_Events__r.Event_Image_URL__c == event.target.value) {
                this.recordData.BookingId = element.Id
                this.recordData.Booking_record_url = element.Booking_record_url__c
                this.recordData.BookingName = element.Name
                this.recordData.User = element.User__c
                this.recordData.No_Of_Guests = element.No_Of_Guests__c
                this.recordData.Id = element.Member_Events__r.Id
                this.recordData.Description = element.Member_Events__r.Description__c;
                this.recordData.Location = element.Member_Events__r.Location__c;
                this.recordData.Price = element.Member_Events__r.Price__c;
                this.recordData.Name = element.Member_Events__r.Name;
                this.recordData.Date = element.Member_Events__r.Date__c;
                this.recordData.Time = element.Member_Events__r.Time__c;
                this.recordData.ImageUrl = element.Member_Events__r.Event_Image_URL__c

            }
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'booking-details',

            }
        });
        sessionStorage.setItem('recordData', JSON.stringify(this.recordData));
    }
}