import { LightningElement,wire } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import CONTACT_ID from '@salesforce/schema/User.ContactId';
import getMemberEventData from '@salesforce/apex/EventCardController.getMemberEventData';
import { NavigationMixin } from 'lightning/navigation';
import ArtsClub from '@salesforce/resourceUrl/ArtsClubImage';

export default class ArtsClubPage extends LightningElement {
    artsClubimage =ArtsClub;
    contactID
    resultData = [];

    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] }) wireuser({ error, data }) {
        if (error) {
            console.log('error--->', error)
        } else if (data) {
            this.contactID = data.fields.ContactId.value;
            this.getMemberData()

        }
    }
    
    dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    getMemberData() {
        getMemberEventData()
            .then(result => {
                if (result) {
                    // result.forEach(row => {
                    // })
                    console.log('Data--->', result)
                    var resultTest = [{...result}]
                    
                    resultTest[0].CustomImage = 'this.artsClubimage';
                    resultTest[1].CustomImage = 'this.artsClubimage';
                    resultTest[2].CustomImage = 'this.artsClubimage';
                    resultTest[3].CustomImage = 'this.artsClubimage';
                    resultTest[4].CustomImage = 'this.artsClubimage';
                    resultTest[5].CustomImage = 'this.artsClubimage';
                    console.log('Custom Image');
                    console.log(resultTest);
                }
            })
            .catch(error => {
                console.log('error--->', error)
            });
    }
    recordData = {}
    handleOnClick(event) {
        console.log('value-->' + event.target.value)
        console.log('DataID-->' + event.target.src)

        this.resultData.forEach(element => {
            if (element.Event_Image_URL__c == event.target.src) {
                this.recordData.Id = element.Id
                this.recordData.Description = element.Description__c;
                this.recordData.Location = element.Location__c;
                this.recordData.Price = element.Price__c;
                this.recordData.Name = element.Name;
                this.recordData.Date = element.Date__c;
                this.recordData.Time = element.Time__c;
                this.recordData.ImageUrl = element.Event_Image_URL__c;
            }
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'event-detail',

            }
        });
        sessionStorage.setItem('recordData', JSON.stringify(this.recordData));
    }
}