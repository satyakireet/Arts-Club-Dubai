import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomCaseCreation extends LightningElement {
    isShowModal = false;
    showModalBox(){
        this.isShowModal = true;
    }

    hideModalBox(){
        this.isShowModal = false
    }

    successHandler(){
        const evt = new ShowToastEvent({
            title :'Record Save',
            message: 'Case Raised Successfully',
            variant:'success'
        });
        
        this.dispatchEvent(evt);
    }

    errorHandler(){
        const evt = new ShowToastEvent({
            title :'Error',
            message: 'Something went wrong, Please Contact your Administrator',
            variant:'error'
        });
        
        this.dispatchEvent(evt);
    }
}