import { LightningElement, track,api,wire } from 'lwc';
//Import our Apex method
import payByAuthrizePayment from "@salesforce/apex/AuthurizePaymentGatewayCtrl.payByAuthrizePayment";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

import getMemInvoiceDetails from '@salesforce/apex/MemberInvoiceController.getMemInvoiceDetails';
import updatePaymentDetails from "@salesforce/apex/MemberInvoiceController.updatePaymentDetails";

 
export default class AuthurizeLWCPaymentGateway extends LightningElement {
    /*
    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    */
    @api currentRecordId;

    monthOptions = [
                    {
                        value: "01",
                        label: "January"
                    },
                    {
                        value: "02",
                        label: "February"
                    },
                    {
                        value: "03",
                        label: "March"
                    },
                    {
                        value: "04",
                        label: "April"
                    },
                    {
                        value: "05",
                        label: "May"
                    },
                    {
                        value: "06",
                        label: "June"
                    },
                    {
                        value: "07",
                        label: "July"
                    },
                    {
                        value: "08",
                        label: "August"
                    },
                     {
                        value: "09",
                        label: "September"
                    },
                    {
                        value: "10",
                        label: "October"
                    },
                    {
                        value: "11",
                        label: "November"
                    },
                    {
                        value: "12",
                        label: "December"
                    }
    ];
    yearOptions = [
                    {
                        value: "2023",
                        label: "2023"
                    },
                    {
                        value: "2024",
                        label: "2024"
                    },
                    {
                        value: "2025",
                        label: "2025"
                    },
                    {
                        value: "2026",
                        label: "2026"
                    },
                    {
                        value: "2027",
                        label: "2027"
                    },
                    {
                        value: "2028",
                        label: "2028"
                    },
                     {
                        value: "2029",
                        label: "2029"
                    },
                    {
                        value: "2030",
                        label: "2030"
                    }
                    
    ];
 
    countries = [
            {
                value: "India",
                label: "India"
            },
            {
                value: "USA",
                label: "USA"
            },
            {
                value: "United Kingdom",
                label: "United Kingdom"
            },
            {
                value: "UAE",
                label: "UAE"
            },
    ];
 
    @track firstName;
    @track lastName;
    @track cardNumber;
    @track cvv;
    @track cardMonth;
    @track cardYear;
    @track amount;
    @track country;
    @track state;
    @track zip;
    @track street;
    @track city;
    @track amount;
    @track showSpinner = false;
     
    handleChange(event) {
        if(event.target.name == 'firstName'){
            this.firstName = event.detail.value;
        } else if(event.target.name == 'lastName'){
            this.lastName = event.detail.value;
        } else if(event.target.name == 'cardNumber'){
            this.cardNumber = event.detail.value;
        } else if(event.target.name == 'amount'){
            this.amount = event.detail.value;
        } else if(event.target.name == 'month'){
            this.cardMonth = event.detail.value;
        } else if(event.target.name == 'year'){
            this.cardYear = event.detail.value;
        } else if(event.target.name == 'cvv'){
            this.cvv = event.detail.value;
        } else if(event.target.name == 'country'){
            this.country = event.detail.value;
        } else if(event.target.name == 'state'){
            this.state = event.detail.value;
        } else if(event.target.name == 'street'){
            this.street = event.detail.value;
        } else if(event.target.name == 'city'){
            this.city = event.detail.value;
        } else if(event.target.name == 'zip'){
            this.zip = event.detail.value;
        }
    }
 
    handlePayment(){
        console.log(this.cardNumber);
        this.handleSpinner();
        payByAuthrizePayment({firstName : this.firstName, lastName : this.lastName, cardNumber : this.cardNumber, amount : this.amount, 
                              cardMonth : this.cardMonth, cardYear : this.cardYear, cvv : this.cvv, country : this.country, state : this.state, 
                              zip : this.zip, street : this.street, city : this.city
         
        })
        .then(res=>{
            let title = res;
            this.ShowToast('Success!', title, 'success', 'dismissable');

            console.log('Called123');
            console.log(this.currentRecordId);
            if(this.currentRecordId){
                this.handlePaymentDetails(); 
            }
            
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
            this.handleSpinner();
        })
    }
 
    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
       
   
    }

    @wire(getMemInvoiceDetails,{memberInvoiceRecordId:'$currentRecordId'})
    MemberInvoiceHandler(response){
        if(response.data){
            console.log('Data ',response.data);
            //console.log('Data ',response.data.BillingCountry.value);

            response.data.forEach(record=>{
                console.log('Data for ',record.BillingCountry); 
                console.log('Data for ',record.Membership_Application__r.Name);
                this.amount = record.GrandTotal;
                this.firstName = record.Membership_Application__r.Name;
                this.lastName =record.Membership_Application__r.Last_Name__c;
                this.country = record.BillingCountry;
                this.state = record.BillingState;
                this.zip = record.BillingPostalCode;
                this.street = record.BillingStreet;
                this.city = record.BillingCity;
            })

           
        }
        else if(response.error){
            console.log('Error ',response.error)
        }
    }

    handlePaymentDetails(){
        
        updatePaymentDetails({memberInvoiceId:this.currentRecordId})
        .then(result=>{
            console.log('Result -> ',result);
            
        })
        .catch(error=>{
            console.log('Error -> ',error);
        })
    }
    
}