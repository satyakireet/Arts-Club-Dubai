import { LightningElement , api ,wire} from 'lwc';
import getUserDetails from '@salesforce/apex/profileCardHandler.getUserDetails';
import getBookingDetails from '@salesforce/apex/profileCardHandler.getBookingDetails';
import USER_ID from '@salesforce/schema/Booking__c.User__c';
import CONTACT_ID from '@salesforce/schema/User.ContactId';
import USER_CITY from '@salesforce/schema/User.City';
import USER_PIC from '@salesforce/schema/User.SmallPhotoUrl';
import { getRecord } from 'lightning/uiRecordApi';
import bannerIamges from '@salesforce/resourceUrl/bannerIamges';
import Profile_Picture from '@salesforce/resourceUrl/Profile_Picture';


export default class BookingProfileCard extends LightningElement {

    @api recordId;
    contactid;
    profilePicUrl;
    bannerUrl;
    contactName;
    salutation;
    lastName;
    userCountry;
    userImage;
    userEmail;

    get bannerImages() {
        return bannerIamges + '/bannerimage/banner.png'
    }

    connectedCallback(){
        getBookingDetails({bookId : this.recordId})
        .then(result=>{
            console.log("booking result:" + JSON.stringify(result));
            this.profilePicUrl = result.User__r.MediumPhotoUrl;
            this.contactName = result.User__r.Name;

        })
        .catch(error => {
                        console.log("booking error:" + JSON.stringify(error));

                    })
    }
}