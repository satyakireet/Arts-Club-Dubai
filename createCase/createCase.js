import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CASE_OBJECT from '@salesforce/schema/Case';

const TITLE_SUCCESS = 'Inquiry Created!';
const MESSAGE_SUCCESS = 'You have successfully created a Inquiry';


export default class CreateCase extends LightningElement {
		
		caseObject = CASE_OBJECT;
		
		isModalOpen = false;
		
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
      	
		  handleSuccess(event){
					console.log("save case called")
        // Fire event for Toast to appear that Case was created
        const evt = new ShowToastEvent({
            title: TITLE_SUCCESS,
            message: MESSAGE_SUCCESS,
            variant: 'success',
        });
        this.dispatchEvent(evt); 
					// this.isModalOpen = false;

       // const refreshEvt = new CustomEvent('refresh');
        // Fire the custom event
        //this.dispatchEvent(refreshEvt);
    }
		
		handleError(){
				   const evt = new ShowToastEvent({
            title: 'Error',
            message: 'Inquiry creation failed!',
            variant: 'error',
        });
        this.dispatchEvent(evt); 
				this.isModalOpen = true;
		}
}