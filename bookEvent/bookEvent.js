import { LightningElement,api, track, wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import UserFNameFIELD from '@salesforce/schema/User.FirstName';
import UserLNameFIELD from '@salesforce/schema/User.LastName';
import userEmailFIELD  from '@salesforce/schema/User.Email';
import userPhoneFIELD from '@salesforce/schema/User.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookEvent extends LightningElement {

    @track userId = Id;
    @track currentUserFirstName;
    @track currentUserLastName;
    @track currentUserEmail;
    @track currentPhone;


    @wire(getRecord, { recordId: Id, fields: [UserFNameFIELD, UserLNameFIELD, userEmailFIELD, userPhoneFIELD ]}) 
        currentUserInfo({error, data}) {
            if (data) {
                this.currentUserFirstName = data.fields.FirstName.value;
                this.currentUserLastName = data.fields.LastName.value;
                this.currentUserEmail = data.fields.Email.value;
                this.currentPhone = data.fields.Phone.value;
            } else if (error) {
                
            }
        }


    currentvalue = '1';
    step = 1;
    selectedvalue = 'Contacted';
    showEventDetails=true;
    ShowBookingDetails = false;   
    syncSevenRoomPage =false;
    eventId;
    //@api eveId;   
    noofGuest=1;
    eventPrice = 238.1;
    VATFee =28.57;
    totalEventPrice=266.67;
    // eventMemId;

    bookingFields ={
                //Member_Events__c:'a035h00000csne5AAA',
                Member_Events__c: this.eventId,
                User__c: this.userId
		    }

    connectedCallback(){
       var arr = window.location.toString().split('/')
       this.eventId = arr[arr.length-2];
       console.log('evenrId==='+this.eventId)
    }
    evenHandler(){
        this.step=1;
        this.showNextPage();
    }
    bookHandler(){
        this.step=2;
        this.showNextPage();
    }
    syncHandler(){
        this.step=3
        this.showNextPage();
    }


    showNextPage(){
         this.showEventDetails = this.step == 1;
        this.ShowBookingDetails = this.step == 2;
        this.syncSevenRoomPage = this.step == 3;
        this.currentvalue = "" + this.step;
        console.log(this.showEventDetails);
        console.log(this.ShowBookingDetails);
        console.log(this.syncSevenRoomPage);

    }

    /*
    eventPathHandler(){
        this.showEventDetails = true;
        console.log( this.template.querySelector("lightning-progress-indicator"));
        this.ShowBookingDetails = false;
    }
    bookingPathHandler(event) {



        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        console.log(event.currentTarget.label);
        console.log(event.currentTarget.value);
        this.currentvalue = targetValue;
        this.selectedvalue = selectedvalue;
        this.ShowBookingDetails = true;
        this.showEventDetails =false;
    }

    svRoomPathHandler(event){
        console.log( this.template.querySelector("lightning-progress-indicator"));
        this.showEventDetails =false;
        this.ShowBookingDetails = false;
         console.log(event.currentTarget.value);
    }
    */

    handleSubmitClick(event){
        console.log(this.noofGuest)
        this.bookingFields.No_Of_Guests__c = this.noofGuest.counter;
        this.bookingFields.Member_Events__c = this.eventId;
       // this.template.querySelector("lightning-progress-indicator").value = '3'; 
       // this.ShowBookingDetails = false;
        //this.showEventDetails =false;
    
       console.log('BookingFields-->'+JSON.stringify(this.bookingFields));
       

       createRecord({apiName:'Booking__c',fields:this.bookingFields})
            .then(response=>{
                console.log(response.id);
                console.log('Booking Created with Id :- '+response.id);

            })
        .catch(error => {
                            this.showLoading = false;
                            console.log(error);
                            this.showToast('Error!!', error.body.message, 'error', 'dismissable');
                        });
           // this.syncHandler();
        // window.open('https://theartsclub-dev-ed.develop.my.salesforce.com/survey/runtimeApp.app?invitationId=0Ki5h000000rQ4W&surveyName=booking_survey_upd&UUID=ecf3ecfe-0737-4bcc-aad3-860fd3f263c0', '_blank');
           window.open('https://theartsclub-dev-ed.develop.my.site.com/survey/runtimeApp.app?invitationId=0Ki5h0000018JzH&surveyName=yash_club&UUID=5881ac77-65b8-4934-b398-8183b47b3403', '_blank');

        
    }
    

    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
    
    handlechildevent(event){
        console.log('data passed from child -> '+event.detail);
        // this.eventMemId=event.detail.eveId;
        // console.log('GetEventIdFromParent-->'+ this.eventMemId)
        this.noofGuest =event.detail;
        console.log('EventPrice-->'+this.eventPrice);
        console.log('No.ofGuest-->'+JSON.stringify(this.noofGuest));
        console.log('VATFee-->'+this.VATFee);
        this.totalEventPrice =(this.eventPrice * this.noofGuest.counter)+this.VATFee;
        this.eventPrice = this.eventPrice * this.noofGuest.counter;
        console.log('totalEventPrice-->'+this.totalEventPrice);
        
        this.bookHandler();
        //this.currentvalue =2;
        //this.showEventDetails=false;
        //this.ShowBookingDetails = true 
    }
    
 }