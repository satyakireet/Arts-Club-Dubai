import { LightningElement,wire,track } from 'lwc';
import doLogin from '@salesforce/apex/CommunityLoginController.doLogin';
import ArtsClub from '@salesforce/resourceUrl/ArtsClubLogoImage';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import getRecordsDetails from '@salesforce/apex/MemberEventsDirectory.getRecordsDetails';


export default class CommunityUserLogin extends LightningElement {

    recordId='a035h00000bDAoNAAW';
   @wire(getRecordsDetails, {eventId:'$recordId'}) eventdata;

    username;
    password;
    @track errorCheck;
    @track errorMessage;
    userId=Id;
    memberLoggedIn=false
    artsClubimage =ArtsClub;
    isShowLoginPage =false;
    showBasicInfo =true;

    @wire(getRecord,{recordId:'$userId',fields:['User.Name']})
		getUserRecord({data,error}){
			console.log('Wire Method Called');
			
			if(data){
				console.log(data);
				if(data.fields.Name.value){
                    
                    this.memberLoggedIn = true
                    console.log(this.memberLoggedIn);
                }


			}

			if(error){
				console.log(error.message);
			}
		   
		} 

        handleLoginTemplate(){
            this.isShowLoginPage = true;
            this.showBasicInfo = false;
        }

    connectedCallback(){

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    handleUserNameChange(event){

        this.username = event.target.value;
    }

    handlePasswordChange(event){
        
        this.password = event.target.value;
    }

    handleLogin(event){

       if(this.username && this.password){

        event.preventDefault();

        doLogin({ username: this.username, password: this.password })
            .then((result) => {
                
                window.location.href = result;
            })
            .catch((error) => {
                this.error = error;      
                this.errorCheck = true;
                this.errorMessage = error.body.message;
            });

        }

    }

}