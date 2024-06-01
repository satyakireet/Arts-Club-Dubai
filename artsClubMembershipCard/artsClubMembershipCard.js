import { LightningElement ,wire, api} from 'lwc';
import Profile_Picture from '@salesforce/resourceUrl/Profile_Picture';
import Membership from '@salesforce/resourceUrl/Membership';
import artClubImages from '@salesforce/resourceUrl/artClubImages';
import USER_ID from '@salesforce/user/Id';
import CONTACT_ID from '@salesforce/schema/User.ContactId';
import { getRecord } from 'lightning/uiRecordApi';
import getContactData from '@salesforce/apex/EventCardController.getContactData';
import artsclubDeviceLogos from '@salesforce/resourceUrl/artsclubDeviceLogos';
import getMemberApplicationData from '@salesforce/apex/EventCardController.getMemberApplicationData';
import getGoogleWalletDetails from '@salesforce/apex/GoogleWalletHandler.getGoogleWalletDetails';


export default class ArtsClubMembershipCard extends LightningElement {
		
    contactID
    resultData = []
    url
    @api recordId
    name
    date 
    firstName
    lastName
    salutation;
    buttonLabel = 'Add to google wallet';
    showQrCode=false;
    showWalletButton = false;
    memberId;
    userEmail;

    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] }) wireuser({ error, data }) {
        if (error) {
            console.log('error--->', error)
        } else if (data) {
            this.contactID = data.fields.ContactId.value;
            console.log('ContactId-->' + this.contactID)
            if(this.contactID){
                this.getMemberApplicationDatas()
            }
        }
    }

    getMemberApplicationDatas(){
        getMemberApplicationData({ ContactId: this.contactID })
        .then(result => {
            if (result) {
                this.resultData = result
                console.log('this.resultData:' + JSON.stringify(this.resultData))

                result.forEach(element => {
                    console.log(element)
                    this.date = element.CreatedDate
                    this.firstName = element.Name;
                    this.lastName = element.Last_Name__c;
                    this.salutation = element.Contact__r.Salutation;
                    this.memberId = element.Member_Id__c;
                    this.userEmail = element.Email_ID__c;
                });
                this.url = `lightning/n/MemberLogin?C__Id=${this.contactID}&C__firstName=${this.firstName}&C__lastName=${this.lastName}&C__Salutation=${this.salutation}&C__MemberId=${this.memberId}`
                console.log('In for' + this.url)
            }
        })
        .catch(error => {
            console.log('error--->', error)
        });
    }

    // getContactData() {
    //     getContactData({ ContactId: this.contactID })
    //         .then(result => {
    //             if (result) {
    //                 this.resultData = result
    //                 result.forEach(element => {
    //                     console.log(element)
    //                     this.name = element.Name;
    //                     this.date = element.CreatedDate
    //                     this.firstName = element.FirstName
    //                     this.lastName = element.LastName
    //                     this.salutation = element.Salutation
    //                 });
    //                 this.url = `lightning/n/MemberLogin?C__Id=${this.contactID}&C__firstName=${this.firstName}&C__lastName=${this.lastName}&C__Salutation=${this.salutation}`
    //                 console.log('In for' + this.url)
    //             }
    //         })
    //         .catch(error => {
    //             console.log('error--->', error)
    //         });
    // }

    onShowQr(event){
        this.showQrCode = true;
        let device = event.currentTarget.dataset.id;
        console.log('device--->', JSON.stringify(device))

        if(device == 'android'){
            this.showWalletButton = true;
            this.buttonLabel = 'Add to google wallet';
        }else{
            this.showWalletButton = true;
            this.buttonLabel = 'Add to apple wallet';
        }


    }
		
    get adroidLogo(){
        return artsclubDeviceLogos + '/artsClubDeviceLogo/android-logo.png';
    }

    get iosLogo(){
        return artsclubDeviceLogos + '/artsClubDeviceLogo/png-apple-logo-9711.png';
    }

	get artClubLogo() {
        return artClubImages + '/art_club_images/logo.jpg';
    }
    get Profileimage() {
        return Profile_Picture;
    }
    get MembershipImage() {
        return Membership;
    }

    handleClickWallet(){
        getGoogleWalletDetails({ email : this.userEmail})
        .then(result=>{
            console.log('result--->', JSON.stringify(result))

        })
        .catch(error =>{
            console.log('error--->', JSON.stringify(error))

        })
    }


}