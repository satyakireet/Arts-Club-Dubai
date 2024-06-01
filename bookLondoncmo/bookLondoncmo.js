import { LightningElement } from 'lwc';

export default class BookLondoncmo extends LightningElement {
     counter = 1;
     totalPrice = 238.10;

    handleIncrement() {
        console.log('Handle Inside');
        this.counter++;
        console.log(this.counter);
        this.totalPrice = 238.10 * this.counter;
        console.log(this.totalPrice);

    }

    handleDecrement() {
        if (this.counter > 1) {
            this.counter--;
            this.totalPrice = 238.10 * this.counter;
        }
    }
  
    mapMarkers = [
    {
        location: {
            City: 'Dubai',
            Country: 'UAE'
        },
        icon: 'custom:custom26',
        title: 'asd'
    }
];

    markersTitle = 'Accounts';
    zoomLevel = 4;

    /*

    handleDecrement = () => {
        if (this.counter <= 0) {
            return;
        }
        this.counter--;
    };

    handleIncrement = () => {
        this.counter++;
    };
    */

    handleClick(){
       const e =  new CustomEvent("guestfromchildcmp",{detail:this.counter});

			this.dispatchEvent(e);
    }
    handleButtonClick() {
    // Replace 'https://www.example.com' with your desired URL
    window.open('https://theartsclub-dev-ed.develop.my.site.com/survey/runtimeApp.app?invitationId=0Ki5h000000rQ4a&surveyName=booking_experience&UUID=37180821-9131-4c73-9945-096badd1d9b7');
  }
}