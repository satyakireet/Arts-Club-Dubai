import { LightningElement,wire,api } from 'lwc';

import getBookings from '@salesforce/apex/bookingController.getBookings';

export default class BookingPage extends LightningElement {

@api recordId;
bookingList;

    @wire(getBookings,{currenbookingId:this.recordId})
		getAccountRecord(response){
			console.log('Wire Method Called');
		  
			if(response.data){
				console.log(response);
				console.log(response.data);
				this.bookingList = response.data;

			}

            else if(response.error){
                console.log(response.error);
            }
		}
}