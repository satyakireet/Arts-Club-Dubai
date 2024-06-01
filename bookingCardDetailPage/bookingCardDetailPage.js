import { LightningElement, api } from 'lwc';
import USER_ID from '@salesforce/user/Id';
// import getBookingDetails from '@salesforce/apex/EventCardController.getBookingDetails';
export default class BookingCardDetailPage extends LightningElement {
    getData
    UserId;
    eventid;
    guestQuantity;
    @api recordId
    connectedCallback() {
        this.getData = JSON.parse(sessionStorage.getItem('recordData'))
        console.log('DATA__>>' + JSON.stringify(this.getData))
        console.log('userId-->' + USER_ID)
            // this.eventid =  this.getData.Id;

        // getBookingDetails({ UserId:USER_ID , eventId:this.eventid})
        // .then(result =>{
        // 		this.guestQuantity = result[0].No_Of_Guests__c;
        // 		 console.log('guestQuantity>>' + JSON.stringify(this.guestQuantity))

        // })
        // .catch(error =>{
        // 		console.log('error>>' + JSON.stringify(error))
        // })
    }
}