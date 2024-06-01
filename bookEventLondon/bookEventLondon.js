import { LightningElement,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class BookEventLondon extends LightningElement {
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

    bookingFields ={
                Member_Events__c:'a035h00000csne5AAA',
                User__c: '0055h000008Fzm0AAC'
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
        this.bookingFields.No_Of_Guests__c = this.noofGuest;
        
       // this.template.querySelector("lightning-progress-indicator").value = '3'; 
       // this.ShowBookingDetails = false;
        //this.showEventDetails =false;
    
       console.log(this.bookingFields);
       

       createRecord({apiName:'Booking__c',fields:this.bookingFields})
            .then(response=>{
                console.log(response.id);
                console.log('Booking Created with Id :- '+response.id);

            })

           // this.syncHandler();
         window.open('https://theartsclub-dev-ed.develop.my.salesforce.com/survey/runtimeApp.app?invitationId=0Ki5h000000rQ4W&surveyName=booking_survey_upd&UUID=ecf3ecfe-0737-4bcc-aad3-860fd3f263c0', '_blank');

        
    }
    
    
    handlechildevent(event){
        console.log('data passed from child -> '+event.detail);
        this.noofGuest =event.detail;
        this.totalEventPrice =(this.eventPrice * this.noofGuest)+this.VATFee;
        this.eventPrice = this.eventPrice * this.noofGuest;
        console.log(this.totalEventPrice);
        this.bookHandler();
        //this.currentvalue =2;
        //this.showEventDetails=false;
        //this.ShowBookingDetails = true 
    }
    
 }