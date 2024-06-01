import { LightningElement,api,wire } from 'lwc';
import Case_Object from '@salesforce/schema/Case';
import Contact_Name from '@salesforce/schema/Case.ContactId';
import CaseNumber from '@salesforce/schema/Case.CaseNumber';
import Case_Owner from '@salesforce/schema/Case.OwnerId';
import Priority_Field from '@salesforce/schema/Case.Priority';
import Status_Field from '@salesforce/schema/Case.Status';
import Subject_Field from '@salesforce/schema/Case.Subject';
import ID_FIELD from "@salesforce/schema/Case.Id";
import Description from "@salesforce/schema/Case.Description";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//2. Import the named import updateRecord
import { updateRecord } from "lightning/uiRecordApi";
import { CurrentPageReference } from 'lightning/navigation';

export default class CaseDetails extends LightningElement {
		

		
        ContactName = Contact_Name;
        CaseNumber= CaseNumber;
        CaseOwner = Case_Owner;
        Priority = Priority_Field;
        Status = Status_Field;
        Subject= Subject_Field;
        currentPageReference = null;
		description = Description;
		
        priorityField;
        statusField;
        subjectField;
		descriptionField;


   // Flexipage provides recordId and objectApiName
    // @api recordId='5005g00000JSzuRAAT';
    @api objectApiName = Case_Object ;
    @api isEditForm = false;
    @api isViewForm = false;
		caseId;

		@wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
           this.caseId = currentPageReference.state.caseRecordId;
       }
    }
		
		 connectedCallback(){
            let testURL = window.location.href;
            let newURL = new URL(testURL).searchParams;
            // eslint-disable-next-line no-console
            console.log('id ===> '+newURL.get('caseRecordId'));
            this.urlParam = newURL.get('caseRecordId');
            this.isViewForm = true;
        }
		
		  handleChange(event){
            console.log("event.target.name:"+event.target.name)
            console.log("event.target.name:"+event.target.value)

           if(event.target.name === "Priority"){
                this.priorityField = event.target.value;
                console.log(JSON.stringify(this.priorityField));

            }else if(event.target.name === "Status"){
                this.statusField = event.target.value;
                console.log(JSON.stringify(this.statusField));
        

            }else if(event.target.name === "Subject"){
                this.subjectField=event.target.value;
        console.log(JSON.stringify(this.subjectField));

            }
					
					else if(event.target.name === "Description"){
                this.descriptionField=event.target.value;
        console.log(JSON.stringify(this.descriptionField));

            }
					
        }
    

    onEdit(){
     this.isViewForm=false;
     this.isEditForm =true;
    }

    onCancel(){
     this.isViewForm=true;
     this.isEditForm =false;

    }

    onSubmit(){
    // map the data to the fields
    const fields = {};

    fields[ID_FIELD.fieldApiName] = this.caseId;
    // fields[Case_Category.fieldApiName] = this.caseCategoryField;
    fields[Priority_Field.fieldApiName] = this.priorityField;
    fields[Status_Field.fieldApiName] = this.statusField;
    fields[Subject_Field.fieldApiName] = this.subjectField;
		fields[Description.fieldApiName] = this.descriptionField;

        
    // Create a config object that had info about fields. 
    //Quick heads up here we are not providing Object API Name
    const recordInput = {
      fields: fields
    };

     //6. Invoke the method updateRecord()
     updateRecord(recordInput).then((record) => {
        console.log(record);
        if(record){
            this.isViewForm=true;
            this.isEditForm =false;
						 const evt = new ShowToastEvent({
            title: 'Updated',
            message: 'Inquiry updated successfully',
            variant: 'success'
        });
        this.dispatchEvent(evt); 
						
        }
      })
      .catch(err=>{
          console.error(JSON.stringify(err))
				 const evt = new ShowToastEvent({
            title: 'Error',
            message: 'Inquiry updation failed!',
            variant: 'error'
        });
        this.dispatchEvent(evt); 
      })
    
        
    }
}