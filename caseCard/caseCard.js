import { api, LightningElement, wire,track} from 'lwc';
import getCaseForCommunity from '@salesforce/apex/CaseCardController.getCaseForCommunity';
import { NavigationMixin } from 'lightning/navigation'; 
import USER_ID from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';
import artClubImages from '@salesforce/resourceUrl/artClubImages';

export default class CaseCard extends  NavigationMixin(LightningElement) {
		
		 @api loggedInUserId = USER_ID;
    @track cList = [];
    @track error;
    @track wiredCaseList = [];
		noInquiry = false;
		
		  connectedCallback(){
        // console.log("loggedInUserId:"+this.loggedInUserId)
        return refreshApex(this.wiredCaseList);
    }
		
		 @wire(getCaseForCommunity,{userId : '$loggedInUserId'})
    caseList(result){
     if (result.data) {
        refreshApex(this.wiredCaseList);
        this.wiredCaseList = result
        // console.log("this.wiredCaseList:"+JSON.stringify(this.wiredCaseList))
        this.cList = this.wiredCaseList.data;
        console.log("this.cList:"+JSON.stringify(this.cList.length))
				 if(this.cList.length ==0){
						 this.noInquiry = true;
				 }else{
						 this.noInquiry = false;
				 }
				 
        this.error = undefined;
      } else if (result.error) {
        this.error = result.error;
        console.log("this.error:"+JSON.stringify(this.error))

        this.cList = [];
      }

    }
		
		 get images(){
      return artClubImages + '/art_club_images/logo2.png';
    }
		get imgLogo(){
      return artClubImages + '/art_club_images/logo.jpg';
    }
		
		// redirect to case details page
    navigateToViewCaseDetail(event) {
      console.log("event:"+event.currentTarget.dataset.id);
      let recordId =event.currentTarget.dataset.id

      // Navigate to the Account home page
      this[NavigationMixin.Navigate]({
          type: 'comm__namedPage',
          attributes: {
            name: 'case_details__c'
            // url: 'https://soccerss-developer-edition.ap24.force.com/transferMarketPortal/s/mycase/view-case'
          },
          state: {  
            'caseRecordId':recordId,
        }, 
      });
  }
}